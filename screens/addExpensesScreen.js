import React, { useState } from "react";
import {
  View,
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Picker,
  KeyboardAvoidingView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as SQLite from "expo-sqlite";
import { Icon } from "react-native-elements";

const categories = [
  "None",
  "Food",
  "Hobby",
  "Household",
  "Transport",
  "Medical",
  "Social life",
  "Learning",
  "Grocery",
  "Gift",
  "Beauty",
  "Clothes",
  "Shopping",
  "Car",
  "Misc.",
];

const AddExpensesScreen = (props) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [showDatepicker, setShowDatePicker] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState("");

  const db = SQLite.openDatabase("ExpensesDb", 1);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const hideDatePicker = () => {
    setShowDatePicker(false);
  };

  const showDaypicker = () => {
    setShowDatePicker(true);
  };

  const showCategoryDropdown = () => {
    setShowDropdown(true);
  };

  const hideDropdown = () => {
    setShowDropdown(false);
  };

  const saveExpenses = () => {
    //+1 date value for iOS
    let dbDate =
      date.getDate().toString() +
      (date.getMonth() + 1).toString() +
      date.getFullYear().toString();

    if (amount == 0 || note == "") {
      alert("Plase enter Amount and Note");
      return;
    }

    let query =
      "insert into expenseDetails (date, category, amount, note) values (" +
      dbDate +
      ",'" +
      category +
      "'," +
      amount +
      ",'" +
      note +
      "')";

    db.transaction((tx) => {
      tx.executeSql(query);
    });

    alert("Expense saved");
    setAmount(0);
    setNote("");
    setCategory("");
  };

  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists expenseDetails (id integer primary key not null, date text, category text, amount real, note text );"
    );
    // tx.executeSql("select * from expenseDetails", [], (_, { rows }) =>
    //   console.log(JSON.stringify(rows))
    // );
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.heading}>Enter your expenses</Text>
      <ScrollView>
        <View style={styles.expenseData}>
          <View>
            <Text style={styles.text}>Date</Text>
            <View style={styles.rowStyle}>
              <TextInput
                style={styles.textInput}
                placeholder="Click below"
                //onChangeText={(val) => setDate(val)}
                //+1 date value for iOS
                defaultValue={
                  date.getDate() +
                  "/" +
                  (date.getMonth() + 1) +
                  "/" +
                  date.getFullYear()
                }
              />
              <Icon
                reverse
                name="md-calendar"
                type="ionicon"
                color="black"
                onPress={showDaypicker}
                size={25}
              />
            </View>
          </View>
          {showDatepicker && (
            <View>
              <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
              {/* Uncomment for iOS */}
              {/* <Button title="Done" onPress={hideDatePicker} /> */}
            </View>
          )}
          <View>
            <Text style={styles.text}>Category</Text>
            <View style={styles.rowStyle}>
              <TextInput
                style={styles.textInput}
                placeholder="Choose a category"
                onChangeText={(val) => setCategory(val)}
                defaultValue={category}
              />
              <Icon
                reverse
                name="md-list-box"
                type="ionicon"
                color="black"
                onPress={showCategoryDropdown}
                size={25}
              />
            </View>
            {showDropdown && (
              <View>
                <Picker
                  selectedValue={category} //{this.state.language}
                  onValueChange={(itemValue) => setCategory(itemValue)}
                >
                  {categories.map((category) => (
                    <Picker.Item
                      label={category}
                      key={Math.random()}
                      value={category}
                    />
                  ))}
                </Picker>
                <View
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button title="Done" onPress={hideDropdown} />
                </View>
              </View>
            )}
          </View>
          <View>
            <Text style={styles.text}>Amount (₹)</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Amount"
              onChangeText={(val) => setAmount(val)}
              keyboardType="number-pad"
              //defaultValue={amount}
            />
          </View>
          <View>
            <Text style={styles.text}>Note</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Note"
              onChangeText={(val) => setNote(val)}
              //defaultValue={note}
            />
          </View>
        </View>
      </ScrollView>
      <View>
        {/* <Icon
          reverse
          name="ios-save"
          type="ionicon"
          color="#ffcc00"
          onPress={saveExpenses}
          size={25}
        /> */}
        <Button
          style={styles.submit}
          title="SAVE"
          onPress={saveExpenses}
          color="black"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  expenseData: {
    justifyContent: "flex-start",
    marginLeft: 10,
    marginTop: 20,
  },
  rowStyle: {
    flexDirection: "row",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffcc00",
  },
  heading: {
    paddingTop: 50,
    fontSize: 35,
    fontFamily: "Ubuntu",
    color: "white",
  },
  submit: {
    height: "40%",
    width: "100%",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    paddingTop: 40,
    fontSize: 25,
    fontFamily: "Ubuntu",
  },
  textInput: {
    height: 30,
    width: 250,
    marginTop: 5,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    fontFamily: "Ubuntu",
    fontSize: 20,
  },
});

export default AddExpensesScreen;
