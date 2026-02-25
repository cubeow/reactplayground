import { useContext } from "react";
import { Button, Text, View } from "react-native";
import { countContext } from "../app/index";

function ButtonFunction(){
    const {setCount, count} = useContext(countContext);
    return (
        <View>
        <Text>{count}</Text>
        <Button title="Increase Count" onPress={() => setCount(prevCount => prevCount + 1)}>
            Increase Count
        </Button>
        </View>
    )
}

export default ButtonFunction