import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore"; 

// Add a new camera configuration
export const addCamera = async (camera) => {
  try {
    await addDoc(collection(db, 'cameras'), camera);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Get all camera configurations
export const getCameras = async () => {
  const querySnapshot = await getDocs(collection(db, 'cameras'));
  const cameras = [];
  querySnapshot.forEach((doc) => {
    cameras.push({ id: doc.id, ...doc.data() });
  });
  return cameras;
};

// Update a camera configuration
export const updateCamera = async (id, updatedCamera) => {
  try {
    const cameraRef = doc(db, 'cameras', id);
    await updateDoc(cameraRef, updatedCamera);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

// Delete a camera configuration
export const deleteCamera = async (id) => {
  try {
    const cameraRef = doc(db, 'cameras', id);
    await deleteDoc(cameraRef);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};
