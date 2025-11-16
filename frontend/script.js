const API_URL = "http://localhost:5000";  // ✅ Backend URL

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded.");

    // Handle tab switching in the dashboard
    const tabs = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-content");

    function activateTab(tabId) {
        tabContents.forEach(content => content.classList.remove("active"));
        const targetContent = document.getElementById(tabId);
        if (targetContent) targetContent.classList.add("active");
    }

    tabs.forEach(tab => {
        tab.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            activateTab(targetId);
        });
    });

    // Show the first tab by default
    if (tabContents.length > 0) {
        activateTab(tabContents[0].id);
    }

    // ✅ Fetch lawyers from backend
    async function fetchLawyers() {
        try {
            const response = await fetch(`${API_URL}/api/lawyers`);
            if (!response.ok) throw new Error("Failed to fetch lawyers");

            const lawyers = await response.json();
            console.log("✅ Lawyers fetched:", lawyers);

            const lawyersContainer = document.getElementById("lawyers-list");
            lawyersContainer.innerHTML = ""; // Clear old data

            lawyers.forEach(lawyer => {
                const lawyerCard = `
                    <div class="lawyer-card">
                        <h3>${lawyer.name}</h3>
                        <p><strong>Specialization:</strong> ${lawyer.specialization}</p>
                        <p><strong>Experience:</strong> ${lawyer.experience} years</p>
                        <p><strong>Location:</strong> ${lawyer.location}</p>
                        <p><strong>Fees:</strong> ₹${lawyer.fees}</p>
                    </div>
                `;
                lawyersContainer.innerHTML += lawyerCard;
            });
        } catch (error) {
            console.error("❌ Error fetching lawyers:", error);
        }
    }

    fetchLawyers(); // ✅ Fetch lawyers when page loads

    // ✅ Login and Signup Handling
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");

    async function handleAuth(event, formType) {
        event.preventDefault(); // Prevent form submission

        const email = document.getElementById(`${formType}-email`).value.trim();
        const password = document.getElementById(`${formType}-password`).value.trim();

        if (!email || !password) {
            alert("⚠️ Please fill in all fields.");
            return;
        }

        let endpoint, userData;
        
        if (formType === "signup") {
            const name = document.getElementById("signup-name").value.trim();
            if (!name) {
                alert("⚠️ Please enter your name.");
                return;
            }
            endpoint = "/api/auth/register";
            userData = { name, email, password };
        } else {
            endpoint = "/api/auth/login";
            userData = { email, password };
        }

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || data.message || "Authentication failed");
            }

            alert(`✅ ${formType === "signup" ? "Registration" : "Login"} successful!`);
            
            if (data.token) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("userName", data.user?.name || name || "User");
                localStorage.setItem("userEmail", email);
            }
            
            window.location.href = "dashboard.html";
        } catch (error) {
            console.error("❌ Auth Error:", error);
            alert(`❌ ${error.message}`);
        }
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            handleAuth(event, "login");
        });
    }

    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            handleAuth(event, "signup");
        });
    }

    // Prevent Dashboard Flickering
    const dashboard = document.getElementById("dashboard");
    if (dashboard) {
        dashboard.style.display = "none"; // Hide initially
        setTimeout(() => {
            dashboard.style.display = "block"; // Show after short delay
        }, 300);
    }

    // 🔥 AI Chatbox Handling
    const askAiButton = document.getElementById("send-button");
    if (askAiButton) {
        askAiButton.addEventListener("click", async function () {
            const question = document.getElementById("question-input").value.trim();
            if (!question) {
                alert("⚠️ Please enter a question first.");
                return;
            }

            try {
                const response = await fetch(`${API_URL}/api/chat`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ question })
                });

                const data = await response.json();
                alert(`🤖 AI Response: "${data.answer}"`);
            } catch (error) {
                console.error("❌ AI Chat Error:", error);
                alert("❌ AI Chat failed. Try again.");
            }
        });
    }

    // 🔥 Case Search
    const caseSearchButton = document.getElementById("search-button");
    if (caseSearchButton) {
        caseSearchButton.addEventListener("click", async function () {
            try {
                const response = await fetch(`${API_URL}/api/cases`);
                const data = await response.json();
                alert("🔎 Case search results received!");
            } catch (error) {
                console.error("❌ Case Search Error:", error);
                alert("❌ Case search failed.");
            }
        });
    }

    // 🔔 Notifications Click Handling
    const notificationBell = document.querySelector(".notification-bell");
    if (notificationBell) {
        notificationBell.addEventListener("click", function () {
            alert("🔔 You have new notifications. Check your case status section!");
        });
    }

    // Initialize Swiper
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 3, // Number of cards visible at a time
        spaceBetween: 20, // Space between slides
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        loop: true, // Makes it an infinite slider
    });

    // Profile Icon Click Handling
    const userIcon = document.getElementById("user-icon");

    if (userIcon) {
        userIcon.addEventListener("click", function () {
            document.getElementById("user-name").textContent = localStorage.getItem("userName");
            document.getElementById("user-email").textContent = localStorage.getItem("userEmail");
            document.getElementById("user-phone").textContent = localStorage.getItem("userPhone");
            document.getElementById("user-password").textContent = "********"; // Masked password
        });
    }
});

// FAQ
document.addEventListener("DOMContentLoaded", function () {
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {
        question.addEventListener("click", function () {
            const answer = this.nextElementSibling; // Get the next sibling (the answer)
            answer.style.display = answer.style.display === "block" ? "none" : "block";
            this.querySelector("span").textContent = answer.style.display === "block" ? "-" : "+";
        });
    });
});

// References
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".footer-bottom p").innerHTML = `© ${new Date().getFullYear()} NyayaSetu | All Rights Reserved`;
});
