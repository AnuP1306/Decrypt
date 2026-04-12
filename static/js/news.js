// // async function fetchNews(category = "AI") {

// //     let query = "";

// //     if (category === "AI") {
// //         query = "artificial intelligence OR AI";
// //     } 
// //     else if (category === "IT") {
// //         query = "technology OR software";
// //     } 
// //     else if (category === "Electronics") {
// //         query = "electronics OR hardware";
// //     }

// //     const res = await fetch(
// //         `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=6f6206bd0ca44e9a91b549f1cf461f3d`
// //     );

// //     const data = await res.json();

// //     // renderNews(data.articles, category);
// //     const article = data.articles[0]; // only ONE article per card
// //     generateAIContent(article);
// // }
// // async function fetchNews(category = "AI") {

// //     let query = "";

// //     if (category === "AI") {
// //         query = "artificial intelligence OR machine learning OR AI";
// //     } 
// //     else if (category === "IT") {
// //         query = "technology OR software OR programming";
// //     } 
// //     else if (category === "Electronics") {
// //         query = "electronics OR hardware OR semiconductors";
// //     }

// //     const res = await fetch(
// //         `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&pageSize=5&apiKey=6f6206bd0ca44e9a91b549f1cf461f3d`
// //     );

// //     const data = await res.json();

// //     const article = data.articles[0]; // SAME ARTICLE PER CARD

// //     generateAIContent(article);
// // }
// async function fetchNews(category = "AI") {

//     let query = "artificial intelligence";

//     const url = `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&pageSize=5&apiKey=6f6206bd0ca44e9a91b549f1cf461f3d`;

//     console.log("Fetching:", url);

//     const res = await fetch(url);
//     const data = await res.json();

//     console.log("API DATA:", data);

//     if (!data.articles || data.articles.length === 0) {
//         alert("No articles found");
//         return;
//     }

//     const article = data.articles[0];

//     console.log("USING ARTICLE:", article);

//     generateAIContent(article);
// }

// // async function fetchNews() {
// //     const res = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=6f6206bd0ca44e9a91b549f1cf461f3d");
// //     const data = await res.json();

// //     const article = data.articles[0]; // just first news for now

// //     generateAIContent(article);
// // }
// // function generateAIContent(article) {

// //     articleData = {
// //         beginner: [
// //             {
// //                 title: article.title,
// //                 desc: article.description
// //             }
// //         ],
// //         intermediate: [
// //             {
// //                 title: article.title,
// //                 desc: article.content || article.description
// //             }
// //         ],
// //         advanced: [
// //             {
// //                 title: article.title,
// //                 desc: article.content || article.description
// //             }
// //         ]
// //     };

// //     updatePage();
// // }

// // function generateAIContent(article) {

// //     // 🔥 UPDATE IMAGE
// //     const img = document.querySelector(".card-image img");
// //     img.src = article.urlToImage || "/static/images/news1.1.png";

// //     // 🔥 CREATE MULTIPLE SLIDES FOR SAME ARTICLE
// //     articleData = {

// //         beginner: [
// //             {
// //                 title: article.title,
// //                 desc: article.description || "No description available"
// //             },
// //             {
// //                 title: "Simple Explanation",
// //                 desc: "This news means something important but explained in a simple way for easy understanding."
// //             },
// //             {
// //                 title: "Why it matters",
// //                 desc: "This could impact real-world applications and future developments."
// //             }
// //         ],

// //         intermediate: [
// //             {
// //                 title: article.title,
// //                 desc: article.content || article.description
// //             },
// //             {
// //                 title: "Deeper Insight",
// //                 desc: "This development improves performance and capability in real scenarios."
// //             }
// //         ],

// //         advanced: [
// //             {
// //                 title: article.title,
// //                 desc: article.content || article.description
// //             },
// //             {
// //                 title: "Technical Impact",
// //                 desc: "This could influence system architectures, efficiency, and large-scale implementations."
// //             }
// //         ]
// //     };

// //     currentPage = 0;
// //     updatePage();
// // }
// // async function generateAIContent(article) {

// //     // 🔥 UPDATE IMAGE
// //     const img = document.querySelector(".card-image img");
// //     img.src = article.urlToImage || "/static/images/news1.1.png";

// //     const baseText = article.title + ". " + (article.description || "");

// //     // 🔥 CALL AI FOR DIFFERENT LEVELS
// //     const beginner = await getAIText(baseText, "beginner");
// //     const intermediate = await getAIText(baseText, "intermediate");
// //     const advanced = await getAIText(baseText, "advanced");

// //     articleData = {
// //         beginner: beginner,
// //         intermediate: intermediate,
// //         advanced: advanced
// //     };

