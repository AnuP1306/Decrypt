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

//working version (static data)
// // ================= GLOBAL STATE =================
// let currentPage = 0;
// let currentLevel = "beginner";

// let articleData = {
//     beginner: [],
//     intermediate: [],
//     advanced: []
// };


// // ================= STATIC DATA =================
// function loadStaticData() {

//     const img = document.querySelector(".card-image img");
//     img.src = "/static/images/news1.1.png";

//     articleData = {

//         beginner: [
//             {
//                 title: "OpenAI launches GPT-5",
//                 desc: "OpenAI has introduced GPT-5, a new artificial intelligence model designed to improve reasoning and understanding. It can process complex inputs, generate better responses, and assist users more efficiently. This advancement makes AI more accessible and useful in everyday applications, helping people complete tasks faster and with greater accuracy."
//             },
//             {
//                 title: "How it helps users",
//                 desc: "GPT-5 improves productivity by assisting in writing, coding, and research tasks. It can understand context better and provide clearer explanations, making it useful for students, professionals, and developers. The model is designed to adapt to user needs, ensuring a smoother and more personalized experience."
//             },
//             {
//                 title: "Real-world impact",
//                 desc: "This technology can be applied in industries like healthcare, education, and business. It can automate repetitive tasks, assist decision-making, and improve efficiency. Companies can use it to enhance customer support and streamline operations."
//             },
//             {
//                 title: "Future potential",
//                 desc: "AI models like GPT-5 represent the future of intelligent systems. As they evolve, they may become even more accurate, reliable, and capable of handling complex problems across different domains."
//             }
//         ],

//         intermediate: [
//             {
//                 title: "GPT-5 improves reasoning",
//                 desc: "OpenAI's GPT-5 introduces better reasoning and contextual understanding, allowing it to handle more complex queries effectively."
//             },
//             {
//                 title: "Applications",
//                 desc: "It can be used in automation, content generation, and problem-solving tasks across industries."
//             },
//             {
//                 title: "Impact",
//                 desc: "This development signals a major step forward in AI adoption and real-world integration."
//             }
//         ],

//         advanced: [
//             {
//                 title: "GPT-5 architecture",
//                 desc: "The model enhances inference capabilities and multi-modal processing, improving performance across tasks."
//             },
//             {
//                 title: "Industry shift",
//                 desc: "It could significantly influence AI-driven systems and enterprise-level automation."
//             }
//         ]
//     };

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
// loadStaticData();

// working version ends here

// let currentPage = 0;
// let currentLevel = "beginner";

// let articleData = {
//     beginner: [],
//     intermediate: [],
//     advanced: []
// };


// // ================= FETCH NEWS =================
// async function fetchNews(category = "AI") {

//     const res = await fetch(`/get-news?category=${category}`);
//     const data = await res.json();

//     if (data.error) {
//         alert("Failed to load news");
//         return;
//     }

//     articleData = data.slides;

//     // 🔥 SET IMAGE
//     const img = document.querySelector(".card-image img");
//     img.src = data.image || "/static/images/news1.1.png";

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


//gives correct news but all in one card
// let articles = [];
// let currentArticleIndex = 0;

// let currentPage = 0;
// let currentLevel = "beginner";
// let articleData = {};

// // ================= FETCH ALL ARTICLES =================
// async function fetchNews() {
//     const res = await fetch("/get-news");
//     const data = await res.json();

//     articles = data.articles;

//     loadArticle(0); // 🔥 load first article
// }

// // ================= LOAD SINGLE ARTICLE =================
// async function loadArticle(index) {
//     currentArticleIndex = index;
//     currentPage = 0;

//     const article = articles[index];

//     // SET IMAGE
//     document.querySelector(".card-image img").src =
//         article.image || "/static/images/news1.1.png";

//     // 🔥 CALL AI FOR THIS ARTICLE ONLY
//     const res = await fetch("/generate-slides", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(article)
//     });

//     const data = await res.json();

//     articleData = data.slides;

//     updatePage();
// }

// // ================= NEXT ARTICLE =================
// function nextArticle() {
//     if (currentArticleIndex < articles.length - 1) {
//         loadArticle(currentArticleIndex + 1);
//     }
// }

