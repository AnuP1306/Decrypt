// let briefData = [];
// let currentIndex = 0;
// let currentLevel = "beginner";
// let flipped = false;
// let totalCards = 10; // for UI (even if dummy)

// function updateProgress() {

//     // Update count (top right)
//     document.getElementById("cardCount").innerText = currentIndex + 1;
//     document.getElementById("totalCount").innerText = totalCards;

//     // Update progress bar
//     const percent = ((currentIndex + 1) / totalCards) * 100;
//     document.getElementById("progressFill").style.width = percent + "%";
// }
// // ================= FETCH =================
// async function fetchBrief() {

//     const res = await fetch("/get-news?category=AI");
//     const data = await res.json();

//     // 🔥 for now only 1 real article
//     // briefData = [
//     //     {
//     //         title: data.slides.beginner[0].title,
//     //         levels: data.slides
//     //     },
//     //     // dummy for now
//     //     { title: "Tech innovation rising globally", levels: data.slides },
//     //     { title: "New electronics breakthrough", levels: data.slides }
//     // ];
//     briefData = [
//         {
//             title: data.slides.beginner[0].title,
//             levels: data.slides
//         },
//         { title: "Tech innovation rising globally", levels: data.slides },
//         { title: "New electronics breakthrough", levels: data.slides }
//     ];
    
//     // 👉 update total dynamically
//     totalCards = briefData.length;

//     renderBrief();
// }



// // ================= RENDER =================
// // function renderBrief() {

// //     const article = briefData[currentIndex];

// //     const slides = article.levels[currentLevel];

// //     document.getElementById("briefTitle").innerText =
// //         slides[0].title;

// //     document.getElementById("briefDesc").innerText =
// //         slides[0].desc;

// //     document.getElementById("progress").innerText =
// //         `${currentIndex + 1}/${briefData.length} cards`;

// //     // show front by default
// //     document.querySelector(".front").classList.add("active");
// //     document.querySelector(".back").classList.remove("active");

// //     flipped = false;
// // }
// function renderBrief() {

//     const article = briefData[currentIndex];
//     const slides = article.levels[currentLevel];

//     document.getElementById("briefTitle").innerText = slides[0].title;
//     document.getElementById("briefDesc").innerText = slides[0].desc;

//     // 👉 update progress UI
//     updateProgress();

//     // RESET FLIP
//     document.querySelector(".front").classList.add("active");
//     document.querySelector(".back").classList.remove("active");

//     flipped = false;
//     updateButtons();
// }

// // ================= FLIP =================
// document.getElementById("flashcard").onclick = () => {

//     flipped = !flipped;

//     document.querySelector(".front").classList.toggle("active");
//     document.querySelector(".back").classList.toggle("active");
// };

// // ================= NAV =================
// // function nextBrief() {
// //     if (currentIndex < briefData.length - 1) {
// //         currentIndex++;
// //         renderBrief();
// //     }
// // }

// // function prevBrief() {
// //     if (currentIndex > 0) {
// //         currentIndex--;
// //         renderBrief();
// //     }
// // }

// function nextBrief() {
//     if (currentIndex < totalCards - 1) {
//         currentIndex++;
//         renderBrief();
//     }
// }

// function prevBrief() {
//     if (currentIndex > 0) {
//         currentIndex--;
//         renderBrief();
//     }
// }

// function updateButtons() {

//     const prevBtn = document.querySelector(".brief-btn.prev");
//     const nextBtn = document.querySelector(".brief-btn.next");

//     if (currentIndex === 0) {
//         prevBtn.disabled = true;
//     } else {
//         prevBtn.disabled = false;
//     }

//     if (currentIndex === totalCards - 1) {
//         nextBtn.disabled = true;
//     } else {
//         nextBtn.disabled = false;
//     }
// }

// // ================= LEVEL =================
// function setBriefLevel(level) {
//     currentLevel = level;
//     renderBrief();
// }

// // ================= INIT =================
// fetchBrief();

let briefData = [];
let currentIndex = 0;
let currentLevel = "beginner";
let flipped = false;
let totalCards = 10;
let briefStates = {};

// function toggleLike(el) {
//     const icon = el.querySelector(".like-icon");
//     const count = el.querySelector(".like-count");

