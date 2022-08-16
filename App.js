import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CalendarList } from "react-native-calendars";
import dayjs from "dayjs";

const appointments = [{ name: "Appointment one", time: "9:00 AM" }];

const App = () => {
  const [selectedDate, setSelectedDate] = useState(
    dayjs(new Date()).format("YYYY-MM-DD")
  );

  const markedDates = [
    { date: selectedDate, type: "selected", appointments: [] },
    {
      date: "2022-08-12",
      type: "marked",
      appointments: [
        { name: "Appointment one", time: "9:00 AM" },
        { name: "Appointment two", time: "11:00 AM" },
      ],
    },
    {
      date: "2022-07-02",
      type: "marked",
      appointments: [
        { name: "Appointment one", time: "12:00 AM" },
        { name: "Appointment two", time: "1:00 PM" },
      ],
    },
    {
      date: "2022-08-20",
      type: "marked",
      appointments: [
        { name: "Appointment one", time: "8:00 AM" },
        { name: "Appointment two", time: "3:00 PM" },
      ],
    },
    {
      date: "2022-07-08",
      type: "marked",
      appointments: [
        { name: "Appointment one", time: "9:00 AM" },
        { name: "Appointment two", time: "11:00 AM" },
      ],
    },
  ];

  const checkDate = (date) => {
    const a = markedDates.filter((item) => {
      if (item.date === date) {
        return item.type;
      }
    });
    if (a.length > 0) {
      return a[0].type;
    } else {
      return false;
    }
  };

  const getAppointments = () => {
    const a = markedDates.filter((item) => {
      if (item.date === selectedDate) {
        return item;
      }
    });
    if (a.length > 0) {
      return a[1] && a[1].appointments;
    } else {
      return [];
    }
  };

  return (
    <View style={styles.container}>
      <CalendarList
        style={styles.calendar}
        dayComponent={({ date, onPress }) => {
          return (
            <TouchableOpacity
              style={styles.dateContainer}
              onPress={() => {
                onPress(date);
              }}
            >
              <View
                style={[
                  styles.dateInnerView,
                  {
                    backgroundColor:
                      checkDate(date.dateString) === "selected"
                        ? "#A22A52"
                        : "transparent",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.dateText,
                    {
                      color:
                        checkDate(date.dateString) === "selected"
                          ? "white"
                          : "black",
                    },
                  ]}
                >
                  {date.day}
                </Text>
                {checkDate(date.dateString) === "marked" && (
                  <View style={styles.dot} />
                )}
              </View>
            </TouchableOpacity>
          );
        }}
        onVisibleMonthsChange={(month) => {}}
        onDayPress={(date) => {
          setSelectedDate(date.dateString);
        }}
        markingType={"custom"}
        pagingEnabled={true}
        horizontal={true}
        current={dayjs(new Date()).format("YYYY-MM-DD")}
        calendarWidth={Dimensions.get("window").width}
        enableSwipeMonths={false}
        futureScrollRange={0}
        hideArrows={false}
        // renderArrow={(direction) => (
        //  )}
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#000000",
          textSectionTitleDisabledColor: "#d9e1e8",
          selectedDayBackgroundColor: "#A22A52",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#A22A52",
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9e1e8",
          dotColor: "#A22A52",
          selectedDotColor: "#ffffff",
          arrowColor: "#A22A52",
          disabledArrowColor: "#d9e1e8",
          monthTextColor: "#000000",
          indicatorColor: "#000000",
        }}
      />
      <View>
        <Text style={{ alignSelf: "center", fontSize: 18, marginBottom: 15 }}>
          Appointments
        </Text>
        {getAppointments() ? (
          <FlatList
            data={getAppointments()}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 15,
                    paddingBottom: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "black",
                      textAlign: "center",
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: 14, color: "grey" }}>
                    {item.time}
                  </Text>
                </View>
              );
            }}
          />
        ) : (
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "black",
              textAlign: "center",
            }}
          >
            No appointments for this date
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendar: {
    width: Dimensions.get("window").width,
    overflow: "hidden",
  },
  dateContainer: {
    paddingVertical: 3,
    width: "100%",
  },
  dateInnerView: {
    borderRadius: 20,
    alignSelf: "center",
    height: 25,
    width: 25,
  },
  dateText: { textAlign: "center", fontSize: 16 },
  dot: {
    height: 6,
    width: 6,
    alignSelf: "center",
    backgroundColor: "#A22A52",
    borderRadius: 50,
  },
});

export default App;
