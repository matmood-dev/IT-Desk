import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore"; 

// Add a new service
export const addService = async (service) => {
  try {
    await addDoc(collection(db, 'services'), service);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Get all services
export const getServices = async () => {
  const querySnapshot = await getDocs(collection(db, 'services'));
  const services = [];
  querySnapshot.forEach((doc) => {
    services.push({ id: doc.id, ...doc.data() });
  });
  return services;
};

// Update a service
export const updateService = async (id, updatedService) => {
  try {
    const serviceRef = doc(db, 'services', id);
    await updateDoc(serviceRef, updatedService);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

// Delete a service
export const deleteService = async (id) => {
  try {
    const serviceRef = doc(db, 'services', id);
    await deleteDoc(serviceRef);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};
