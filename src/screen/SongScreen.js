import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { collection, doc, getDocs } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from "../../services/firebaseConfig";
import colors from '../constants/colors';

export default function SongScreen() {
  const [songs, setSongs] = useState([]);
  const [sound, setSound] = useState(null);
  const [playingId, setPlayingId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [playbackStatus, setPlaybackStatus] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  const { artistId, albumId } = route.params;
  const soundRef = useRef(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songsRef = collection(doc(db, 'artists', artistId, 'albums', albumId), 'songs');
        const snapshot = await getDocs(songsRef);
        const songsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSongs(songsData);
      } catch (error) {
        console.error('Error al obtener canciones:', error);
      }
    };

    fetchSongs();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const playSound = async (song) => {
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }

      const { sound: newSound, status } = await Audio.Sound.createAsync(
        { uri: song.url },
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );

      soundRef.current = newSound;
      setSound(newSound);
      setCurrentSong(song);
      setPlayingId(song.id);
      setIsPlaying(true);
      setPlaybackStatus(status);
    } catch (error) {
      console.error("Error reproduciendo la canción:", error);
    }
  };

  const onPlaybackStatusUpdate = status => {
    if (status.isLoaded) {
      setPlaybackStatus(status);
      setIsPlaying(status.isPlaying);
    }
  };

  const togglePlayPause = async () => {
    if (!soundRef.current) return;
    if (isPlaying) {
      await soundRef.current.pauseAsync();
    } else {
      await soundRef.current.playAsync();
    }
  };

  const formatTime = (millis) => {
    if (!millis) return "0:00";
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.song} onPress={() => playSound(item)}>
      <Text style={styles.title}>
        {item.name} {playingId === item.id && <Ionicons name="musical-notes" size={16} color={colors.Exito} />}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backArrow}>← Volver</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Canciones</Text>

      <FlatList
        data={songs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={true}
      />

      {currentSong && playbackStatus && (
        <View style={styles.playerBar}>
          <View style={styles.playerInfo}>
            <Text style={styles.songNowPlaying} numberOfLines={1}>{currentSong.name}</Text>
            <View style={styles.progressContainer}>
              <View
                style={{
                  width: playbackStatus.durationMillis
                    ? `${(playbackStatus.positionMillis / playbackStatus.durationMillis) * 100}%`
                    : '0%',
                  height: 4,
                  backgroundColor: colors.Exito,
                  borderRadius: 4
                }}
              />
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>
                {formatTime(playbackStatus.positionMillis)}
              </Text>
              <Text style={styles.timeText}>
                {formatTime(playbackStatus.durationMillis)}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={togglePlayPause} style={styles.controlButton}>
            <Ionicons name={isPlaying ? "pause" : "play"} size={28} color={colors.TextoPrimario} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: colors.FondoOscuro,
  },
  backArrow: {
    color: colors.TextoSecundario,
    fontSize: 16,
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    color: colors.TextoPrimario,
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 120,
  },
  song: {
    backgroundColor: colors.variante3,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.Borde,
  },
  title: {
    fontSize: 18,
    color: colors.TextoPrimario,
  },
  playerBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.variante4,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.Borde,
  },
  playerInfo: {
    flex: 1,
  },
  songNowPlaying: {
    color: colors.TextoPrimario,
    fontSize: 16,
    marginBottom: 5,
  },
  progressContainer: {
    height: 4,
    backgroundColor: colors.variante1,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    color: colors.TextoInactivo,
    fontSize: 12,
  },
  controlButton: {
    marginLeft: 15,
  },
});
