import { supabase } from "../lib/supabase/client"
import { useEffect, useContext, useState } from "react"
import { DatabaseContext } from "../app/page"
import PriorityObject from "@/components/priority-object"

export default function PriorityInitializer(){
    const [data, setData] = useState<any[]>([]);
    const {databaseUpdate, setDatabaseUpdate} = useContext(DatabaseContext)!;

    useEffect(() => {
        const fetchData = async () => {
            const {data, error} = await supabase
                .from('priorities')
                .select()
                .order("rank", { ascending: true});
            setData(data);
        }
        fetchData();
        if (databaseUpdate) {
            setDatabaseUpdate(false);
        }
    }, [databaseUpdate, setDatabaseUpdate]);


    return (
        <>
            {
                data.map((task) => (
                    <PriorityObject key={task.id} props={{name: task.name, id:task.id, rank:task.rank}}></PriorityObject>
                ))
            }
        </>
    )
}