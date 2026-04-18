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

# from flask import Flask, request, jsonify
# from routes.home_routes import home_bp
# import os
# from dotenv import load_dotenv
# from openai import OpenAI
# import json

# load_dotenv()

# client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# app = Flask(__name__)
# app.register_blueprint(home_bp)


# @app.route("/summarize", methods=["POST"])
# def summarize():
#     try:
#         data = request.json
#         text = data.get("text", "")
#         level = data.get("level", "beginner")

#         # 🎯 LEVEL LOGIC
#         if level == "beginner":
#             instruction = "Create exactly 4 slides. Each slide must be 60-100 words. Explain in very simple language so a beginner understands clearly."
#         elif level == "intermediate":
#             instruction = "Create exactly 3 slides. Each slide must be around 60 words. Keep explanation clear but slightly detailed."
#         else:
#             instruction = "Create exactly 2 slides. Each slide must be around 60 words. Keep it concise and technical."

#         prompt = f"""
#         You are an AI news explainer.

#         {instruction}

#         STRICT RULES:
#         - Each slide must have:
#           title
#           desc
#         - No bullet points
#         - No incomplete sentences
#         - No "..." or truncation
#         - Make explanation meaningful and easy to read

#         News:
#         {text}

#         Return ONLY valid JSON like:
#         [
#           {{ "title": "Title 1", "desc": "Explanation..." }},
#           {{ "title": "Title 2", "desc": "Explanation..." }}
#         ]
#         """

#         response = client.chat.completions.create(
#             model="gpt-4o-mini",
#             messages=[{"role": "user", "content": prompt}]
#         )

#         content = response.choices[0].message.content

#         # 🔥 Convert string → JSON safely
#         slides = json.loads(content)

#         return jsonify(slides)

#     except Exception as e:
#         print("ERROR:", e)
#         return jsonify({
#             "error": "AI failed",
#             "details": str(e)
#         }), 500


# if __name__ == "__main__":
#     app.run(debug=True)


# in this version right sidebar chatbot was working

# from flask import Flask, request, jsonify
# from routes.home_routes import home_bp
# import os
# from dotenv import load_dotenv
# import requests


# # ================= SETUP =================
# load_dotenv()

# app = Flask(__name__)
# app.register_blueprint(home_bp)

# # 🔑 Gemini API Key
# GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# from google import genai
# import os

# client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


# @app.route("/chat", methods=["POST"])
# def chat():
#     try:
#         data = request.json
#         user_msg = data.get("message", "")

#         # 🔥 CONTEXT (VERY IMPORTANT FOR YOUR PROJECT)
#         system_prompt = f"""
#         You are the AI assistant for a website called Decrypt.

#         About Decrypt:
#         - It simplifies complex news into easy explanations
#         - It consists of only 3 domains for now which are AI, IT and Electronics 
#         - Thers's a feature called daily brief/ today's brief which consists of news from all domains all over the world it basically tells the user what is happening in the world on that particular day
#         - It uses Beginner, Intermediate, Advanced levels in the news cards 
#         - It shows underrated AI tools and normal websites in Tools Library
#         - It helps users understand news clearly without jargon
#         - the student opportunities feature consists of free courses/ pro version of tools which students can access using their student identity additionally it also has workshops free for students

#         Answer like a helpful assistant inside this app.

#         User: {user_msg}
#         """

#         # ✅ USE WORKING MODEL FROM YOUR LIST
#         response = client.models.generate_content(
#             model="gemini-2.5-flash",
#             contents=system_prompt
#         )

#         reply = response.text

#         return jsonify({"reply": reply})

#     except Exception as e:
#         print("ERROR:", e)
#         return jsonify({
#             "reply": "AI not working right now."
#         })

# # ================= RUN APP =================
# if __name__ == "__main__":
#     app.run(debug=True)

# working version was till here 

# from flask import Flask, request, jsonify
# from routes.home_routes import home_bp
# import os
# from dotenv import load_dotenv
# import requests
# from google import genai

# # ================= SETUP =================
# load_dotenv()

# app = Flask(__name__)
# app.register_blueprint(home_bp)

# client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# GNEWS_API_KEY = os.getenv("GNEWS_API_KEY")


# # ================= CHATBOT =================
# @app.route("/chat", methods=["POST"])
# def chat():
#     try:
#         data = request.json
#         user_msg = data.get("message", "")

#         system_prompt = f"""
#         You are the AI assistant for a website called Decrypt.

#         About Decrypt:
#          - It simplifies complex news into easy explanations
#          - It consists of only 3 domains for now which are AI, IT and Electronics 
#          - Thers's a feature called daily brief/ today's brief which consists of news from all domains all over the world it basically tells the user what is happening in the world on that particular day
#          - It uses Beginner, Intermediate, Advanced levels in the news cards 
#          - It shows underrated AI tools and normal websites in Tools Library
#          - It helps users understand news clearly without jargon
#          - the student opportunities feature consists of free courses/ pro version of tools which students can access using their student identity additionally it also has workshops free for students


