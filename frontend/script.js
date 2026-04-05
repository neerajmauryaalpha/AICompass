const API_URL = "https://mpass-a9mn.onrender.com";
 
function typeEffect(text, element) {
    let i = 0;
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, 20);
        }
    }
    typing();
}
 
function sendMessage() {
    let input = document.getElementById("input");
    let msg = input.value.trim();
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
        let botMsg = document.createElement("p");
        botMsg.className = "bot";
        chatBox.appendChild(botMsg);
        typeEffect(data.reply, botMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
    });
 
    input.value = "";
}
 
function quickAsk(text) {
    document.getElementById("input").value = text;
    sendMessage();
}
 
// 🎤 Voice input
function startVoice() {
    let recognition = new webkitSpeechRecognition();
    recognition.onresult = function(event) {
        document.getElementById("input").value = event.results[0][0].transcript;
    };
    recognition.start();
}