// //     currentPage = 0;
// //     updatePage();
// // }
// // function generateAIContent(article) {

// //     // 🔥 IMAGE FROM API
// //     const img = document.querySelector(".card-image img");
// //     img.src = article.urlToImage || "/static/images/news1.1.png";

// //     // 🔥 REAL DATA (NOT STATIC)
// //     articleData = {
// //         beginner: [
// //             {
// //                 title: article.title,
// //                 desc: article.description || "No description"
// //             },
// //             {
// //                 title: "More Info",
// //                 desc: article.content || "No extra content"
// //             }
// //         ],

// //         intermediate: [
// //             {
// //                 title: article.title,
// //                 desc: article.content || "No description"
// //             }
// //         ],

// //         advanced: [
// //             {
// //                 title: article.title,
// //                 desc: article.content || "No description"
// //             }
// //         ]
// //     };

// //     currentPage = 0;
// //     updatePage();
// // }
// // async function getAIText(text, level) {

// //     const res = await fetch("/summarize", {
// //         method: "POST",
// //         headers: {
// //             "Content-Type": "application/json"
// //         },
// //         body: JSON.stringify({ text, level })
// //     });

// //     const data = await res.json();

// //     return data.slides;  // array of slides
// // }
// async function generateAIContent(article) {

//     const img = document.querySelector(".card-image img");
//     img.src = article.urlToImage || "/static/images/news1.1.png";

//     const text = article.title + ". " + article.description;

//     const beginner = await getAIText(text, "beginner");
//     const intermediate = await getAIText(text, "intermediate");
//     const advanced = await getAIText(text, "advanced");

//     articleData = {
//         beginner,
//         intermediate,
//         advanced
//     };

//     currentPage = 0;
//     updatePage();
// }
// let currentPage = 0;
        
//         // 🔥 DYNAMIC DATA (THIS WILL COME FROM API LATER)
//         let currentLevel = "beginner";

// // let articleData = {
// //   beginner: [
// //     {
// //       title: "OpenAI launches GPT-5",
// //       desc: "A new AI model that is smarter and better at understanding tasks.",
// //       showImage: true
// //     },
// //     {
// //       title: "What does it do?",
// //       desc: "It helps users solve problems, answer questions, and write content easily.",
// //       showImage: true
// //     }
// //   ],

// //   intermediate: [
// //     {
// //       title: "OpenAI launches GPT-5 with reasoning",
// //       desc: "GPT-5 improves reasoning and multi-modal understanding.",
// //       showImage: true
// //     },
// //     {
// //       title: "Key improvement",
// //       desc: "Better context awareness and accuracy across tasks.",
// //       showImage: true
// //     }
// //   ],

// //   advanced: [
// //     {
// //       title: "GPT-5 introduces advanced reasoning architecture",
// //       desc: "The model significantly enhances inference and contextual depth.",
// //       showImage: true
// //     },
// //     {
// //       title: "Impact",
// //       desc: "Potential disruption across industries like healthcare, AI research, and automation.",
// //       showImage: true
// //     }
// //   ]
// // };
// let articleData = {
//     beginner: [],
//     intermediate: [],
//     advanced: []
// };
//         // const articlePages = [
//         //     {
//         //         title: "OpenAI launches GPT-5 with reasoning capabilities",
//         //         desc: "OpenAI unveiled GPT-5 with advanced reasoning and multi-modal capabilities, marking a major leap in AI development."
//         //     },
//         //     {
//         //         title: "What makes GPT-5 different?",
//         //         desc: "GPT-5 introduces deeper reasoning, better context retention, and improved accuracy across tasks."
//         //     },
//         //     {
//         //         title: "Why this matters",
//         //         desc: "This could transform industries like education, healthcare, and software development."
//         //     }
//         // ];

//         function nextPage() {
//     const pages = articleData[currentLevel];

//     if (currentPage < pages.length - 1) {
//         currentPage++;
//         updatePage();
//     }
// }

// function prevPage() {
//     if (currentPage > 0) {
//         currentPage--;
//         updatePage();
//     }
// }

// function updatePage() {
//     const content = document.getElementById("cardContent");
//     const image = document.getElementById("cardImage");

//     const pages = articleData[currentLevel];
//     const page = pages[currentPage];

//     content.style.opacity = 0;

//     setTimeout(() => {
//         content.innerHTML = `
//             <h2 class="card-title">${page.title}</h2>
//             <p class="card-desc">${page.desc}</p>
//         `;

//         content.style.opacity = 1;
//     }, 150);
// }
// function setLevel(level, btn) {
//     currentLevel = level;
//     currentPage = 0;

//     document.querySelectorAll(".level-btn").forEach(b => b.classList.remove("active"));
//     btn.classList.add("active");

