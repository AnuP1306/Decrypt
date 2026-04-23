//working but currently not gonna use this cause it has 15 cards 
// ================= FETCH & RENDER FEED =================
// async function fetchNews() {

//     const res = await fetch("/get-news");
//     const data = await res.json();

//     const container = document.querySelector(".feed-container");

//     // 🔥 DO NOT REMOVE TEMPLATE — JUST HIDE IT
//     // const template = document.getElementById("newsCard");
//     const template = document.querySelector("#newsCard");

// if (!template) {
//     console.error("❌ Template card not found in HTML");
//     return;
// }
//     template.style.display = "none";

//     // container.innerHTML = ""; // clear old feed
//     document.querySelectorAll(".news-card.generated").forEach(card => card.remove());

//     data.articles.forEach((article, index) => {
//         createNewsCard(article, container, index);
//     });
// }


// // ================= CREATE CARD =================
// async function createNewsCard(article, container, index) {
    

//     const template = document.getElementById("newsCard");
//     const card = template.cloneNode(true);

//     card.style.display = "block";
//     card.classList.add("news-card");
//     card.classList.add("generated");
//     card.removeAttribute("id");

//     // ================= IMAGE =================
//     const img = card.querySelector(".card-image img");
//     img.src = article.image || "/static/images/news1.1.png";

//     // ================= DOMAIN PILL =================
//     const pill = card.querySelector(".domain-pill");
//     pill.innerText = article.domain;

//     pill.classList.remove("ai", "it", "electronics");
//     pill.classList.add(article.domain.toLowerCase());

//     // ================= CONTENT =================
//     const content = card.querySelector("#cardContent");
//     content.id = `cardContent-${index}`;

//     content.innerHTML = `
//         <h2 class="card-title">Loading...</h2>
//         <p class="card-desc">Fetching explanation...</p>
//     `;

//     // ================= BUTTONS =================
//     const levelBtns = card.querySelectorAll(".level-btn");

//     levelBtns[0].onclick = () => setLevel(index, "beginner", levelBtns[0]);
//     levelBtns[1].onclick = () => setLevel(index, "intermediate", levelBtns[1]);
//     levelBtns[2].onclick = () => setLevel(index, "advanced", levelBtns[2]);

//     // const nextBtn = card.querySelector(".next-btn");
//     // if (nextBtn) nextBtn.onclick = () => nextPage(index);
//     const nextBtn = card.querySelector(".next-btn");

// if (nextBtn) {
//     nextBtn.disabled = true; // ❗ disable initially
//     nextBtn.onclick = () => nextPage(index);
// }

//     // ================= STATE =================
//     card.dataset.page = 0;
//     card.dataset.level = "beginner";

//     container.appendChild(card);

//     // ================= AI CALL =================
//     const res = await fetch("/generate-slides", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(article)
//     });

//     // const data = await res.json();
//     const text = await res.text();

// let data;

// try {
//     data = JSON.parse(text);
// } catch {
//     console.error("❌ Invalid JSON:", text);
//     return;
// }

// if (!data.slides) {
//     console.error("❌ Slides not received:", data);
//     return;
// }

// card.dataset.slides = JSON.stringify(data.slides);

// // ✅ enable button AFTER data is ready
// // const nextBtn = card.querySelector(".next-btn");
// if (nextBtn) nextBtn.disabled = false;

// updateCard(index);

//     // const data = await res.json();

//     // card.dataset.slides = JSON.stringify(data.slides);

//     // updateCard(index);
// }


// // ================= UPDATE CARD =================
// // function updateCard(index) {

// //     const card = document.querySelectorAll(".news-card")[index];

// //     if (!card.dataset.slides) return;

// //     const slides = JSON.parse(card.dataset.slides);
// //     const level = card.dataset.level;
// //     const page = parseInt(card.dataset.page);

// //     const content = card.querySelector(`#cardContent-${index}`);

// //     if (!slides[level] || !slides[level][page]) return;

// //     const slide = slides[level][page];

// //     content.innerHTML = `
// //         <h2 class="card-title">${slide.title}</h2>
// //         <p class="card-desc">${slide.desc}</p>
// //     `;
// // }
// function updateCard(index) {

