import { useState, useEffect, useContext } from "react";
import {createPortal} from 'react-dom';
import { supabase } from "../lib/supabase/client"
import { DatabaseContext} from "../app/page"

export default function CreatePriorityButton(){
    const [showModal, setShowModal] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [priorityName, setPriorityName] = useState("");

    const {databaseUpdate, setDatabaseUpdate} = useContext(DatabaseContext)!;

    useEffect(() => {
        setMounted(true);
    })

    function closePriorityForm(){
        setShowModal(false);
        setPriorityName("");
    }

    function submitPriorityCreationForm(){
        const insertData = async () => {
            const {data, error1} = await supabase
                .from('priorities')
                .select();
            const databaseLength = data.length;
            const {error} = await supabase 
                .from('priorities')
                .insert({"name": priorityName, "rank": String(databaseLength + 1)});
        }
        setPriorityName("");
        setDatabaseUpdate(true);
        insertData();
        setShowModal(false);
    }

    return (
        <div>
            <button className="bg-white text-red-400 hover:text-white hover:bg-red-400 rounded-xl p-1 border-2 border-solid focus:outline-2 focus:outline-offset-2 active:bg-red-200"
                onClick={() => setShowModal(true)}>
                <p>Add Priority</p>
            </button>
            {showModal && mounted && createPortal(
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-1/3 h-[65vh] rounded-lg p-6 shadow-lg bg-white flex flex-col">
                        <div className="flex flex-row justify-between items-start">
                            <p className="text-xl font-bold text-red-800">Create New Priority</p>
                            <button onClick={closePriorityForm}>X</button>
                        </div>
                        <p>Priority name</p>
                        <input value={priorityName} onChange={(e) => setPriorityName(e.target.value)} type="text" placeholder="Priority name..." className="border-2 rounded-lg border-red-200"></input>
                        <button className="bg-white text-red-400 hover:text-white hover:bg-red-400 rounded-xl p-1 border-2 border-solid focus:outline-2 focus:outline-offset-2 active:bg-red-200"
                onClick={submitPriorityCreationForm}>Submit</button>
                    </div>
                </div>, document.body)}
        </div>
    )
}