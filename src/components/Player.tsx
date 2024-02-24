import { StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { tracks } from "../../assets/data/tracks";
import { Text, View } from "./Themed";
import { usePlayerContext } from "../providers/PlayerProvider";

const Player = () => {
  const { track } = usePlayerContext();

  if (!track) {
    return null;
  }

  const image = track.album.images?.[0];

  return (
    <View style={styles.container}>
      <View style={styles.player}>
        {image && <Image source={{ uri: image.url }} style={styles.image} />}

        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{track.name}</Text>
          <Text style={styles.subtitle}>{track.artists[0]?.name}</Text>
        </View>

        <Ionicons
          name={"heart-outline"}
          size={20}
          color={"white"}
          style={{ marginHorizontal: 10 }}
        />
        <Ionicons
          disabled={!track?.preview_url}
          name={"play"}
          size={22}
          color={track?.preview_url ? "white" : "gray"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    top: -75,
    height: 75,
    padding: 10,
    backgroundColor: "transparent",
  },
  player: {
    backgroundColor: "#286660",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    padding: 3,
    paddingRight: 15,
  },
  title: {
    color: "white",
    backgroundColor: "#286660",
  },
  subtitle: {
    color: "lightgray",
    fontSize: 12,
    backgroundColor: "#286660",
  },
  image: {
    height: "100%",
    aspectRatio: 1,
    marginRight: 10,
    borderRadius: 5,
  },
});

export default Player;
