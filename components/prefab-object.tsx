'use client';

import { DatabaseContext } from "@/app/page";
import { supabase } from "@/lib/supabase/client"
import { useContext } from "react";


export default function PrefabObject( {props} ){
    const {databaseUpdate, setDatabaseUpdate} = useContext(DatabaseContext)!;
        function closeButton(){
            const fetchData = async () => {
                const {error} = await supabase
                    .from('tasks')
                    .delete()
                    .eq('id', props.id);
            }
            setDatabaseUpdate(true);
            fetchData();
        }
    
    function AddToTodoList(){
        const addToDatabase = async () => {
            const {error} = await supabase
                .from('todoList')
                .insert({ task: props.name, time: props.time, priority: props.priority });
        }
        setDatabaseUpdate(true);
        addToDatabase();
    }

    return (
        <div className="relative shadow-lg border-2 border-red-400 rounded-lg p-2 m-1">
            <button className="absolute -top-3 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs shadow-md hover:bg-red-600 transition-colors"
                onClick={closeButton}>X</button>
            <p>{props.name}</p>
            <p>Time: {props.time}</p>
            <p>Priority: {props.priority}</p>
            <button onClick={AddToTodoList} className="border-2 border-red-400 rounded-lg p-1 hover:text-white hover:bg-red-400">Add to Todo List</button>
        </div>
    )
}