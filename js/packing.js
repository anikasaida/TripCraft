const newItemInput = document.getElementById("newItem");
const itemCategory =document.getElementById("itemCategory");
const addItemBtn =document.getElementById("addItemBtn");
const packingList =document.getElementById("packingList");
const packingProgress = document.getElementById("packingProgress");
const progressText = document.getElementById("progressText");
const packingCount = document.getElementById("packingCount");
const PACKING_STORAGE_KEY = "tripcraft-packing-list";
const defaultItems = [
{
    id: 1,
    name: "Passport / National ID",
    category: "Documents",
    checked: false
},
{
    id: 2,
    name: "Travel Tickets",
    category: "Documents",
    checked: false
},
{
    id: 3,
    name: "Hotel Booking",
    category: "Documents",
    checked: false
},
{
    id: 4,
    name: "T-Shirts",
    category: "Clothing",
    checked: false
},
{
    id: 5,
    name: "Pants",
    category: "Clothing",
    checked: false
},
{
    id: 6,
    name: "Jacket",
    category: "Clothing",
    checked: false
},
{
    id: 7,
    name: "Smartphone",
    category: "Electronics",
    checked: false
},
{
    id: 8,
    name: "Phone Charger",
    category: "Electronics",
    checked: false
},

{
    id: 9,
    name: "Power Bank",
    category: "Electronics",
    checked: false
}

];


let packingItems = [];
function loadPackingItems() {
const savedItems = localStorage.getItem( PACKING_STORAGE_KEY);
if (savedItems) {
    try { packingItems = JSON.parse(savedItems);
    } catch (error) {
        console.error("Could not load packing data:", error );
        packingItems =[...defaultItems];
    }

} else {
    packingItems = [...defaultItems];
}
renderPackingList();
}

function savePackingItems() {
localStorage.setItem( PACKING_STORAGE_KEY,JSON.stringify( packingItems  ));

}

if (addItemBtn) {
    addItemBtn.addEventListener("click", addPackingItem);
}

if (newItemInput) {
newItemInput.addEventListener("keydown",
    function (event) {
        if (event.key === "Enter") {
            addPackingItem();

        }
    }
);
}

function addPackingItem() {
if (!newItemInput) {
    return;
}
const itemName = newItemInput.value.trim();
const category = itemCategory
        ? itemCategory.value
        : "Other";

if (!itemName) {

    showNotification(
        "Please enter a packing item.",
        "error"
    );

    newItemInput.focus();

    return;
}


/* Check duplicate */

const duplicate =
    packingItems.some(
        function (item) {

            return (
                item.name.toLowerCase() ===
                itemName.toLowerCase()
            );

        }
    );


if (duplicate) {

    showNotification(
        "This item is already in your packing list.",
        "warning"
    );

    return;
}


/* Create item */

const newItem = {

    id:
        Date.now(),

    name:
        itemName,

    category:
        category,

    checked:
        false
};


/* Add */

packingItems.push(
    newItem
);


/* Save */

savePackingItems();


/* Render */

renderPackingList();


/* Clear input */

newItemInput.value = "";

newItemInput.focus();


showNotification(
    `${itemName} added to your packing list.`
);

}

/* =========================
8. RENDER PACKING LIST
========================= */

function renderPackingList() {

if (!packingList) {
    return;
}


packingList.innerHTML = "";


/* Group by category */

const categories = {

    "Documents": [],

    "Clothing": [],

    "Electronics": [],

    "Toiletries": [],

    "Essentials": [],

    "Other": []

};


packingItems.forEach(
    function (item) {

        if (
            !categories[item.category]
        ) {

            categories[item.category] =
                [];

        }


        categories[item.category].push(
            item
        );

    }
);


/* Category icons */

const categoryIcons = {

    "Documents": "📄",

    "Clothing": "👕",

    "Electronics": "🔌",

    "Toiletries": "🧴",

    "Essentials": "🎒",

    "Other": "📦"

};


/* Render categories */

Object.keys(categories).forEach(
    function (category) {

        const items =
            categories[category];


        /* Don't show empty category */

        if (items.length === 0) {
            return;
        }


        const categoryDiv =
            document.createElement(
                "div"
            );


        categoryDiv.className =
            "packing-category";


        categoryDiv.innerHTML = `

            <h3>
                ${
                    categoryIcons[category] ||
                    "📦"
                }
                ${category}
            </h3>

        `;


        items.forEach(
            function (item) {

                const label =
                    document.createElement(
                        "label"
                    );


                label.className =
                    "packing-item";


                label.innerHTML = `

                    <input
                        type="checkbox"
                        ${
                            item.checked
                                ? "checked"
                                : ""
                        }
                    >

                    <span>
                        ${escapeHTML(
                            item.name
                        )}
                    </span>

                    <button
                        type="button"
                        class="packing-delete"
                        title="Delete item"
                    >
                        🗑️
                    </button>

                `;


                /* Checkbox */

                const checkbox =
                    label.querySelector(
                        "input"
                    );


                checkbox.addEventListener(
                    "change",
                    function () {

                        item.checked =
                            this.checked;


                        savePackingItems();

                        updateProgress();

                        updateItemStyle(
                            label,
                            item.checked
                        );

                    }
                );


                /* Delete button */

                const deleteBtn =
                    label.querySelector(
                        ".packing-delete"
                    );


                deleteBtn.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        event.stopPropagation();

                        deletePackingItem(
                            item.id
                        );

                    }
                );


                /* Initial style */

                updateItemStyle(
                    label,
                    item.checked
                );


                categoryDiv.appendChild(
                    label
                );

            }
        );


        packingList.appendChild(
            categoryDiv
        );

    }
);


updateProgress();

}

/* =========================
9. ITEM STYLE
========================= */

function updateItemStyle(
element,
checked
) {

if (!element) {
    return;
}


const span =
    element.querySelector(
        "span"
    );


if (!span) {
    return;
}


if (checked) {

    span.style.textDecoration =
        "line-through";

    span.style.opacity =
        "0.55";

} else {

    span.style.textDecoration =
        "none";

    span.style.opacity =
        "1";
}

}

/* =========================
10. DELETE ITEM
========================= */

function deletePackingItem(id) {

const itemIndex =
    packingItems.findIndex(
        function (item) {

            return item.id === id;

        }
    );


if (itemIndex === -1) {
    return;
}


const deletedItem =
    packingItems[itemIndex];


packingItems.splice(
    itemIndex,
    1
);


savePackingItems();

renderPackingList();


showNotification(
    `${deletedItem.name} removed from your list.`,
    "warning"
);

}

/* =========================
11. UPDATE PROGRESS
========================= */

function updateProgress() {

const total =
    packingItems.length;


const completed =
    packingItems.filter(
        function (item) {

            return item.checked;

        }
    ).length;


let percentage = 0;


if (total > 0) {

    percentage =
        Math.round(
            (completed / total) * 100
        );
}


/* Progress bar */

if (packingProgress) {

    packingProgress.style.width =
        percentage + "%";
}


/* Percentage text */

if (progressText) {

    progressText.textContent =
        percentage + "%";
}


/* Count */

if (packingCount) {

    packingCount.textContent =
        `${completed} of ${total} items packed`;
}

}

/* =========================
12. ESCAPE HTML
========================= */

function escapeHTML(value) {

if (!value) {
    return "";
}


return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}

/* =========================
13. INITIALIZE
========================= */

document.addEventListener(
"DOMContentLoaded",
function () {

    loadPackingItems();

    console.log(
        "🎒 Packing checklist loaded."
    );

}

);