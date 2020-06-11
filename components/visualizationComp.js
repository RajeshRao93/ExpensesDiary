import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

const VisualizationComp = (props) => {
  var graphLabel = [];
  var graphData = [];
  props.statsData.map((data, i) => {
    graphLabel.push(data.category);
    graphData.push(data.total);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Expenses in {props.month} {props.year}
      </Text>
      <LineChart
        data={{
          labels: graphLabel, //["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: graphData,
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={450}
        yAxisLabel=""
        yAxisSuffix="₹"
        yLabelsOffset="8"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 0, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "black",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 25,
    fontFamily: "Ubuntu",
    color: "white",
  },
});

export default VisualizationComp;
