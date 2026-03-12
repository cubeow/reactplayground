"use client";

import CreateTaskPrefabButton from "../components/create-task-prefab-button"
import PrefabInitializer from "@/components/prefab-intializer"
import PriorityInitializer from "@/components/priority-initializer"
import CreatePriorityButton from "../components/create-priority-button"
import OrderPriorityButton from "@/components/order-priority-button"
import OrderPrefabButton from "@/components/order-prefab-button"
import TodoList from "@/components/todo-list"
import { useState, createContext } from "react"

export const DatabaseContext = createContext(null);

export default function Home() {
  const [databaseUpdate, setDatabaseUpdate] = useState(false);
  return (
    <>
      <DatabaseContext.Provider value={{databaseUpdate, setDatabaseUpdate}}>
        <div className="flex flex-row top-2 pt-3 pb-3 shadow lg rounded-xl text-black">
          <p className="mx-auto font text-xl">Productivity App</p>
          <OrderPriorityButton></OrderPriorityButton>
          <CreatePriorityButton></CreatePriorityButton>
          <OrderPrefabButton></OrderPrefabButton>
          <CreateTaskPrefabButton></CreateTaskPrefabButton>
        </div>
        <div className="flex flex-row">
          <PriorityInitializer></PriorityInitializer>
        </div>
        <div className="flex flex-row">
          <PrefabInitializer></PrefabInitializer>
        </div>
        <div className="flex justify-center">
          <TodoList></TodoList>
        </div>
      </DatabaseContext.Provider>
    </>
  );
}

