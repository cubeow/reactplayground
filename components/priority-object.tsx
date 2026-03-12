import { DatabaseContext } from "@/app/page";
import { useContext } from "react";
import { supabase } from "@/lib/supabase/client";

export default function PriorityObject({props}){
    const {databaseUpdate, setDatabaseUpdate} = useContext(DatabaseContext)!;
    function closeButton(){
        const fetchData = async () => {
            const {error} = await supabase
                .from('priorities')
                .delete()
                .eq('id', props.id);
        }
        const updateRanks = async() => {
            await supabase.rpc('shifts_ranks_down', { deleted_rank: props.rank });
        }
        updateRanks();
        setDatabaseUpdate(true);
        fetchData();
    }

    return (
        <div className="relative rounded-lg border-2 border-red-200 flex flex-col p-1 m-1.5" draggable="true">
            <button className="absolute -top-3 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs shadow-md hover:bg-red-600 transition-colors"
                onClick={closeButton}>X</button>
            <p>{props.name}</p>
        </div>
    )
}