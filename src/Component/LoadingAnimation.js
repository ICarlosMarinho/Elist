import React, { useRef, useEffect } from "react";
import { Svg, Circle } from "react-native-svg";
import { Animated, Easing } from "react-native";
import startFullAnimation from "../utils/startFullAnimation";

export default function LoadingAnimation() {
  const AnimatedCircle = useRef(Animated.createAnimatedComponent(Circle)).current;
  const transformArr = useRef(new Array(4).fill(null).map(() => new Animated.Value(0))).current;

  useEffect(() => {
    startFullAnimation();
  });

  return ( 
    <Svg width="70" height="30" viewBox="0 0 70 30">
      <AnimatedCircle 
      fill="#476f9c" 
      style={{ transform: [{ translateY: transformArr[0] }] }} 
      r="5" cx="5" cy="25" />
      <AnimatedCircle 
      fill="#f57b70" 
      style={{ transform: [{ translateY: transformArr[1] }] }} 
      r="5" cx="25" cy="25" />
      <AnimatedCircle 
      fill="#77a7de" 
      style={{ transform: [{ translateY: transformArr[2] }] }} 
      r="5" cx="45" cy="25" />
      <AnimatedCircle 
      fill="#ffd551" 
      style={{ transform: [{ translateY: transformArr[3] }] }} 
      r="5" cx="65" cy="25" />
  </Svg>
  );
}

function getFullAnimation(transformItem) {
  
  return [
    Animated.sequence([
      Animated.timing(
        transformItem, 
        {
          toValue: -20,
          duration: 400,
          useNativeDriver: true
        }
      ),
      Animated.timing(
        transformItem, 
        {
          toValue: 0,
          duration: 400,
          easing: Easing.bounce,
          useNativeDriver: true
        }
      )
      ])
  ];
}