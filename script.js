// let loggedInUser = "";
// const userDatabase = {
//     "rakib": "0177",
//     "monir": "5858",
//     "bayezid": "1234",
//     "admin": "12345"
// };
let loggedInUser = "";

// ইউজার ডাটাবেস (ছবির নামসহ আপডেট করা)
const userDatabase = {
    "zaman": { pass: "1357", img: "IMAGE/zaman.jpg" },
    "rakib": { pass: "0177", img: "RAKIB.jpg" },
    "monir": { pass: "5858", img: "IMAGE/monir.jpg" },
    "bayezid": { pass: "1234", img: "https://i.pravatar.cc/150?u=bayezid" },
    "admin": { pass: "12345", img: "https://i.pravatar.cc/150?u=admin" }
};

// --- পেজ লোড হওয়ার সময় চেক করবে আগে লগইন করা আছে কি না ---
window.onload = function () {
    const savedUser = localStorage.getItem('activeUser'); // localStorage ব্যবহার করা হয়েছে
    if (savedUser) {
        loggedInUser = savedUser;
        showMainContent();
    }
};

function showMainContent() {
    // যদি আপনি আলাদা login.html ব্যবহার করেন তবে নিচের চেকটি লাগবে
    const loginScreen = document.getElementById('login-screen');
    const mainContent = document.getElementById('main-content');

    if (loginScreen) loginScreen.style.display = 'none';
    if (mainContent) mainContent.style.display = 'block';
}

// Login function
function checkLogin() {
    const u = document.getElementById('username').value.toLowerCase();
    const p = document.getElementById('password').value;

    if (userDatabase[u] && userDatabase[u].pass === p) {
        loggedInUser = u;
        // localStorage এ সেভ করলে ব্রাউজার বন্ধ করলেও লগইন থাকবে
        localStorage.setItem('activeUser', u);

        // যদি আলাদা ফাইলে থাকে তবে রিডাইরেক্ট হবে
        if (document.getElementById('main-content')) {
            showMainContent();
        } else {
            window.location.href = "index.html";
        }
    } else {
        document.getElementById('err').style.display = 'block';
    }
}

// Logout function
function logout() {
    localStorage.removeItem('activeUser'); // ডাটা মুছে ফেলা
    window.location.href = "login.html"; // লগইন পেজে ফেরত পাঠানো
}

// প্রোফাইল ফাংশন (ডাইনামিক ইমেজের জন্য)
function showProfile() {
    const userData = userDatabase[loggedInUser];
    if (userData) {
        document.getElementById('pName').innerText = loggedInUser.toUpperCase();
        document.getElementById('pID').innerText = loggedInUser + "@azim&son.com";
        document.getElementById('pImg').src = userData.img; // ডাটাবেস থেকে ছবি নিবে
        document.getElementById('profileModal').style.display = 'flex';
    }
}

// মেনু টগল
function toggleMenu() {
    const m = document.getElementById('dotsMenu');
    if (m) m.style.display = (m.style.display === 'block') ? 'none' : 'block';
}

// মডাল বন্ধ করা
function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

window.onclick = function (e) {
    if (!e.target.matches('.dots-btn')) {
        const menu = document.getElementById('dotsMenu');
        if (menu) menu.style.display = 'none';
    }
}


// --- Settings Functions ---

// ১. সেটিংস মডাল ওপেন করা
function showSettings() {
    document.getElementById('settingsModal').style.display = 'flex';
}

// ২. মডাল বন্ধ করা (সব মডালের জন্য কমন)
function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

// ৩. ডার্ক মোড টগল (এটি বডিতে 'dark-mode' ক্লাস যোগ করবে)
function toggleDark() {
    document.body.classList.toggle('dark-mode');

    // ডার্ক মোড সেভ করে রাখা (যাতে রিলোড দিলেও না যায়)
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

// ৪. টেক্সট জুম ইন/আউট
let currentSize = 16; // ডিফল্ট সাইজ
function zoom(n) {
    currentSize += n;
    // লিমিট সেট করা (খুব ছোট বা খুব বড় যেন না হয়)
    if (currentSize < 12) currentSize = 12;
    if (currentSize > 24) currentSize = 24;

    // সম্পূর্ণ সাইটের জন্য ফন্ট সাইজ পরিবর্তন
    document.documentElement.style.fontSize = currentSize + 'px';
}

// পেজ লোড হওয়ার সময় আগের ডার্ক মোড চেক করা
window.addEventListener('load', () => {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});


