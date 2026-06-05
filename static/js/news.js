// final version:

let allArticles = [];
let currentIndex = 0;
const BATCH_SIZE = 5;

async function fetchNews() {

    const res = await fetch(`/get-news`);
    const data = await res.json();

    console.log("🧪 Articles received:", data.articles);

    let userDomain = (window.USER_DOMAIN || "all").toLowerCase();

    // ===============================
    // 🔥 STEP 1: HANDLE DATA SOURCE
    // ===============================

    if (!data.articles || data.articles.length === 0) {
        console.warn("⚠️ No API data — using fallback");

        let fallback = Array.isArray(window.FALLBACK_DATA)
            ? window.FALLBACK_DATA
            : [];

        // ✅ KEEP ALL DATA
        allArticles = fallback;

        // ✅ PRIORITIZE USER DOMAIN (NOT FILTER OUT)
        if (userDomain !== "all") {
            const preferred = allArticles.filter(item =>
                (item.domain || "").toLowerCase() === userDomain
            );

            const others = allArticles.filter(item =>
                (item.domain || "").toLowerCase() !== userDomain
            );

            allArticles = [...preferred, ...others];
        }

    } else {

        // ===============================
        // 🔥 API DATA (UNCHANGED GOOD LOGIC)
        // ===============================

        function interleaveByDomain(articles) {

            const groups = {
                ai: [],
                it: [],
                electronics: []
            };

            articles.forEach(item => {
                const d = (item.domain || "ai").toLowerCase();

                if (d.includes("ai")) groups.ai.push(item);
                else if (d.includes("it")) groups.it.push(item);
                else groups.electronics.push(item);
            });

            const result = [];

            while (
                groups.ai.length > 0 ||
                groups.it.length > 0 ||
                groups.electronics.length > 0
            ) {
                if (groups.ai.length) result.push(groups.ai.shift());
                if (groups.it.length) result.push(groups.it.shift());
                if (groups.electronics.length) result.push(groups.electronics.shift());
            }

            return result;
        }

        allArticles = interleaveByDomain(data.articles);
    }

    // ===============================
    // 🔥 SAFETY FIX (IMPORTANT)
    // ===============================

    if (!Array.isArray(allArticles)) {
        console.error("❌ allArticles is NOT array:", allArticles);
        allArticles = [];
    }

    allArticles = allArticles.map(item => ({
        ...item,
        domain: item.domain || "AI"
    }));

    // ===============================
    // 🔥 UI RENDER RESET
    // ===============================

    const container = document.getElementById("newsContainer");
    const template = document.querySelector("#newsCard");

    if (!template) {
        console.error("❌ Template card not found in HTML");
        return;
    }

    template.style.display = "none";

    document.querySelectorAll(".news-card.generated")
        .forEach(card => card.remove());

    // ===============================
    // 🔥 LOAD FIRST BATCH
    // ===============================

    currentIndex = 0;
    loadMoreCards();

    // ===============================
    // 🔥 APPLY FILTER (VERY IMPORTANT)
    // ===============================

    setTimeout(() => {
        applyFilter();
        console.log("✅ Filter applied with:", currentFilter);
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
    // card.dataset.level = "beginner";

    let defaultLevel = "beginner";

    if (window.USER_LEVEL) {
        const lvl = window.USER_LEVEL.toLowerCase();

        if (lvl.includes("intermediate")) defaultLevel = "intermediate";
        else if (lvl.includes("advanced")) defaultLevel = "advanced";
    }

card.dataset.level = defaultLevel;
// 🔥 AUTO APPLY LEVEL BUTTON (VERY IMPORTANT)
setTimeout(() => {
    const levelBtns = card.querySelectorAll(".level-btn");

    if (defaultLevel === "beginner") {
        levelBtns[0]?.click();
    } 
    else if (defaultLevel === "intermediate") {
        levelBtns[1]?.click();
    } 
    else if (defaultLevel === "advanced") {
        levelBtns[2]?.click();
    }

}, 100);
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
    // card.dataset.domain = article.domain;
    card.dataset.domain = (article.domain || "").toLowerCase();

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
        // if (data.source === "fallback") {
        //     console.log(`⚠️ [Card ${index}] Fallback used`);
        // } else {
        //     console.log(`✅ [Card ${index}] Gemini used`);
        // }
        
        
        // 🔥 ALWAYS update after data loads
      
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
    if (data.source === "fallback") {
            applyFallbackCard(card, index);
        }
    updateCard(index);
    card.dataset.source = data.source; // ✅ ADD THIS
    console.log(`📊 [Card ${index}] Source:`, data.source);

    
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

    

    // ✅ GET CURRENT SLIDE CONTENT
    const currentLevel = card.dataset.level;
    const slides = JSON.parse(card.dataset.slides || "{}");
    const currentPage = parseInt(card.dataset.page || 0);

    const slide = slides[currentLevel]?.[currentPage] || {};

    const fullContext = `
    Title: ${articleData.title}

    Slide Title: ${slide.title || ""}
    Explanation: ${slide.desc || articleData.desc}
    `;

    // const fullContext = `
    // Title: ${articleData.title || ""}
    // Description: ${articleData.desc || ""}
    
    // `;

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





const container = document.getElementById("newsContainer");


const template = document.getElementById("newsCard");
console.log("template:", template);
// window.onload = function () {
//     fetchNews();
// };
document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM loaded");
    fetchNews();
    setTimeout(() => {
        applyFilter();
    }, 300);

    // 🔥 AUTO CLICK CORRECT FILTER BUTTON (UI HIGHLIGHT)
    setTimeout(() => {
        const filters = document.querySelectorAll(".filter");

        filters.forEach(btn => {
            const text = btn.innerText.toLowerCase();
        
            if (
                (currentFilter === "ai" && text.includes("ai")) ||
                (currentFilter === "it" && text.includes("it")) ||
                (currentFilter === "electronics" && text.includes("elect"))
            ) {
                btn.click();
            }
        });

        // filters.forEach(btn => {
        //     if (btn.innerText.toLowerCase() === currentFilter) {
        //         btn.click();
        //     }
        // });
    }, 400);
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
// let currentFilter = "all";
// let currentFilter = window.USER_DOMAIN || "all";
let currentFilter = (window.USER_DOMAIN || "all").toLowerCase();
// 🔥 APPLY USER DOMAIN FILTER ON LOAD
if (window.USER_DOMAIN) {
    currentFilter = window.USER_DOMAIN;
}

// if (window.USER_TOPICS && window.USER_TOPICS.length > 0) {
//     const firstTopic = window.USER_TOPICS[0].toLowerCase();

//     if (firstTopic.includes("artificial")) currentFilter = "ai";
//     else if (firstTopic.includes("technology")) currentFilter = "it";
//     else if (firstTopic.includes("electronics")) currentFilter = "electronics";
// }

filters.forEach(btn => {
    btn.addEventListener("click", () => {

        filters.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // const selected = btn.innerText.trim().toLowerCase();
        let selected = btn.innerText.trim().toLowerCase();

        if (selected.includes("ai")) selected = "ai";
        else if (selected.includes("it")) selected = "it";
        else if (selected.includes("elect")) selected = "electronics";
        else selected = "all";


        currentFilter = selected;

        applyFilter(); // 🔥 ADD THIS

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


function applyFallbackCard(card, index) {

    console.log("🧱 Applying FULL fallback for card:", index);

    const fallbackData = window.FALLBACK_DATA;

    if (!fallbackData || fallbackData.length === 0) {
        console.error("❌ No fallback data found");
        return;
    }

    const realIndex = parseInt(card.dataset.index) || 0;
    // const fallback = fallbackData[realIndex % fallbackData.length];
    const fallback = allArticles[realIndex];

    if (!fallback) {
        console.error("❌ No fallback found for index:", realIndex);
        return;
    }

    // ✅ SET SOURCE + DOMAIN
    card.dataset.source = "fallback";
    // card.dataset.domain = fallback.domain;
    card.dataset.domain = (fallback.domain || "").toLowerCase();

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
        // card.dataset.level = "beginner";
        card.dataset.level = window.USER_LEVEL?.toLowerCase() || "beginner";
        card.dataset.page = 0;

         // 🔥 force UI refresh
        updateCard(index);
    }

    console.log("✅ Fallback applied correctly");
} 