#         User: {user_msg}
#         """

#         response = client.models.generate_content(
#             model="gemini-2.5-flash",
#             contents=system_prompt
#         )

#         return jsonify({"reply": response.text})

#     except Exception as e:
#         print("ERROR:", e)
#         return jsonify({"reply": "AI not working right now."})


# # ================= FETCH NEWS =================
# @app.route("/get-news", methods=["GET"])
# def get_news():
#     try:
#         category = request.args.get("category", "AI")

#         query_map = {
#             "AI": "artificial intelligence OR AI",
#             "IT": "software OR technology",
#             "Electronics": "electronics OR hardware OR semiconductor"
#         }

#         query = query_map.get(category, "technology")

#         url = f"https://gnews.io/api/v4/search?q={query}&lang=en&max=5&apikey={GNEWS_API_KEY}"

#         res = requests.get(url)
#         data = res.json()

#         if "articles" not in data or len(data["articles"]) == 0:
#             return jsonify({"error": "No news found"})

#         article = data["articles"][0]

#         title = article.get("title", "")
#         desc = article.get("description", "")
#         content = article.get("content", "")

#         full_text = f"{title}. {desc}. {content}"

#         # ================= GEMINI PROCESS =================
#         prompt = f"""
#         You are an AI that converts news into slide format.

#         RULES:
#         - Beginner: simple, detailed, multiple slides
#         - Intermediate: medium detail
#         - Advanced: concise

#         Each slide:
#         - max 30 words
#         - complete meaning
#         - no cut sentences
#         - no "..."

#         Return JSON EXACTLY like:
#         {{
#           "beginner": [{{"title": "...", "desc": "..."}}],
#           "intermediate": [...],
#           "advanced": [...]
#         }}

#         News:
#         {full_text}
#         """

#         # response = client.models.generate_content(
#         #     model="gemini-2.5-flash",
#         #     contents=prompt
#         # )

#         # import json
#         # slides = json.loads(response.text)
#         response = client.models.generate_content(
#     model="gemini-2.5-flash",
#     contents=prompt
# )

# import json

# raw_text = response.text.strip()

# # 🔥 REMOVE ```json and ```
# if raw_text.startswith("```"):
#     raw_text = raw_text.replace("```json", "").replace("```", "").strip()

# print("AI RAW RESPONSE:", raw_text)  # DEBUG

# slides = json.loads(raw_text)

#         return jsonify({
#             "slides": slides,
#             "image": article.get("image")
#         })

#     except Exception as e:
#         print("ERROR:", e)
#         return jsonify({"error": "Failed to fetch news"})


# # ================= RUN =================
# if __name__ == "__main__":
#     app.run(debug=True)

# from flask import Flask, request, jsonify
# from routes.home_routes import home_bp
# import os
# from dotenv import load_dotenv
# import requests
# from google import genai
# import json
# from datetime import datetime

# today = datetime.utcnow().strftime('%Y-%m-%d')

# # ================= SETUP =================
# load_dotenv()

# app = Flask(__name__)
# app.register_blueprint(home_bp)

# client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
# GNEWS_API_KEY = os.getenv("GNEWS_API_KEY")


# # ================= CHATBOT =================
# @app.route("/chat", methods=["POST"])
# def chat():
#     data = request.json
#     user_msg = data.get("message", "")

#     system_prompt = f"""
#     You are the AI assistant for a website called Decrypt.

#     About Decrypt:
#      - It simplifies complex news into easy explanations
#      - It consists of only 3 domains for now which are AI, IT and Electronics 
#      - Thers's a feature called daily brief/ today's brief which consists of news from all domains all over the world it basically tells the user what is happening in the world on that particular day
#      - It uses Beginner, Intermediate, Advanced levels in the news cards 
#      - It shows underrated AI tools and normal websites in Tools Library
#      - It helps users understand news clearly without jargon
#      - the student opportunities feature consists of free courses/ pro version of tools which students can access using their student identity additionally it also has workshops free for students

#     User: {user_msg}
#     """

#     response = client.models.generate_content(
#         model="gemini-2.5-flash",
#         contents=system_prompt
#     )

#     return jsonify({"reply": response.text})


# # ================= FETCH NEWS =================
# @app.route("/get-news", methods=["GET"])
# def get_news():

#     category = request.args.get("category", "AI")

#     query_map = {
#         "AI": "artificial intelligence OR AI",
#         "IT": "software OR technology",
#         "Electronics": "electronics OR hardware OR semiconductor"
#     }

#     query = query_map.get(category, "technology")

#     # url = f"https://gnews.io/api/v4/search?q={query}&lang=en&max=5&apikey={GNEWS_API_KEY}"
#     url = f"https://gnews.io/api/v4/search?q={query}&lang=en&max=20&from={today}&sortby=publishedAt&apikey={GNEWS_API_KEY}"

#     res = requests.get(url)
#     data = res.json()

#     if "articles" not in data or len(data["articles"]) == 0:
#         return jsonify({"error": "No news found"})

