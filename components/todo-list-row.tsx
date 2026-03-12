import { Check } from "lucide-react";
import { useContext, useEffect } from "react";
import { DatabaseContext } from "@/app/page";
import { supabase } from "@/lib/supabase/client";

export default function TodoListRow({ props }){
    const cellClass = "border-2 border-red-400 p-1 text-lg";
    const {databaseUpdate, setDatabaseUpdate} = useContext(DatabaseContext)!;

    function removeRow(){
        const removeData = async () => {
            await supabase
                .from('todoList')
                .delete()
                .eq('id', props.id);
        }
        removeData();
        setDatabaseUpdate(true);
    }

    return (
        <tr>
            <td className={cellClass}>{props.task}</td>
            <td className={cellClass}>{props.time}</td>
            <td className={cellClass}>{props.priority}</td>
            <td className={cellClass}>{props.due_date}</td>
            <td className={cellClass}>
                <button onClick={removeRow} className="text-red-400 border-2 rounded-lg hover:text-white hover:bg-red-400">
                    <Check size={16}></Check>
                </button>
            </td>
        </tr>
    )
}