//     const card = document.querySelectorAll(".news-card")[index];

//     if (!card) return;

//     if (!card.dataset.slides) {
//         console.log("⏳ Slides not ready yet");
//         return;
//     }

//     const slides = JSON.parse(card.dataset.slides);
//     const level = card.dataset.level;
//     const page = parseInt(card.dataset.page);

//     if (!slides[level] || !slides[level][page]) return;

//     const content = card.querySelector(`#cardContent-${index}`);

//     if (!content) return;

//     const slide = slides[level][page];

//     content.innerHTML = `
//         <h2 class="card-title">${slide.title}</h2>
//         <p class="card-desc">${slide.desc}</p>
//     `;
// }

// // ================= LEVEL SWITCH =================
// function setLevel(index, level, btn) {

//     const card = document.querySelectorAll(".news-card")[index];

//     card.dataset.level = level;
//     card.dataset.page = 0;

//     btn.parentElement.querySelectorAll(".level-btn")
//         .forEach(b => b.classList.remove("active"));

//     btn.classList.add("active");

//     updateCard(index);
// }


// // ================= NEXT PAGE =================
// // function nextPage(index) {

// //     const card = document.querySelectorAll(".news-card")[index];

// //     const slides = JSON.parse(card.dataset.slides);
// //     const level = card.dataset.level;

// //     let page = parseInt(card.dataset.page);

// //     if (page < slides[level].length - 1) {
// //         page++;
// //         card.dataset.page = page;
// //         updateCard(index);
// //     }
// // }
// function nextPage(index) {

//     const card = document.querySelectorAll(".news-card")[index];

//     if (!card || !card.dataset.slides) return;

//     const slides = JSON.parse(card.dataset.slides);
//     const level = card.dataset.level;

//     let page = parseInt(card.dataset.page);

//     if (page < slides[level].length - 1) {
//         page++;
//         card.dataset.page = page;
//         updateCard(index);
//     }
// }


// // ================= INIT =================
// fetchNews();
//works perfectly 3 cards are functional in this version
//this version was latest working one 17/4
// ================= FETCH & RENDER FEED =================
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
// function toggleBot(btn) {
//     const card = btn.closest(".news-card");
//     const bot = card.querySelector(".article-bot");
//     btn.classList.toggle("active");
//     bot.classList.toggle("show");
// }
// function toggleSave(btn) {
//     btn.classList.toggle("saved");
// }
// function toggleComment(btn) {
//     const card = btn.closest(".news-card");
//     const section = card.querySelector(".comment-section");
//     section.classList.toggle("show");
// }

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
// async function sendChat() {
//     const input = document.getElementById("chatInput");
//     const text = input.value.trim();
//     if (!text) return;

//     const chatBody = document.getElementById("chatBody");

//     // USER MESSAGE
//     chatBody.innerHTML += `<div class="chat-msg user">${text}</div>`;
//     input.value = "";

//     // LOADING MESSAGE
//     const loading = document.createElement("div");
//     loading.className = "chat-msg bot";
//     loading.innerText = "Thinking...";
//     chatBody.appendChild(loading);

//     chatBody.scrollTop = chatBody.scrollHeight;

//     try {
//         const res = await fetch("/chat", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ message: text })
//         });

//         const data = await res.json();

//         loading.innerText = data.reply;

//     } catch (err) {
//         loading.innerText = "Error connecting to AI.";
//     }

//     chatBody.scrollTop = chatBody.scrollHeight;
// }
// function addArticleMessage(text, type, button) {

//     const card = button.closest(".news-card");
//     const chatBox = card.querySelector(".bot-chat");

//     const msg = document.createElement("div");
//     msg.classList.add("msg");

//     if (type === "user") {
//         msg.classList.add("user");
//     } else {
//         msg.classList.add("ai");
//     }

//     msg.innerText = text;

//     chatBox.appendChild(msg);

//     chatBox.scrollTop = chatBox.scrollHeight;
// }

// async function sendArticleChat(button) {

//     // 🔥 get current card
//     const card = button.closest(".news-card");
    
//     // 🔥 get input + chat box
//     const input = card.querySelector("#articleChatInput");
//     const chatBox = card.querySelector(".bot-chat");
    
