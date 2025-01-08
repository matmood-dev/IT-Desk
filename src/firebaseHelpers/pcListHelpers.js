import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from './firebaseConfig'; // Adjust the import based on your project structure

// Add a new PC
export const addPC = async (pc) => {
  try {
    await addDoc(collection(db, 'pcList'), pc);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Get all PCs
export const getPCList = async () => {
  const querySnapshot = await getDocs(collection(db, 'pcList'));
  const pcList = [];
  querySnapshot.forEach((doc) => {
    pcList.push({ id: doc.id, ...doc.data() });
  });
  return pcList;
};

// Update a PC
export const updatePC = async (id, updatedPC) => {
  try {
    const pcRef = doc(db, 'pcList', id);
    await updateDoc(pcRef, updatedPC);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

// Delete a PC
export const deletePC = async (id) => {
  try {
    const pcRef = doc(db, 'pcList', id);
    await deleteDoc(pcRef);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};
