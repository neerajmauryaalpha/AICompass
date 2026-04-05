// 🔗 IMPORTANT: Replace this with your Render backend URL
const API_URL = "https://aicompass-a9mn.onrender.com";
 
// 📩 Send message function
function sendMessage() {
    let input = document.getElementById("input");
    let msg = input.value.trim();
 
    if (!msg) return;
 
    let chatBox = document.getElementById("chat-box");
 
    // Show user message
    chatBox.innerHTML += `<p class="user">${msg}</p>`;
 
    // Call backend API
    fetch(API_URL + "/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: msg,
            user: "demo"
        })
    })
    .then(res => res.json())
    .then(data => {
        chatBox.innerHTML += `<p class="bot">${data.reply}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight; // auto scroll
    })
    .catch(err => {
        chatBox.innerHTML += `<p class="bot">⚠️ Error connecting to server</p>`;
        console.error(err);
    });
 
    // Clear input
    input.value = "";
}
 
// 🌙 Dark mode toggle
function toggleDark() {
    document.body.classList.toggle("dark");
}
 
// ⌨️ Enter key support
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("input");
 
    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
});
 