//     const text = input.value.trim();
//     if (!text) return;
    
//     // ================= USER MESSAGE =================
//     const userMsg = document.createElement("div");
//     userMsg.className = "msg user";
//     userMsg.innerText = text;
    
//     chatBox.appendChild(userMsg);
    
//     input.value = "";
    
//     // ================= AI LOADING =================
//     const aiMsg = document.createElement("div");
//     aiMsg.className = "msg ai";
//     aiMsg.innerText = "Thinking...";
    
//     chatBox.appendChild(aiMsg);
    
//     chatBox.scrollTop = chatBox.scrollHeight;
    
//     // ================= API CALL =================
//     try {
//         const res = await fetch("/article-chat", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 question: text,
//                 article: card.querySelector(".card-desc")?.innerText || ""
//             })
//         });
    
//         const data = await res.json();
    
//         aiMsg.innerText = data.reply;
    
//     } catch (err) {
//         aiMsg.innerText = "AI is currently unavailable.";
//     }
    
//     // ================= AUTO SCROLL =================
//     chatBox.scrollTop = chatBox.scrollHeight;
// }
let allArticles = [];
let currentIndex = 0;
const BATCH_SIZE = 5;

async function fetchNews() {

   const topics = (window.USER_TOPICS || []).join(",");
const res = await fetch(`/get-news?topics=${encodeURIComponent(topics)}`);
    const data = await res.json();

    const container = document.getElementById("newsContainer");

    const template = document.querySelector("#newsCard");

    if (!template) {
        console.error("❌ Template card not found in HTML");
        return;
    }

    template.style.display = "none";

    // remove old generated cards only
    document.querySelectorAll(".news-card.generated").forEach(card => card.remove());

    // data.articles.forEach((article, index) => {

    //     // 🔥 ONLY FIRST 3 USE AI
    //     if (index < 1) {
    //         createNewsCard(article, container, index);
    //     } else {
    //         createStaticCard(article, container);
    //     }

    // });
    // data.articles.forEach((article, index) => {
        const shuffled = [...data.articles].sort(() => Math.random() - 0.5);

        // shuffled.forEach((article, index) => {
        //     createNewsCard(article, container, index);
        // });
        allArticles = [...data.articles].sort(() => Math.random() - 0.5);

        currentIndex = 0;

        // load first batch
        loadMoreCards();
        setTimeout(() => {
            applyFilter();
        }, 100);
}

function loadMoreCards() {

    const container = document.getElementById("newsContainer");

    const nextBatch = allArticles.slice(currentIndex, currentIndex + BATCH_SIZE);

    nextBatch.forEach((article, i) => {
        const index = currentIndex + i;
        createNewsCard(article, container, index);
    });

    // 🔥 ADD THIS EXACTLY HERE
    // setTimeout(() => {
    //     document.querySelectorAll(".news-card.generated").forEach((card, index) => {
    //         if (!card.dataset.slides) {
    //             console.log("🔄 Re-applying fallback for card:", index);
    //             applyFallbackCard(card, index);
    //         }
    //     });
    // }, 500);

    currentIndex += BATCH_SIZE;

    console.log("📦 Loaded batch. Current index:", currentIndex);
}


