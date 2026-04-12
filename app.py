# from flask import Flask

# # create app FIRST
# app = Flask(__name__)

# # import routes AFTER creating app
# from routes.home_routes import home_bp

# # register routes
# app.register_blueprint(home_bp)

# if __name__ == "__main__":
#     app.run(debug=True)

# # @app.route("/summarize", methods=["POST"])
# # def summarize():
# #     data = request.json
# #     text = data["text"]
# #     level = data["level"]

# #     prompt = f"""
# #     Break this news into 3 slides for a {level} level user.

# #     Each slide should have:
# #     - title
# #     - description (2-3 lines)

# #     News:
# #     {text}

# #     Return JSON format:
# #     [
# #       {{ "title": "...", "desc": "..." }},
# #       ...
# #     ]
# #     """

# #     response = openai.ChatCompletion.create(
# #         model="gpt-4o-mini",
# #         messages=[{"role": "user", "content": prompt}]
# #     )

# #     slides = eval(response.choices[0].message.content)

# #     return jsonify({ "slides": slides })
# @app.route("/summarize", methods=["POST"])
# def summarize():
#     data = request.json
#     text = data["text"]
#     level = data["level"]

#     if level == "beginner":
#         instruction = "Break into 3-4 slides. Each slide should be simple, detailed, and at least 60 words."
#     elif level == "intermediate":
#         instruction = "Break into 2-3 slides. Medium explanation, clear but not too long."
#     else:
#         instruction = "Break into 1-2 slides. Concise, technical, straight to the point."

#     prompt = f"""
#     You are an AI news explainer.

#     {instruction}

#     Rules:
#     - Each slide must have:
#       title (short)
#       desc (clear explanation)
#     - No truncated text
#     - No "..." or cut sentences
#     - Make it readable and meaningful

#     News:
#     {text}

#     Return ONLY JSON:
#     [
#       {{ "title": "...", "desc": "..." }},
#       ...
#     ]
#     """

#     response = client.chat.completions.create(
#         model="gpt-4o-mini",
#         messages=[{"role": "user", "content": prompt}]
#     )

#     return response.choices[0].message.content

from flask import Flask, request, jsonify
from routes.home_routes import home_bp
import os
from dotenv import load_dotenv
from openai import OpenAI
import json

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = Flask(__name__)
app.register_blueprint(home_bp)


@app.route("/summarize", methods=["POST"])
def summarize():
    try:
        data = request.json
        text = data.get("text", "")
        level = data.get("level", "beginner")

        # 🎯 LEVEL LOGIC
        if level == "beginner":
            instruction = "Create exactly 4 slides. Each slide must be 60-100 words. Explain in very simple language so a beginner understands clearly."
        elif level == "intermediate":
            instruction = "Create exactly 3 slides. Each slide must be around 60 words. Keep explanation clear but slightly detailed."
        else:
            instruction = "Create exactly 2 slides. Each slide must be around 60 words. Keep it concise and technical."

        prompt = f"""
        You are an AI news explainer.

        {instruction}

        STRICT RULES:
        - Each slide must have:
          title
          desc
        - No bullet points
        - No incomplete sentences
        - No "..." or truncation
        - Make explanation meaningful and easy to read

        News:
        {text}

        Return ONLY valid JSON like:
        [
          {{ "title": "Title 1", "desc": "Explanation..." }},
          {{ "title": "Title 2", "desc": "Explanation..." }}
        ]
        """

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}]
        )

        content = response.choices[0].message.content

        # 🔥 Convert string → JSON safely
        slides = json.loads(content)

        return jsonify(slides)

    except Exception as e:
        print("ERROR:", e)
        return jsonify({
            "error": "AI failed",
            "details": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)