//     let current = parseInt(count.innerText);

//     if (el.classList.contains("liked")) {
//         el.classList.remove("liked");
//         icon.src = "/static/images/like.png";
//         count.innerText = current - 1;
//     } else {
//         el.classList.add("liked");
//         icon.src = "/static/images/like-filled.png";
//         count.innerText = current + 1;
//     }
// }
// function toggleLike(el) {
//     const card = el.closest(".news-card");
//     const index = currentIndex;
  
//     if (!briefStates[index]) {
//       briefStates[index] = { liked: false, comments: [] };
//     }
  
//     let state = briefStates[index];
  
//     state.liked = !state.liked;
  
//     const countEl = card.querySelectorAll(".like-count");
  
//     countEl.forEach(span => {
//       let count = parseInt(span.innerText);
//       span.innerText = state.liked ? count + 1 : count - 1;
//     });
//   }
// most recent like js 
function toggleLike(el) {

    const card = el.closest(".news-card");
    const index = currentIndex;

    if (!briefStates[index]) {
        briefStates[index] = {
            liked: false,
            likes: 32,
            comments: []
        };
    }

    let state = briefStates[index];

    state.liked = !state.liked;

    if (state.liked) {
        state.likes++;
    } else {
        state.likes--;
    }

    // 🔥 UPDATE UI (BOTH FRONT + BACK)
    card.querySelectorAll(".like-action").forEach(btn => {

        const icon = btn.querySelector(".like-icon");
        const count = btn.querySelector(".like-count");

        if (state.liked) {
            btn.classList.add("liked");
            icon.src = "/static/images/like-filled.png";
        } else {
            btn.classList.remove("liked");
            icon.src = "/static/images/like.png";
        }

        count.innerText = state.likes;
    });
}
function toggleBot(btn) {
    const card = btn.closest(".news-card");
    const bot = card.querySelector(".article-bot");
    btn.classList.toggle("active");
    bot.classList.toggle("show");
}
function toggleSave(btn) {
    btn.classList.toggle("saved");
}
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("collapsed");
}
// function toggleComment(btn) {
//     const card = btn.closest(".news-card");
//     const section = card.querySelector(".comment-section");
//     section.classList.toggle("show");
// }
function toggleComment(el) {
    const card = el.closest(".news-card");
    const section = card.querySelector(".comment-section");
  
    section.classList.toggle("show");
  }


// function postComment(button) {
//     const input = button.previousElementSibling;
//     const text = input.value.trim();

//     if (text === "") return;

//     const card = button.closest(".news-card");
//     const list = card.querySelector(".comments-list");
//     const count = card.querySelector(".comment-count");

//     const comment = document.createElement("div");
//     comment.className = "comment-item";

//     comment.innerHTML = `
//         <div class="comment-avatar">Y</div>
//         <div class="comment-content">
//             <div class="comment-header">
//                 <strong>You</strong> Just now
//             </div>
//             <div class="comment-text">${text}</div>
//         </div>
//     `;

//     list.appendChild(comment);

//     count.innerText = parseInt(count.innerText) + 1;
//     input.value = "";
// }
// function postComment(btn) {
//     const card = btn.closest(".news-card");
//     const input = card.querySelector(".comment-input-box input");
//     const list = card.querySelector(".comments-list");
  
//     const index = currentIndex;
  
//     if (!briefStates[index]) {
//       briefStates[index] = { liked: false, comments: [] };
//     }
  
//     const text = input.value.trim();
//     if (!text) return;
  
//     briefStates[index].comments.push(text);
  
//     const commentEl = document.createElement("div");
//     commentEl.className = "comment";
//     commentEl.innerText = text;
  
//     list.appendChild(commentEl);
  
//     input.value = "";
  
//     // update count (front + back)
//     card.querySelectorAll(".comment-count").forEach(el => {
//       el.innerText = briefStates[index].comments.length;
//     });
//   }

