const packingCount = document.getElementById("packingCount");
const packingProgress = document.getElementById("packingProgress");
const progressText = document.getElementById("progressText");
const newItem = document.getElementById("newItem");
const itemCategory = document.getElementById("itemCategory");
const addItemBtn = document.getElementById("addItemBtn");

let savedItems = JSON.parse(localStorage.getItem("tripcraft-packing-items"));

if (!savedItems) {
    savedItems = [];

    const packingItems = document.querySelectorAll(".packing-item");

    packingItems.forEach(function(item) {
        const checkbox = item.querySelector("input");
        let category = "clothes";
        const categoryBox = item.parentElement;
        const heading = categoryBox.querySelector("h2");

        if (heading.textContent.includes("Electronics")) {
            category = "electronics";
        } else if (heading.textContent.includes("Personal")) {
            category = "personal";
        } else if (heading.textContent.includes("Documents")) {
            category = "documents";
        }

        savedItems.push({
            name: item.textContent.trim(),
            category: category,
            checked: checkbox.checked
        });
    });

    localStorage.setItem(
        "tripcraft-packing-items",
        JSON.stringify(savedItems)
    );
}

function displayPackingItems() {
    const clothesList = document.querySelector(".packing-category:nth-child(1)");
    const electronicsList = document.querySelector(".packing-category:nth-child(2)");
    const personalList = document.querySelector(".packing-category:nth-child(3)");
    const documentsList = document.querySelector(".packing-category:nth-child(4)");

    clothesList.innerHTML = `<h2>👕 Clothes</h2>`;
    electronicsList.innerHTML = `<h2>📱 Electronics</h2>`;
    personalList.innerHTML = `<h2>🧴 Personal Items</h2>`;
    documentsList.innerHTML = `<h2>📄 Documents</h2>`;

    savedItems.forEach(function(item, index) {
        let itemHTML = `
            <label class="packing-item">
                <input type="checkbox" data-index="${index}" ${item.checked ? "checked" : ""}>
                ${item.name}
            </label>
        `;

        if (item.category === "clothes") {
            clothesList.innerHTML += itemHTML;
        } else if (item.category === "electronics") {
            electronicsList.innerHTML += itemHTML;
        } else if (item.category === "personal") {
            personalList.innerHTML += itemHTML;
        } else if (item.category === "documents") {
            documentsList.innerHTML += itemHTML;
        }
    });

    addCheckboxEvents();
    updatePacking();
}

function addCheckboxEvents() {
    const packingItems = document.querySelectorAll(".packing-item input");

    packingItems.forEach(function(item) {
        item.addEventListener("change", function() {
            const index = Number(item.getAttribute("data-index"));

            savedItems[index].checked = item.checked;

            localStorage.setItem(
                "tripcraft-packing-items",
                JSON.stringify(savedItems)
            );

            updatePacking();
        });
    });
}

function updatePacking() {
    const packingItems = document.querySelectorAll(".packing-item input");

    let completed = 0;

    packingItems.forEach(function(item) {
        if (item.checked) {
            completed++;
        }
    });

    const total = packingItems.length;

    let percentage = 0;

    if (total > 0) {
        percentage = Math.round((completed / total) * 100);
    }

    packingCount.textContent = completed + " of " + total + " items packed";
    packingProgress.style.width = percentage + "%";
    progressText.textContent = percentage + "%";
}

if (addItemBtn) {
    addItemBtn.addEventListener("click", function() {
        if (newItem.value.trim() === "") {
            alert("Please enter an item name.");
            return;
        }

        const itemName = newItem.value.trim();
        const category = itemCategory.value;

        const newPackingItem = {
            name: itemName,
            category: category,
            checked: false
        };

        savedItems.push(newPackingItem);

        localStorage.setItem(
            "tripcraft-packing-items",
            JSON.stringify(savedItems)
        );

        newItem.value = "";

        displayPackingItems();

        alert(itemName + " added successfully!");
    });
}

displayPackingItems();