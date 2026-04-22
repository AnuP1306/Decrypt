from flask import Flask, request, jsonify, render_template
from routes.home_routes import home_bp
from routes.opportunities_routes import opportunities   # samiksha ✅ added
from routes.auth_routes import auth_bp   # ✅ ADD THIS
from routes.tools_routes import tools_bp
import os
from dotenv import load_dotenv
import requests
from google import genai
import json
from datetime import datetime
import random

import time
import json
from groq import Groq


with open("static/data/fallback_news.json", "r") as f:
    FALLBACK_DATA = json.load(f)

SLIDES_CACHE = {}


# create app FIRST
app = Flask(__name__)
app.secret_key = "AIzaSyDfVRHh1CyuAaflxyiN4tBhb3K0LbzoWHg"   # 🔥 REQUIRED for session

def call_gemini_with_retry(model, prompt, retries=3, delay=2):
    for attempt in range(retries):
        try:
            response = client.models.generate_content(
                model=model,
                contents=prompt
            )
            return response.text
        except Exception as e:
            if "503" in str(e) and attempt < retries - 1:
                print(f"⚠️ Retry {attempt+1}, waiting {delay}s")
                time.sleep(delay)
                delay *= 2
            else:
                raise e
    return None

# ================= SETUP =================
load_dotenv()

app = Flask(__name__)
app.register_blueprint(home_bp)
app.register_blueprint(opportunities)   # samiksha ✅ added
app.register_blueprint(auth_bp)   # ✅ ADD THIS
app.register_blueprint(tools_bp)

# app.register_blueprint(opportunities)

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
GNEWS_API_KEY = os.getenv("GNEWS_API_KEY")
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

today = datetime.utcnow().strftime('%Y-%m-%d')


# ================= CHATBOT =================
@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_msg = data.get("message", "")

    system_prompt = f"""
    You are the AI assistant for a website called Decrypt.

    About Decrypt:
     - It simplifies complex news into easy explanations
     - It consists of only 3 domains for now which are AI, IT and Electronics 
     - Thers's a feature called daily brief/ today's brief
     - It uses Beginner, Intermediate, Advanced levels
     - It shows underrated AI tools
     - Helps users understand news clearly

    User: {user_msg}
    """

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=system_prompt
        )
        return jsonify({"reply": response.text})

    except Exception as e:
        print("❌ Chatbot Gemini failed:", e)
        return jsonify({"reply": "AI is currently busy. Please try again later."})


# ================= FETCH NEWS =================

# @app.route("/get-news", methods=["GET"])
# def get_news():
#     print("⚠️ Using FALLBACK NEWS (API limit hit)")

#     return jsonify({
#         "articles": FALLBACK_DATA
#     })

# temorarily removing otherwise works
@app.route("/get-news", methods=["GET"])
def get_news():

    queries = {
        "AI": "artificial intelligence OR machine learning OR deep learning",
        "IT": "software OR programming OR cybersecurity OR web development",
        "Electronics": "electronics OR semiconductor OR robotics OR IoT"
    }

    all_articles = []

    for domain, query in queries.items():
        url = f"https://gnews.io/api/v4/search?q={query}&lang=en&max=5&from={today}&sortby=publishedAt&apikey={GNEWS_API_KEY}"

        res = requests.get(url)
        data = res.json()

        if "articles" in data:
            for art in data["articles"]:
                all_articles.append({
                    "title": art.get("title", ""),
                    "desc": art.get("description", ""),
                    "content": art.get("content", ""),
                    "image": art.get("image"),
                    "domain": domain
                })

    # random.shuffle(all_articles)

    return jsonify({"articles": all_articles})

# @app.route("/get-news")
# def get_news():
#     print("🔥 get-news called")

#     return jsonify({
#         "articles": [
#             {
#                 "title": "Test News Working",
#                 "description": "If you see this, frontend is PERFECT",
#                 "image": "",
#                 "domain": "AI"
#             },
#             {
#                 "title": "Second Test",
#                 "description": "Static fallback",
#                 "image": "",
#                 "domain": "IT"
#             }
#         ]
#     })


