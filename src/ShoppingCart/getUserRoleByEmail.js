import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

export const getUserRoleByEmail = async (email) => {
  try {
    const db = getFirestore();
    const usersCollection = collection(db, 'customers'); // Replace with your collection name
    const userQuery = query(usersCollection, where('email', '==', email));
    const querySnapshot = await getDocs(userQuery);

    if (!querySnapshot.empty) {
      const user = querySnapshot.docs[0].data();
      return user.role;
    }

    return null; // User not found or no role associated
  } catch (error) {
    console.error('Error fetching user role:', error);
    throw error;
  }
};
