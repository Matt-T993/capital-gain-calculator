import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Functionaility = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Functionality
      </Text>
      <Text style={styles.description}>
        This is a strictly viewing application. To learn more about us and access full functionality, please visit our web page where you can:
      </Text>
      <Text style={styles.descriptionList}>- Calculate CGT</Text>
      <Text style={styles.descriptionList}>- Find a full set of FAQs</Text>
      <Text style={styles.descriptionList}>- View Graphs</Text>
      <Text style={styles.descriptionList}>- Access detailed information on your account</Text>
      <Text style={styles.descriptionList}>- Visit your profile page</Text>
      <Text style={styles.descriptionList}>- And much more</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",

    padding: 16,
  },
  text: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {

    fontSize: 18,
    textAlign: 'left',
    marginBottom: 16,
  },
  descriptionList: {
    fontSize: 16,
    textAlign: 'left',
  },
});

export default Functionaility;
