import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { collection, doc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from "../../services/firebaseConfig";
import colors from '../constants/colors';

export default function AlbumScreen() {
  const [albums, setAlbums] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();
  const { artistId, artistName } = route.params;

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const artistRef = doc(db, 'artists', artistId);
        const albumsCol = collection(artistRef, 'albums');
        const snapshot = await getDocs(albumsCol);
        const albumsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Álbumes encontrados:', albumsData);
        setAlbums(albumsData);
      } catch (error) {
        console.error('Error al obtener álbumes:', error);
      }
    };

    fetchAlbums();
  }, [artistId]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('SongScreen', { artistId, albumId: item.id })}
      style={styles.card}
    >
      <Image
        source={{ uri: item.cover || 'https://via.placeholder.com/150' }}
        style={styles.image}
      />
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <AntDesign name="arrowleft" size={24} color={colors.TextoPrimario} />
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Álbumes de {artistName}</Text>

      {albums.length === 0 ? (
        <Text style={styles.noAlbums}>No hay álbumes disponibles.</Text>
      ) : (
        <FlatList
          data={albums}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backText: {
    color: colors.TextoPrimario,
    marginLeft: 8,
  },
  header: {
    fontSize: 24,
    color: colors.TextoPrimario,
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: colors.variante3,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.Borde,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    color: colors.TextoPrimario,
  },
  noAlbums: {
    color: colors.TextoInactivo,
    textAlign: 'center',
    marginTop: 20,
  },
});
