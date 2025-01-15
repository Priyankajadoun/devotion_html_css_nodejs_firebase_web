
import { db } from "../../server/firebase.mjs"; 
// import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../../server/firebase.mjs";
// import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { onAuthStateChanged } from "firebase/auth";

 const videoForm = document.getElementById("video-form");

videoForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const videoLink = document.getElementById("video-link").value;

    try {
        await addDoc(collection(db, "videoLinks"), { link: videoLink });
        alert("वीडियो सफलतापूर्वक अपलोड हुआ!");
        videoForm.reset();
    } catch (error) {
        console.error("वीडियो अपलोड में समस्या:", error);
        alert("कुछ गड़बड़ी हो गई!");
    }
});




onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "admin-signin.html"; // यदि लॉगिन नहीं है, तो साइन-इन पेज पर भेजें
    } else {
        const allowedAdminEmail = "jadounpriyanka1@gmail.com";
        console.log("allowedAdminEmail:", allowedAdminEmail);
        console.log("user.email:", user.email); // Now, user.email is defined

        if (user.email !== allowedAdminEmail) {
            alert("आपको इस पेज तक पहुँचने की अनुमति नहीं है।");
            window.location.href = "index.html";
        }
    }
});
