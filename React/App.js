import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {Button, SafeAreaView, View, ScrollView} from 'react-native';
import ListAchat from "./views/ListAchat";
import ListTache from "./views/ListTache";

export default function App() {

    const [achatVisible, setAchatVisible] = useState(false);
    const [tacheVisible, setTacheVisible] = useState(false);

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{
                    marginRight: 40,
                    marginLeft: 40,
                    marginTop: 20,
                    paddingTop: 10,
                    paddingBottom: 50,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#fff'
                }
                }>
                    <Button
                        title={'Liste Achats'}
                        onPress={() => {
                            setAchatVisible(!achatVisible)
                            setTacheVisible(false)
                        }}
                    />
                    <Button
                        title={'Liste Tâches'}
                        onPress={() => {
                            setTacheVisible(!tacheVisible)
                            setAchatVisible(false)
                        }}
                    />
                </View>
                <View>
                    <ListAchat isVisible={achatVisible} isHide={setAchatVisible}/>
                    <ListTache isVisible={tacheVisible} isHide={setTacheVisible}/>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
}