#     article = data["articles"][:15]

#     title = article.get("title", "")
#     desc = article.get("description", "")
#     content = article.get("content", "")

#     full_text = f"{title}. {desc}. {content}"

#     # ================= GEMINI PROCESS =================
#     prompt = f"""
#     You are an AI that converts news into slide format.

#     RULES:
#     - Beginner: simple, detailed, multiple slides
#     - Intermediate: medium detail
#     - Advanced: concise

#     Each slide:
#     - minimum 35 words
#     - must fully explain the idea clearly
#     - no cut sentences
#     - no "..."

#     Additional rules:
#     - Beginner slides should be simple and detailed
#     - Intermediate slides should be balanced (not too short and not too detailed)
#     - Advanced slides MUST be at least 60 words for each article (could be more if needed) and language can be technical  
#     - Ensure explanation is meaningful and not too short

#     Return JSON EXACTLY like:
#     {{
#       "beginner": [{{"title": "...", "desc": "..."}}],
#       "intermediate": [...],
#       "advanced": [...]
#     }}

#     News:
#     {full_text}
#     """

#     response = client.models.generate_content(
#         model="gemini-2.5-flash",
#         contents=prompt
#     )

#     raw_text = response.text.strip()

#     # 🔥 CLEAN RESPONSE
#     if raw_text.startswith("```"):
#         raw_text = raw_text.replace("```json", "").replace("```", "").strip()

#     print("AI RAW RESPONSE:", raw_text)

#     slides = json.loads(raw_text)

#     return jsonify({
#         "slides": slides,
#         "image": article.get("image")
#     })


# # ================= RUN =================
# if __name__ == "__main__":
#     app.run(debug=True)

# in this version the fallbacks don't work properly 
# this works properly but it has one error

# from flask import Flask, request, jsonify
# from routes.home_routes import home_bp
# import os
# from dotenv import load_dotenv
# import requests
# from google import genai
# import json
# from datetime import datetime
# import random

# # ================= SETUP =================
# load_dotenv()

# app = Flask(__name__)
# app.register_blueprint(home_bp)

# client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
# GNEWS_API_KEY = os.getenv("GNEWS_API_KEY")

# today = datetime.utcnow().strftime('%Y-%m-%d')


# # ================= CHATBOT (UNCHANGED) =================
# @app.route("/chat", methods=["POST"])
# def chat():
#     data = request.json
#     user_msg = data.get("message", "")

#     system_prompt = f"""
#     You are the AI assistant for a website called Decrypt.

#     About Decrypt:
#      - It simplifies complex news into easy explanations
#      - It consists of only 3 domains for now which are AI, IT and Electronics 
#      - Thers's a feature called daily brief/ today's brief which consists of news from all domains all over the world it basically tells the user what is happening in the world on that particular day
#      - It uses Beginner, Intermediate, Advanced levels in the news cards 
#      - It shows underrated AI tools and normal websites in Tools Library
#      - It helps users understand news clearly without jargon
#      - the student opportunities feature consists of free courses/ pro version of tools which students can access using their student identity additionally it also has workshops free for students

#     User: {user_msg}
#     """

#     response = client.models.generate_content(
#         model="gemini-2.5-flash",
#         contents=system_prompt
#     )

#     return jsonify({"reply": response.text})


# # ================= FETCH MULTI-DOMAIN NEWS =================
# @app.route("/get-news", methods=["GET"])
# def get_news():

#     queries = {
#         "AI": "artificial intelligence OR machine learning OR deep learning",
#         "IT": "software OR programming OR cybersecurity OR web development",
#         "Electronics": "electronics OR semiconductor OR robotics OR IoT"
#     }

#     all_articles = []

#     for domain, query in queries.items():
#         url = f"https://gnews.io/api/v4/search?q={query}&lang=en&max=5&from={today}&sortby=publishedAt&apikey={GNEWS_API_KEY}"

#         res = requests.get(url)
#         data = res.json()

#         if "articles" in data:
#             for art in data["articles"]:
#                 all_articles.append({
#                     "title": art.get("title", ""),
#                     "desc": art.get("description", ""),
#                     "content": art.get("content", ""),
#                     "image": art.get("image"),
#                     "domain": domain
#                 })

#     random.shuffle(all_articles)

#     return jsonify({
#         "articles": all_articles
#     })


# # ================= GENERATE SLIDES (AI FOR ONE ARTICLE) =================
# # this version works fine but uses only one ai model 
# @app.route("/generate-slides", methods=["POST"])
# def generate_slides():

#     data = request.json

#     title = data.get("title", "")
#     desc = data.get("desc", "")
#     content = data.get("content", "")

#     full_text = f"{title}. {desc}. {content}"

#     # 🔥 NEWS AI (NO DECRYPT CONTEXT HERE)
#     prompt = f"""
#     You are an AI that converts news into swipeable learning cards for a modern Gen-Z news app.

