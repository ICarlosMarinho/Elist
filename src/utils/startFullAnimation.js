import { Animated } from "react-native";

export default function startFullAnimation() {
  Animated.stagger(
    500,
    transformArr.reduce((acc, curr) => {
      return acc.concat(getFullAnimation(curr));
    }, [])
  )
  .start(event => {
    if (event.finished) {
      setTimeout(() => {
        startFullAnimation();
      }, 500);
    }
  });
}