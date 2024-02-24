import { Ionicons } from "@expo/vector-icons";
import { AVPlaybackStatus, Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { usePlayerContext } from "../providers/PlayerProvider";
import { Text, View } from "./Themed";

const Player = () => {
  const [sound, setSound] = useState<Sound>();
  const { track } = usePlayerContext();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    playTrack();
  }, [track]);

  //when application closes or unmounts, we should prevent memory leaks
  useEffect(() => {
    return sound
      ? () => {
          console.log("unloading sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playTrack = async () => {
    if (sound) {
      await sound.unloadAsync();
    }

    if (!track?.preview_url) return null;
    console.log("Playing:", track.name);
    const { sound: newSound } = await Audio.Sound.createAsync({
      uri: track.preview_url,
    });

    setSound(newSound);
    newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

    await newSound.playAsync();
  };

  if (!track) {
    return null;
  }
  const onPlayPause = async () => {
    if (!sound) {
      return;
    }
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };
  const image = track.album.images?.[0];

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) {
      return;
    }

    setIsPlaying(status.isPlaying);
  };
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
          onPress={onPlayPause}
          disabled={!track?.preview_url}
          name={isPlaying ? "pause" : "play"}
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
