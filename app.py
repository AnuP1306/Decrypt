from flask import Flask

# create app FIRST
app = Flask(__name__)
app.secret_key = "AIzaSyDfVRHh1CyuAaflxyiN4tBhb3K0LbzoWHg"   # 🔥 REQUIRED for session

# import routes AFTER creating app
from routes.home_routes import home_bp
from routes.opportunities_routes import opportunities   # samiksha ✅ added
from routes.auth_routes import auth_bp   # ✅ ADD THIS
from routes.tools_routes import tools_bp

# register routes
app.register_blueprint(home_bp)
app.register_blueprint(opportunities)   # samiksha ✅ added
app.register_blueprint(auth_bp)   # ✅ ADD THIS
app.register_blueprint(tools_bp)


if __name__ == "__main__":
    app.run(debug=True)