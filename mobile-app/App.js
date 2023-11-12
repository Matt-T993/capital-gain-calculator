import React, { useState } from "react";
import { NativeRouter, Routes, Route, Link } from "react-router-native";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import Dashboard from "./screens/DashBoard";
import FAQ from "./screens/FAQ";
import Event from "./screens/Event";
import Settings from "./screens/Settings2";
import Sidebar from "./components/Sidebar";
import { Ionicons } from "@expo/vector-icons";
import Functionaility from "./screens/Functionaility";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <NativeRouter>
      <View style={styles.container}>
        {sidebarOpen && (
          <Sidebar toggleSidebar={toggleSidebar} translateX={200} />
        )}
        <View style={styles.hamburgerIconContainer}>
          <TouchableOpacity
            onPress={toggleSidebar}
            style={styles.hamburgerIcon}
          >
            <Ionicons
              name={sidebarOpen ? "ios-close" : "ios-menu"}
              size={32}
              color="black"
            />
          </TouchableOpacity>

          <Link to="/dashboard">
          <Image
            style={styles.image}
            source={require("./assets/CGCLogo.png")}
          />
          </Link>
        </View>
        <Routes>
          <Route exact path="/" element={<LoginScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/event" element={<Event />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/functionality" element={<Functionaility />} />

        </Routes>
      </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",

  },
  hamburgerIconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hamburgerIcon: {
    paddingHorizontal: 10,
  },
  image: {
    marginRight: 10,
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});
