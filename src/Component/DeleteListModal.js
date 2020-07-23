import React from "react";
import { 
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  AsyncStorage
} from "react-native";
import getStoragedLists from "../utils/getStoragedLists";

export default function DeleteListModal({ currKey, currTitle, setListsMap, setVisible }) {
  return (
    <View style={styles.modalContent}>
      <Text style={styles.textStyle}>Deletar {currTitle}?</Text>
      <View style={styles.footer}>
        <TouchableOpacity
        style={styles.saveButton}
        onPress={() => {
          AsyncStorage.removeItem(currKey)
          .then(() => {
            getStoragedLists()
            .then(storedLists => setListsMap(storedLists));
          })
          .then(() => setVisible(false)); 
        }}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => setVisible(false)}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    width: 340,
    maxHeight: 630,
    backgroundColor: "#fff",
    borderRadius: 5,
    zIndex: 2,
    position: "absolute",
    alignItems: "center"
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: "#fff"
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
  textStyle: { 
    marginTop: 10, 
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10 
  }
});

