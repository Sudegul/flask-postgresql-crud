from flask import Blueprint, request, jsonify
from app.database.db import get_connection

user_bp = Blueprint("user_bp", __name__)

@user_bp.route("/add", methods=["POST"])
def add_user():
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO users (name, email, phone) VALUES (%s, %s, %s)",
        (data["name"], data["email"], data["phone"])
    )
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Kullanıcı başarıyla eklendi"}), 201

@user_bp.route("/list", methods=["GET"])
def list_users():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, email, phone FROM users")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    users = [{"id": r[0], "name": r[1], "email": r[2], "phone": r[3]} for r in rows]
    return jsonify(users)


from flask import render_template

@user_bp.route("/", methods=["GET"])
def index():
    return render_template("index.html")
