import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function TodoList(){
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
        fetchData();
    }, [])

}