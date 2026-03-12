"use client";
import { ChevronUp, ChevronDown } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useContext } from "react";
import { DatabaseContext } from "@/app/page";

export default function SortPriorityObject({props}){

    const {databaseUpdate, setDatabaseUpdate} = useContext(DatabaseContext)!;

    function shiftRanksUp(){
        const updateAllRanks = async () => {
            const {error} = await supabase
                .from('priorities')
                .update({ rank: props.rank })
                .eq('rank', props.rank - 1);
            const {error2} = await supabase
                .from('priorities')
                .update({ rank: props.rank - 1 })
                .eq('id', props.id);
        }
        updateAllRanks();
        setDatabaseUpdate(true);
    }

    function shiftRanksDown(){
        const updateAllRanks = async () => {
            const {error} = await supabase
                .from('priorities')
                .update({ rank: props.rank })
                .eq('rank', props.rank + 1);
            const {error2} = await supabase
                .from('priorities')
                .update({ rank: props.rank + 1 })
                .eq('id', props.id);
        }
        updateAllRanks();
        setDatabaseUpdate(true);
    }

    return (
        <div className="border-2 border-red-400 rounded-lg m-1 pl-1 flex flex-row justify-between pr-0.5">
            <p>{props.name}</p>
            <div className="flex flex-col">
                <button onClick={shiftRanksUp} className="border-2 rounded-sm border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white">
                    <ChevronUp size={16}></ChevronUp>
                </button>
                <button onClick={shiftRanksDown} className="border-2 rounded-sm border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white">
                    <ChevronDown size={16}></ChevronDown>
                </button>
            </div>
        </div>
    )
}