import React, { useEffect, useState } from "react";
import { ScrollView, Dimensions, StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { fetchUserAssets, fetchUserTotalAmount } from "../utils/apiService";
import formatNumber from "../utils/formatNumber";


const { width, height } = Dimensions.get("window");

const DashBoard = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [assets, setAssets] = useState([]);
  const [total, setTotal] = useState([]);
  const getUserTotalAmount = async () => {
    try {
      const response = await fetchUserTotalAmount();
      console.log(response);
      setTotal(response);
    } catch (error) {
      console.error("Error fetching user assets", error);
    }
  };
  const getUserAssets = async () => {
    try {
      const response = await fetchUserAssets();

      setAssets(response);
    } catch (error) {
      console.error("Error fetching user assets", error);
    }
  };

  useEffect(() => {
    getUserAssets();
    getUserTotalAmount();

    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-AU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    setCurrentDate(formattedDate);
  }, []);

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  const data = [
    {
      name: "Stock",
      population: isNaN(total.stockTotalAmount) ? 0 : total.stockTotalAmount,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Crypto",
      population: isNaN(total.crytoTotalAmount) ? 0 : total.crytoTotalAmount,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Portfolio Dashboard</Text>
      <View style={styles.textContainer}>
        <Text style={styles.subtitle}>Current Portfolio</Text>
        <Text style={styles.amount}>
          ${formatNumber(total.totalAmount)}
        </Text>
        <Text style={styles.info}>TOTAL VALUE (AUD) AS AT {currentDate}</Text>
      </View>
      <View style={styles.piechart}>
        <PieChart
          data={data}
          width={width}
          height={height * 0.3}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          absolute
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.subtitle}>Current Portfolio Holdings</Text>
      </View>
      <ScrollView style={styles.assetsContainer}>
        {assets.map((asset) => (
          <View key={asset.assetName} style={styles.assetItem}>
            <FontAwesomeIcon name="rebel" size={30} />
            <View style={styles.assets}>
              <Text style={styles.assetName}>{asset.assetName}</Text>
              <Text style={styles.assetHolding}>
                {formatNumber(asset.quantity)} - {asset.assetIdentifier}
              </Text>
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
  },
  title: {
    textAlign: "center",
    fontSize: 32,
    marginTop: 10,
    marginBottom: 15,
    fontWeight: "bold",

  },
  textContainer: {
    alignItems: "center",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  amount: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
  },
  piechart: {
    width: "100%",
    alignItems: "center",
  },
  assetsContainer: {
    width: "100%", // Make it take the full width
    maxHeight: height * 0.5, // Limit the maximum height to 50% of the screen height
    marginLeft: 20,
  },
  assetItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  assets: {
    marginLeft: 20, 
    flexDirection: "column",
  },
  assetName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  assetHolding: {
    fontSize: 12,
    color: "gray",
  },
});


export default DashBoard;