#     Your goal:
#     - Help users understand the news clearly
#     - Break complex ideas into simple explanations
#     - Maintain logical flow across slides

#     RULES:
#     - Beginner: simple, very clear, no jargon
#     - Intermediate: balanced explanation
#     - Advanced: deeper and slightly technical

#     Each slide:
#     - minimum 35 words
#     - must fully explain one idea
#     - no cut sentences
#     - no "..."

#     Additional rules:
#     - Beginner slides should feel like teaching a 15 to 18 year-old
#     - Intermediate should feel like explaining to a college student
#     - Advanced must be at least 60 words and provide deeper insight, additionally these slides should not have more content keep it concise and straight to the point
#     - Ensure the explanation flows logically across slides
#     - basically beginner slide should have the most detailed explanation so naturally more slides, intermediate ones should be smaller than beginner and less detailed and lastly for the advanced ones keep it even less detailed than the intermediate one cause experienced people do not need in depth explanations 

#     Return JSON EXACTLY like:
#     {{
#       "beginner": [{{"title": "...", "desc": "..."}}],
#       "intermediate": [...],
#       "advanced": [...]
#     }}

#     News:
#     {full_text}
#     """

#     response = client.models.generate_content(
#         model="gemini-2.5-flash",
#         contents=prompt
#     )

#     raw_text = response.text.strip()

#     if raw_text.startswith("```"):
#         raw_text = raw_text.replace("```json", "").replace("```", "").strip()

#     print("AI RAW RESPONSE:", raw_text)

#     slides = json.loads(raw_text)

#     return jsonify({"slides": slides})

# # @app.route("/generate-slides", methods=["POST"])
# # def generate_slides():

# #     data = request.json

# #     title = data.get("title", "")
# #     desc = data.get("description", "")
# #     content = data.get("content", "")

# #     full_text = f"{title}. {desc}. {content}"

# #     prompt = f"""
# #     You are an AI that converts news into swipeable learning cards for a modern Gen-Z news app.
# #     Your goal:
# #      - Help users understand the news clearly
# #      - Break complex ideas into simple explanations
# #      - Maintain logical flow across slides


# #     RULES:
# #     - Beginner: simple, detailed
# #     - Intermediate: medium detail
# #     - Advanced: MUST be at least 60 words

# #     Each slide:
# #     - minimum 35 words
# #     - complete explanation
# #     - no cut sentences
# #     - no "..."

# #     Additional rules:
# #      - Beginner slides should feel like teaching a 15 to 18 year-old
# #      - Intermediate should feel like explaining to a college student
# #      - Advanced must be at least 60 words and provide deeper insight, additionally these slides should not have more content keep it concise and straight to the point
# #      - Ensure the explanation flows logically across slides
# #      - basically beginner slide should have the most detailed explanation so naturally more slides, intermediate ones should be smaller than beginner and less detailed and lastly for the advanced ones keep it even less detailed than the intermediate one cause experienced people do not need in depth explanations 

# #     Return JSON EXACTLY:
# #     {{
# #       "beginner": [{{"title": "...", "desc": "..."}}],
# #       "intermediate": [...],
# #       "advanced": [...]
# #     }}

# #     News:
# #     {full_text}
# #     """

# #     # ================= 1️⃣ GEMINI =================
# #     try:
# #         response = client.models.generate_content(
# #             model="gemini-2.5-flash",
# #             contents=prompt
# #         )

# #         raw = response.text.strip()

# #         if raw.startswith("```"):
# #             raw = raw.replace("```json", "").replace("```", "").strip()

# #         return jsonify({"slides": json.loads(raw)})

# #     except Exception as e:
# #         print("❌ Gemini failed:", e)


# #     # ================= 2️⃣ OPENROUTER (MISTRAL) =================
# #     try:
# #         headers = {
# #             "Authorization": f"Bearer {os.getenv('OPENROUTER_API_KEY')}",
# #             "Content-Type": "application/json"
# #         }

# #         body = {
# #             "model": "mistralai/mistral-7b-instruct",
# #             "messages": [{"role": "user", "content": prompt}]
# #         }

# #         res = requests.post(
# #             "https://openrouter.ai/api/v1/chat/completions",
# #             headers=headers,
# #             json=body
# #         )

# #         data = res.json()
# #         raw = data["choices"][0]["message"]["content"]

# #         if raw.startswith("```"):
# #             raw = raw.replace("```json", "").replace("```", "").strip()

# #         return jsonify({"slides": json.loads(raw)})

# #     except Exception as e:
# #         print("❌ Mistral failed:", e)


# #     # ================= 3️⃣ OPENROUTER (LLAMA) =================
# #     try:
# #         headers = {
# #             "Authorization": f"Bearer {os.getenv('OPENROUTER_API_KEY')}",
# #             "Content-Type": "application/json"
# #         }

# #         body = {
# #             "model": "meta-llama/llama-3-8b-instruct",
# #             "messages": [{"role": "user", "content": prompt}]
# #         }

