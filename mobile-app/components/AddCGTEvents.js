import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { createEvent, fetchAsset } from "../utils/apiService";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

const AddCGTButton = ({ assets, setAssets, getAssets }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [event, setEvent] = useState({
    assetId: 0,
    eventType: "",
    quantity: 0,
    pricePerUnit: 0,
    eventDate: new Date(), // Initialize eventDate to the current date
  });
  const [selectedEventType, setSelectedEventType] = useState("");
  const [filteredAssetNames, setFilteredAssetNames] = useState([]);
  const [selectedAssetName, setSelectedAssetName] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleCreateEvent = async () => {
    try {
      await createEvent(event);
      setModalVisible(false);
      getAssets();
    } catch (error) {
      console.error("Error posting events", error);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const updateAssetId = (assetName) => {
    const selectedAsset = assets.find((asset) => asset.assetName === assetName);
    if (selectedAsset) {
      setEvent({ ...event, assetId: selectedAsset.assetId });
    }
  };
  const handleDateChange = (selectedDate) => {
    if (selectedDate) {
      setSelectedDate(selectedDate);
      const formattedDate = selectedDate.toISOString();

      setEvent({ ...event, eventDate: formattedDate });
    }
  };

  console.log(event);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.addButton}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={styles.buttonText}>+ Add CGTEvent</Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView style={styles.scroll}>
              <Picker
                style={styles.picker}
                selectedValue={selectedEventType}
                onValueChange={(itemValue) => {
                  setSelectedEventType(itemValue);
                  const filteredAssets = assets.filter(
                    (asset) => asset.assetType === itemValue
                  );
                  setFilteredAssetNames(
                    filteredAssets.map((asset) => asset.assetName)
                  );
                  setSelectedAssetName("");
                }}
              >
                <Picker.Item label="Select Event Type" value="" />
                <Picker.Item label="Crypto" value="CRYPTO" />
                <Picker.Item label="Stocks" value="STOCK" />
              </Picker>

              <Picker
                style={styles.picker}
                selectedValue={selectedAssetName}
                onValueChange={(itemValue) => {
                  setSelectedAssetName(itemValue);
                  updateAssetId(itemValue);
                }}
              >
                <Picker.Item label="Select Asset" value="" />
                {filteredAssetNames.map((assetName, index) => (
                  <Picker.Item
                    key={index}
                    label={assetName}
                    value={assetName}
                  />
                ))}
              </Picker>
              <Picker
                style={styles.picker}
                selectedValue={event.eventType}
                onValueChange={(itemValue) => {
                  setEvent({ ...event, eventType: itemValue });
                }}
              >
                <Picker.Item label="Select Event Type" value="" />
                <Picker.Item label="Buy" value="BUY" />
                <Picker.Item label="Sell" value="SELL" />
              </Picker>

              <TextInput
                style={styles.input}
                placeholder="Quantity"
                onChangeText={(text) => setEvent({ ...event, quantity: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Price Per Unit"
                onChangeText={(text) =>
                  setEvent({ ...event, pricePerUnit: text })
                }
              />
              <DateTimePicker
                value={selectedDate} // You can customize the initial date if needed
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  handleDateChange(selectedDate);
                }}
              />
              <Pressable style={styles.saveButton} onPress={handleCreateEvent}>
                <Text style={styles.buttonText}>Save Event</Text>
              </Pressable>
              <Pressable style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    width: "50%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scroll: {
    width: "90%",
  },

  picker: {
    height: 180,
    borderColor: "#007BFF",
    borderWidth: 2,
    marginBottom: 10,
    width: "90%",
  },

  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: "90%",
  },
  saveButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "90%",
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "90%",
  },
  inputButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    width: "90%",
  },
});

export default AddCGTButton;
