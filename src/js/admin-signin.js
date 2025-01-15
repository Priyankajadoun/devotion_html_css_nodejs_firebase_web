// import { auth } from "../firebase";
import { auth } from '../../server/firebase.mjs';  // Ensure the path to firebase.js is correct
// import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { signInWithEmailAndPassword } from "firebase/auth";

const signinForm = document.getElementById("signin-form");
const errorMessage = document.getElementById("error-message");

signinForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    console.log(email);
    const password = document.getElementById("password").value;
    console.log(password);

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("साइन-इन सफल:", userCredential.user);
        // एडमिन पैनल पर रीडायरेक्ट करें
        window.location.href = "admin.html";
    } catch (error) {
        console.error("साइन-इन त्रुटि:", error.message);
        errorMessage.textContent = "साइन-इन विफल! कृपया सही ईमेल और पासवर्ड दर्ज करें।";
    }
});
