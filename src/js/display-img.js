const imageGallery = document.getElementById('imageGallery');

// Load Images
const loadImages = async () => {
    imageGallery.innerHTML = '';
    try {
        const response = await fetch('http://localhost:3000/api/images');
        if (!response.ok) throw new Error(`Failed to load images: ${response.status}`);
        const images = await response.json();
        images.forEach((image) => {
            const col = document.createElement('div');
            col.className = 'col zoom-in';

            const card = document.createElement('div');
            card.className = 'card';

            const img = document.createElement('img');
            img.src = image.base64;
            img.alt = image.name;
            img.className = 'card-img-top';

            card.appendChild(img);
            col.appendChild(card);
            imageGallery.appendChild(col);
        });
    } catch (error) {
        console.error('Error loading images:', error);
        alert('Failed to load images. Please try again.');
    }
};

// Initial Load
loadImages();