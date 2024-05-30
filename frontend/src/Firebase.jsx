import { initializeApp } from "firebase/app";
import { getStorage, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAUuOHjBxfEKOrojlLqHlpVaDlEeFAhEvc",
  authDomain: "my-app-1a685.firebaseapp.com",
  projectId: "my-app-1a685",
  storageBucket: "my-app-1a685.appspot.com",
  messagingSenderId: "341934039999",
  appId: "1:341934039999:web:98ff89e5f8b03329fc770a",
  measurementId: "G-CRPRP05X0W"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function getImage(location) {
  const ImageURL = await getDownloadURL(ref(storage, location));
  return await ImageURL;
}