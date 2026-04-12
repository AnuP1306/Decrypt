from flask import Flask

# create app FIRST
app = Flask(__name__)

# import routes AFTER creating app
from routes.home_routes import home_bp
from routes.opportunities_routes import opportunities   # samiksha ✅ added


# register routes
app.register_blueprint(home_bp)
app.register_blueprint(opportunities)   # samiksha ✅ added

if __name__ == "__main__":
    app.run(debug=True)