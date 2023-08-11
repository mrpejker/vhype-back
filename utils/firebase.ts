import { initializeApp } from 'firebase/app';
// import { getPerformance } from 'firebase/performance';
import { getStorage } from 'firebase/storage';
import {
  addDoc,
  doc,
  collection,
  getFirestore,
  query,
  where,
  getDocs,
  setDoc,
  getDoc,
  DocumentData,
} from 'firebase/firestore';
import { getAnalytics, isSupported, setUserProperties, logEvent } from 'firebase/analytics';
import { ref, uploadBytesResumable, getDownloadURL, listAll } from 'firebase/storage';
import { sha3_256 } from 'js-sha3';
/**
 *  * Firebase Configuration object
 */
const firebaseConfig = {
  apiKey: String(process.env.FIREBASE_API_KEY),
  authDomain: String(process.env.FIREBASE_AUTH_DOMAIN),
  databaseURL: String(process.env.FIREBASE_DATABASE_URL),
  projectId: String(process.env.FIREBASE_PROJECT_ID),
  storageBucket: String(process.env.FIREBASE_STORAGE_BUCKET),
  messagingSenderId: String(process.env.FIREBASE_MESSAGING_SENDER_ID),
  appId: String(process.env.FIREBASE_APP_ID),
  measurementId: String(process.env.FIREBASE_MEASUREMENT_ID),
};

/**
 * Firebase App instance initialization
 */
export const firebaseApp = initializeApp(firebaseConfig);

/**
 * Firestore instance initialization
 * @type {import('firebase/firestore').Firestore}
 */
const db = getFirestore(firebaseApp);

/**
 * Firebase Storage instance initialization
 * @type {import('firebase/storage').Storage}
 */
export const storage = getStorage(firebaseApp);

/**
 * Check if Firebase Analytics is supported in the current environment
 * @returns {Promise}
 */
export const isFirebaseAnalyticsSupported = async () => {
  return isSupported();
};

/**
 * Get Firebase Analytics instance
 * @returns {Promise<import('firebase/analytics').Analytics|null>}
 */
export const getFirebaseAnalytics = async () => {
  if (await isFirebaseAnalyticsSupported()) {
    return getAnalytics(firebaseApp);
  }
  return null;
};

/**
 * Set Firebase Analytics User Properties
 * @param {object} properties - The properties to set for the user
 * @returns {Promise}
 */
export const setFirebaseAnalyticsUserProperties = async (properties: object): Promise<any> => {
  const analytics = await getFirebaseAnalytics();
  if (analytics) {
    setUserProperties(analytics, { ...properties });
  }
};

/**
 * Log an event in Firebase Analytics
 * @param {string} eventName - The name of the event to log
 * @param {object} data - Additional data to include with the event
 * @returns {Promise}
 */
export const logFirebaseAnalyticsEvent = async (eventName: string, data: object): Promise<any> => {
  const analytics = await getFirebaseAnalytics();
  if (analytics) {
    logEvent(analytics, eventName, data);
  }
};

// Initialize Performance Monitoring and get a reference to the service
// let perf = null;
// if (typeof window !== 'undefined') {
//   perf = getPerformance(firebaseApp);
// }

/**
 * Upload an image file to Firebase Storage with a unique file name
 * @param {File} file - The image file to upload
 * @returns {Promise} - The download URL for the uploaded image
 */
export const uploadImageToFirebaseStorage = async (file: File): Promise<any> => {
  const arrayBuffer = await file.arrayBuffer();
  const hash = sha3_256(arrayBuffer);
  const fileExt = file.name.split('.').pop();
  const storageRef = ref(storage, `images/${hash}.${fileExt}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  return uploadTask.then(() => {
    return getDownloadURL(uploadTask.snapshot.ref);
  });
};

/**
 * * Render Firebase image from storage with a given hash.
 * @async
 * @param {string} hash - The has of the image
 * @returns {Promise} - The download URL for the image
 */
export const renderFirebaseImage = async (hash: string): Promise<string> => {
  const listRef = ref(storage, 'images/');
  let url;
  // const result = await storageRef.listAll();
  const result = await listAll(listRef);
  const getImageUrl = async (ref: any) => {
    url = await getDownloadURL(ref);
  };
  result.items.forEach((itemRef) => {
    // All the items under listRef.
    getImageUrl(itemRef);
  });
  return '/0.png';
};

/**
 * Get the download URL for a specific image in Firebase Storage
 * @param {string} imageName - The name of the image to get the URL for
 * @returns {Promise} - The download URL for the image
 */
export const getFirebaseStorageImageDownloadUrl = async (imageName: string): Promise<any> => {
  const storageRef = ref(storage, `images/${imageName}`);
  return getDownloadURL(storageRef);
};

/**
 * Add a new document to a specific collection in Firestore
 * @param {string} collectionName - The name of the collection to add the document to
 * @param {object} data - The data to store in the new document
 * @returns {Promise<import('firebase/firestore').DocumentReference>} - A reference to the new document
 */
export const addDocumentToFirestoreCollection = async (
  collectionName: string,
  data: object
): Promise<import('firebase/firestore').DocumentReference> => {
  const collectionRef = collection(db, collectionName);
  return await addDoc(collectionRef, data);
};

/**
 * Set the data in a specific document in Firestore
 * @param {string} collectionName - The name of the collection containing the document to set
 * @param {string} documentName - The name of the document to set
 * @param {object} data - The data to set for the document
 * @returns {Promise}
 */
export const setFirestoreDocumentData = async (
  collectionName: string,
  documentName: string,
  data: object
): Promise<any> => {
  const documentRef = doc(db, collectionName, documentName);
  await setDoc(documentRef, data);
};

/**
 * Get the data from a specific document in Firestore
 * @param {string} collectionName - The name of the collection containing the document to get
 * @param {string} documentName - The name of the document to get
 * @returns {Promise<object|null>} - The data from the document, or null if the document does not exist
 */
export const getFirestoreDocumentData = async (
  collectionName: string,
  documentName: string
): Promise<object | null> => {
  const documentRef = doc(db, collectionName, documentName);
  const documentSnapshot = await getDoc(documentRef);
  if (documentSnapshot.exists()) {
    return documentSnapshot.data();
  }
  return null;
};

export const getFirestoreCollectionData = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const collectionArray: DocumentData[] = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    collectionArray.push(doc.data());
  });
  return collectionArray;
};

/**
 * Check if a specific reward has been added to the "participants" collection in Firestore
 * @param {string} walletAddress - The Ethereum wallet address to check for
 * @returns {Promise} - True if the wallet address exists in the "participants" collection, false otherwise
 */
export const isRewardAddedToFirestoreParticipants = async (walletAddress: string): Promise<any> => {
  const participantsCollectionRef = collection(db, 'participants');
  const querySnapshot = await getDocs(query(participantsCollectionRef, where('wallet', '==', walletAddress)));
  return !querySnapshot.empty;
};
