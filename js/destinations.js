const searchInput = document.getElementById("destinationSearch");
const categoryFilter = document.getElementById("categoryFilter");
const destinationCards = document.querySelectorAll(".destination-item");

if (searchInput) {
    searchInput.addEventListener("input", filterDestinations);
}

if (categoryFilter) {
    categoryFilter.addEventListener("change", filterDestinations);
}

function filterDestinations() {
    let searchText = searchInput.value.toLowerCase();
    let selectedCategory = categoryFilter.value;
    destinationCards.forEach(function (card) {
        let cardText = card.textContent.toLowerCase();
        let cardCategory = card.getAttribute("data-category");
        let searchMatch = cardText.includes(searchText);
        let categoryMatch = selectedCategory === "all" ||
            cardCategory === selectedCategory;

        if (searchMatch && categoryMatch) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}


const saveButtons = document.querySelectorAll(".save-btn");
saveButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const card = button.parentElement.parentElement;
        const destinationName = card.querySelector("h3").textContent;

        let savedDestinations =
            JSON.parse(
                localStorage.getItem("tripcraft-saved")
            ) || [];

        if (savedDestinations.includes(destinationName)) {
            savedDestinations = savedDestinations.filter(function (name) {
                    return name !== destinationName;

                });

            button.textContent = "♡ Save";
            alert(destinationName + " removed from saved list.");
        } else {
            savedDestinations.push(destinationName);
            button.textContent = "♥ Saved";
            alert(destinationName + " saved successfully!");

        }

        localStorage.setItem(
            "tripcraft-saved",
            JSON.stringify(savedDestinations)
        );
    });
});