# #         res = requests.post(
# #             "https://openrouter.ai/api/v1/chat/completions",
# #             headers=headers,
# #             json=body
# #         )

# #         data = res.json()
# #         raw = data["choices"][0]["message"]["content"]

# #         if raw.startswith("```"):
# #             raw = raw.replace("```json", "").replace("```", "").strip()

# #         return jsonify({"slides": json.loads(raw)})

# #     except Exception as e:
# #         print("❌ Llama failed:", e)


# #     # ================= 4️⃣ FINAL FALLBACK =================
# #     # print("⚠️ Using final fallback")

# #     # return jsonify({
# #     #     "slides": {
# #     #         "beginner": [{
# #     #             "title": title,
# #     #             "desc": desc if desc else "No description available."
# #     #         }],
# #     #         "intermediate": [{
# #     #             "title": title,
# #     #             "desc": desc if desc else "No description available."
# #     #         }],
# #     #         "advanced": [{
# #     #             "title": title,
# #     #             "desc": content[:200] if content else "No detailed content available."
# #     #         }]
# #     #     }
# #     # })

# #     print("⚠️ Using final fallback")

# # # 🔥 SMART TEXT BUILDING
# #     safe_text = ""

# #     if desc and desc != "No description available.":
# #         safe_text += desc + " "

# #     if content:
# #         safe_text += content

# #     if not safe_text.strip():
# #         safe_text = title  # last fallback

# #     return jsonify({
# #     "slides": {
# #         "beginner": [{
# #             "title": title,
# #             "desc": safe_text[:200]
# #         }],
# #         "intermediate": [{
# #             "title": title,
# #             "desc": safe_text[:150]
# #         }],
# #         "advanced": [{
# #             "title": title,
# #             "desc": safe_text[:300]
# #         }]
# #     }
# # })

# @app.route("/article-chat", methods=["POST"])
# def article_chat():

#     data = request.json

#     question = data.get("question", "")
#     article = data.get("article", {})

#     title = article.get("title", "")
#     desc = article.get("description", "")
#     content = article.get("content", "")

#     full_text = f"{title}. {desc}. {content}"

#     prompt = f"""
#     You are an AI assistant.

#     You MUST answer ONLY based on the article below.

#     If the question is outside the article, say:
#     "This is not mentioned in the article."

#     ARTICLE:
#     {full_text}

#     QUESTION:
#     {question}
#     """

#     response = client.models.generate_content(
#         model="gemini-2.5-flash",
#         contents=prompt
#     )

#     return jsonify({
#         "reply": response.text
#     })


# @app.route("/ask-article", methods=["POST"])
# def ask_article():

#     data = request.json

#     question = data.get("question", "")
#     article_text = data.get("article", "")

#     # prompt = f"""
#     # You are an AI assistant.

#     # You MUST answer ONLY using the article below.
#     # Do NOT make up information.
#     # If answer is not present, say: "This is not mentioned in the article."

#     # ARTICLE:
#     # {article_text}

#     # QUESTION:
#     # {question}
#     # """
# #     prompt = f"""
# # You are an intelligent AI assistant helping users understand a news article.

# # Your job:
# # - Answer questions based on the article
# # - If the answer is clearly in the article → use it
# # - If the question is related but not directly answered → use your general knowledge BUT keep it relevant to the article topic
# # - If the question is completely unrelated → say: "This is not related to the article."

# # Guidelines:
# # - Be clear and helpful
# # - Keep answers easy to understand
# # - Do NOT be overly strict
# # - Do NOT say "not mentioned" if you can reasonably explain it

# # ARTICLE:
# # {article_text}

# # QUESTION:
# # {question}
# # """
#     prompt = f"""
# You are a smart and friendly AI assistant helping users understand a news article.

# Your behavior rules:

# 1. Understand user intent first:
#    - If the message is casual (like "ok", "ohh", "thanks") → respond naturally and briefly
#    - Do NOT treat casual messages as questions

# 2. Answering questions:
#    - If answer is in the article → use it clearly
#    - If partially related → combine article + your own knowledge
#    - If not in article but still relevant → explain using your knowledge
#    - If completely unrelated → say: "This is not related to the article."

# 3. Learning support:
#    - If user asks meaning of a word → explain simply
#    - If user asks full form (like AI, ML, etc.) → give full form + explanation
#    - If user is confused → simplify the concept

# 4. Style:
#    - Keep answers clear, simple, and helpful
#    - Avoid robotic responses
#    - Be conversational, like a helpful guide
#    - If possible, connect your answer back to the article topic

# ARTICLE:
# {article_text}

# USER MESSAGE:
# {question}
# """


#     # ================= 1️⃣ GEMINI =================
#     try:
#         response = client.models.generate_content(
#             model="gemini-2.5-flash",
#             contents=prompt
#         )

#         return jsonify({"reply": response.text})

#     except Exception as e:
#         print("❌ Gemini failed:", e)


