import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { Fontisto } from '@expo/vector-icons';
import { API_KEY } from './api-key';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]); 
  const [ok, setOk] = useState(true);

  const icons = {
    Clouds: "cloudy",
    Clear: "day-sunny",
    Snow: "snowflake",
    Atmosphere: "cloudy-gusts",
    Rain: "rains",
    Drizzle: "rain",
    Thunderstorm: "lightning",
  }

  const ask = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if(!granted) {
      setOk(false);
    }

    const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({  accuracy: 6 });
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps: false});
    setCity(`${location[0].district}, ${location[0].city}`);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`);
    const json = await response.json();
    setDays(json.daily);
  }

  useEffect(() => {
    ask();
  }, []);

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.city}>
          <Text style={styles.cityName}>{city}</Text>
        </View>
        <View style={styles.weatherBox}>
          <ScrollView 
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.weather}
          >
            { days.length === 0 ? (
              <View style={{ ...styles.day, alignItems: "center" }}>
                <ActivityIndicator color="black" size="large" />
              </View>
            ) : (
              days.map((day, index) => 
                <View key={index} style={styles.day}>
                  <Text style={styles.date}>{new Date(day.dt * 1000).toString().substring(0, 10)}</Text>
                  <View style={{
                    width: "100%",
                    flexDirection:"row",
                    alignItems: "center",
                    justifyContent: "center"}}>
                    <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}℃</Text>
                    <Fontisto 
                      name={icons[day.weather[0].main]} 
                      size={32} 
                      color="black" 
                      style={{marginTop: 30, marginLeft: 20}}
                      />
                  </View>
                  <View>
                    <Text style={styles.minMax}>최저: {parseFloat(day.temp.min).toFixed(1)}℃</Text>
                    <Text style={styles.minMax}>최고: {parseFloat(day.temp.max).toFixed(1)}℃</Text>
                  </View>
                  <Text style={styles.main}>{day.weather[0].main}</Text>
                  <Text style={styles.desc}>{day.weather[0].description}</Text>
                </View>
              )
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#293B5F",
  },
  container: {
    height: SCREEN_HEIGHT*0.9,
    width: SCREEN_WIDTH*0.85,
    backgroundColor: "#E8F0F2",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  weatherBox: {
    flex: 2,
  },
  day: {
    width: SCREEN_WIDTH*0.85,
    alignItems: "center",
  },
  date: {
    alignItems: "center",
    fontSize: 36,
  },
  temp: {
    marginTop: 50,
    fontSize: 72,
    fontWeight: "bold",
  },
  minMax: {
    fontSize: 20,
    fontWeight: "500",
  },
  main: {
    marginTop: 50,
    fontSize: 32,
    fontWeight: "600",
  },
  desc: {
    fontSize: 20,
  },
})