//most recent post comment js:
function postComment(button) {

    const card = button.closest(".news-card");
    const input = card.querySelector(".comment-input-box input");
    const list = card.querySelector(".comments-list");

    const text = input.value.trim();
    if (text === "") return;

    const index = currentIndex;

    if (!briefStates[index]) {
        briefStates[index] = {
            liked: false,
            likes: 32,
            comments: []
        };
    }

    const state = briefStates[index];

    // 🔥 STORE COMMENT
    state.comments.push(text);

    // 🔥 UI (RESTORE YOUR ORIGINAL DESIGN)
    const comment = document.createElement("div");
    comment.className = "comment-item";

    comment.innerHTML = `
        <div class="comment-avatar">Y</div>
        <div class="comment-content">
            <div class="comment-header">
                <strong>You</strong> Just now
            </div>
            <div class="comment-text">${text}</div>
        </div>
    `;

    list.appendChild(comment);

    input.value = "";

    // 🔥 UPDATE COUNT FRONT + BACK
    card.querySelectorAll(".comment-count").forEach(el => {
        el.innerText = state.comments.length;
    });
}
async function sendChat() {
    const input = document.getElementById("chatInput");
    const text = input.value.trim();
    if (!text) return;

    const chatBody = document.getElementById("chatBody");

    // USER MESSAGE
    chatBody.innerHTML += `<div class="chat-msg user">${text}</div>`;
    input.value = "";

    // LOADING MESSAGE
    const loading = document.createElement("div");
    loading.className = "chat-msg bot";
    loading.innerText = "Thinking...";
    chatBody.appendChild(loading);

    chatBody.scrollTop = chatBody.scrollHeight;

    try {
        const res = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: text })
        });

        const data = await res.json();

        loading.innerText = data.reply;

    } catch (err) {
        loading.innerText = "Error connecting to AI.";
    }

    chatBody.scrollTop = chatBody.scrollHeight;
}
function addArticleMessage(text, type, button) {

    const card = button.closest(".news-card");
    const chatBox = card.querySelector(".bot-chat");

    const msg = document.createElement("div");
    msg.classList.add("msg");

    if (type === "user") {
        msg.classList.add("user");
    } else {
        msg.classList.add("ai");
    }

    msg.innerText = text;

    chatBox.appendChild(msg);

    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendArticleChat(button) {

    // 🔥 get current card
    const card = button.closest(".news-card");
    
    // 🔥 get input + chat box
    const input = card.querySelector("#articleChatInput");
    const chatBox = card.querySelector(".bot-chat");
    
    const text = input.value.trim();
    if (!text) return;
    
    // ================= USER MESSAGE =================
    const userMsg = document.createElement("div");
    userMsg.className = "msg user";
    userMsg.innerText = text;
    
    chatBox.appendChild(userMsg);
    
    input.value = "";
    
    // ================= AI LOADING =================
    const aiMsg = document.createElement("div");
    aiMsg.className = "msg ai";
    aiMsg.innerText = "Thinking...";
    
    chatBox.appendChild(aiMsg);
    
    chatBox.scrollTop = chatBox.scrollHeight;
    
    // ================= API CALL =================
    try {
        const res = await fetch("/article-chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: text,
                article: card.querySelector(".card-desc")?.innerText || ""
            })
        });
    
        const data = await res.json();
    
        aiMsg.innerText = data.reply;
    
    } catch (err) {
        aiMsg.innerText = "AI is currently unavailable.";
    }
    
    // ================= AUTO SCROLL =================
    chatBox.scrollTop = chatBox.scrollHeight;
}
// ================= PROGRESS =================
function updateProgress() {
    document.getElementById("cardCount").innerText = currentIndex + 1;
    document.getElementById("totalCount").innerText = totalCards;

    const percent = ((currentIndex + 1) / totalCards) * 100;
    document.getElementById("progressFill").style.width = percent + "%";
}

// ================= FETCH ARTICLES =================
async function fetchBrief() {

    const res = await fetch("/get-news?category=AI");
    const data = await res.json();

    // 🔥 ONLY STORE ARTICLES (NOT SLIDES)
    briefData = data.articles.slice(0, 3); // for now 3 cards

    totalCards = briefData.length;

    renderBrief();
}