# ================= GENERATE SLIDES =================
@app.route("/generate-slides", methods=["POST"])
def generate_slides():

    data = request.json
    index = data.get("index", 0)

    title = data.get("title", "")

    cache_key = title.strip().lower()

    # 🔥 CHECK CACHE FIRST
    if cache_key in SLIDES_CACHE:
        print(f"🟢 CACHE HIT for: {title}")
        return jsonify({
            "slides": SLIDES_CACHE[cache_key],
            "source": "cache"
        })
    desc = data.get("desc", "")
    content = data.get("content", "")

    full_text = f"{title}. {desc}. {content}"

    prompt = f"""
    You are an AI that converts news into swipeable learning cards.

    RULES:
    - Beginner: simple
    - Intermediate: balanced
    - Advanced: deeper (min 60 words)

    Each slide:
    - minimum 35 words
    - no cut sentences

    Return JSON EXACTLY like:
    {{
      "beginner": [{{"title": "...", "desc": "..."}}],
      "intermediate": [...],
      "advanced": [...]
    }}

    News:
    {full_text}
    """

    try:
        raw_text = call_gemini_with_retry("gemini-2.5-flash", prompt)

        if not raw_text:
            raise Exception("Gemini failed after retries")

        raw_text = raw_text.strip()
        # response = client.models.generate_content(
        #     model="gemini-2.5-flash",
        #     contents=prompt
        # )

        # raw_text = response.text.strip()

        if raw_text.startswith("```"):
            raw_text = raw_text.replace("```json", "").replace("```", "").strip()

        slides = json.loads(raw_text)
        SLIDES_CACHE[cache_key] = slides
        print(f"🔵 CACHE SAVED for: {title}")

        return jsonify({
            "slides": slides,
            "source": "gemini"
        })

    except Exception as e:
        print("❌ Gemini failed:", e)

        try:
            # fallback = FALLBACK_DATA[index]
            if index < len(FALLBACK_DATA):
                fallback = FALLBACK_DATA[index]
            else:
                fallback = FALLBACK_DATA[index % len(FALLBACK_DATA)]
            print(f"⚠️ Using FALLBACK for card index {index}")
            return jsonify({
                "slides": fallback["slides"],
                "source": "fallback"
            })
        except:
            print(f"⚠️ Fallback index missing: {index}")

        # 🔥 CURATED FALLBACK
        # fallback = None

        # for item in FALLBACK_DATA:
        #     for keyword in item["keywords"]:
        #         if keyword.lower() in title.lower():
        #             fallback = item
        #             break
        #     if fallback:
        #         break

        # if fallback:
        #     print(f"⚠️ Using FALLBACK for: {title}")
        #     return jsonify({
        #         "slides": fallback["slides"],
        #         "source": "fallback"
        #     })

        # 🛟 LAST RESORT (very rare)
        print(f"⚠️ No fallback match, using minimal safe fallback: {title}")

        return jsonify({
            "slides": {
                "beginner": [{"title": title, "desc": desc or title}],
                "intermediate": [{"title": title, "desc": desc or title}],
                "advanced": [{"title": title, "desc": desc or title}]
            }
        })
        # safe_text = desc if desc else content if content else title

        # return jsonify({
        #     "slides": {
        #         "beginner": [{"title": title, "desc": safe_text[:200]}],
        #         "intermediate": [{"title": title, "desc": safe_text[:150]}],
        #         "advanced": [{"title": title, "desc": safe_text[:300]}]
        #     }
        # })


# ================= ARTICLE CHAT =================
@app.route("/ask-article", methods=["POST"])
def ask_article():

    data = request.json

    question = data.get("question", "")
    # article = data.get("article", {})

    # title = article.get("title", "")
    # desc = article.get("desc", "")
    # content = article.get("content", "")

    article = data.get("article", "")

    full_text = article

    # full_text = f"{title}. {desc}. {content}"

    prompt = f"""
    You are a smart assistant.

    Answer using article + your knowledge if needed.

    ARTICLE:
    {full_text}

    QUESTION:
    {question}
    """

    try:
    #     response = client.models.generate_content(
    #         model="gemini-2.5-flash",
    #         contents=prompt
    #     )

    #     return jsonify({"reply": response.text})
        response = groq_client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    # "content": "You are a smart news assistant. Answer only based on the given article. Be clear, simple, and helpful."
                     "content": """
                    You are an intelligent and helpful news assistant.

                    - Use the provided article as your MAIN context.
                    - You may use general knowledge ONLY if it directly supports the article or is related to the article.
                    - Do NOT change topic or introduce unrelated domains.
                    - If question is outside the article, say so politely.
                    - If the article is incomplete, fill gaps intelligently.
                    - Do NOT say "according to the article" again and again.
                    - Speak naturally like a human in a friendly tone.
                    - Keep answers clear, simple, and slightly conversational.
                    - If comparison is asked, use general knowledge.
                    """
                },
                {
                    "role": "user",
                    "content": f"ARTICLE:\n{full_text}\n\nQUESTION:\n{question}"
                }
            ],
            temperature=0.7,
        )

        reply = response.choices[0].message.content

        return jsonify({"reply": reply})

    except Exception as e:
        print("❌ Groq failed:", e)
        return jsonify({"reply": "AI is currently unavailable."})

# ================= RUN =================
if __name__ == "__main__":
    app.run(debug=True)