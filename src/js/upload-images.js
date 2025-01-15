
const imageInput = document.getElementById('imageInput');
const uploadBtn = document.getElementById('uploadBtn');
const imageGallery = document.getElementById('imageGallery');

// Load Images
// const loadImages = async () => {
//   imageGallery.innerHTML = '';
//   try {
//     const response = await fetch('http://localhost:3000/api/images');
//     if (!response.ok) throw new Error(`Failed to load images: ${response.status}`);
//     const images = await response.json();
//     images.forEach((image) => {
//       const container = document.createElement('div');
//       container.style.marginBottom = '10px';

//       const img = document.createElement('img');
//       img.src = image.base64;
//       img.alt = image.name;
//       img.style.width = '100px';

//       const deleteBtn = document.createElement('button');
//       deleteBtn.textContent = 'Delete';
//       deleteBtn.onclick = async () => {
//         try {
//           const deleteResponse = await fetch(`http://localhost:3000/api/images/${image.id}`, { method: 'DELETE' });
//           if (!deleteResponse.ok) throw new Error(`Failed to delete image: ${deleteResponse.status}`);
//           loadImages();
//         } catch (error) {
//           console.error(error);
//           alert('Error deleting image. Please try again.');
//         }
//       };

//       container.appendChild(img);
//       container.appendChild(deleteBtn);
//       imageGallery.appendChild(container);
//     });
//   } catch (error) {
//     console.error('Error loading images:', error);
//     alert('Failed to load images. Please try again.');
//   }
// };
const loadImages = async () => {
  imageGallery.innerHTML = '';
  try {
      const response = await fetch('http://localhost:3000/api/images');
      if (!response.ok) throw new Error(`Failed to load images: ${response.status}`);
      const images = await response.json();
      images.forEach((image) => {
          // Create a Bootstrap card for each image
          const col = document.createElement('div');
          col.classList.add('col');

          const card = document.createElement('div');
          card.classList.add('card', 'text-center', 'shadow-sm');

          const img = document.createElement('img');
          img.src = image.base64;
          img.alt = image.name;
          img.classList.add('card-img-top');

          const cardBody = document.createElement('div');
          cardBody.classList.add('card-body');

          const deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'Delete';
          deleteBtn.classList.add('btn', 'btn-danger', "w-100", 'mt-2');
          deleteBtn.onclick = async () => {
              try {
                  const deleteResponse = await fetch(`http://localhost:3000/api/images/${image.id}`, {
                      method: 'DELETE',
                  });
                  if (!deleteResponse.ok) throw new Error(`Failed to delete image: ${deleteResponse.status}`);
                  loadImages();
              } catch (error) {
                  console.error(error);
                  alert('Error deleting image. Please try again.');
              }
          };

          // Append image and delete button to the card
          cardBody.appendChild(deleteBtn);
          card.appendChild(img);
          card.appendChild(cardBody);
          col.appendChild(card);
          imageGallery.appendChild(col);
      });
  } catch (error) {
      console.error('Error loading images:', error);
      alert('Failed to load images. Please try again.');
  }
};

// Upload Image
uploadBtn.addEventListener('click', async () => {
  const file = imageInput.files[0];
  if (!file) {
    alert('Please select a file');
    return;
  }

  const reader = new FileReader();
  reader.onload = async (event) => {
    const base64 = event.target.result;
    try {
      console.log("Uploading image:", file.name);
      const response = await fetch('http://localhost:3000/api/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: file.name, base64 }),
      });

      if (!response.ok) throw new Error(`Failed to upload image: ${response.status}`);

      console.log("Image uploaded successfully");
      loadImages();
    } catch (error) {
      console.error("Upload error:", error);
      alert('Failed to upload image. Please try again.');
    }
  };

  reader.readAsDataURL(file);
});

// Initial Load
loadImages();

