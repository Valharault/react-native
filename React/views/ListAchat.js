import {View, FlatList, Switch, Text, Button} from "react-native";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormAchat from "../components/FormAchat";
import {Title} from "react-native-paper";

export default function ListAchat({isVisible, isHide}) {

    const [data, setData] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        getData();
        console.log("achat")
    }, [isVisible])


    function arrayRemove(arr, value) {
        return arr.filter(function(ele){
            return ele != value;
        });
    }

    const deleteAchat = async (achat) => {
        const datas = arrayRemove(data, achat)
        await AsyncStorage.setItem(
            "list-achats",
            JSON.stringify(datas)
        )
        setData(datas);
    }

    const addAchat = async (value) => {
        const items = [...data, value];
        try {
            await AsyncStorage.setItem(
                "list-achats",
                JSON.stringify(items)
            );
            setData(items);
            setShowAddForm(false);
        } catch (error) {
            console.log(error)
        }
    };


    async function getData() {
        const datas = await AsyncStorage.getItem('list-achats');
        console.log("datas: "+datas)
        console.log("data "+data)
        datas === null ? setData([]) : setData(JSON.parse(datas));
    }

    async function toggleSwitch (key) {
        const datas = data.map(achat => {
            if (achat.key === key) {
                achat.isCompleted = !achat.isCompleted;
            }
            return achat;
        });
        try {
            await AsyncStorage.setItem(
                "list-achats",
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
                    <Title>Listes des achats</Title>
                    <FlatList
                        data={data}
                        renderItem={({item}) => (
                            <View>
                                <Text>{item.nom}</Text>
                                <Switch
                                    onValueChange={() => toggleSwitch(item.key)}
                                    value={item.isCompleted}
                                />
                                <Button title={"Supprimer"} onPress={() => deleteAchat(item)}/>
                            </View>
                        )}
                    />
                    <Button title={"Ajouter"} onPress={() => setShowAddForm(true)}/>
                    <FormAchat isVisible={showAddForm} AddAchat={addAchat}/>
                </>
            )}
        </View>
    );
}