// ================= CREATE AI CARD =================
async function createNewsCard(article, container, index) {

    

    const template = document.getElementById("newsCard");
   
    const card = template.cloneNode(true);

    card.style.display = "block";
    card.classList.add("news-card", "generated");
    card.removeAttribute("id");

    // IMAGE
    const img = card.querySelector(".card-image img");
    img.src = article.image || "/static/images/news1.1.png";

    // DOMAIN
    const pill = card.querySelector(".domain-pill");
    pill.innerText = article.domain;

    pill.classList.remove("ai", "it", "electronics");
    pill.classList.add(article.domain.toLowerCase());

    // CONTENT
    const content = card.querySelector(".cardContent");

    // 🔥 SAFE DATA (FIX UNDEFINED)
    const safeTitle = article.title || article.heading || "No title";
    const safeDesc = article.desc || article.description || "No description";
    
    content.innerHTML = `
        <h2 class="card-title">${safeTitle}</h2>
        <p class="card-desc">${safeDesc}</p>
    `;

    // BUTTONS
    const levelBtns = card.querySelectorAll(".level-btn");

    levelBtns[0].onclick = () => setLevel(index, "beginner", levelBtns[0]);
    levelBtns[1].onclick = () => setLevel(index, "intermediate", levelBtns[1]);
    levelBtns[2].onclick = () => setLevel(index, "advanced", levelBtns[2]);

    const nextBtn = card.querySelector(".next-btn");

    if (nextBtn) {
        nextBtn.disabled = true;
        nextBtn.onclick = () => nextPage(index);
    }

    // STATE
    card.dataset.page = 0;
    card.dataset.level = "beginner";
    // card.dataset.article = JSON.stringify(article);
    if (article) {
        // card.dataset.article = JSON.stringify(article);
        // const firstSlide = article.slides?.beginner?.[0] || {};

        // const cleanArticle = {
        //     title: firstSlide.title || "No title",
        //     desc: firstSlide.desc || "No description",
        //     content: firstSlide.desc || ""
        // };
        // ✅ HANDLE BOTH GNEWS + FALLBACK
        const cleanArticle = {
            title: article.title || article.heading || "No title",
            desc: article.desc || article.description || "No description",
            content: article.content || article.desc || ""
        };

        // ✅ STORE CLEAN DATA
        card.dataset.article = JSON.stringify(cleanArticle);
    } else {
        console.error("❌ Article missing for card:", index);
    }
    card.dataset.index = index;
    card.dataset.domain = article.domain;

    // console.log("isConnected:", container.isConnected);

    // container.appendChild(card);
    document.getElementById("newsContainer").appendChild(card);
   
    // console.log(`📡 [Card ${index}] Fetching AI for:`, article.title);
    console.log(`📡 [Card ${index}] Fetching AI for:`, safeTitle);

    // ================= AI CALL =================
    if (card.dataset.slidesLoaded) return;  // 🧠 prevent duplicate calls
    card.dataset.slidesLoaded = "true";
    const res = await fetch("/generate-slides", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        // body: JSON.stringify(article)
        body: JSON.stringify({
            ...article,
            index: index
        })
    });

    const text = await res.text();

    let data;

    try {
        data = JSON.parse(text);
        // console.log(`✅ [Card ${index}] Gemini used`);
        if (data.source === "fallback") {
            console.log(`⚠️ [Card ${index}] Fallback used`);
        } else {
            console.log(`✅ [Card ${index}] Gemini used`);
        }
    } catch {
        console.error("❌ Invalid JSON:", text);
        console.log(`⚠️ [Card ${index}] Fallback used`);
        return;
    }

    if (!data.slides) {
        console.error("❌ Slides missing:", data);
        return;
    }

    card.dataset.slides = JSON.stringify(data.slides);
    card.dataset.source = data.source; // ✅ ADD THIS
    console.log(`📊 [Card ${index}] Source:`, data.source);

    // if (data.source === "fallback") {
    //     applyFallbackCard(card, index);
    // }
    if (data.source === "fallback") {
        applyFallbackCard(card, index);
    } else {
        updateCard(index); // ✅ ONLY update if NOT fallback
    }

    if (nextBtn) nextBtn.disabled = false;

    // updateCard(index);
}


// ================= STATIC CARD =================
function createStaticCard(article, container) {

    const template = document.getElementById("newsCard");
    const card = template.cloneNode(true);

    card.style.display = "block";
    card.classList.add("news-card", "generated");
    card.removeAttribute("id");
    card.dataset.domain = article.domain;

    // IMAGE
    const img = card.querySelector(".card-image img");
    img.src = article.image || "/static/images/news1.1.png";

    // DOMAIN
    const pill = card.querySelector(".domain-pill");
    pill.innerText = article.domain;

    pill.classList.remove("ai", "it", "electronics");
    pill.classList.add(article.domain.toLowerCase());

    // CONTENT (RAW NEWS)
    const content = card.querySelector(".cardContent");

    content.innerHTML = `
        <h2 class="card-title">${article.title}</h2>
        <p class="card-desc">${article.desc || "No description available."}</p>
    `;

    // 🔥 DISABLE BUTTONS FOR STATIC
    const levelBtns = card.querySelectorAll(".level-btn");
    levelBtns.forEach(btn => btn.style.display = "none");

    const nextBtn = card.querySelector(".next-btn");
    if (nextBtn) nextBtn.style.display = "none";

    // container.appendChild(card);
    document.getElementById("newsContainer").appendChild(card);
}


