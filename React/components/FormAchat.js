import React, {useState} from "react";
import {Button, SafeAreaView, Switch, Text, TextInput, View} from "react-native";

export default function FormAchat({isVisible, AddAchat}) {

    const [nom, setNom] = React.useState("");
    const [completed, setCompleted] = useState(false);

    const toggleSwitch = () => {
        setCompleted(!completed);
    };

    const add = () => {
        if (nom !== "") {
            AddAchat({key: Date.now(), nom: nom, isCompleted: completed});
        }
    };

    return (<View>
        {isVisible && (
            <SafeAreaView>
                <View>
                    <Text>Nom</Text>
                    <TextInput
                        onChangeText={setNom}
                        value={nom}
                    /></View>
                <View>
                    <Text>Terminé ?</Text>
                    <Switch
                        onValueChange={toggleSwitch}
                        value={completed}
                    />
                </View>
                <Button title={"Inserer"} onPress={add}/>
            </SafeAreaView>
        )}</View>);
};
