import React, { useRef, useEffect } from "react";
import { View, TextInput, Text, StyleSheet, FlatList } from "react-native";
import { Picker } from "@react-native-community/picker";
import CheckBox from '@react-native-community/checkbox';

export default function LoadedItems({ items, setItems }) {
  const scrollRef = useRef();

  return (
    <FlatList   
    ref={scrollRef}
    data={items}
    getItemLayout={(data, index) => (
      { length: 80, offset: 80 * index, index }
    )}
    onContentSizeChange={() => {
      scrollRef.current.scrollToEnd();
    }}
    initialNumToRender={6}
    keyExtractor={(_, index) => index.toString()}
    renderItem={({ item, index }) => {
      const placeholderText = `Item ${index + 1}`;
      
      return (
        <View>            
          <TextInput
          style={styles.textInput}
          placeholder={placeholderText}
          defaultValue={item.name}
          onChangeText={text => {
            const itemsAux = Array.from(items);

            itemsAux[index].name = text;
            setItems(itemsAux);
          }} />
          <View style={styles.optionsContainer}>
            <Text style={{ fontSize: 16 }}>Prioridade:</Text>
            <Picker
            mode="dropdown"
            style={styles.selectInput}
            selectedValue={item.priority}
            onValueChange={(itemValue) => {
              const itemsAux = Array.from(items);

              itemsAux[index].priority = itemValue;
              setItems(itemsAux);
            }}>
              <Picker.Item label="Baixa" value={1} />
              <Picker.Item label="Média" value={2} />
              <Picker.Item label="Alta" value={3} />
            </Picker>
            <Text style={{ fontSize: 16 }}>Concluído:</Text>
            <CheckBox
            value={item.check}
            onValueChange={() => {
              const itemsAux = Array.from(items);

              itemsAux[index].check = !itemsAux[index].check;
              setItems(itemsAux);
            }}/>
          </View>
        </View>
      )
    }}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderBottomColor: "#97aade",
    borderBottomWidth: 2,
    fontSize: 16,
    width: 320,
    alignSelf: "center"
  },
  selectInput: {
    width: 110,
    marginRight: 32
  },
  optionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  }
});