// ================= UPDATE CARD =================
function updateCard(index) {

    // const card = document.querySelectorAll(".news-card")[index];
    // const card = document.querySelectorAll(".news-card.generated")[index];
    const card = document.querySelector(`.news-card.generated[data-index="${index}"]`);

    if (!card || !card.dataset.slides) return;

    const slides = JSON.parse(card.dataset.slides);
    const level = card.dataset.level;
    const page = parseInt(card.dataset.page);

    if (!slides[level] || !slides[level][page]) return;

    // const content = card.querySelector(`.cardContent-${index}`);
    const content = card.querySelector(".cardContent");
    if (!content) return;

    const slide = slides[level][page];

    content.innerHTML = `
        <h2 class="card-title">${slide.title}</h2>
        <p class="card-desc">${slide.desc}</p>
    `;
    
}


// ================= LEVEL SWITCH =================
function setLevel(index, level, btn) {

    // const card = document.querySelectorAll(".news-card")[index];
    // const card = document.querySelectorAll(".news-card.generated")[index];
    const card = document.querySelector(`.news-card.generated[data-index="${index}"]`);
    
    card.dataset.level = level;
    card.dataset.page = 0;

    btn.parentElement.querySelectorAll(".level-btn")
        .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

    updateCard(index);
}


// ================= NEXT PAGE =================
function nextPage(index) {

    // const card = document.querySelectorAll(".news-card")[index];
    // const card = document.querySelectorAll(".news-card.generated")[index];
    const card = document.querySelector(`.news-card.generated[data-index="${index}"]`);

    if (!card || !card.dataset.slides) return;

    const slides = JSON.parse(card.dataset.slides);
    const level = card.dataset.level;

    let page = parseInt(card.dataset.page);

    if (page < slides[level].length - 1) {
        page++;
        card.dataset.page = page;
        updateCard(index);
    }
}
// ================= ARTICLE BOT CHAT =================
async function sendArticleChat(button) {

    const card = button.closest(".news-card");

    const input = card.querySelector(".bot-input input");
    const text = input.value.trim();

    if (!text) return;

    // const botBody = card.querySelector(".bot-body");
    const chatBox = card.querySelector(".bot-chat");

    // USER MESSAGE
    // botBody.innerHTML += `
    //     <div class="bot-message user">${text}</div>
    // `;

    chatBox.innerHTML += `
    <div class="msg user">${text}</div>
    `;

    input.value = "";

    // LOADING
    const loading = document.createElement("div");
    loading.className = "msg ai";
    loading.innerText = "Thinking...";
    chatBox.appendChild(loading);

    // 🔥 GET ARTICLE CONTEXT
    // const article = JSON.parse(card.dataset.article);
    const articleData = JSON.parse(card.dataset.article || "{}");

    const fullContext = `
    Title: ${articleData.title || ""}
    Description: ${articleData.desc || ""}
    Content: ${articleData.content || ""}
    `;

    try {
        const res = await fetch("/ask-article", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: text,
                article: fullContext
            })
        });

        const data = await res.json();

        loading.innerText = data.reply;

    } catch (err) {
        loading.innerText = "Error connecting to AI.";
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}


// ================= INIT =================
// fetchNews();
// document.addEventListener("DOMContentLoaded", function () {
//     fetchNews();
// });


const container = document.getElementById("newsContainer");


const template = document.getElementById("newsCard");
console.log("template:", template);
// window.onload = function () {
//     fetchNews();
// };
document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM loaded");
    fetchNews();
});
window.addEventListener("scroll", () => {

    if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200
    ) {
        // near bottom
        if (currentIndex < allArticles.length) {
            console.log("⬇️ Loading more cards...");
            loadMoreCards();
        }
    }

});
const filters = document.querySelectorAll(".filter");
let currentFilter = "all";