// // ================= PREV ARTICLE =================
// function prevArticle() {
//     if (currentArticleIndex > 0) {
//         loadArticle(currentArticleIndex - 1);
//     }
// }

// // ================= SLIDER =================
// function nextPage() {
//     const pages = articleData[currentLevel];

//     if (currentPage < pages.length - 1) {
//         currentPage++;
//         updatePage();
//     } else {
//         nextArticle(); // 🔥 move to next news
//     }
// }

// function prevPage() {
//     if (currentPage > 0) {
//         currentPage--;
//         updatePage();
//     } else {
//         prevArticle();
//     }
// }

// // ================= UPDATE UI =================
// function updatePage() {
//     const content = document.getElementById("cardContent");

//     const pages = articleData[currentLevel];
//     if (!pages) return;

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

// // ================= GLOBAL =================
// let articles = [];
// let currentArticleIndex = 0;

// let currentPage = 0;
// let currentLevel = "beginner";
// let articleData = {};

// // ================= FETCH ALL ARTICLES =================
// async function fetchNews() {
//     const res = await fetch("/get-news");
//     const data = await res.json();

//     articles = data.articles;

//     loadArticle(0); // load first article
// }


// // ================= LOAD ONE ARTICLE =================
// async function loadArticle(index) {
//     currentArticleIndex = index;
//     currentPage = 0;

//     const article = articles[index];

//     // 🔥 UPDATE IMAGE
//     document.querySelector(".card-image img").src =
//         article.image || "/static/images/news1.1.png";

//     // 🔥 UPDATE DOMAIN PILL
//     // const pill = document.querySelector(".news-pill"); // make sure class matches
//     const pill = document.getElementById("domainPill");
//     if (pill) {
//         pill.innerText = article.domain;
//         pill.classList.remove("ai", "it", "electronics");

// // ADD NEW CLASS
//         if (article.domain === "AI") {
//             pill.classList.add("ai");
//         } else if (article.domain === "IT") {
//             pill.classList.add("it");
//         } else {
//             pill.classList.add("electronics");
//         }
//     }

//     // 🔥 CALL AI FOR THIS ARTICLE
//     const res = await fetch("/generate-slides", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(article)
//     });

//     const data = await res.json();

//     articleData = data.slides;

//     updatePage();
// }


// // ================= NEXT ARTICLE =================
// function nextArticle() {
//     if (currentArticleIndex < articles.length - 1) {
//         loadArticle(currentArticleIndex + 1);
//     }
// }

//polished but again same mistake
// // ================= PREV ARTICLE =================
// function prevArticle() {
//     if (currentArticleIndex > 0) {
//         loadArticle(currentArticleIndex - 1);
//     }
// }


// // ================= NEXT SLIDE =================
// function nextPage() {
//     const pages = articleData[currentLevel];

//     if (currentPage < pages.length - 1) {
//         currentPage++;
//         updatePage();
//     } else {
//         // 🔥 move to next article
//         nextArticle();
//     }
// }


// // ================= PREV SLIDE =================
// function prevPage() {
//     if (currentPage > 0) {
//         currentPage--;
//         updatePage();
//     } else {
//         // 🔥 go to previous article
//         prevArticle();
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

// // ================= FETCH & RENDER FEED =================
// async function fetchNews() {
//     const res = await fetch("/get-news");
//     const data = await res.json();

//     const container = document.querySelector(".feed-container");

//     // REMOVE OLD CARD
//     const oldCard = document.getElementById("newsCard");
//     oldCard.remove();

//     data.articles.forEach((article, index) => {
//         createNewsCard(article, container, index);
//     });
// }


// // ================= CREATE CARD =================
// // async function createNewsCard(article, container, index) {

// //     const card = document.createElement("div");
// //     card.className = "news-card";

// //     card.innerHTML = `
// //         <div class="card-image">
// //             <img src="${article.image || '/static/images/news1.1.png'}">

// //             <span class="domain-pill ${article.domain.toLowerCase()}">
// //                 ${article.domain}
// //             </span>
// //         </div>

// //         <div class="card-content">

