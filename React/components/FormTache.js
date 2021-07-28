import React, {useEffect, useState} from "react";
import {Button, SafeAreaView, PermissionsAndroid, Switch, Text, TextInput, View, Platform} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import Geolocation from 'react-native-geolocation-service';

export default function FormTache({isVisible, AddTache}) {

    const [nom, setNom] = React.useState("");
    const [date, setDate] = React.useState("");
    const [geoloc, setGeoloc] = React.useState();
    const [completed, setCompleted] = useState(false);
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate("'" + currentDate + "'");
    };

    const toggleSwitch = () => {
        setCompleted(!completed);
    };

    const showMode = () => {
        setShow(true);
    };

    const add = async () => {
        Geolocation.getCurrentPosition(
            geoloc => {
                if (nom !== "") {
                    AddTache({key: Date.now(), nom: nom, isCompleted: completed, geoloc: "Latitude: " + geoloc.coords.latitude + " - Longitude: " + geoloc.coords.longitude, date: date});
                }
                console.log("Latitude: " + geoloc.coords.latitude + " - Longitude: " + geoloc.coords.longitude)
            },
            error => {
                console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 20000},
        );

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
                <View>
                    <Button title={date.toString()} onPress={showMode}/>
                    {show && (
                        <DateTimePicker
                            value={new Date()}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}
                </View>
                <Button title={"Inserer"} onPress={add}/>
            </SafeAreaView>
        )}</View>);
};
