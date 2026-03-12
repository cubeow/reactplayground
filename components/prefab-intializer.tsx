import { DatabaseContext } from '../app/page'
import { useContext, useEffect, useState } from 'react' 
import { supabase } from '../lib/supabase/client'
import TaskObject from "./prefab-object"

export default function PrefabInitializer(){
    const [data, setData] = useState<any[]>([]);
    const {databaseUpdate, setDatabaseUpdate} = useContext(DatabaseContext)!;

    useEffect(() => {
        const fetchData = async () => {
            const {data, error} = await supabase
                .from('tasks')
                .select();
            if (!error){
                setData(data);
            }
        }
        fetchData();
        if (databaseUpdate) {
            setDatabaseUpdate(false);
        }
    }, [databaseUpdate]);

    return (<div className="flex flex-row">
        <p className="text-xl content-center pr-5 pl-2">Task Prefabs:</p>
        {data.map((task) => (
            <TaskObject key={task.id} props={{name: task.name, time: task.time, priority: task.priority, id: task.id}} ></TaskObject>
        ))
        }
    </div>)
}