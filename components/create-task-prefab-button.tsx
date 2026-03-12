'use client';
import { useState, useEffect, useContext } from 'react';
import {createPortal} from 'react-dom'
import { supabase } from '../lib/supabase/client'
import { DatabaseContext } from '../app/page'

export default function CreateTaskPrefabButton(){
    const [showModal, setShowModal] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [timeValue, setTimeValue] = useState("");
    const [data, setData] = useState<any[]>([]);
    const [dropDownData, setDropDownData] = useState<any[]>([]);
    const [priorityValue, setPriorityValue] = useState("");

    const {databaseUpdate, setDatabaseUpdate} = useContext(DatabaseContext)!;

    useEffect(() => {
        const fetchData = async () => {
            const {data, error} = await supabase
                .from('tasks')
                .select();
            if (!error){
                return setData(data);
            }
        }
        
        fetchData();
        setMounted(true);
    }, []);

    function openModalOnClick(){
        setShowModal(true);
        const fetchData = async () => {
            const {data, error} = await supabase
                .from('priorities')
                .select();
            setDropDownData(data);
        }
        setTaskName("");
        setTimeValue("");
        setPriorityValue("");
        fetchData();
    }

    function submitTaskCreationForm(){
        setShowModal(false);
        const insertData = async () => {
            const {error} = await supabase
                .from('tasks')
                .insert({name: taskName, time: timeValue, priority: priorityValue})
        }
        insertData();
        setDatabaseUpdate(true);
        setTaskName("");
        setTimeValue("");
        setPriorityValue("");
    }

    return (
        <div>
            <button className="bg-white text-red-400 hover:text-white hover:bg-red-400 rounded-xl p-1 border-2 border-solid focus:outline-2 focus:outline-offset-2 active:bg-red-200"
            onClick={openModalOnClick}>Create New Task prefab</button>
            {showModal && mounted && createPortal(
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="w-1/3 h-[65vh] rounded-lg p-6 shadow-lg bg-white flex flex-col">
                    <div className="flex flex-row justify-between items-start">
                        <p className="text-xl font-bold text-red-800">Create new task prefab</p>
                        <button onClick={() => setShowModal(false)}>X</button>
                    </div>
                    <p>Task name</p>
                    <input value={taskName} onChange={(e) => setTaskName(e.target.value)} type="text" placeholder="Task name..." className="border-2 rounded-lg border-red-200"></input>
                    <p>Time</p>
                    <input value={timeValue} onChange={(e) => setTimeValue(e.target.value)} type="text" placeholder="Time..." className="border-2 rounded-lg border-red-200"></input>
                    <p>Priority</p>
                    <select className="border-2 border-red-200 rounded-lg" value={priorityValue} onChange={(e) => setPriorityValue(e.target.value)}>
                        <option value="" disabled>Select a priority...</option>
                        {dropDownData.map((priority) => (
                            <option key={priority.id}>{priority.name}</option>
                        ))}
                    </select>

                    <button className="bg-white text-red-400 hover:text-white hover:bg-red-400 rounded-xl p-1 border-2 border-solid focus:outline-2 focus:outline-offset-2 active:bg-red-200"
            onClick={submitTaskCreationForm}>Submit</button>
                </div>
            </div>, document.body)}
        </div>
    )
}