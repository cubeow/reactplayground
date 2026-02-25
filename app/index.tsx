import { createContext, useState } from "react";
import { Text, View } from "react-native";
import ButtonFunction from "../components/button";

export const countContext = createContext(null);

export default function Index() {
  const [count, setCount] = useState(0);
  return (
    <View >
      <countContext.Provider value={{count, setCount}}>
        <Text>Hi</Text>
        <ButtonFunction></ButtonFunction>
      </countContext.Provider>
    </View>
  );
}