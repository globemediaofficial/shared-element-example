import {
  Dimensions,
  Image,
  StyleSheet,
  Pressable,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { useEffect } from "react";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const TARGET_WIDTH = SCREEN_WIDTH * 0.85;
const TARGET_HEIGHT = TARGET_WIDTH * (4 / 3);

export default function LargeImage() {
  const { uri, x, y, width, height } = useLocalSearchParams();
  const router = useRouter();
  const anim = useSharedValue(0);

  const initialX = Number(x);
  const initialY = Number(y);
  const initialW = Number(width);
  const initialH = Number(height);

  const targetX = (SCREEN_WIDTH - TARGET_WIDTH) / 2;
  const targetY = (SCREEN_HEIGHT - TARGET_HEIGHT) / 2;

  const style = useAnimatedStyle(() => ({
    position: "absolute",
    top: interpolate(anim.value, [0, 1], [initialY, targetY]),
    left: interpolate(anim.value, [0, 1], [initialX, targetX]),
    width: interpolate(anim.value, [0, 1], [initialW, TARGET_WIDTH]),
    height: interpolate(anim.value, [0, 1], [initialH, TARGET_HEIGHT]),
    borderRadius: interpolate(anim.value, [0, 1], [12, 16]),
    overflow: "hidden",
  }));

  const goBack = () => {
    anim.value = withSpring(0, {}, () => runOnJS(router.back)());
  };

  useEffect(() => {
    anim.value = withSpring(1);
    return () => {
      anim.value = 0;
    };
  }, []);

  return (
    <Pressable style={StyleSheet.absoluteFill} onPress={goBack}>
      <AnimatedBlurView animated={animated} />
      <Animated.View style={style}>
        <Image
          source={{ uri: uri as string }}
          style={{ width: "100%", height: "100%" }}
        />
      </Animated.View>
    </Pressable>
  );
}