#     # ================= 2️⃣ MISTRAL =================
#     # ================= 2️⃣ MISTRAL =================
# # try:
# #     headers = {
# #         "Authorization": f"Bearer {os.getenv('OPENROUTER_API_KEY')}",
# #         "Content-Type": "application/json"
# #     }

# #     body = {
# #         "model": "mistralai/mistral-small",
# #         "messages": [{"role": "user", "content": prompt}]
# #     }

# #     res = requests.post(
# #         "https://openrouter.ai/api/v1/chat/completions",
# #         headers=headers,
# #         json=body,
# #         timeout=10
# #     )

# #     print("MISTRAL STATUS:", res.status_code)
# #     print("MISTRAL TEXT:", res.text)

# #     if res.status_code != 200:
# #         raise Exception("Mistral API failed")

# #     data = res.json()

# #     if "choices" not in data:
# #         raise Exception("Invalid Mistral response structure")

# #     reply = data["choices"][0]["message"]["content"]

# #     return jsonify({"reply": reply})

# # except Exception as e:
# #     print("❌ Mistral failed:", e)
# #     # try:
# #     #     headers = {
# #     #         "Authorization": f"Bearer {os.getenv('OPENROUTER_API_KEY')}",
# #     #         "Content-Type": "application/json"
# #     #     }

# #     #     body = {
# #     #         "model": "mistralai/mistral-7b-instruct",
# #     #         "messages": [{"role": "user", "content": prompt}]
# #     #     }

# #     #     res = requests.post(
# #     #         "https://openrouter.ai/api/v1/chat/completions",
# #     #         headers=headers,
# #     #         json=body,
# #     #         timeout=10
# #     #     )

# #     #     data = res.json()
       
# #     #     print("MISTRAL RAW:", data)  # DEBUG

# #     #     if "choices" not in data:
# #     #         raise Exception("Invalid Mistral response")

# #     #     reply = data["choices"][0]["message"]["content"]

# #     #     return jsonify({"reply": reply})
# #     #     # reply = data["choices"][0]["message"]["content"]

# #     #     # return jsonify({"reply": reply})

# #     # except Exception as e:
# #     #     print("❌ Mistral failed:", e)


# #     # ================= 3️⃣ LLAMA =================
# #     # ================= 3️⃣ LLAMA =================
# # try:
# #     headers = {
# #         "Authorization": f"Bearer {os.getenv('OPENROUTER_API_KEY')}",
# #         "Content-Type": "application/json"
# #     }

# #     body = {
# #         "model": "meta-llama/llama-3-8b-instruct",
# #         "messages": [{"role": "user", "content": prompt}]
# #     }

# #     res = requests.post(
# #         "https://openrouter.ai/api/v1/chat/completions",
# #         headers=headers,
# #         json=body,
# #         timeout=10
# #     )

# #     print("LLAMA STATUS:", res.status_code)
# #     print("LLAMA TEXT:", res.text)

# #     if res.status_code != 200:
# #         raise Exception("Llama API failed")

# #     data = res.json()

# #     if "choices" not in data:
# #         raise Exception("Invalid Llama response structure")

# #     reply = data["choices"][0]["message"]["content"]

# #     return jsonify({"reply": reply})

# # except Exception as e:
# #     print("❌ Llama failed:", e)
# #     # try:
# #     #     headers = {
# #     #         "Authorization": f"Bearer {os.getenv('OPENROUTER_API_KEY')}",
# #     #         "Content-Type": "application/json"
# #     #     }

# #     #     body = {
# #     #         "model": "meta-llama/llama-3-8b-instruct",
# #     #         "messages": [{"role": "user", "content": prompt}]
# #     #     }

# #     #     res = requests.post(
# #     #         "https://openrouter.ai/api/v1/chat/completions",
# #     #         headers=headers,
# #     #         json=body,
# #     #         timeout=10
# #     #     )

# #     #     data = res.json()
# #     #     # reply = data["choices"][0]["message"]["content"]

# #     #     # return jsonify({"reply": reply})
# #     #     data = res.json()
# #     #     print("LLAMA RAW:", data)  # DEBUG

# #     #     if "choices" not in data:
# #     #         raise Exception("Invalid Llama response")

# #     #     reply = data["choices"][0]["message"]["content"]

# #     #     return jsonify({"reply": reply})

# #     # except Exception as e:
# #     #     print("❌ Llama failed:", e)


# #     # ================= 4️⃣ FINAL FALLBACK =================
# #     print("⚠️ Using SMART fallback")

# #     sentences = article_text.split(". ")

# #     chunks = []
# #     current = ""

# #     for s in sentences:
# #         if len(current.split()) < 40:
# #             current += s + ". "
# #         else:
# #             chunks.append(current.strip())
# #             current = s + ". "

# #     if current:
# #         chunks.append(current.strip())

# #     clean_text = " ".join(chunks[:2])

# #     return jsonify({
# #         "reply": clean_text
# #     })
#     # print("⚠️ Using final fallback (article only)")

#     # Simple keyword-based fallback
#     # if question.lower() in article_text.lower():
#     #     return jsonify({"reply": "The article mentions this, but AI is currently unavailable. Please read the text above for details."})