//     updatePage();
// }

// // updatePage();
// fetchNews();


// ================= FETCH NEWS =================
// async function fetchNews(category = "AI") {

//     let query = "artificial intelligence";

//     const url = `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&pageSize=5&apiKey=6f6206bd0ca44e9a91b549f1cf461f3d`;

//     console.log("Fetching:", url);

//     const res = await fetch(url);
//     const data = await res.json();

//     console.log("API DATA:", data);

//     if (!data.articles || data.articles.length === 0) {
//         alert("No articles found");
//         return;
//     }

//     const article = data.articles[0];

//     console.log("USING ARTICLE:", article);

//     generateContent(article);
// }


// // ================= GLOBAL STATE =================
// let currentPage = 0;
// let currentLevel = "beginner";

// let articleData = {
//     beginner: [],
//     intermediate: [],
//     advanced: []
// };


// // ================= TEMP CONTENT (NO AI YET) =================
// function generateContent(article) {

//     // 🔥 IMAGE
//     const img = document.querySelector(".card-image img");
//     img.src = article.urlToImage || "/static/images/news1.1.png";

//     // 🔥 CLEAN TEXT (NO 3960 CHARS ISSUE)
//     const base = article.description || "No description available";

//     articleData = {

//         beginner: [
//             {
//                 title: article.title,
//                 desc: base + " This is explained in a simple and detailed way so that anyone can understand the context clearly."
//             },
//             {
//                 title: "Why this matters",
//                 desc: "This development can impact real-world applications and future innovations in this field, making it important to follow."
//             },
//             {
//                 title: "Bigger Picture",
//                 desc: "Understanding this news helps in staying updated with how technology is evolving globally and how it affects industries."
//             }
//         ],

//         intermediate: [
//             {
//                 title: article.title,
//                 desc: base
//             },
//             {
//                 title: "Insight",
//                 desc: "This shows a shift in how systems are evolving and being implemented in real scenarios."
//             }
//         ],

//         advanced: [
//             {
//                 title: article.title,
//                 desc: base
//             }
//         ]
//     };

//     currentPage = 0;
//     updatePage();
// }


// // ================= SLIDER =================
// function nextPage() {
//     const pages = articleData[currentLevel];

//     if (currentPage < pages.length - 1) {
//         currentPage++;
//         updatePage();
//     }
// }

// function prevPage() {
//     if (currentPage > 0) {
//         currentPage--;
//         updatePage();
//     }
// }


// // ================= UPDATE UI =================
// function updatePage() {
//     const content = document.getElementById("cardContent");

//     const pages = articleData[currentLevel];

//     if (!pages || pages.length === 0) return; // 🛑 safety fix

//     const page = pages[currentPage];

//     if (!page) return; // 🛑 prevents crash

//     content.style.opacity = 0;

//     setTimeout(() => {
//         content.innerHTML = `
//             <h2 class="card-title">${page.title}</h2>
//             <p class="card-desc">${page.desc}</p>
//         `;
//         content.style.opacity = 1;
//     }, 150);
// }


// // ================= LEVEL SWITCH =================
// function setLevel(level, btn) {
//     currentLevel = level;
//     currentPage = 0;

//     document.querySelectorAll(".level-btn").forEach(b => b.classList.remove("active"));
//     btn.classList.add("active");

//     updatePage();
// }


// // ================= INIT =================
// fetchNews();


//this version works but api limit is exceeded 
// // ================= FETCH NEWS =================
// async function fetchNews(category = "AI") {

//     let query = "artificial intelligence";

//     const url = `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&pageSize=5&apiKey=6f6206bd0ca44e9a91b549f1cf461f3d`;

//     const res = await fetch(url);
//     const data = await res.json();

//     if (!data.articles || data.articles.length === 0) {
//         alert("No articles found");
//         return;
//     }

//     const article = data.articles[0];

//     generateAIContent(article);
// }


// // ================= GLOBAL STATE =================
// let currentPage = 0;
// let currentLevel = "beginner";

// let articleData = {
//     beginner: [],
//     intermediate: [],
//     advanced: []
// };


// // ================= AI CALL =================
// async function getAIText(text, level) {

//     const res = await fetch("/summarize", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ text, level })
//     });

//     const data = await res.json();

//     if (data.error) {
//         console.error("AI ERROR:", data);
//         return [];
//     }

//     return data;
// }


// // ================= GENERATE CONTENT =================
// async function generateAIContent(article) {

//     const img = document.querySelector(".card-image img");
//     img.src = article.urlToImage || "/static/images/news1.1.png";

//     const text = article.title + ". " + (article.description || "");

