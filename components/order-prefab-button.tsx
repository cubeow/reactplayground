"use client";

import { useState, useEffect, useContext } from "react";
import { createPortal } from "react-dom";
import { supabase } from "@/lib/supabase/client";
import { DatabaseContext } from "@/app/page";
import SortPrefabObject from "./sort-prefab-object";

export default function OrderPrefabButton(){
    const [showModal, setShowModal] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [data, setData] = useState<any[]>([]);

    const {databaseUpdate, setDatabaseUpdate} = useContext(DatabaseContext)!;

    useEffect(() => {
        const fetchData = async () => {
            const {data, error} = await supabase
                .from("tasks")
                .select()
                .order("rank", { ascending: true});
            if (!error){
                setData(data);
            }
        }
        fetchData();
        setMounted(true);
    }, [databaseUpdate])

    function closeModal(){
        setShowModal(false);
    }

    return (
        <>
            <button className="rounded-xl border-2 border-red-400 text-red-400 hover:text-white hover:bg-red-400" onClick={() => setShowModal(true)}>Set Task Prefabs</button>
            {mounted && showModal && createPortal(
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                    <div className="w-1/3 h-[65vh] bg-white rounded-lg shadow-lg p-6 flex flex-col">
                        <div className="flex justify-between items-start">
                            <p className="text-xl">Reorder Task Prefabs</p>
                            <button onClick={closeModal}>X</button>
                        </div>
                        {data.map((item) => (
                            <SortPrefabObject key={item.id} props={{id: item.id, name: item.name, rank: item.rank}}></SortPrefabObject>
                        ))}
                    </div>
                </div>
            , document.body)}
        </>
    )
}
