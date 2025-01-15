

import { db } from "../../server/firebase.mjs";
// import{db} from "../../server/firebase.mjs"
// import { collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");
  fetchVideos();
});

async function fetchVideos() {
  console.log("Fetching videos...");
  try {
    const querySnapshot = await getDocs(collection(db, "videoLinks"));
    console.log("Query snapshot size:", querySnapshot.size);

    if (querySnapshot.empty) {
      console.warn("No videos found in the collection.");
      return;
    }

    querySnapshot.forEach((docSnapshot) => {
      const videoData = docSnapshot.data();
      if (videoData.link) {
        console.log("Fetched video link:", videoData.link);
        displayVideo(videoData.link, docSnapshot.id); // Pass the document ID
      } else {
        console.warn("Document missing 'link' field:", docSnapshot.id);
      }
    });
  } catch (error) {
    console.error("Error fetching videos: ", error);
  }
}

function displayVideo(videoLink, docId) {
  try {
    let embedLink;

    // Case 1: Handle YouTube embed URL (https://www.youtube.com/embed/VIDEO_ID)
    if (videoLink.includes("youtube.com/embed/")) {
      embedLink = videoLink; // Directly use the embed link
    }
    // Case 2: Handle regular YouTube video URL (https://www.youtube.com/watch?v=VIDEO_ID)
    else if (videoLink.includes("youtube.com/watch?v=")) {
      const videoId = new URL(videoLink).searchParams.get("v");
      embedLink = `https://www.youtube.com/embed/${videoId}`;
    }
    // Case 3: Handle shortened YouTube URL (https://youtu.be/VIDEO_ID)
    else if (videoLink.includes("youtu.be/")) {
      const videoId = videoLink.split("youtu.be/")[1].split("?")[0];
      embedLink = `https://www.youtube.com/embed/${videoId}`;
    }
    // Case 4: Handle YouTube Live Stream URL (https://www.youtube.com/live/VIDEO_ID)
    else if (videoLink.includes("youtube.com/live/")) {
      const videoId = new URL(videoLink).pathname.split("/live/")[1];
      embedLink = `https://www.youtube.com/embed/${videoId}`;
    }
    // Case 5: Unsupported format
    else {
      console.warn("Unsupported video link format:", videoLink);
      return;
    }

    console.log("Embed link:", embedLink);

    const videoContainer = document.getElementById("videoContainer");
    if (!videoContainer) {
      throw new Error("Missing 'videoContainer' element in HTML.");
    }

    // Create card and iframe for video
    const card = document.createElement("div");
    card.classList.add("card", "mb-4", "col");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const iframe = document.createElement("iframe");
    iframe.src = embedLink;
    iframe.classList.add("w-100", "mb-3");
    iframe.style.height = "200px";
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "true");

    cardBody.appendChild(iframe);

    const adminDeleteDiv = document.getElementById("DltBtn");
    if (adminDeleteDiv) {
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("btn", "btn-danger", "w-100", "mt-2");
      deleteButton.textContent = "Delete Video";
      deleteButton.onclick = () => deleteVideo(docId, card);

      cardBody.appendChild(deleteButton); 
    }

    card.appendChild(cardBody);
    videoContainer.appendChild(card);

  } catch (error) {
    console.error("Error displaying video:", error);
  }
}


async function deleteVideo(docId, card) {
  try {
    console.log("Deleting video with ID:", docId);
    await deleteDoc(doc(db, "videoLinks", docId)); // Delete document from Firestore
    card.remove(); // Remove the card from the DOM
    console.log("Video deleted successfully!");
  } catch (error) {
    console.error("Error deleting video: ", error);
  }
}
