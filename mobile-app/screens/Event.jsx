import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import AddCGTButton from "../components/AddCGTEvents";
import EditCGTEvents from "../components/EditCGTEvents";
import { deleteEvent, fetchAsset, fetchUserEvent } from "../utils/apiService";
import formatNumber from "../utils/formatNumber";


const Event = () => {
  const [events, setEvents] = useState([]);
  const [assets, setAssets] = useState([]);

  const getUserEvent = async () => {
    try {
      const response = await fetchUserEvent();
      setEvents(response);
    } catch (error) {
      console.error("Error fetching user events", error);
    }
  };

  const getAsset = async () => {
    try {
      const response = await fetchAsset();
      setAssets(response);
    } catch (error) {
      console.error("Error fetching assets", error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
  
      await deleteEvent(eventId);

      // Update the events state by filtering out the deleted event
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.eventId !== eventId)
      );
    } catch (error) {
      console.error("Error deleting event", error);
    }
  };

 

  useEffect(() => {
    getUserEvent();
    getAsset();
  }, []);

  const formatEventText = (event) => {
    const asset = assets.find((element) => element.assetId === event.assetId);
    if (asset) {
      const action = event.eventType === "BUY" ? "Bought" : "Sold";
      const price = `💵${formatNumber(event.pricePerUnit)}`;
      return `${action} ${formatNumber(event.quantity)} ${asset.assetIdentifier} for ${price}`;
    }
  };

  const formatDate = (eventDate) => {
    const date = new Date(eventDate);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDate;
  };

  return (
    <View style={styles.container}>
     
      <Text style={styles.title}>Past Activity</Text>
      <Text style={styles.subtitle}>Past CGT Events:</Text>

      <AddCGTButton assets={assets} getAssets={getAsset}/>
      
      <ScrollView style={styles.eventsContainer}>
        {events.map((event) => (
          <View key={event.eventId} style={styles.eventItem}>
            <Text style={styles.eventText}>{formatEventText(event)}</Text>
            <Text style={styles.eventDate}>{formatDate(event.eventDate)}</Text>
            <View style={styles.eventIcons}>

              <EditCGTEvents getAssets={getAsset} assets={assets} eventId ={event.eventId}/>
              <TouchableOpacity onPress={() => handleDeleteEvent(event.eventId)}>
                <FontAwesomeIcon name="trash" size={30} style={styles.eventIcon} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    margin: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 10,
  },
  eventsContainer: {
    display: "flex",
    paddingTop: 20,
  },
  eventIcons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  eventIcon: {
    marginHorizontal: 10,
  },
  eventItem: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  eventText: {
    fontSize: 16,
    fontWeight: "normal",
  },
  eventDate: {
    fontSize: 14,
    color: "gray",
  },
});

export default Event;
