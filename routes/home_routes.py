from flask import Blueprint, render_template, redirect, url_for

home_bp = Blueprint('home', __name__)

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

home_bp = Blueprint('home', __name__)

# ✅ Home Page
@home_bp.route('/')
def landing():
    return render_template("landing.html")

# ✅ HOME PAGE (after explore)
@home_bp.route('/home')
def home():
    return render_template("home.html", active_page="home")

# LOGIN PAGE
@home_bp.route('/login')
def login():
    return render_template("login.html")

# ✅ LOGOUT → back to landing
@home_bp.route('/logout')
def logout():
    return redirect(url_for('home.landing'))


# ✅ Daily Brief Page
@home_bp.route('/daily-brief')
def daily_brief():
    return render_template("daily_brief.html", active_page="daily")
