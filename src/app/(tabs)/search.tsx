import { FlatList, StyleSheet, TextInput } from "react-native";
import { tracks } from "../../../assets/data/tracks";
import TrackListItem from "@/src/components/TrackListItem";
import { View, Text } from "@/src/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";

export default function HomeScreen() {
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView>
      <View style={styles.header}>
        {/* Header */}
        <FontAwesome name="search" size={16} color="gray" />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="gray"
          placeholder="what do you want to listen to?"
          style={styles.input}
        />
        <Text
          onPress={() => {
            setSearch("");
          }}
          style={{ color: "white" }}
        >
          Cancel
        </Text>
      </View>
      <FlatList
        data={tracks}
        renderItem={({ item }) => <TrackListItem track={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#121314",
    padding: 8,
    marginHorizontal: 10,
    borderRadius: 5,
    color: "white",
  },
});
