from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import get_response
from auth import auth
from analytics import analytics
 
app = Flask(__name__)
CORS(app)
 
app.register_blueprint(auth)
app.register_blueprint(analytics)
 
chat_count = 0
 
@app.route("/chat", methods=["POST"])
def chat():
    global chat_count
    chat_count += 1
 
    data = request.json
    user = data.get("user", "guest")
    msg = data["message"]
 
    reply = get_response(user, msg)
 
    return jsonify({"reply": reply})
 
import os
 
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