// //             <div class="card-text" id="cardContent-${index}">
// //                 <h2 class="card-title">Loading...</h2>
// //                 <p class="card-desc">Fetching explanation...</p>
// //             </div>

// //             <div class="card-actions">
// //                 <div class="level-toggle">
// //                     <button class="level-btn active" onclick="setLevel(${index}, 'beginner', this)">B</button>
// //                     <button class="level-btn" onclick="setLevel(${index}, 'intermediate', this)">I</button>
// //                     <button class="level-btn" onclick="setLevel(${index}, 'advanced', this)">A</button>
// //                 </div>
// //             </div>

// //         </div>
// //     `;

// //     container.appendChild(card);

// //     // 🔥 LOAD AI CONTENT
// //     const res = await fetch("/generate-slides", {
// //         method: "POST",
// //         headers: {
// //             "Content-Type": "application/json"
// //         },
// //         body: JSON.stringify(article)
// //     });

// //     const data = await res.json();

// //     card.dataset.slides = JSON.stringify(data.slides);
// //     card.dataset.page = 0;
// //     card.dataset.level = "beginner";

// //     updateCard(index);
// // }\
// async function createNewsCard(article, container, index) {

//     // 🔥 CLONE EXISTING CARD (THIS FIXES EVERYTHING)
//     const template = document.getElementById("newsCard");
//     const card = template.cloneNode(true);

//     card.id = ""; // remove duplicate ID

//     // ================= UPDATE IMAGE =================
//     const img = card.querySelector(".card-image img");
//     img.src = article.image || "/static/images/news1.1.png";

//     // ================= UPDATE PILL =================
//     const pill = card.querySelector(".domain-pill");
//     pill.innerText = article.domain;

//     pill.classList.remove("ai", "it", "electronics");
//     pill.classList.add(article.domain.toLowerCase());

//     // ================= UPDATE CONTENT ID =================
//     const content = card.querySelector("#cardContent");
//     content.id = `cardContent-${index}`;

//     // ================= RESET TEXT =================
//     content.innerHTML = `
//         <h2 class="card-title">Loading...</h2>
//         <p class="card-desc">Fetching explanation...</p>
//     `;

//     // ================= FIX BUTTON EVENTS =================
//     card.querySelector(".next-btn")?.setAttribute("onclick", `nextPage(${index})`);

//     // LEVEL BUTTONS
//     const levelBtns = card.querySelectorAll(".level-btn");
//     levelBtns[0].setAttribute("onclick", `setLevel(${index}, 'beginner', this)`);
//     levelBtns[1].setAttribute("onclick", `setLevel(${index}, 'intermediate', this)`);
//     levelBtns[2].setAttribute("onclick", `setLevel(${index}, 'advanced', this)`);

//     // ================= STORE DATA =================
//     card.dataset.page = 0;
//     card.dataset.level = "beginner";

//     container.appendChild(card);

//     // ================= CALL AI =================
//     const res = await fetch("/generate-slides", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(article)
//     });

//     const data = await res.json();

//     card.dataset.slides = JSON.stringify(data.slides);

//     updateCard(index);
// }


// // ================= UPDATE CARD =================
// // function updateCard(index) {

// //     const card = document.querySelectorAll(".news-card")[index];
// //     const slides = JSON.parse(card.dataset.slides);
// //     const level = card.dataset.level;
// //     const page = parseInt(card.dataset.page);

// //     const content = document.getElementById(`cardContent-${index}`);

// //     const slide = slides[level][page];

// //     content.innerHTML = `
// //         <h2 class="card-title">${slide.title}</h2>
// //         <p class="card-desc">${slide.desc}</p>
// //     `;
// // }
// function updateCard(index) {

//     const card = document.querySelectorAll(".news-card")[index];
//     const slides = JSON.parse(card.dataset.slides);
//     const level = card.dataset.level;
//     const page = parseInt(card.dataset.page);

//     const content = card.querySelector(`#cardContent-${index}`);

//     if (!slides || !slides[level]) return;

//     const slide = slides[level][page];
//     if (!slide) return;

