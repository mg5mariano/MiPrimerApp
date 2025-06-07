import { collection, doc, setDoc } from "firebase/firestore";

const seedFirestore = async (db) => {
  const artists = [
    {
      id: "1",
      name: "Shakira",
      image: "https://www.mundiario.com/asset/thumbnail,1280,720,center,center/media/mundiario/images/2017/05/27/2017052702350851498.jpg",
      albums: [
        {
          id: "el_dorado",
          name: "El Dorado",
          cover: "https://www.mundiario.com/asset/thumbnail,1280,720,center,center/media/mundiario/images/2017/05/27/2017052702350851498.jpg",
          songs: [
            { id: "me_enamore", name: "Me Enamoré", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
            { id: "chantaje", name: "Chantaje", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
            { id: "perro_fiel", name: "Perro Fiel", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
            // agrega más canciones si quieres
          ],
        },
        {
          id: "fijacion_oral_vol1",
          name: "Fijación Oral Vol. 1",
          cover: "https://i.scdn.co/image/ab67616d0000b273f342e70aacda9d78cfb6ce7a",
          songs: [
            { id: "la_tortura", name: "La Tortura", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
            { id: "dia_de_enero", name: "Día de Enero", url: "https://sampleurl.com/shakira/dia_de_enero.mp3" },
          ],
        },
      ],
    },
    {
      id: "2",
      name: "Juanes",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHCBRD9TFdkrc8_pyZxeZgyKq7DlwtEAozxg&s",
      albums: [
        {
          id: "origen",
          name: "Origen",
          cover: "https://upload.wikimedia.org/wikipedia/en/5/5e/Juanes_-_Origen.png",
          songs: [
            { id: "volverte_a_ver", name: "Volverte a ver", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
            { id: "para_tu_amor", name: "Para Tu Amor", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
          ],
        },
      ],
    },
    {
      id: "3",
      name: "J Balvin",
      image: "https://cdn-images.dzcdn.net/images/cover/38b80954bf64148690fc6047582e98c1/500x500.jpg",
      albums: [
        {
          id: "colores",
          name: "Colores",
          cover: "https://upload.wikimedia.org/wikipedia/en/0/0e/J_Balvin_-_Colores.png",
          songs: [
            { id: "amarillo", name: "Amarillo", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
            { id: "rojo", name: "Rojo", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
          ],
        },
      ],
    },
    {
      id: "4",
      name: "Lady Gaga",
      image: "https://upload.wikimedia.org/wikipedia/en/d/db/Lady_Gaga_-_Mayhem.png",
      albums: [
        {
          id: "mayhem",
          name: "MAYHEM",
          cover: "https://upload.wikimedia.org/wikipedia/en/d/db/Lady_Gaga_-_Mayhem.png",
          songs: [
            { id: "sine_from_above", name: "Sine From Above", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
            { id: "alice", name: "Alice", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
          ],
        },
      ],
    },
  ];

  for (const artist of artists) {
    const artistRef = doc(db, "artists", artist.id);
    await setDoc(artistRef, {
      name: artist.name,
      image: artist.image,
    });

    for (const album of artist.albums) {
      const albumRef = doc(collection(artistRef, "albums"), album.id);
      await setDoc(albumRef, {
        name: album.name,
        cover: album.cover,
      });

      for (const song of album.songs) {
        const songRef = doc(collection(albumRef, "songs"), song.id);
        await setDoc(songRef, {
          name: song.name,
          url: song.url,
        });
      }
    }
  }

  console.log("📦 Datos agregados correctamente");
};

export default seedFirestore;
