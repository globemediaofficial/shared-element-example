import { View, Image, Pressable, useWindowDimensions } from "react-native";
import { useRef } from "react";
import { useFocusEffect, router } from "expo-router";

export default function Card({ imageUrl }: { imageUrl: string }) {
  const { width } = useWindowDimensions();
  const ref = useRef<Image>(null);

  const cardWidth = (width - 32 - 12) / 2;

  useFocusEffect(() => {
    ref.current?.setNativeProps({ opacity: 1 });
  });

  const handleLongPress = () => {
    if (!ref.current) return;
    ref.current.measureInWindow((x, y, w, h) => {
      router.push({
        pathname: "/large",
        params: {
          x: x.toString(),
          y: y.toString(),
          width: w.toString(),
          height: h.toString(),
          uri: imageUrl,
        },
      });
    });
  };

  return (
    <Pressable
      onLongPress={handleLongPress}
      style={{
        width: cardWidth,
        aspectRatio: 1,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#ddd",
      }}
    >
      <Image
        ref={ref}
        source={{ uri: imageUrl }}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
    </Pressable>
  );
}
