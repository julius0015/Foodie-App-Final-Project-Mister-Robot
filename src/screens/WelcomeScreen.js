// React and React Native components
import { View, Text, Image, StyleSheet } from "react-native"; 
import React, { useEffect } from "react"; 
// Expo StatusBar: For styling the status bar (StatusBar).
import { StatusBar } from "expo-status-bar";
// Responsive Screen Library: widthPercentageToDP and heightPercentageToDP 
// help make the app responsive across different screen sizes.
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// Shared Values for Animation:
//   - ring1padding and ring2padding: These values store the padding for the two 
//     expanding rings (background circles) around the logo image.
//   - These are initialized using useSharedValue(0) from Reanimated, meaning the 
//     initial padding is set to 0.
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
// Navigation:
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  // useSharedValue is the Key: ring1padding and ring2padding are created using useSharedValue(0). 
  // These are special reactive values provided by Reanimated. When you modify the .value property 
  // of a useSharedValue, Reanimated is notified of this change.
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  const navigation = useNavigation();

  // useEffect Hook:
  //   Sets up three one-time timers when the component initially mounts.
  //   Purpose: Runs animations when the component is mounted (i.e., when the user first 
  //     lands on this screen).
  //    Navigation: After 2500ms (2.5 seconds), the user is automatically navigated to the Home screen.
  useEffect(() => {
    // This function contains the code for the side effect. It will be executed after 
    // React Native has performed the render and updated the virtual DOM

    // Ring Animation:
    // Initially, the padding for both rings is set to 0.
    ring1padding.value = 0;
    ring2padding.value = 0;
    // After 100ms, the padding for ring1padding is animated using withSpring, which 
    // applies a spring effect as it grows in size.
    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + hp(5))),
      100
    );
    // After 300ms, ring2padding starts its own spring animation.
    setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + hp(5.5))),
      300
    );
    // After 2500ms (2.5 seconds), the user is automatically navigated to the 
    // Home screen using navigation.navigate("Home").
    setTimeout(() => navigation.navigate("Home"), 2500);
  }, []); // Empty dependency array means this effect runs only once, after the initial render.


  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Animated logo image with rings */}
      <Animated.View
        style={[styles.ring, { padding: ring2padding }]}
      >
        <Animated.View
          style={[styles.ring, { padding: ring1padding }]}
        >
          <Image
            source={{ uri: 'https://cdn.pixabay.com/photo/2024/08/29/02/47/italian-9005494_1280.png' }}
            style={styles.logo}
          />
        </Animated.View>
      </Animated.View>

      {/* title and punchline */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Foodie</Text>
        <Text style={styles.subtitle}>your food recipe app</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FBBF24", // amber-500
  },
  ring: {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // white/20
    borderRadius: 9999, // full rounded
  },
  logo: {
    width: hp(20),
    height: hp(20),
  },
  textContainer: {
    alignItems: "center",
    marginTop: hp(2),
  },
  title: {
    fontSize: hp(7),
    fontWeight: "bold",
    color: "#FFFFFF", // white
    letterSpacing: 3, // tracking-widest
  },
  subtitle: {
    fontSize: hp(2),
    fontWeight: "500",
    color: "#FFFFFF", // white
    letterSpacing: 3, // tracking-widest
  },
});
