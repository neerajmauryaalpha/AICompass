from flask import Blueprint, jsonify
 
analytics = Blueprint("analytics", __name__)
 
chat_count = 0
 
@analytics.route("/stats")
def stats():
    return jsonify({"total_chats": chat_count})
