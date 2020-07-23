import { AsyncStorage } from "react-native";

export default async function getStoragedLists() {
  const Lists = new Map();
  const keys = await AsyncStorage.getAllKeys();
  const pairsArr = await AsyncStorage.multiGet(keys);

  for (const [key, value] of pairsArr) {
    Lists.set(key, JSON.parse(value));
  }
  
  return Lists;
}