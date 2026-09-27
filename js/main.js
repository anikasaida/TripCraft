const themeBtn = document.getElementById("themeBtn");
if (themeBtn) {
    themeBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            themeBtn.textContent = "☀️";
            localStorage.setItem("tripcraft-theme", "dark");
        } else {
            themeBtn.textContent = "🌙";
            localStorage.setItem("tripcraft-theme", "light");
        }

    });

}

const savedTheme = localStorage.getItem("tripcraft-theme");
if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    if (themeBtn) {
        themeBtn.textContent = "☀️";
    }

}



const currentPage = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach(function (link) {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});
console.log("TripCraft loaded successfully!");