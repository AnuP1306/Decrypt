from flask import Blueprint, render_template, redirect, url_for, session

# ✅ LANDING PAGE (default)
# from flask import Blueprint, render_template

# home_bp = Blueprint('home', __name__)

# @home_bp.route('/')
# def home():
#     # return render_template('home.html')
#     return render_template("home.html", active_page="home")
#     return render_template("daily_brief.html", active_page="daily")
#     # return render_template("opportunities.html", active_page="opportunities")

# # @home_bp.route("/logout")
# # def logout():
# #     return redirect("/")

from flask import Blueprint, render_template, redirect
import json
import os

home_bp = Blueprint('home', __name__)

# ✅ Home Page
@home_bp.route('/')
def landing():
    return render_template("landing.html")

# ✅ HOME PAGE (after explore)
@home_bp.route('/home')
def home():

    # 🔥 LOAD JSON FROM FILE
    file_path = os.path.join("static", "data", "fallback_news.json")

    with open(file_path, "r", encoding="utf-8") as f:
        fallback_data = json.load(f)

    return render_template(
        "home.html",
        active_page="home",
        fallback_data=fallback_data
    )
# @home_bp.route('/home')
# def home():
#     return render_template("home.html", active_page="home", fallback_data=FALLBACK_DATA)

# LOGIN PAGE
@home_bp.route('/login')
def login():
    return render_template("login.html")

# ✅ LOGOUT → back to landing
@home_bp.route('/logout')
def logout():
    return redirect(url_for('home.landing'))

# LOGOUT → recommended to clear session in auth_routes.py and then redirect here

# @home_bp.route('/logout')
# def logout():
#     session.clear()   # 🔥 important
#     return redirect(url_for('home.landing'))


# ✅ Daily Brief Page
@home_bp.route('/daily-brief')
def daily_brief():
    return render_template("daily_brief.html", active_page="daily")
