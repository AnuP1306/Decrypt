from flask import Blueprint, render_template

home_bp = Blueprint('home', __name__)

@home_bp.route('/')
def landing():
   return render_template("landing.html")

@home_bp.route('/home')
def home():
   return render_template("home.html", active_page="home")