#     # return jsonify({
#     #     "reply": "AI is currently unavailable. Please refer to the article above for information."
#     # })
#     # print("⚠️ Using SMART fallback")

#     # sentences = article_text.split(". ")

#     # chunks = []
#     # current = ""

#     # for s in sentences:
#     #     if len(current.split()) < 40:
#     #         current += s + ". "
#     #     else:
#     #         chunks.append(current.strip())
#     #         current = s + ". "

#     # if current:
#     #     chunks.append(current.strip())

#     # return jsonify({
#     #     "reply": " ".join(chunks[:2])  # show first 2 chunks (clean, readable)
#     # })
    

# # ================= RUN =================
# if __name__ == "__main__":
#     app.run(debug=True)

# one word only this is messed up 
# from flask import Flask, request, jsonify
# from routes.home_routes import home_bp
# import os
# from dotenv import load_dotenv
# import requests
# from google import genai
# import json
# from datetime import datetime
# import random

# # ================= SETUP =================
# load_dotenv()

# app = Flask(__name__)
# app.register_blueprint(home_bp)

# client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
# GNEWS_API_KEY = os.getenv("GNEWS_API_KEY")

# today = datetime.utcnow().strftime('%Y-%m-%d')


# # ================= CHATBOT =================
# @app.route("/chat", methods=["POST"])
# def chat():
#     data = request.json
#     user_msg = data.get("message", "")

#     system_prompt = f"""
#     You are the AI assistant for a website called Decrypt.

#     About Decrypt:
#      - It simplifies complex news into easy explanations
#      - It consists of only 3 domains for now which are AI, IT and Electronics 
#      - Thers's a feature called daily brief/ today's brief which consists of news from all domains all over the world it basically tells the user what is happening in the world on that particular day
#      - It uses Beginner, Intermediate, Advanced levels in the news cards 
#      - It shows underrated AI tools and normal websites in Tools Library
#      - It helps users understand news clearly without jargon
#      - the student opportunities feature consists of free courses/ pro version of tools which students can access using their student identity additionally it also has workshops free for students

#     User: {user_msg}
#     """

#     response = client.models.generate_content(
#         model="gemini-2.5-flash",
#         contents=system_prompt
#     )

#     return jsonify({"reply": response.text})


# # ================= FETCH NEWS =================
# @app.route("/get-news", methods=["GET"])
# def get_news():

#     queries = {
#         "AI": "artificial intelligence OR machine learning",
#         "IT": "software OR programming OR cybersecurity",
#         "Electronics": "electronics OR semiconductor OR robotics"
#     }

#     all_articles = []

#     for domain, query in queries.items():
#         url = f"https://gnews.io/api/v4/search?q={query}&lang=en&max=5&from={today}&sortby=publishedAt&apikey={GNEWS_API_KEY}"

#         res = requests.get(url)
#         data = res.json()

#         if "articles" in data:
#             for art in data["articles"]:
#                 all_articles.append({
#                     "title": art.get("title", ""),
#                     "description": art.get("description", ""),
#                     "content": art.get("content", ""),
#                     "image": art.get("image"),
#                     "domain": domain
#                 })

#     random.shuffle(all_articles)
#     return jsonify({"articles": all_articles})


# # ================= SMART FALLBACK =================
# def build_fallback_slides(text, title):

#     sentences = text.split(". ")
#     slides = []
#     chunk = ""

#     for s in sentences:
#         if len(chunk.split()) < 40:
#             chunk += s + ". "
#         else:
#             slides.append({"title": title, "desc": chunk.strip()})
#             chunk = s + ". "

#     if chunk:
#         slides.append({"title": title, "desc": chunk.strip()})

#     if not slides:
#         slides = [{"title": title, "desc": title}]

#     return {
#         "beginner": slides,
#         "intermediate": slides[:max(1, len(slides)//2)],
#         "advanced": slides[:max(1, len(slides)//3)]
#     }


# # ================= GENERATE SLIDES =================
# @app.route("/generate-slides", methods=["POST"])
# def generate_slides():

#     data = request.json

#     title = data.get("title", "")
#     desc = data.get("description", "")
#     content = data.get("content", "")

#     full_text = f"{title}. {desc}. {content}"

#     prompt = f"""YOUR ORIGINAL PROMPT HERE"""  # keep your prompt same

#     # ===== GEMINI =====
#     try:
#         res = client.models.generate_content(
#             model="gemini-2.5-flash",
#             contents=prompt
#         )

#         raw = res.text.strip()

#         if raw.startswith("```"):
#             raw = raw.replace("```json", "").replace("```", "").strip()

#         # return jsonify({"slides": json.loads(raw)})
#         try:
#             slides = json.loads(raw)
#         except:
#             print("❌ JSON PARSE FAILED, USING FALLBACK")
#             return jsonify({"slides": build_fallback_slides(full_text, title)})

#         return jsonify({"slides": slides})

