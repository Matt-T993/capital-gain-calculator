import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet, Text,
  TextInput, TouchableOpacity, View
} from "react-native";
import {
  fetchUserData,
  fetchUserTaxCalculation,
  fetchUserTotalAmount,
  updateUserData
} from "../utils/apiService";
import formatNumber from "../utils/formatNumber";
// import { removeTokens } from "../utils/tokenManager";
// import { useNavigate } from "react-router-native";


  

const Settings = () => {
  const [user, setUser] = useState({});
  const [assets, setAssets] = useState({});
  const [taxPayable, setTaxPayable] = useState();
  const [showTax, setShowTax] = useState(true);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newBio, setNewBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  // const navigate = useNavigate(); 

  const getUserData = async () => {
    try {
      const response = await fetchUserData();
      setUser(response);
      setNewUsername(response.username);
      setNewEmail(response.email);
      setNewPassword(response.password);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getUserTotalAmount = async () => {
    try {
      const response = await fetchUserTotalAmount();
      setAssets(response);
    } catch (error) {
      console.error("Error fetching user total amount:", error);
    }
  };

  const getUserTaxCalculation = async () => {
    try {
      const response = await fetchUserTaxCalculation();
      setTaxPayable(response);
      setShowTax(true);
    } catch (error) {
      console.error("Error fetching user tax calculation:", error);
    }
  };

  const handleUpdateUserInfo = async () => {
    try {
      const previousUserData = {
        username: user.username,
        email: user.email,
        password: user.password,
      };
      const updatedUserData = {
        username: newUsername,
        email: newEmail,
        password: newPassword,
      };
      console.log(previousUserData);
      console.log(updatedUserData);

      const success = await updateUserData(previousUserData, updatedUserData);
      if (success) {
        setIsEditing(false);
        // removeTokens();
        // navigate("/");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  useEffect(() => {
    getUserData();
    getUserTotalAmount();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.profileTitle}>Account Settings</Text>
      <View style={styles.gridContainer}>
        <View style={styles.gridItem}>
          {/* <Text style={styles.label}>Profile Photo</Text> */}
          <Image style={styles.photobox}></Image>
          <Text> Click to Upload</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.profileText}>
            Crypto Total: 💵{formatNumber(assets.crytoTotalAmount)}
          </Text>
          <Text style={styles.profileText}>
            Stock Total: 💵{formatNumber(assets.stockTotalAmount)}
          </Text>
          <Text style={styles.profileText}>
            Holds Total: 💵{formatNumber(assets.totalAmount)}
          </Text>
          <View style={styles.profileText}></View>
        </View>
        <View style={styles.gridItem2}>
          <Text style={styles.label}>Username:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              onChangeText={(text) => setNewUsername(text)}
              value={newUsername}
            />
          ) : (
            <Text style={styles.input}>{newUsername}</Text>
          )}
        </View>
        <View style={styles.gridItem2}>
          <Text style={styles.label}>Email:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              onChangeText={(text) => setNewEmail(text)}
              value={newEmail}
            />
          ) : (
            <Text style={styles.input}>{newEmail}</Text>
          )}
        </View>
        {/* <View style={styles.gridItem2}>
          <Text style={styles.label}>New Password:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              onChangeText={(text) => setNewPassword(text)}
              value={newPassword}
              placeholder="new password"
            />
          ) : (
            <Text style={styles.input}>*******</Text>
          )}
        </View> */}
      </View>

      {isEditing ? (
        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdateUserInfo}
        >
          <Text style={styles.updateButtonText}>Confirm</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => setIsEditing(true)}
        >
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%",
    marginBottom: 20,
    marginTop: 20,
  },
  gridItem2: {
    width: "100%",
    marginBottom: 20,
    // marginTop: 20,
  },
  photobox: {
    borderWidth: 1,
    height: 110,
    width: 110,
    borderRadius: "50%",
    textAlign: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 20,
    color: "black",
  },
  input: {
    fontSize: 18,
    color: "black",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
  },
  bio: {
    fontSize: 18,
    color: "black",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    height: 80,
  },
  profileText: {
    fontSize: 18,
    color: "black",
    marginBottom: 20,
    marginTop: 5,
  },
  profileTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  showTaxButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 100,
  },
  updateButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 82,
    textAlign: "center",
    justifyContent: "center",
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  taxPayableContainer: {
    marginTop: 10,
  },
});

export default Settings;
