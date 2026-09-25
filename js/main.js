const themeBtn = document.getElementById("themeBtn");
if (themeBtn) {
    const savedTheme = localStorage.getItem("tripcraft-theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeBtn.textContent = "☀️";
    } else {
        themeBtn.textContent = "🌙";
    }
    themeBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            themeBtn.textContent = "☀️";
            localStorage.setItem( "tripcraft-theme", "dark" );
        } else {
            themeBtn.textContent = "🌙";
            localStorage.setItem( "tripcraft-theme", "light" );
        }
    });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach(function (link) {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
        link.classList.add("active");

    } else {
        link.classList.remove("active");
    }
});

function showNotification(message, type = "success") {
    const oldNotification = document.querySelector(".tripcraft-notification");
    if (oldNotification) {
        oldNotification.remove();
    }

    const notification = document.createElement("div");
    notification.className = "tripcraft-notification";
    let icon = "✅";
    if (type === "error") {
        icon = "❌";
    }
    if (type === "warning") {
        icon = "⚠️";
    }

    notification.innerHTML = `
        <span>${icon}</span>
        <span>${message}</span>
    `;

    notification.style.position = "fixed";
    notification.style.top = "90px";
    notification.style.right = "25px";
    notification.style.zIndex = "9999";
    notification.style.display = "flex";
    notification.style.alignItems = "center";
    notification.style.gap = "10px";
    notification.style.padding = "14px 18px";
    notification.style.background = "#ffffff";
    notification.style.color = "#172033";
    notification.style.borderRadius = "10px";
    notification.style.boxShadow ="0 10px 30px rgba(0,0,0,0.15)";
    notification.style.fontSize = "14px";
    notification.style.fontWeight = "600";
    notification.style.transition = "all 0.3s ease";
    document.body.appendChild(notification);
    setTimeout(function () {
        notification.style.opacity = "0";
        notification.style.transform = "translateX(20px)";
        setTimeout(function () {
            if (notification) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}


document.querySelectorAll(
    'a[href^="#"]'
).forEach(function (link) {
    link.addEventListener("click", function (event) {
        const targetId = this.getAttribute("href");
        if (targetId === "#") {
            return;
        }
        const target = document.querySelector(targetId);
        if (target) {
            event.preventDefault();
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

document.addEventListener( "keydown",
    function (event) {
        if (event.key === "Escape") {
            const notification = document.querySelector(
                    ".tripcraft-notification" );
            if (notification) {
                notification.remove();
            } }
    }
);

document.addEventListener(
    "DOMContentLoaded",
    function () {
        console.log("✈️ TripCraft loaded successfully!" );
    }
);