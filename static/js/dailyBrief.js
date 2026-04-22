let briefData = [];
let currentIndex = 0;
let currentLevel = "beginner";
let totalCards = 0;
let visited = new Set();

function toggleBot(btn) {
    const card = btn.closest(".news-card");
    const bot = card.querySelector(".article-bot");
    btn.classList.toggle("active");
    bot.classList.toggle("show");
}
function toggleSave(btn) { btn.classList.toggle("saved"); }
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("collapsed");
}

// ================= ARTICLE CHAT (BUG 1 FIX) =================
async function sendArticleChat(button) {
    const card = button.closest(".news-card");
    const input = card.querySelector("#articleChatInput");
    const chatBox = card.querySelector(".bot-chat");

    const text = input.value.trim();
    if (!text) return;

    const userMsg = document.createElement("div");
    userMsg.className = "msg user";
    userMsg.innerText = text;
    chatBox.appendChild(userMsg);
    input.value = "";

    const aiMsg = document.createElement("div");
    aiMsg.className = "msg ai";
    aiMsg.innerText = "Thinking...";
    chatBox.appendChild(aiMsg);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const article = briefData[currentIndex];

        const res = await fetch("/ask-article", {   // ✅ BUG 1 FIX
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                question: text,
                article: {
                    title: article.title,
                    desc: article.desc,
                    content: article.content
                }
            })
        });

        const data = await res.json();
        aiMsg.innerText = data.reply;

    } catch (err) {
        console.error("❌ Chat error:", err);
        aiMsg.innerText = "AI is currently unavailable. Please try again.";
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

// ================= BUG 2 FIX — ENRICH WITH AI DESCRIPTIONS =================
async function enrichWithDescriptions(articles) {
    const enriched = await Promise.all(articles.map(async (article) => {
        try {
            const res = await fetch("/generate-slides", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: article.title,
                    desc: article.desc,
                    content: article.content
                })
            });
            const data = await res.json();
            const slides = data.slides;

            article.descriptions = {
                beginner:     slides.beginner?.[0]?.desc     || article.desc,
                intermediate: slides.intermediate?.[0]?.desc || article.desc,
                advanced:     slides.advanced?.[0]?.desc     || article.desc
            };
        } catch (e) {
            console.warn("⚠️ Could not enrich:", article.title, e);
            article.descriptions = {
                beginner: article.desc,
                intermediate: article.desc,
                advanced: article.desc
            };
        }
        return article;
    }));
    return enriched;
}

// ================= FETCH =================
async function fetchBrief() {
    try {
        const res = await fetch("/get-news?category=AI");
        const data = await res.json();

        if (data.articles && Array.isArray(data.articles) && data.articles.length > 0) {
            briefData = data.articles.slice(0, 5);
            briefData = await enrichWithDescriptions(briefData);  // ✅ BUG 2 FIX
        } else {
            console.warn("⚠️ No API data → using fallback");
            briefData = getFallbackData();
        }

        totalCards = Math.max(briefData.length, 1);
        renderBrief();

    } catch (err) {
        console.error("❌ Fetch error:", err);
        briefData = [{
            title: "Offline mode",
            desc: "Unable to fetch latest news. Check your connection.",
            content: "",
            domain: "System",
            image: "/static/images/news1.1.png",
            descriptions: {
                beginner: "You are offline. Please check your connection and refresh.",
                intermediate: "Network connection unavailable. Please verify connectivity.",
                advanced: "Network connectivity error. Verify ISP connection and restart."
            }
        }];
        totalCards = 1;
        renderBrief();
    }
}

