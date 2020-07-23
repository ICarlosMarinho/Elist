import React, { useState, useEffect } from "react";
import { 
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import Svg, { Line } from 'react-native-svg';
import LoadedItems from "./LoadedItems";
import getCurrentDate from "../utils/getCurrentDate";

export default function ListModal({ 
  setVisible, 
  listsMap, 
  setListsMap, 
  currKey
}) {
  const [disableRemBtn, setDisableRemBtn] = useState(true);
  const [disableSaveBtn, setDisableSaveBtn] = useState(true);
  const [date, setDate] = useState(currKey? listsMap.get(currKey).date : getCurrentDate());
  const [title, setTitle] = useState(currKey? listsMap.get(currKey).title : "");
  const [items, setItems] = useState(currKey? listsMap.get(currKey).items : [{
    name: "",
    priority: 1,
    check: false
  }]);
  
  useEffect(() => {
    !title.length || items.filter(({ name }) => !name.length).length
    ? setDisableSaveBtn(true)
    : setDisableSaveBtn(false);

    items.length < 2
    ? setDisableRemBtn(true)
    : setDisableRemBtn(false); 
  }, [title, items]);

  return (
  <View style={styles.modalContent}>
    <TouchableOpacity
    style={styles.addItemButton}
    onPress={() => {

      setItems(items.concat([{
        name: "",
        priority: 1
      }]));
    }}
    >
      <Svg 
      width="25" 
      height="25" 
      viewBox="0 0 25 25" 
      strokeLinecap="round"
      fill="none">
        <Line x1="12" x2="12" y1="2" y2="23" stroke="#5F81D8" strokeWidth="4" />
        <Line x1="2" x2="23" y1="12" y2="12" stroke="#5F81D8" strokeWidth="4" />
      </Svg>
    </TouchableOpacity>
    <TouchableOpacity
    style={styles.RemoveItemButton}
    disabled={disableRemBtn}
    onPress={() => {
      const itemsAux = Array.from(items);

      itemsAux.pop();
      setItems(itemsAux);
    }}
    >
      <Svg 
      width="25" 
      height="25" 
      viewBox="0 0 25 25"
      strokeLinecap="round" 
      fill="none">
        <Line x1="2" x2="23" y1="12" y2="12" stroke="#5F81D8" strokeWidth="4" />
      </Svg>
    </TouchableOpacity>
      <View 
      style={styles.form}>
        <View style={styles.titleContainer}>
          <TextInput 
          placeholder="Nome da lista"
          value={title}
          style={styles.textInput}
          onChangeText={text => setTitle(text)
        }/>
        </View>
        <LoadedItems 
        items={items} 
        setItems={setItems}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
        style={styles.saveButton}
        disabled={disableSaveBtn}
        onPress={async () => {
          const mapAux = new Map(listsMap);
          const key = currKey || Date.now().toString();

          await AsyncStorage.setItem(key , JSON.stringify({
            title,
            date,
            items
          }));

          mapAux.set(key, { title, date, items });
          setListsMap(mapAux);
          setVisible(false);
        }}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => setVisible(false)}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    width: 340,
    maxHeight: 630,
    backgroundColor: "#fff",
    borderRadius: 5,
    zIndex: 2,
  },
  addItemButton: {
    width: 30,
    height: 30,
    position: "absolute",
    top: 10,
    left: 10,
  },
  RemoveItemButton: {
    width: 25,
    height: 25,
    position: "absolute",
    top: 10,
    right: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: "#fff"
  },
  form: {
    marginTop: 60,
    maxHeight: 500,
    marginLeft: 10,
    marginRight: 10,
  },
  textInput: {
    borderBottomColor: "#97aade",
    borderBottomWidth: 2,
    fontSize: 16,
    width: 320,
    alignSelf: "center"
  },
  footer: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: "center",
  },
  saveButton: {
    width: 160,
    height: 40,
    backgroundColor: "#5f81d8",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius:5,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    width: 160,
    height: 40,
    backgroundColor: "#506cb2",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    paddingBottom: 35,
  }
});
