from flask import Blueprint, render_template, redirect, url_for

home_bp = Blueprint('home', __name__)

# ✅ LANDING PAGE (default)
@home_bp.route('/')
def landing():
    return render_template("landing.html")

# ✅ HOME PAGE (after explore)
@home_bp.route('/home')
def home():
    return render_template("home.html", active_page="home")

# ✅ LOGOUT → back to landing
@home_bp.route('/logout')
def logout():
    return redirect(url_for('home.landing'))
