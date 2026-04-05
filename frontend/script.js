const API_URL = "http://127.0.0.1:5000";
 
function sendMessage() {
    let input = document.getElementById("input");
    let msg = input.value;
 
    if (!msg) return;
 
    let chatBox = document.getElementById("chat-box");
 
    chatBox.innerHTML += `<p class="user">${msg}</p>`;
 
    fetch(API_URL + "/chat", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({message: msg, user: "demo"})
    })
    .then(res => res.json())
    .then(data => {
        chatBox.innerHTML += `<p class="bot">${data.reply}</p>`;
    });
 
    input.value = "";
}
 
function toggleDark() {
    document.body.classList.toggle("dark");
}
 