//     // 🔥 Load only beginner FIRST (fast UX)
//     const beginner = await getAIText(text, "beginner");

//     articleData.beginner = beginner;

//     currentPage = 0;
//     updatePage();

//     // 🔥 Load others in background
//     getAIText(text, "intermediate").then(data => {
//         articleData.intermediate = data;
//     });

//     getAIText(text, "advanced").then(data => {
//         articleData.advanced = data;
//     });
// }


// // ================= SLIDER =================
// function nextPage() {
//     const pages = articleData[currentLevel];

//     if (currentPage < pages.length - 1) {
//         currentPage++;
//         updatePage();
//     }
// }

// function prevPage() {
//     if (currentPage > 0) {
//         currentPage--;
//         updatePage();
//     }
// }


// // ================= UPDATE UI =================
// function updatePage() {
//     const content = document.getElementById("cardContent");

//     const pages = articleData[currentLevel];

//     if (!pages || pages.length === 0) return;

//     const page = pages[currentPage];

//     if (!page) return;

//     content.style.opacity = 0;

//     setTimeout(() => {
//         content.innerHTML = `
//             <h2 class="card-title">${page.title}</h2>
//             <p class="card-desc">${page.desc}</p>
//         `;
//         content.style.opacity = 1;
//     }, 150);
// }


// // ================= LEVEL SWITCH =================
// function setLevel(level, btn) {
//     currentLevel = level;
//     currentPage = 0;

//     document.querySelectorAll(".level-btn").forEach(b => b.classList.remove("active"));
//     btn.classList.add("active");

//     updatePage();
// }


// // ================= INIT =================
// fetchNews();

// ================= GLOBAL STATE =================
let currentPage = 0;
let currentLevel = "beginner";

let articleData = {
    beginner: [],
    intermediate: [],
    advanced: []
};


// ================= STATIC DATA =================
function loadStaticData() {

    const img = document.querySelector(".card-image img");
    img.src = "/static/images/news1.1.png";

    articleData = {

        beginner: [
            {
                title: "OpenAI launches GPT-5",
                desc: "OpenAI has introduced GPT-5, a new artificial intelligence model designed to improve reasoning and understanding. It can process complex inputs, generate better responses, and assist users more efficiently. This advancement makes AI more accessible and useful in everyday applications, helping people complete tasks faster and with greater accuracy."
            },
            {
                title: "How it helps users",
                desc: "GPT-5 improves productivity by assisting in writing, coding, and research tasks. It can understand context better and provide clearer explanations, making it useful for students, professionals, and developers. The model is designed to adapt to user needs, ensuring a smoother and more personalized experience."
            },
            {
                title: "Real-world impact",
                desc: "This technology can be applied in industries like healthcare, education, and business. It can automate repetitive tasks, assist decision-making, and improve efficiency. Companies can use it to enhance customer support and streamline operations."
            },
            {
                title: "Future potential",
                desc: "AI models like GPT-5 represent the future of intelligent systems. As they evolve, they may become even more accurate, reliable, and capable of handling complex problems across different domains."
            }
        ],

        intermediate: [
            {
                title: "GPT-5 improves reasoning",
                desc: "OpenAI's GPT-5 introduces better reasoning and contextual understanding, allowing it to handle more complex queries effectively."
            },
            {
                title: "Applications",
                desc: "It can be used in automation, content generation, and problem-solving tasks across industries."
            },
            {
                title: "Impact",
                desc: "This development signals a major step forward in AI adoption and real-world integration."
            }
        ],

        advanced: [
            {
                title: "GPT-5 architecture",
                desc: "The model enhances inference capabilities and multi-modal processing, improving performance across tasks."
            },
            {
                title: "Industry shift",
                desc: "It could significantly influence AI-driven systems and enterprise-level automation."
            }
        ]
    };

    updatePage();
}


// ================= SLIDER =================
function nextPage() {
    const pages = articleData[currentLevel];

    if (currentPage < pages.length - 1) {
        currentPage++;
        updatePage();
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        updatePage();
    }
}


// ================= UPDATE UI =================
function updatePage() {
    const content = document.getElementById("cardContent");

    const pages = articleData[currentLevel];
    if (!pages || pages.length === 0) return;

    const page = pages[currentPage];
    if (!page) return;

    content.style.opacity = 0;

    setTimeout(() => {
        content.innerHTML = `
            <h2 class="card-title">${page.title}</h2>
            <p class="card-desc">${page.desc}</p>
        `;
        content.style.opacity = 1;
    }, 150);
}


// ================= LEVEL SWITCH =================
function setLevel(level, btn) {
    currentLevel = level;
    currentPage = 0;

    document.querySelectorAll(".level-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    updatePage();
}


// ================= INIT =================
loadStaticData();