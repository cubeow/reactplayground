import { supabase } from "@/lib/supabase/client";
import { useEffect, useState, useContext } from "react";
import { DatabaseContext } from "@/app/page";

export default function TodoList(){
    const {databaseUpdate, setDatabaseUpdate} = useContext(DatabaseContext)!;
    const cellClass = "border-2 border-red-400 p-1 text-lg";
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const {data, error} = await supabase
                .from('todoList')
                .select();
            
            if (!error){
                setData(data);
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
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td className={cellClass}>{item.task}</td>
                        <td className={cellClass}>{item.time}</td>
                        <td className={cellClass}>{item.priority}</td>
                        <td className={cellClass}>{item.due_date}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}