# DIY Shared Element Transition (React Native + Expo Router)

This is a minimal, non-native shared element transition using:

- `react-native-reanimated`
- `expo-router`
   - NOTE: The destination screen must have `presentation: "transparentModal"` in `_layout.tsx` for this example
- Pure JS `measureInWindow` for initial coordinates

### Demo

Long-press the image card to transition into a full-screen view with animation.

<img src="./ScreenRecording_06-11-2025%2015-39-08_1.gif" width="250"/>

### How It Works

1. In `Card`, use `ref.measureInWindow()` to capture the image's position/size.
2. Pass those values to `large_card_screen` via `router.push`.
3. Use `react-native-reanimated` to animate the image from its original position to full screen.
4. Animate back on tap.

### Why This?

- No native shared transition dependency.
- Works with Expo Go.
- Easy to extend with headers, blur, etc.
