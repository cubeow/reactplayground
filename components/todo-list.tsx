import { supabase } from "@/lib/supabase/client";
import { useEffect, useState, useContext } from "react";
import { DatabaseContext } from "@/app/page";
import TodoListRow from "./todo-list-row"

export default function TodoList(){
    const {databaseUpdate, setDatabaseUpdate} = useContext(DatabaseContext)!;
    const cellClass = "border-2 border-red-400 p-1 text-lg";
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const {data : todoListData, error : todoListError} = await supabase
                .from('todoList')
                .select();
            const {data : priorityData, error : priorityError} = await supabase
                .from('priorities')
                .select();
            console.log(priorityData);
            console.log(todoListData);
            if (!priorityError && !todoListError){
                // Converts to dictionary key = priority_name value: priority_rank_num
                const priorityRankMap = priorityData.reduce((acc, p) => {
                    acc[p.name] = p.rank;
                    return acc;
                }, {} as Record<string, number>);

                const sortedTodos = [...todoListData].sort((a, b) => {
                    const rankA = priorityRankMap[a.priority];
                    const rankB = priorityRankMap[b.priority];
                    return rankA - rankB; // Ascending order (1, 2, 3...)
                });

                setData(sortedTodos);
            }
        }

        if (databaseUpdate){            
            setDatabaseUpdate(false);
        }

        fetchData();
    }, [databaseUpdate])

    return (
        <table className="border-2 border-red-400 p-1 shadow-lg">
            <thead className={cellClass}>
                <tr>
                    <th className={cellClass}>Task name</th>
                    <th className={cellClass}>Time</th>
                    <th className={cellClass}>Priority</th>
                    <th className={cellClass}>Due date</th>
                    <th className={cellClass}>Finished?</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <TodoListRow key={item.id} props={{id: item.id, task: item.task, time: item.time, priority: item.priority, due_date: item.due_date}}></TodoListRow>
                ))}
            </tbody>
        </table>
    )
}