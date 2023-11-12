import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link, useNavigate, useLocation  } from "react-router-native"; // Import Link and useNavigate

import { removeTokens } from "../utils/tokenManager";

const Sidebar = ({ translateX, toggleSidebar }) => {
  const navigate = useNavigate(); // Use useNavigate hook for navigation
  const location = useLocation();

  const isLoginPage = location.pathname === '/';

  const handleLogout = async () => {
    try {
      removeTokens();
      toggleSidebar(false);
      navigate("/"); // Use navigate to go to the "Login" route
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoginPage) {
    return null;
  }

  return (
    <Animated.View style={[styles.sidebar, { transform: [{ translateX }] }]}>
      <View style={styles.sidebarContent}>
        <Link
          to="/dashboard"
          onPress={toggleSidebar}
          style={styles.sidebarLink}
        >
          <View style={styles.linkContainer}>
            <Ionicons name="ios-home" size={30} color="black" />
            <Text style={styles.linkText}>Home</Text>
          </View>
        </Link>
        <Link to="/settings" onPress={toggleSidebar} style={styles.sidebarLink}>
          <View style={styles.linkContainer}>
            <Ionicons name="ios-settings" size={30} color="black" />
            <Text style={styles.linkText}>Settings</Text>
          </View>
        </Link>
        <Link to="/event" onPress={toggleSidebar} style={styles.sidebarLink}>
          <View style={styles.linkContainer}>
            <Ionicons name="ios-analytics" size={30} color="black" />
            <Text style={styles.linkText}>Events</Text>
          </View>
        </Link>
        <Link to="/faq" onPress={toggleSidebar} style={styles.sidebarLink}>
          <View style={styles.linkContainer}>
            <Ionicons name="ios-document" size={30} color="black" />
            <Text style={styles.linkText}>FAQ</Text>
          </View>
        </Link>
        {/* <Link to="/functionality" style={styles.sidebarLink}>
          <View style={styles.linkContainer}>
            <Ionicons name="ios-document" size={30} color="black" />
            <Text style={styles.linkText}>Functionality</Text>
          </View>
        </Link> */}
        <TouchableOpacity onPress={handleLogout} style={styles.sidebarLink}>
          <View style={styles.linkContainer}>
            <Ionicons name="ios-log-out" size={30} color="black" />
            <Text style={styles.linkText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    marginTop: 20,
    position: "absolute",
    top: 35,
    left: -200,
    width: 250,
    height: "100%",
    backgroundColor: "#f2f2f2",
    zIndex: 1,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 30,
  },

  linkText: {
    fontSize: 20,
  },

  mainContent: {
    marginLeft: 0,
    flex: 1,
  },
});

export default Sidebar;
