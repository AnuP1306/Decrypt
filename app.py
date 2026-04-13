from flask import Flask

# create app FIRST
app = Flask(__name__)

# import routes AFTER creating app
from routes.home_routes import home_bp

# register routes
app.register_blueprint(home_bp)

if __name__ == "__main__":
    app.run(debug=True)