//     content.innerHTML = `
//         <h2 class="card-title">${slide.title}</h2>
//         <p class="card-desc">${slide.desc}</p>
//     `;
// }


// // ================= LEVEL SWITCH =================
// // function setLevel(index, level, btn) {

// //     const card = document.querySelectorAll(".news-card")[index];

// //     card.dataset.level = level;
// //     card.dataset.page = 0;

// //     // button UI
// //     btn.parentElement.querySelectorAll(".level-btn").forEach(b => b.classList.remove("active"));
// //     btn.classList.add("active");

// //     updateCard(index);
// // }
// function setLevel(index, level, btn) {

//     const card = document.querySelectorAll(".news-card")[index];

//     card.dataset.level = level;
//     card.dataset.page = 0;

//     btn.parentElement.querySelectorAll(".level-btn").forEach(b => b.classList.remove("active"));
//     btn.classList.add("active");

//     updateCard(index);
// }


// // ================= INIT =================
// fetchNews();





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
async function fetchNews() {

    const res = await fetch("/get-news");
    const data = await res.json();

    const container = document.querySelector("newsContainer");

    const template = document.querySelector("#newsCard");

    if (!template) {
        console.error("❌ Template card not found in HTML");
        return;
    }

    template.style.display = "none";

    // remove old generated cards only
    document.querySelectorAll(".news-card.generated").forEach(card => card.remove());

    data.articles.forEach((article, index) => {

        // 🔥 ONLY FIRST 3 USE AI
        if (index < 1) {
            createNewsCard(article, container, index);
        } else {
            createStaticCard(article, container);
        }

    });
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
    content.id = `cardContent-${index}`;

    content.innerHTML = `
        <h2 class="card-title">Loading...</h2>
        <p class="card-desc">Fetching explanation...</p>
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
    card.dataset.article = JSON.stringify(article);

    // console.log("isConnected:", container.isConnected);

    // container.appendChild(card);
    document.getElementById("newsContainer").appendChild(card);

    // ================= AI CALL =================
    if (card.dataset.slidesLoaded) return;  // 🧠 prevent duplicate calls
    card.dataset.slidesLoaded = "true";
    const res = await fetch("/generate-slides", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
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

    card.dataset.slides = JSON.stringify(data.slides);

    if (nextBtn) nextBtn.disabled = false;

    updateCard(index);
}


// ================= STATIC CARD =================
function createStaticCard(article, container) {

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

    // CONTENT (RAW NEWS)
    const content = card.querySelector(".cardContent");

    content.innerHTML = `
        <h2 class="card-title">${article.title}</h2>
        <p class="card-desc">${article.description || "No description available."}</p>
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
    const card = document.querySelectorAll(".news-card.generated")[index];

    if (!card || !card.dataset.slides) return;

    const slides = JSON.parse(card.dataset.slides);
    const level = card.dataset.level;
    const page = parseInt(card.dataset.page);

    if (!slides[level] || !slides[level][page]) return;

    const content = card.querySelector(`.cardContent-${index}`);
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
    const card = document.querySelectorAll(".news-card.generated")[index];

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
    const card = document.querySelectorAll(".news-card.generated")[index];

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

    const botBody = card.querySelector(".bot-body");

    // USER MESSAGE
    botBody.innerHTML += `
        <div class="bot-message user">${text}</div>
    `;

    input.value = "";

    // LOADING
    const loading = document.createElement("div");
    loading.className = "bot-message";
    loading.innerText = "Thinking...";
    botBody.appendChild(loading);

    // 🔥 GET ARTICLE CONTEXT
    const article = JSON.parse(card.dataset.article);

    try {
        const res = await fetch("/ask-article", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: text,
                article: article
            })
        });

        const data = await res.json();

        loading.innerText = data.reply;

    } catch (err) {
        loading.innerText = "Error connecting to AI.";
    }

    botBody.scrollTop = botBody.scrollHeight;
}


// ================= INIT =================
// fetchNews();
// document.addEventListener("DOMContentLoaded", function () {
//     fetchNews();
// });


const container = document.getElementById("newsContainer");


const template = document.getElementById("newsCard");
console.log("template:", template);
window.onload = function () {
    fetchNews();
};



