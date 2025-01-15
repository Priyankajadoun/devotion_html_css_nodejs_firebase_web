import { db } from "../firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const videoContainer = document.getElementById("video-container");

const loadVideos = async () => {
    const querySnapshot = await getDocs(collection(db, "videoLinks"));
    querySnapshot.forEach(doc => {
        const videoLink = doc.data().link;
        videoContainer.innerHTML += `
            <div class="video">
                <iframe width="560" height="315" src="${videoLink}" frameborder="0" allowfullscreen></iframe>
            </div>
        `;
    });
};

loadVideos();
