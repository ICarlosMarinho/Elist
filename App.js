import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import Modal from './src/Component/Modal';
import ListModal from "./src/Component/ListModal";
import Svg, { Line } from "react-native-svg";
import * as SplashScreen from "expo-splash-screen";
import DeleteListModal from './src/Component/DeleteListModal';
import getStoragedLists from "./src/utils/getStoragedLists";

export default function App() {
  const [visible, setVisible] = useState(false);
  const [listsMap, setListsMap] = useState(new Map());
  const keyRef = useRef(null);
  const titleRef = useRef(null);
  const modalContentRef = useRef(null);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync()
    .then(() => {
      getStoragedLists()
      .then(storedLists => {
        setListsMap(storedLists);
        SplashScreen.hideAsync();
      });
    });
  }, []);

  useEffect(() => {
    if (!visible) {
      keyRef.current = null;
      modalContentRef.current = null;
      titleRef.current = null;
    }
  }, [visible]);

  return (
    <View style={styles.app}>
      <Modal visible={visible}>
        {modalContentRef.current}
      </Modal>
      <View style={styles.header}>
        <Text style={styles.title}>Listas</Text>
      </View>
      <ScrollView style={styles.main}>{
        listsMap.size
        ? Array.from(listsMap.entries()).map(([ uuid, list ]) => {
            const { title, date, items } = list;
            const checkCount = items.filter(({ check }) => check).length;
            const lineWidth = (322 * checkCount)/items.length;         
          
          return (
            <TouchableOpacity
            key={uuid}
            onPress={() => {
              keyRef.current = uuid;
              modalContentRef.current = (
                <ListModal
                setVisible={setVisible}
                listsMap={listsMap}
                setListsMap={setListsMap}
                currKey={keyRef.current}
                />
              ); 

              setVisible(true);
            }}
            >
              <View style={styles.list}>
                <Text style={styles.text}>{title}</Text>
                <Text style={styles.date}>{date}</Text>

                <TouchableOpacity
                style={styles.RemoveItemButton}
                onPress={() => {
                  keyRef.current = uuid;
                  titleRef.current = title;
                  
                  modalContentRef.current = (
                    <DeleteListModal 
                    currKey={keyRef.current}
                    currTitle={titleRef.current}
                    setListsMap={setListsMap}
                    setVisible={setVisible} 
                    />
                  );

                  setVisible(true);
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

                <Svg
                style={{ marginTop: 10 }}
                width="327" 
                height="4" 
                viewBox="-2 0 326 4"
                strokeLinecap="round"
                >
                  <Line x1="0" x2={lineWidth} y1="2" y2="2" stroke="#f57b70" strokeWidth="4" />
                </Svg>
              </View>
            </TouchableOpacity>
          );
        })
        : (
          <View style={styles.noListContainer}>
            <Text style={styles.text}>Você não possui listas!</Text>
          </View>
        )
      }
      </ScrollView>
      <View style={styles.bottom}>
        <TouchableOpacity
        style={styles.button}
        onPress={() => {
          modalContentRef.current = (
            <ListModal
            setVisible={setVisible}
            listsMap={listsMap}
            setListsMap={setListsMap}
            currKey={null}
            />
          ); 
          
          setVisible(true)
        }}>
          <Text style={styles.buttonText}>Nova lista</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    backgroundColor: "#F0E7DB",
    flex: 1,
    zIndex: 0
  },
  RemoveItemButton: {
    width: 25,
    height: 25,
    position: "absolute",
    right: 9,
    top: 15
  },
  list: {
    width: 340,
    height: 70,
    padding: 5, 
    flex: 1,
    borderRadius: 5,
    flexDirection: "column"
    },
  header: {
    backgroundColor: '#5f81d8',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: "#fff",
    position: 'absolute',
    top: 30
  },
  main: {
    borderRadius: 5,
    backgroundColor: '#fff',
    marginTop: 10,
    marginLeft: 10, 
    marginRight: 10
  },
  button: {
    backgroundColor: "#5f81d8",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    height: 45
  },
  bottom: {
    height: 65
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: "#fff"
  },  
  text: {
    fontSize: 16,
    color: "#5b5b5b",
    fontWeight: "bold"
  },
  date: {
    fontSize: 16,
    color: "#a0a0a0",
    fontWeight: "bold"
  },
  noListContainer: {
    alignSelf: "center",
    marginTop: 20
  }
});
