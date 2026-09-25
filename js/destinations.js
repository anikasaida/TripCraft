const searchInput =
document.getElementById("destinationSearch");

const categoryFilter =
document.getElementById("categoryFilter");

const destinationContainer =
document.getElementById("destinationContainer");

/* =========================
2. DESTINATION SEARCH
========================= */

if (searchInput) {

searchInput.addEventListener(
    "input",
    filterDestinations
);

}

/* =========================
3. CATEGORY FILTER
========================= */

if (categoryFilter) {

categoryFilter.addEventListener(
    "change",
    filterDestinations
);

}

/* =========================
4. FILTER FUNCTION
========================= */

function filterDestinations() {

const searchText =
    searchInput
        ? searchInput.value
            .toLowerCase()
            .trim()
        : "";

const selectedCategory =
    categoryFilter
        ? categoryFilter.value
        : "all";


const destinations =
    document.querySelectorAll(
        ".destination-item"
    );


let visibleCount = 0;


destinations.forEach(function (destination) {

    const destinationName =
        destination
            .querySelector("h3")
            ?.textContent
            .toLowerCase() || "";


    const destinationText =
        destination
            .textContent
            .toLowerCase();


    const destinationCategory =
        destination.dataset.category;


    /* Search condition */

    const matchesSearch =
        destinationText.includes(searchText) ||
        destinationName.includes(searchText);


    /* Category condition */

    const matchesCategory =
        selectedCategory === "all" ||
        destinationCategory === selectedCategory;


    /* Show / Hide */

    if (
        matchesSearch &&
        matchesCategory
    ) {

        destination.style.display = "";

        visibleCount++;

    } else {

        destination.style.display = "none";
    }

});


/* Show no result message */

showNoResults(visibleCount);

}

/* =========================
5. NO RESULTS MESSAGE
========================= */

function showNoResults(count) {

if (!destinationContainer) {
    return;
}


let noResult =
    document.getElementById(
        "noDestinationResult"
    );


if (count === 0) {

    if (!noResult) {

        noResult =
            document.createElement("div");

        noResult.id =
            "noDestinationResult";

        noResult.innerHTML = `
            <div style="
                grid-column: 1 / -1;
                text-align: center;
                padding: 60px 20px;
                background: white;
                border-radius: 18px;
                border: 1px solid #e2e8f0;
            ">

                <div style="
                    font-size: 3rem;
                    margin-bottom: 15px;
                ">
                    🗺️
                </div>

                <h3 style="
                    color: #172033;
                    margin-bottom: 8px;
                ">
                    No Destinations Found
                </h3>

                <p style="
                    color: #64748b;
                ">
                    Try another destination or category.
                </p>

            </div>
        `;

        destinationContainer.appendChild(
            noResult
        );
    }

} else {

    if (noResult) {
        noResult.remove();
    }
}

}

/* =========================
6. SAVE DESTINATION
========================= */

const saveButtons =
document.querySelectorAll(".save-btn");

saveButtons.forEach(function (button) {

button.addEventListener(
    "click",
    function () {

        const card =
            this.closest(
                ".destination-card"
            );


        if (!card) {
            return;
        }


        const name =
            card.querySelector("h3")
                ?.textContent
                .trim();


        const location =
            card.querySelector(
                ".destination-info > p"
            )
            ?.textContent
            .trim();


        const image =
            card.querySelector("img")
                ?.getAttribute("src");


        if (!name) {
            return;
        }


        /* Get saved destinations */

        let savedDestinations =
            JSON.parse(
                localStorage.getItem(
                    "tripcraft-saved-destinations"
                )
            ) || [];


        /* Check if already saved */

        const existingIndex =
            savedDestinations.findIndex(
                function (item) {
                    return item.name === name;
                }
            );


        if (existingIndex !== -1) {

            /* Remove from saved */

            savedDestinations.splice(
                existingIndex,
                1
            );


            this.innerHTML = "♡ Save";


            showNotification(
                `${name} removed from saved destinations.`,
                "warning"
            );

        } else {

            /* Add destination */

            savedDestinations.push({

                name: name,

                location:
                    location || "",

                image:
                    image || "",

                savedAt:
                    new Date().toISOString()

            });


            this.innerHTML = "♥ Saved";


            showNotification(
                `${name} saved successfully!`
            );
        }


        /* Save to localStorage */

        localStorage.setItem(
            "tripcraft-saved-destinations",
            JSON.stringify(
                savedDestinations
            )
        );

    }
);

});

/* =========================
7. LOAD SAVED STATE
========================= */

function loadSavedDestinations() {

const savedDestinations =
    JSON.parse(
        localStorage.getItem(
            "tripcraft-saved-destinations"
        )
    ) || [];


saveButtons.forEach(function (button) {

    const card =
        button.closest(
            ".destination-card"
        );


    if (!card) {
        return;
    }


    const name =
        card.querySelector("h3")
            ?.textContent
            .trim();


    const isSaved =
        savedDestinations.some(
            function (item) {
                return item.name === name;
            }
        );


    if (isSaved) {

        button.innerHTML = "♥ Saved";

    } else {

        button.innerHTML = "♡ Save";
    }

});

}

/* =========================
8. INITIALIZE
========================= */

document.addEventListener(
"DOMContentLoaded",
function () {

    loadSavedDestinations();

    console.log(
        "🌍 Destination system loaded."
    );

}

);