
import { Router } from 'express';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
// import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js';
import { db } from './firebase.mjs'; // Assuming you have initialized Firebase in this file

const router = Router();

// Add Image
router.post('/images', async (req, res) => {
  const { name, base64 } = req.body;
  try {
    const docRef = await addDoc(collection(db, 'images'), { name, base64 });
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    console.error('Error adding document:', error);
    res.status(500).json({ error: 'Failed to save image' });
  }
});

// Get Images
router.get('/images', async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, 'images'));
    const images = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(images);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

// Delete Image
router.delete('/images/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteDoc(doc(db, 'images', id));
    res.status(200).json({ message: 'Image deleted' });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

export default router;
