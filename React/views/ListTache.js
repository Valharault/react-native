import {View, FlatList, Switch, Text, Button} from "react-native";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormTache from "../components/FormTache";
import {Title} from "react-native-paper";

export default function ListTache({isVisible, isHide}) {

    const [data, setData] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        getData();
    }, [isVisible])


    function arrayRemove(arr, value) {
        return arr.filter(function (ele) {
            return ele != value;
        });
    }

    const deleteTache = async (achat) => {
        const datas = arrayRemove(data, achat)
        await AsyncStorage.setItem(
            "list-taches",
            JSON.stringify(datas)
        )
        setData(datas);
    }

    const addTache = async (value) => {
        const items = [...data, value];
        try {

            console.log(items)
            console.log(data)
            console.log(value)
            await AsyncStorage.setItem(
                "list-taches",
                JSON.stringify(items)
            );
            setData(items);
            setShowAddForm(false);
        } catch (error) {
            console.log(error)
        }
    };


    async function getData() {
        const datas = await AsyncStorage.getItem('list-taches');
        datas === null ? setData([]) : setData(JSON.parse(datas));
    }

    async function toggleSwitch(key) {
        const datas = data.map(achat => {
            if (achat.key === key) {
                achat.isCompleted = !achat.isCompleted;
            }
            return achat;
        });
        try {
            await AsyncStorage.setItem(
                "list-taches",
                JSON.stringify(datas)
            );
            setData(datas);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View>
            {isVisible && (
                <>
                    <Title>Listes des tâches</Title>
                    <FlatList
                        data={data}
                        renderItem={({item}) => (
                            <View>
                                <Text>Nom: {item.nom}</Text>
                                <Text>Localisation: {item.geoloc}</Text>
                                <Text>Date de la tache: {item.date}</Text>
                                <Text>Terminés: </Text>
                                <Switch
                                    onValueChange={() => toggleSwitch(item.key)}
                                    value={item.isCompleted}
                                />
                                <Button title={"Supprimer"} onPress={() => deleteTache(item)}/>
                            </View>
                        )}
                    />
                    <Button title={"Ajouter"} onPress={() => setShowAddForm(true)}/>
                    <FormTache isVisible={showAddForm} AddTache={addTache}/>
                </>
            )}
        </View>
    );
}