filters.forEach(btn => {
    btn.addEventListener("click", () => {

        filters.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const selected = btn.innerText.trim().toLowerCase();
        currentFilter = selected;

        document.querySelectorAll(".news-card.generated").forEach(card => {

            const domain = (card.dataset.domain || "").trim().toLowerCase();

            console.log("Filter:", selected, "| Card:", domain);

            if (selected === "all" || domain === selected) {
                card.classList.remove("hidden-card");   // ✅ SHOW
            } else {
                card.classList.add("hidden-card");      // ❌ HIDE
            }

        });
    });
});

function applyFilter() {

    document.querySelectorAll(".news-card.generated").forEach(card => {

        const domain = (card.dataset.domain || "").trim().toLowerCase();

        if (currentFilter === "all" || domain === currentFilter) {
            card.style.display = ""; 
        } else {
            card.style.display = "none";
        }

    });

}

// function applyFallbackCard(card, index) {

//     card.dataset.source = "fallback";
   

//     console.log("🧱 Applying FULL fallback for card:", index);

//     const fallbackData = window.FALLBACK_DATA;

//     if (!fallbackData || fallbackData.length === 0) {
//         console.error("❌ No fallback data found");
//         return;
//     }

//     // ✅ Pick correct fallback item
//     // const fallback = fallbackData[index % fallbackData.length];
//     const realIndex = parseInt(card.dataset.index);
//     const fallback = fallbackData[realIndex % fallbackData.length];

//     card.dataset.domain = fallback.domain; // 🔥 ADD THIS

//     // ================= IMAGE =================
//     const img = card.querySelector(".card-image img");
//     img.src = fallback.image;
//     // ================= DOMAIN =================
//     const pill = card.querySelector(".domain-pill");
//     pill.innerText = fallback.domain;

//     pill.classList.remove("ai", "it", "electronics");
//     pill.classList.add(fallback.domain.toLowerCase());

//     // ================= CONTENT =================
//     const content = card.querySelector(".cardContent");

//     // content.innerHTML = `
//     //     <h2 class="card-title">${fallback.title}</h2>
//     //     <p class="card-desc">${fallback.desc}</p>
//     // `;
//     card.querySelector(".card-title").innerText = fallback.title;
//     card.querySelector(".card-desc").innerText = fallback.desc;

//     // ================= GROQ CONTEXT =================
//     const cleanArticle = {
//         title: fallback.title,
//         desc: fallback.desc,
//         content: fallback.desc
//     };

//     card.dataset.article = JSON.stringify(cleanArticle);

//     console.log("✅ Fallback applied with full consistency");
// }

function applyFallbackCard(card, index) {

    console.log("🧱 Applying FULL fallback for card:", index);

    const fallbackData = window.FALLBACK_DATA;

    if (!fallbackData || fallbackData.length === 0) {
        console.error("❌ No fallback data found");
        return;
    }

    const realIndex = parseInt(card.dataset.index) || 0;
    const fallback = fallbackData[realIndex % fallbackData.length];

    // ✅ SET SOURCE + DOMAIN
    card.dataset.source = "fallback";
    card.dataset.domain = fallback.domain;

    // ================= IMAGE =================
    const img = card.querySelector(".card-image img");
    img.src = fallback.image;

    // ================= DOMAIN =================
    const pill = card.querySelector(".domain-pill");
    pill.innerText = fallback.domain;

    pill.classList.remove("ai", "it", "electronics");
    pill.classList.add(fallback.domain.toLowerCase());

    // ================= CONTENT =================
    card.querySelector(".card-title").innerText = fallback.title;
    card.querySelector(".card-desc").innerText = fallback.desc;

    // ================= GROQ CONTEXT =================
    const cleanArticle = {
        title: fallback.title,
        desc: fallback.desc,
        content: fallback.desc
    };

    card.dataset.article = JSON.stringify(cleanArticle);

    // ================= FIX: UPDATE SLIDES =================
    if (fallback.slides) {
        card.dataset.slides = JSON.stringify(fallback.slides);
        card.dataset.level = "beginner";
        card.dataset.page = 0;

         // 🔥 force UI refresh
        updateCard(index);
    }

    console.log("✅ Fallback applied correctly");
} 