// ================= RENDER =================
async function renderBrief() {

    const article = briefData[currentIndex];
    if (!article) return;

    // ✅ ALWAYS RESET FLIP UI
    const card = document.getElementById("briefCard");
    card.classList.remove("flipped");
    flipped = false;

    // ✅ FRONT CONTENT (SHORT)
    document.getElementById("briefImage").src =
        article.image || "/static/images/news1.1.png";

    // document.getElementById("briefCategory").innerText =
    //     article.domain || "News";
    const pill = document.getElementById("briefCategory");

    pill.innerText = article.domain || "AI";

    pill.classList.remove("ai", "it", "electronics");

    pill.classList.add((article.domain || "AI").toLowerCase());

    document.getElementById("briefTitle").innerText =
        article.title;

    document.getElementById("briefDesc").innerText =
        article.description || "Tap to flip and read more";

    // ✅ ALSO RESET BACK IMAGE
    document.getElementById("briefImageBack").src =
        article.image || "/static/images/news1.1.png";

    // document.getElementById("briefCategoryBack").innerText =
    //     article.domain || "News";

    const pillBack = document.getElementById("briefCategoryBack");

    pillBack.innerText = article.domain || "AI";

    pillBack.classList.remove("ai", "it", "electronics");

    pillBack.classList.add((article.domain || "AI").toLowerCase());

    updateProgress();
    updateButtons();

    // ✅ LOAD AI IN BACKGROUND (DO NOT BLOCK UI)
    if (!article.slides) {
        loadSlides(article);
    }
    document.getElementById("briefCard").dataset.article = JSON.stringify(article);
    const state = briefStates[currentIndex];

if (state) {

    // restore likes
    document.querySelectorAll(".like-action").forEach(btn => {
        const icon = btn.querySelector(".like-icon");
        const count = btn.querySelector(".like-count");

        count.innerText = state.likes;

        if (state.liked) {
            btn.classList.add("liked");
            icon.src = "/static/images/like-filled.png";
        } else {
            btn.classList.remove("liked");
            icon.src = "/static/images/like.png";
        }
    });

    // restore comments count
    document.querySelectorAll(".comment-count").forEach(el => {
        el.innerText = state.comments.length;
    });
}
    
}
// async function renderBrief() {

//     flipped = false;

//     const article = briefData[currentIndex];
//     document.getElementById("briefImage").src = article.image || "/static/images/news1.1.png";
//     document.getElementById("briefCategory").innerText = article.domain || "News";
//     document.getElementById("briefCategoryBack").innerText = article.domain;
//     document.getElementById("briefTitle").innerText = article.title;
//     document.getElementById("briefDesc").innerText =
//         article.desc || "Tap to flip and read more";

//     updateProgress();

//     // RESET FLIP
//     // document.querySelector(".front").classList.add("active");
//     // document.querySelector(".back").classList.remove("active");
//     flipped = false;

//     updateButtons();

//     // 🔥 LOAD SLIDES ONLY IF NOT LOADED
//     // if (!article.slides) {
//     //     await loadSlides(article);
//     // }
//     if (!article.slides) {
//         loadSlides(article); // no await
//     }

//     // updateContent();
// }

// ================= LOAD SLIDES (AI CALL) =================
async function loadSlides(article) {

    try {
        const res = await fetch("/generate-slides", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(article)
        });

        const text = await res.text();

        let data;

        try {
            data = JSON.parse(text);
        } catch {
            console.error("❌ Invalid JSON:", text);
            return;
        }

        if (!data.slides) {
            console.error("❌ Slides missing:", data);
            return;
        }

        // ✅ STORE SLIDES INSIDE ARTICLE
        article.slides = data.slides;

    } catch (err) {
        console.error("❌ AI error:", err);
    }
}

// ================= UPDATE CONTENT =================
function updateContent() {

    const article = briefData[currentIndex];

    if (!article.slides) return;

    const slides = article.slides[currentLevel];

    if (!slides || !slides[0]) return;

    document.getElementById("briefTitle").innerText = slides[0].title;
    document.getElementById("briefDesc").innerText = slides[0].desc;
}

// ================= FLIP =================
// document.getElementById("flashcard").onclick = () => {

//     flipped = !flipped;

//     document.querySelector(".front").classList.toggle("active");
//     document.querySelector(".back").classList.toggle("active");

//     if (flipped) updateContent();
// };

