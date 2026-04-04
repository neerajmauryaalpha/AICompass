from flask import Blueprint, request, jsonify
import sqlite3
 
auth = Blueprint("auth", __name__)
 
def connect_db():
    return sqlite3.connect("users.db")
 
@auth.route("/signup", methods=["POST"])
def signup():
    data = request.json
    conn = connect_db()
    cur = conn.cursor()
 
    cur.execute("CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT)")
    cur.execute("INSERT INTO users VALUES (?, ?)", (data["username"], data["password"]))
 
    conn.commit()
    conn.close()
 
    return jsonify({"msg": "User created"})
 
@auth.route("/login", methods=["POST"])
def login():
    data = request.json
    conn = connect_db()
    cur = conn.cursor()
 
    cur.execute("SELECT * FROM users WHERE username=? AND password=?",
                (data["username"], data["password"]))
    user = cur.fetchone()
 
    return jsonify({"success": bool(user)})
