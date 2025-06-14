import Reanimated from "react-native-reanimated";
import { BlurView } from "expo-blur";

const AnimatedBlurView = ({
    animated,
  }: {
    animated: Reanimated.SharedValue<number>;
  }) => {
    const animatedStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(animated.value, [0, 1], [0, 1]),
      };
    });

    return (
      <Reanimated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <BlurView
          key={mediaUrl}
          intensity={Platform.OS === "android" ? 90 : 50}
          tint="dark"
          style={StyleSheet.absoluteFill}
          // Enabling experimental blur breaks animation for android
          // experimentalBlurMethod="dimezisBlurView"
        />
      </Reanimated.View>
    );
  };
