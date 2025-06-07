import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { db } from '../../services/firebaseConfig';
import colors from '../constants/colors';

export default function HomeScreen() {
  const [artists, setArtists] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'artists'));
        const artistsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArtists(artistsData);
      } catch (error) {
        console.error('Error al obtener artistas:', error);
      }
    };

    fetchArtists();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('AlbumScreen', {
          artistId: item.id,
          artistName: item.name,
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.artistName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={[colors.variante3, colors.variante1]}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image
          source={require('../../assets/Logo_Musica2.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Ecos</Text>
      </View>

      <FlatList
        data={artists}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.TextoPrimario,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: colors.variante4,
    borderRadius: 14,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.Borde,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },
  artistName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.TextoPrimario,
  },
});
