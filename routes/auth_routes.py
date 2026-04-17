from flask import Blueprint, request, jsonify, session, render_template
from utils.firebase_admin import verify_token, db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/verify-token', methods=['POST'])
def verify_user():
    data = request.get_json()
    id_token = data.get('token')

    decoded = verify_token(id_token)

    if not decoded:
        return jsonify({"status": "error"}), 401

    session['user'] = decoded['uid']

    return jsonify({"status": "success"})

# 🧾 Signup page route (ADD THIS)
@auth_bp.route('/signup')
def signup_page():
    return render_template('signup.html')

# 🚀 Onboarding Step 1
@auth_bp.route('/onboarding1')
def onboarding1():
    return render_template('onboarding1.html')

@auth_bp.route('/onboarding2')
def onboarding2():
    return render_template('onboarding2.html')

@auth_bp.route('/onboarding3')
def onboarding3():
    return render_template('onboarding3.html')

@auth_bp.route('/save-onboarding', methods=['POST'])
def save_onboarding():
    user_id = session.get('user')

    if not user_id:
        return jsonify({"error": "Not logged in"}), 401

    data = request.get_json()

    db.collection('users').document(user_id).set({
        "interests": data.get("step1"),
        "level": data.get("step2"),
        "topics": data.get("step3")
    }, merge=True)

    return jsonify({"status": "saved"})


# 🔐 Login page route (optional but clean)
@auth_bp.route('/login')
def login_page():
    return render_template('login.html')

@auth_bp.route('/test-db')
def test_db():
    db.collection("test").add({"hello": "world"})
    return "ok"