#     except Exception as e:
#         print("❌ Gemini failed:", e)

#     # ===== OPENROUTER =====
#     try:
#         headers = {
#             "Authorization": f"Bearer {os.getenv('OPENROUTER_API_KEY')}",
#             "Content-Type": "application/json"
#         }

#         body = {
#             # "model": "openai/gpt-3.5-turbo",
#             "model": "openai/gpt-4o-mini",
#             "messages": [{"role": "user", "content": prompt}]
#         }

#         res = requests.post(
#             "https://openrouter.ai/api/v1/chat/completions",
#             headers=headers,
#             json=body,
#             timeout=10
#         )

#         print("OPENROUTER STATUS:", res.status_code)
#         print("OPENROUTER TEXT:", res.text)

#         if res.status_code == 200:
#             data = res.json()

#             if "choices" in data:
#                 raw = data["choices"][0]["message"]["content"]

#                 if raw.startswith("```"):
#                     raw = raw.replace("```json", "").replace("```", "").strip()

#                 # return jsonify({"slides": json.loads(raw)})
#                 try:
#                     slides = json.loads(raw)
#                 except:
#                     print("❌ JSON PARSE FAILED, USING FALLBACK")
#                     return jsonify({"slides": build_fallback_slides(full_text, title)})

#                 return jsonify({"slides": slides})

#     except Exception as e:
#         print("❌ OpenRouter failed:", e)

#     # ===== FINAL FALLBACK =====
#     print("⚠️ Using SMART fallback")

#     return jsonify({
#         "slides": build_fallback_slides(full_text, title)
#     })


# # ================= ARTICLE BOT =================
# @app.route("/ask-article", methods=["POST"])
# def ask_article():

#     data = request.json
#     question = data.get("question", "")
#     article_text = data.get("article", "")

#     prompt = f"""YOUR EXISTING PROMPT HERE"""

#     try:
#         res = client.models.generate_content(
#             model="gemini-2.5-flash",
#             contents=prompt
#         )
#         return jsonify({"reply": res.text})

#     except Exception as e:
#         print("❌ Gemini failed:", e)

#     try:
#         headers = {
#             "Authorization": f"Bearer {os.getenv('OPENROUTER_API_KEY')}",
#             "Content-Type": "application/json"
#         }

#         body = {
#             # "model": "openai/gpt-3.5-turbo",
#             "model" : "openai/gpt-4o-mini",
#             "messages": [{"role": "user", "content": prompt}]
#         }

#         res = requests.post(
#             "https://openrouter.ai/api/v1/chat/completions",
#             headers=headers,
#             json=body,
#             timeout=10
#         )

#         if res.status_code == 200:
#             data = res.json()
#             if "choices" in data:
#                 return jsonify({"reply": data["choices"][0]["message"]["content"]})

#     except Exception as e:
#         print("❌ OpenRouter failed:", e)

#     print("⚠️ Using fallback")
#     return jsonify({"reply": article_text[:300]})


# # ================= RUN =================
# if __name__ == "__main__":
#     app.run(debug=True)


from flask import Flask, request, jsonify
from flask import render_template
# from routes.opportunities_routes import opportunities
from routes.home_routes import home_bp
import os
from dotenv import load_dotenv
import requests
from google import genai
import json
from datetime import datetime
import random

import time

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
# app.register_blueprint(opportunities)

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
GNEWS_API_KEY = os.getenv("GNEWS_API_KEY")

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

    random.shuffle(all_articles)

    return jsonify({"articles": all_articles})


# ================= GENERATE SLIDES =================
@app.route("/generate-slides", methods=["POST"])
def generate_slides():

    data = request.json

    title = data.get("title", "")
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

        return jsonify({"slides": slides})

    except Exception as e:
        print("❌ Gemini failed:", e)

        # 🔥 CLEAN FALLBACK (IMPORTANT FIX)
        safe_text = desc if desc else content if content else title

        return jsonify({
            "slides": {
                "beginner": [{"title": title, "desc": safe_text[:200]}],
                "intermediate": [{"title": title, "desc": safe_text[:150]}],
                "advanced": [{"title": title, "desc": safe_text[:300]}]
            }
        })


# ================= ARTICLE CHAT =================
@app.route("/ask-article", methods=["POST"])
def ask_article():

    data = request.json

    question = data.get("question", "")
    article = data.get("article", {})

    title = article.get("title", "")
    desc = article.get("desc", "")
    content = article.get("content", "")

    full_text = f"{title}. {desc}. {content}"

    prompt = f"""
    You are a smart assistant.

    Answer using article + your knowledge if needed.

    ARTICLE:
    {full_text}

    QUESTION:
    {question}
    """

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return jsonify({"reply": response.text})

    except Exception as e:
        print("❌ Article bot failed:", e)
        return jsonify({"reply": "AI is currently unavailable."})
@app.route("/daily-brief")
def daily_brief():
    return render_template("daily_brief.html")


# ================= RUN =================
if __name__ == "__main__":
    app.run(debug=True)