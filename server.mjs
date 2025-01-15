
import express from 'express';
import cors from 'cors';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Firebase setup
const serviceAccount = './config/service-account-key.json';
initializeApp({
  credential: cert(serviceAccount),
});
const firestore = getFirestore();

// App setup
const app = express();
app.use(cors({origin: 'http://localhost:5173'}));
app.use(express.json({ limit: '10mb' }));  // Set a limit for the body size

// API Endpoints
app.get('/api/images', async (req, res) => {
  try {
    const snapshot = await firestore.collection('images').get();
    const images = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(images);
  } catch (error) {
    console.error('Error in GET /api/images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

// app.post('/api/images', async (req, res) => {
//   try {
//     const { name, base64 } = req.body;

//     // Validate input data
//     if (!name || !base64) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     // Save image to Firestore
//     const imageDoc = await firestore.collection('images').add({ name, base64 });
//     res.status(201).json({ id: imageDoc.id, name, base64 });
//   } catch (error) {
//     console.error('Error in POST /api/images:', error);
//     res.status(500).json({ error: 'Failed to upload image' });
//   }
// });

app.post('/api/images', async (req, res) => {
  try {
    const { name, base64 } = req.body;

    // Validate input data
    if (!name || !base64) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Save image to Firestore
    const imageDoc = await firestore.collection('images').add({ name, base64 });
    res.status(201).json({ id: imageDoc.id, name, base64 });
  } catch (error) {
    console.error('Error in POST /api/images:', error);  // Log full error for debugging
    res.status(500).json({ error: 'Failed to upload image', details: error.message });
  }
});

app.delete('/api/images/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await firestore.collection('images').doc(id).delete();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/images/:id:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

