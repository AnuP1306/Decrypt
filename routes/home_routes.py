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
def home():
    return render_template("home.html", active_page="home")


# ✅ Daily Brief Page
@home_bp.route('/daily-brief')
def daily_brief():
    return render_template("daily_brief.html", active_page="daily")


# ✅ Logout (optional for now)
@home_bp.route("/logout")
def logout():
    return redirect("/")