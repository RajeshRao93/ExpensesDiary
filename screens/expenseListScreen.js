import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  Animated,
  ScrollView,
  Modal,
} from "react-native";
import { Icon } from "react-native-elements";
import ExpenseViewComp from "../components/expenseViewComp";
import * as SQLite from "expo-sqlite";
import constants from "../assets/constants";
import VisualizationComp from "../components/visualizationComp";

const ExpenseListSceen = (props) => {
  const [expenseDetails, setExpenseDetails] = useState([]);
  const [statsDetails, setStatsDetails] = useState([]);
  const [monthlyTotal, setMonthlyTotal] = useState();
  const [showStats, setShowStats] = useState(false);
  var expenses;
  const db = SQLite.openDatabase("ExpensesDb", 1);
  const query =
    "select * from expenses where year = " +
    props.year +
    " and month= '" +
    props.month +
    "'";
  const query2 =
    "select sum(amount) as total from expenses  where year = " +
    props.year +
    " and month= '" +
    props.month +
    "'";
  const query3 =
    "select sum(amount) as total, category  from expenses  where year = " +
    props.year +
    " and month= '" +
    props.month +
    "' group by category";

  const deleteExpense = (id) => {
    const query3 = "delete from expenses where id =" + id;
    setExpenseDetails((expenseDetails) => {
      return expenseDetails.filter((exp) => exp.id !== id);
    });

    db.transaction((tx) => {
      tx.executeSql(query3);
    });

    alert("Expense deleted.");
  };

  const statsVisibilityHandler = (show) => {
    setShowStats(show);
  };

  try {
    db.transaction((tx) => {
      tx.executeSql(query, [], (_, { rows }) => {
        var i;

        for (i = 0; i < rows.length; i++) {
          expenses = new Object();
          expenses.id = rows.item(i).id;
          expenses.date = rows.item(i).date;
          expenses.category = rows.item(i).category;
          expenses.amount = rows.item(i).amount;
          expenses.note = rows.item(i).note;
          expenses.month = rows.item(i).month;
          if (expenseDetails.length != rows.length)
            expenseDetails.push(expenses);
        }

        //console.log(expenseDetails);
      });
      tx.executeSql(query2, [], (_, { rows }) => {
        setMonthlyTotal(rows.item(0).total);
      });
      tx.executeSql(query3, [], (_, { rows }) => {
        var i;
        for (i = 0; i < rows.length; i++) {
          statsData = new Object();
          statsData.category = rows.item(i).category;
          statsData.total = rows.item(i).total;

          if (statsDetails.length != rows.length) {
            statsDetails.push(statsData);
          }
        }
      });
    });
  } catch (e) {
    console.log(e);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          reverse
          name="md-arrow-back"
          type="ionicon"
          color="black"
          onPress={() => {
            props.navigateScreen("MonthFilterScreen", props.year, "");
          }}
          size={15}
        />
        <Text style={styles.heading}>Expenses</Text>
      </View>
      <ScrollView>
        <ExpenseViewComp
          month={props.month}
          total={monthlyTotal}
          expenses={expenseDetails}
          deleteExpense={deleteExpense}
        />
      </ScrollView>
      <View style={styles.addIcon}>
        <Icon
          reverse
          name="ios-add"
          type="ionicon"
          color="black"
          // style={styles.addIcon}
          onPress={() => {
            props.navigateScreen("AddExpensesScreen", "", "");
          }}
          size={25}
        />
        <Icon
          reverse
          name="md-stats"
          type="ionicon"
          color="black"
          // style={styles.addIcon}
          onPress={() => {
            statsVisibilityHandler(true);
          }}
          size={25}
        />
      </View>
      {showStats && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showStats}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.statsModal}>
            <View style={styles.modalView}>
              <VisualizationComp
                statsData={statsDetails}
                year={props.year}
                month={props.month}
              />
              <Button
                title="Close"
                onPress={() => statsVisibilityHandler(false)}
              ></Button>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  addIcon: {
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
  },
  container: {
    flex: 1,
    backgroundColor: constants.backgroundColor,
    width: "100%",
    height: "100%",
    justifyContent: "space-evenly",
    borderColor: "white",
  },
  heading: {
    fontSize: 35,
    fontFamily: "Ubuntu",
    color: "white",
  },
  header: {
    paddingTop: 40,
    flexDirection: "row",
  },
  statsModal: {
    backgroundColor: constants.backgroundColor,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ExpenseListSceen;