function getFallbackData() {
    return [
        {
            title: "AI agents are automating workflows",
            desc: "Autonomous AI agents are replacing repetitive business processes.",
            content: "Companies are adopting AI agents to streamline workflows and reduce manual work.",
            domain: "AI", image: "/static/images/news1.1.png",
            descriptions: {
                beginner: "AI agents are smart programs that do repetitive tasks automatically, saving businesses time.",
                intermediate: "Autonomous AI agents use machine learning to automate complex workflows with minimal human intervention.",
                advanced: "AI agents employ reinforcement learning and process automation to reduce operational overhead and improve efficiency metrics."
            }
        },
        {
            title: "Cyber attacks increasing globally",
            desc: "Organizations face rising ransomware threats in 2026.",
            content: "Ransomware attacks have increased 40% in the past year.",
            domain: "IT", image: "/static/images/news1.1.png",
            descriptions: {
                beginner: "Hackers are locking computer systems and demanding money. Companies need better protection.",
                intermediate: "Ransomware attacks have increased significantly using phishing and zero-day exploits to encrypt critical data.",
                advanced: "Ransomware has evolved to include supply chain targeting and multi-stage encryption, requiring advanced threat detection protocols."
            }
        },
        {
            title: "Quantum computing milestone",
            desc: "Researchers achieved stable multi-qubit operations.",
            content: "A breakthrough allows for more stable operations with multiple qubits.",
            domain: "Electronics", image: "/static/images/news1.1.png",
            descriptions: {
                beginner: "Scientists made quantum computers work better by keeping multiple quantum bits stable simultaneously.",
                intermediate: "Researchers achieved improved coherence times for multi-qubit systems enabling more complex algorithms.",
                advanced: "Advances in quantum error correction extended coherence times, facilitating complex algorithms beyond NISQ limitations."
            }
        },
        {
            title: "Web3 adoption growing",
            desc: "Decentralized apps are gaining real-world usage.",
            content: "Web3 applications are seeing increased adoption in payments and DeFi.",
            domain: "IT", image: "/static/images/news1.1.png",
            descriptions: {
                beginner: "Web3 apps use blockchain so people control their own data without big companies in the middle.",
                intermediate: "Decentralized apps built on blockchain are gaining traction with improved UX and lower barriers to entry.",
                advanced: "Layer-2 scaling solutions have enabled economically viable DeFi protocols with improved governance models driving mainstream adoption."
            }
        },
        {
            title: "Edge computing expanding",
            desc: "More processing is moving closer to devices.",
            content: "Edge computing reduces latency by processing data at the network edge.",
            domain: "Electronics", image: "/static/images/news1.1.png",
            descriptions: {
                beginner: "Instead of sending data to distant servers, computers process it nearby — making things faster.",
                intermediate: "Edge architecture distributes processing across networked devices, reducing latency and bandwidth consumption.",
                advanced: "Federated edge computing with containerization and 5G integration enables real-time IoT stream processing with reduced cloud dependency."
            }
        }
    ];
}

// ================= RENDER =================
function renderBrief() {
    const article = briefData[currentIndex];
    if (!article) return;

    document.getElementById("briefImage").src = article.image || "/static/images/news1.1.png";
    document.getElementById("briefCategory").innerText = article.domain || "Tech";
    document.getElementById("briefTitle").innerText = article.title || "No title";

    updateDescriptionForLevel();
    visited.add(currentIndex);
    updateProgress();
}

function updateDescriptionForLevel() {
    const article = briefData[currentIndex];
    if (!article) return;

    const descElement = document.getElementById("briefDesc");

    if (article.descriptions && article.descriptions[currentLevel]) {
        descElement.innerText = article.descriptions[currentLevel];
    } else {
        descElement.innerText = article.desc || article.description || "No description available";
    }
}

function updateProgress() {
    document.getElementById("cardCount").innerText = currentIndex + 1;
    document.getElementById("totalCount").innerText = totalCards;
    const percent = ((currentIndex + 1) / totalCards) * 100;
    document.getElementById("progressFill").style.width = percent + "%";
}

function setBriefLevel(level, btn) {
    currentLevel = level;
    const buttons = btn.parentElement.querySelectorAll(".level-btn");
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    updateDescriptionForLevel();
}

function animateCard(direction, callback) {
    const card = document.getElementById("briefCard");
    card.classList.remove("slide-in");

    card.classList.add(direction === "next" ? "slide-out-left" : "slide-out-right");

    setTimeout(() => {
        card.classList.remove("slide-out-left", "slide-out-right");
        callback();
        void card.offsetWidth;
        card.classList.add("slide-in");
    }, 350);
}

function nextBrief() {
    if (!briefData.length) return;
    if (currentIndex < briefData.length - 1) {
        animateCard("next", () => { currentIndex++; renderBrief(); });
    } else {
        if (visited.size >= briefData.length) showCompletion();
    }
}

function prevBrief() {
    if (currentIndex > 0) {
        animateCard("prev", () => { currentIndex--; renderBrief(); });
    }
}

function showCompletion() {
    const modal = document.createElement("div");
    modal.className = "completion-modal";
    modal.innerHTML = `
        <div class="completion-box">
            <div style="font-size:40px;">🎉</div>
            <h2 style="font-family:'Syne',sans-serif;font-size:35px;font-weight:900;margin:10px 0;">
                You're all caught up!
            </h2>
            <p style="font-family:'Space Grotesk',sans-serif;font-size:16px;color:#555;margin-top:10px;">
                You just crushed 5 tech updates in under 10 minutes. That's actually impressive ngl..
            </p>
            <button onclick="location.reload()" style="margin-top:25px;padding:12px 26px;border:2px solid black;border-radius:12px;background:#D0F248;cursor:pointer;font-weight:600;font-family:'Syne',sans-serif;">
                Review again
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", function(e) {
        if (e.target.closest(".article-bot") || e.target.closest(".comment-section")) {
            e.stopPropagation();
        }
    });
    fetchBrief();
});