import { config } from 'dotenv';
config();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import seedFirestore from "./seedFirestore.mjs";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

seedFirestore(db).then(() => {
  console.log("🔥 Seed ejecutado con éxito");
  process.exit();
}).catch((error) => {
  console.error("❌ Error al ejecutar el seed:", error);
  process.exit(1);
});
