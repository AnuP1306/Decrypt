# 🚀 Decrypt Project Setup Guide

Welcome to the **Decrypt** project 👩‍💻
Follow this guide **step-by-step** to run the project and contribute properly.

---

# 📦 1. Clone the Repository (DO NOT DOWNLOAD ZIP ❌)

Open terminal and run:

```
git clone https://github.com/AnuP1306/Decrypt.git
cd Decrypt
```

---

# 💻 2. Open Project in VS Code

```
code .
```

---

# 🧪 3. Setup Virtual Environment

```
python -m venv venv
```

Activate it:

```
venv\Scripts\activate
```

---

# 📥 4. Install Dependencies

```
pip install -r requirements.txt
```

---

# ▶️ 5. Run the Project

```
python app.py
```

Open browser:

```
http://127.0.0.1:5000
```

If you see:

```
Server is running 🚀
```

✅ You are set up correctly

---

# 📁 6. Project Structure

```
Decrypt/
│
├── app.py                     ❗ DO NOT EDIT
├── config.py                 ❗ DO NOT EDIT
├── requirements.txt
│
├── routes/
│   ├── home_routes.py
│   ├── auth_routes.py
│   ├── tools_routes.py
│   ├── opportunities_routes.py
│
├── templates/
│   ├── base.html             ❗ DO NOT BREAK
│   ├── home.html
│   ├── login.html
│   ├── signup.html
│   ├── tools.html
│   ├── opportunities.html
│
├── static/
│   ├── css/
│   ├── js/
│
├── models/
│   ├── user_model.py
│
├── services/
│   ├── gemini_service.py
│   ├── news_service.py
│
├── utils/
│   ├── db.py                 ❗ DO NOT EDIT
```

---

# 👥 7. Team Responsibilities

## 👩 Anushka (Home Page)

* `routes/home_routes.py`
* `templates/home.html`

---

## 👩 Lalita (Login / Signup)

* `routes/auth_routes.py`
* `templates/login.html`
* `templates/signup.html`

---
## 👩 Pornima (Tools Library)

* `routes/tools_routes.py`
* `templates/tools.html`
  
---
## 👩 Samiksha (Student Opportunities)

* `routes/opportunities_routes.py`
* `templates/opportunities.html`

---

# ⚠️ 8. IMPORTANT RULES

❌ DO NOT edit:

* `app.py`
* `config.py`
* `utils/db.py`
* `templates/base.html` (unless told)

---

# 🔄 9. Git Workflow (VERY IMPORTANT)

## 🔹 Before starting work:

```
git pull origin main
```

---

## 🔹 After finishing work:

```
git add .
git commit -m "Describe your changes"
git push
```

---


