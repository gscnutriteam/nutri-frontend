import { storage } from './firebase';
import { ref, uploadString, getDownloadURL } from "firebase/storage";

// Function to upload an image to Firebase Storage
export const uploadImageToStorage = async (imageData: string, fileName: string): Promise<string> => {
  try {
    // Create a reference to 'nutribox/{fileName}'
    const storageRef = ref(storage, `nutribox/${fileName}`);
    
    // Upload the image (base64 data URI)
    const dataUri = imageData.startsWith('data:') ? imageData : `data:image/jpeg;base64,${imageData}`;
    
    // Upload string and get snapshot
    const snapshot = await uploadString(storageRef, dataUri, 'data_url');
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};