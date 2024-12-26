import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN_KEY,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID_KEY,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET_KEY,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSSAGINGSENDERID_KEY,
  appId: import.meta.env.VITE_FIREBASE_APPID_KEY,
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
const firestore = getFirestore(app);

export const fetchItemsFromFireStore = async () => {
  try {
    const productsCollection = collection(firestore, "products");
    console.log(productsCollection)
    const productsSnapShot = await getDocs(productsCollection);
    const productsList = productsSnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(productsList)
    return productsList;
  } catch (error) {
    console.error("Error during fetching products:", error.message);
    console.log("Error", error);
  }
};

export { auth, provider, storage, firestore };
