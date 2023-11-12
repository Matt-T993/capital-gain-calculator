import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import {
  fetchUserData,
  fetchUserTaxCalculation,
  fetchUserTotalAmount,
} from "../utils/apiService";

const Settings = () => {
  const [user, setUser] = useState([]);
  const [assets, setAssets] = useState([]);
  const [taxPayable, setTaxPayable] = useState();
  const [showTax, setShowTax] = useState(false);

  // Fetch user data
  const getUserData = async () => {
    try {
      const response = await fetchUserData();
      setUser(response);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch user total amount
  const getUserTotalAmount = async () => {
    try {
      const response = await fetchUserTotalAmount();
      setAssets(response);
    } catch (error) {
      console.error("Error fetching user total amount:", error);
    }
  };

  // Fetch user tax to pay
  const getUserTaxCalculation = async () => {
    try {
      const response = await fetchUserTaxCalculation();
      setTaxPayable(response);
      setShowTax(true);
    } catch (error) {
      console.error("Error fetching user tax calculation:", error);
    }
  };

  useEffect(() => {
    getUserData();
    getUserTotalAmount();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.profileTitle}>Profile</Text>
      <View style={styles.profileInfo}>
        <Text style={styles.profileText}>Username: {user.username}</Text>
        <Text style={styles.profileText}>Email: {user.email}</Text>
      </View>
      <Text style={styles.profileHolding}>User's Holding</Text>
      <Text style={styles.profileText}>
        Total Amount: 💵{assets.totalAmount}
      </Text>
      <View style={styles.taxPayableContainer}>
        {showTax ? (
          <Text style={styles.profileText}>Tax Payable: 💲{taxPayable}</Text>
        ) : (
          <TouchableOpacity
            style={styles.showTaxButton}
            onPress={getUserTaxCalculation}
          >
            <Text style={styles.showTaxButtonText}>Show Tax Payable</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 20,
    alignItems: "center",
  },
  profileInfo: {
    textAlign: "left",
  },
  profileText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  profileTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  profileHolding: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
  },
  showTaxButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  showTaxButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  taxPayableContainer: {
    marginTop: 10,
  },
});

export default Settings;
