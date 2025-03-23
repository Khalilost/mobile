import React, { useState } from "react";
import { View, Text, Switch, TouchableOpacity, FlatList, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const HomeScreen = () => {
  const [devices, setDevices] = useState([
    { id: 1, name: "Light", state: true, icon: "lightbulb-outline" },
    { id: 2, name: "Wifi", state: false, icon: "wifi" },
    { id: 3, name: "Ac", state: false, icon: "air-conditioner" },
    { id: 4, name: "Tv", state: false, icon: "television" },
    { id: 5, name: "Fan", state: true, icon: "fan" },
    { id: 6, name: "Heater", state: false, icon: "fire" },
  ]);

  const [shortcuts, setShortcuts] = useState([
    { id: 1, name: "My Home", icon: "home-outline" },
    { id: 2, name: "Add Room", icon: "plus-circle-outline" },
    { id: 3, name: "Living Room", icon: "sofa-outline" },
  ]);

  const toggleDevice = (id) => {
    setDevices((prevDevices) =>
      prevDevices.map((device) =>
        device.id === id ? { ...device, state: !device.state } : device
      )
    );
  };

  const renderDevice = ({ item }) => (
    <View style={[styles.deviceCard, item.state && styles.deviceActive]}>
      <Icon name={item.icon} size={30} color={item.state ? "#fff" : "#000"} />
      <Text style={item.state ? styles.deviceTextActive : styles.deviceText}>{item.name}</Text>
      <Switch
        value={item.state}
        onValueChange={() => toggleDevice(item.id)}
        trackColor={{ false: "#767577", true: "#4CAF50" }}
        thumbColor={item.state ? "#fff" : "#f4f3f4"}
      />
    </View>
  );

  const renderShortcut = ({ item }) => (
    <TouchableOpacity style={styles.shortcutCard}>
      <Icon name={item.icon} size={30} color="#000" />
      <Text style={styles.shortcutText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Welcome Home</Text>

      {/* Shortcuts */}
      <Text style={styles.sectionTitle}>Shortcuts</Text>
      <FlatList
        data={shortcuts}
        renderItem={renderShortcut}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.shortcutsContainer}
      />

      {/* Devices Section */}
      <View style={styles.devicesSection}>
        {/* Devices and Add Device Button */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <Text style={[styles.sectionTitle, { flex: 1 }]}>Devices</Text>

          <TouchableOpacity style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
            <Icon name="plus" size={24} color="black" style={{ marginLeft: 8 }} />
            <Text style={styles.sectionTitle}>Add device</Text>
          </TouchableOpacity>
        </View>

        {/* Device List (Grid) */}
        <FlatList
          data={devices}
          renderItem={renderDevice}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} // Grid layout with two columns
          contentContainerStyle={styles.devicesContainer}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },

  // Shortcut styles
  shortcutsContainer: { marginBottom: 20 },
  shortcutCard: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    marginRight: 10,
    elevation: 2,
    width: 100, // Make each shortcut the same width
    justifyContent: "center",
  },
  shortcutText: { fontSize: 14, marginTop: 5, color: "#000" },

  // Devices Section (Grid Layout)
  devicesSection: { position: "relative" },
  devicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 60, // Make space for the add device button
  },
  deviceCard: {
    width: "48%", // Ensure two devices per row
    marginBottom: 10,
    marginRight: "4%", // Add space between columns
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
  },
  deviceActive: { backgroundColor: "#4CAF50" },
  deviceText: { fontSize: 16, marginVertical: 5, color: "#000" },
  deviceTextActive: { fontSize: 16, marginVertical: 5, color: "#fff" },

  // Add Device button styles
  addDeviceButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
});

export default HomeScreen;
