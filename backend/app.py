from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import get_response
from auth import auth
from analytics import analytics
import os
 
app = Flask(__name__)
CORS(app)
 
# Register blueprints
app.register_blueprint(auth)
app.register_blueprint(analytics)
 
# Chat counter
chat_count = 0
 
 
# 🏠 Home route (to avoid "Not Found")
@app.route("/")
def home():
    return "AICompass Backend Running 🚀"
 
 
# 🤖 Chat API
@app.route("/chat", methods=["POST"])
def chat():
    global chat_count
    chat_count += 1
 
    data = request.json
    user = data.get("user", "guest")
    msg = data.get("message", "")
 
    reply = get_response(user, msg)
 
    return jsonify({"reply": reply})
 
 
# 📊 Stats API
@app.route("/stats")
def stats():
    return jsonify({"total_chats": chat_count})
 
 
# 🚀 Run app (Render compatible)
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
