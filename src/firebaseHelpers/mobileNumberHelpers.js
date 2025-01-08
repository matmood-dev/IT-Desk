import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore"; 

// Add a new mobile number
export const addMobileNumber = async (mobileNumber) => {
  try {
    await addDoc(collection(db, 'mobileNumbers'), mobileNumber);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Get all mobile numbers
export const getMobileNumbers = async () => {
  const querySnapshot = await getDocs(collection(db, 'mobileNumbers'));
  const mobileNumbers = [];
  querySnapshot.forEach((doc) => {
    mobileNumbers.push({ id: doc.id, ...doc.data() });
  });
  return mobileNumbers;
};

// Update a mobile number
export const updateMobileNumber = async (id, updatedMobileNumber) => {
  try {
    const mobileNumberRef = doc(db, 'mobileNumbers', id);
    await updateDoc(mobileNumberRef, updatedMobileNumber);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

// Delete a mobile number
export const deleteMobileNumber = async (id) => {
  try {
    const mobileNumberRef = doc(db, 'mobileNumbers', id);
    await deleteDoc(mobileNumberRef);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};
