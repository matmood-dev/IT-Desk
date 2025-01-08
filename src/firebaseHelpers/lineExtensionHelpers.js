import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore"; 

// Add a new line extension
export const addLineExtension = async (lineExtension) => {
  try {
    await addDoc(collection(db, 'lineExtensions'), lineExtension);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Get all line extensions
export const getLineExtensions = async () => {
  const querySnapshot = await getDocs(collection(db, 'lineExtensions'));
  const lineExtensions = [];
  querySnapshot.forEach((doc) => {
    lineExtensions.push({ id: doc.id, ...doc.data() });
  });
  return lineExtensions;
};

// Update a line extension
export const updateLineExtension = async (id, updatedLineExtension) => {
  try {
    const lineExtensionRef = doc(db, 'lineExtensions', id);
    await updateDoc(lineExtensionRef, updatedLineExtension);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

// Delete a line extension
export const deleteLineExtension = async (id) => {
  try {
    const lineExtensionRef = doc(db, 'lineExtensions', id);
    await deleteDoc(lineExtensionRef);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};