// ================= NAV =================
function nextBrief() {
    if (currentIndex < totalCards - 1) {
        currentIndex++;
        flipped = false;
        renderBrief();
    }
}

function prevBrief() {
    if (currentIndex > 0) {
        currentIndex--;
        flipped = false;
        renderBrief();
    }
}

function updateButtons() {
    const prevBtn = document.querySelector(".brief-btn.prev");
    const nextBtn = document.querySelector(".brief-btn.next");

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === totalCards - 1;
}

// ================= LEVEL =================
function setBriefLevel(level) {
    currentLevel = level;
    updateContent();
}

// ================= INIT =================

// fetchBrief();
document.addEventListener("DOMContentLoaded", () => {

    // document.getElementById("briefCard").onclick = () => {

    //     flipped = !flipped;
    
    //     const article = briefData[currentIndex];
    
    //     if (!article.slides) return;
    
    //     const slides = article.slides[currentLevel];
    
    //     if (!slides || !slides[0]) return;
    
    //     if (flipped) {
    //         // 👉 SHOW DETAILED (BACK)
    //         document.getElementById("briefTitle").innerText = slides[0].title;
    //         document.getElementById("briefDesc").innerText = slides[0].desc;
    //     } else {
    //         // 👉 SHOW ORIGINAL (FRONT)
    //         document.getElementById("briefTitle").innerText = article.title;
    //         document.getElementById("briefDesc").innerText =
    //             article.desc || "Tap to flip and read more";
    //     }
    // };
    // document.getElementById("briefCard").onclick = () => {

    //     const article = briefData[currentIndex];
    //     if (!article) return;
    
    //     flipped = !flipped;
    
    //     // 👉 FRONT SIDE
    //     if (!flipped) {
    //         document.getElementById("briefTitle").innerText = article.title;
    //         document.getElementById("briefDesc").innerText =
    //             article.description || "Tap to flip and read more";
    //         return;
    //     }
    
    //     // 👉 BACK SIDE (AI CONTENT)
    
    //     // 🔥 SHOW LOADING FIRST (IMPORTANT UX)
    //     if (!article.slides) {
    //         document.getElementById("briefTitle").innerText = "Loading...";
    //         document.getElementById("briefDesc").innerText =
    //             "Generating AI summary...";
    
    //         return;
    //     }
    
    //     const slides = article.slides[currentLevel];
    
    //     if (!slides || !slides[0]) return;
    
    //     document.getElementById("briefTitle").innerText = slides[0].title;
    //     document.getElementById("briefDesc").innerText = slides[0].desc;
    // };

    // document.getElementById("briefCard").onclick = async () => {

    //     const card = document.getElementById("briefCard");
    //     const article = briefData[currentIndex];
    //     if (!article) return;
    
    //     flipped = !flipped;
    
    //     // 🔥 FLIP UI
    //     // card.classList.toggle("flipped");
    //     card.addEventListener("click", function(e) {

    //         // 🚫 don't flip if clicking interactive elements
    //         if (
    //             e.target.closest(".action") ||
    //             e.target.closest(".save-btn") ||
    //             e.target.closest(".chatbot-btn") ||
    //             e.target.closest(".comment-section") ||
    //             e.target.closest(".next-btn")
    //         ) {
    //             return;
    //         }
        
    //         card.classList.toggle("flipped");
    //     });
    
    //     // ================= FRONT =================
    //     if (!flipped) {
    //         document.getElementById("briefTitle").innerText = article.title;
    //         document.getElementById("briefDesc").innerText =
    //             article.description || "Tap to flip and read more";
    //         return;
    //     }
    
    //     // ================= BACK =================
    
    //     // SHOW LOADING FIRST
    //     if (!article.slides) {
    //         document.getElementById("briefTitleBack").innerText = "Loading...";
    //         document.getElementById("briefDescBack").innerText =
    //             "Generating AI summary...";
    //         return;
    //     }
    
    //     const slides = article.slides[currentLevel];
    //     if (!slides || !slides[0]) return;
    
    //     document.getElementById("briefTitleBack").innerText = slides[0].title;
    //     document.getElementById("briefDescBack").innerText = slides[0].desc;
    // };
    // const card = document.getElementById("briefCard");

    // card.addEventListener("click", async function(e) {

    // // 🚫 DON'T FLIP on actions
    //     if (
    //         e.target.closest(".action") ||
    //         e.target.closest(".save-btn") ||
    //         e.target.closest(".chatbot-btn") ||
    //         e.target.closest(".comment-section") ||
    //         e.target.closest(".level-btn") ||
    //         e.target.closest(".next-btn")
    //     ) {
    //         return;
    //     }

    //     const article = briefData[currentIndex];
    //     if (!article) return;

    //     flipped = !flipped;

    //     card.classList.toggle("flipped");

    // // ================= FRONT =================
    //     if (!flipped) {
    //         document.getElementById("briefTitle").innerText = article.title;
    //         document.getElementById("briefDesc").innerText =
    //             article.description || "Tap to flip and read more";
    //         return;
    //     }

    // // ================= BACK =================
    //     if (!article.slides) {
    //         document.getElementById("briefTitleBack").innerText = "Loading...";
    //         document.getElementById("briefDescBack").innerText =
    //             "Generating AI summary...";
    //         return;
    //     }

    //     const slides = article.slides[currentLevel];
    //     if (!slides || !slides[0]) return;

    //     document.getElementById("briefTitleBack").innerText = slides[0].title;
    //     document.getElementById("briefDescBack").innerText = slides[0].desc;
    // });
    const card = document.getElementById("briefCard");
    document.addEventListener("click", function(e) {
        if (e.target.closest(".article-bot") || e.target.closest(".comment-section")) {
          e.stopPropagation();
        }
      });

card.addEventListener("click", function(e) {

    if (
        e.target.closest(".action") ||
        e.target.closest(".save-btn") ||
        e.target.closest(".chatbot-btn") ||
        e.target.closest(".comment-section") ||
        e.target.closest(".level-btn")
    ) return;

    flipped = !flipped;
    card.classList.toggle("flipped");

    const article = briefData[currentIndex];
    if (!article) return;

    if (!flipped) {
        document.getElementById("briefTitle").innerText = article.title;
        document.getElementById("briefDesc").innerText =
            article.description || "";
        return;
    }

    // 🔥 BACK CONTENT (CONTINUATION)
    const text = article.description || "";
    const midpoint = Math.floor(text.length / 2);

    document.getElementById("briefTitleBack").innerText = article.title;
    document.getElementById("briefDescBack").innerText =
        text.substring(midpoint);
});

    // document.getElementById("briefCard").onclick = () => {

    //     const card = document.getElementById("briefCard");
    //     const article = briefData[currentIndex];
    
    //     if (!article) return;
    
    //     flipped = !flipped;
    
    //     // 🔥 FLIP UI
    //     card.classList.toggle("flipped");
    //     // ✅ FIX: sync back image
    //     document.getElementById("briefImageBack").src =
    //         article.image || "/static/images/news1.1.png";
    
    //     // FRONT
    //     // if (!flipped) {
    //     //     document.getElementById("briefTitle").innerText = article.title;
    //     if (!flipped) {

    //         document.getElementById("briefTitle").innerText = article.title;
        
    //         document.getElementById("briefDesc").innerText =
    //             article.description || "Tap to flip and read more";
        
    //         return;
    //     }
    //     //     document.getElementById("briefDesc").innerText =
    //     //         article.description || "Tap to flip and read more";
    //     //     return;
    //     // }
    
    //     // BACK
    //     if (!article.slides) {
    //         document.getElementById("briefTitleBack").innerText = "Loading...";
    //         document.getElementById("briefDescBack").innerText =
    //             "Generating AI summary...";
    //         return;
    //     }
    
    //     const slides = article.slides[currentLevel];
    
    //     if (!slides || !slides[0]) return;
    
    //     document.getElementById("briefTitleBack").innerText = slides[0].title;
    //     document.getElementById("briefDescBack").innerText = slides[0].desc;
    // };

    // document.getElementById("briefCard").onclick = () => {

    //     flipped = !flipped;

    //     document.querySelector(".front").classList.toggle("active");
    //     document.querySelector(".back").classList.toggle("active");

    //     if (flipped) updateContent();
    // };

    fetchBrief();
});