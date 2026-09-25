const transportInput = document.getElementById("transport");
const hotelInput = document.getElementById("hotel");
const foodInput = document.getElementById("food");
const activitiesInput = document.getElementById("activities");
const shoppingInput = document.getElementById("shopping");
const otherInput = document.getElementById("other");
const calculateBtn = document.getElementById("calculateBtn");

/* Result elements */
const totalBudget = document.getElementById("totalBudget");
const transportResult = document.getElementById("transportResult");
const hotelResult = document.getElementById("hotelResult");
const foodResult = document.getElementById("foodResult");
const activitiesResult = document.getElementById("activitiesResult");
const shoppingResult = document.getElementById("shoppingResult");
const otherResult = document.getElementById("otherResult");

function getAmount(input) {
if (!input) {
    return 0;
}
const value = parseFloat(input.value);
if ( isNaN(value) || value < 0) {
    return 0;
}
return value;
}

function formatCurrency(amount) {

return "৳ " + amount.toLocaleString( "en-BD",
        {
            maximumFractionDigits: 0
        }
    );

}

function calculateBudget() {
const transport = getAmount( transportInput);
const hotel = getAmount( hotelInput);
const food = getAmount( foodInput);
const activities = getAmount(activitiesInput);
const shopping =getAmount( shoppingInput);
const other = getAmount( otherInput );

const total = transport + hotel + food + activities + shopping + other;

if (totalBudget) {
    totalBudget.textContent =formatCurrency(total);
}

if (transportResult) {
    transportResult.textContent = formatCurrency(transport);
}


if (hotelResult) {
    hotelResult.textContent = formatCurrency(hotel);
}


if (foodResult) {
    foodResult.textContent = formatCurrency(food);
}


if (activitiesResult) {
    activitiesResult.textContent = formatCurrency(activities);
}


if (shoppingResult) {
    shoppingResult.textContent = formatCurrency(shopping);
}


if (otherResult) {
    otherResult.textContent = formatCurrency(other);
}


const budgetData = {

    transportation: transport,
    accommodation: hotel,
    food:food,
    activities: activities,
    shopping: shopping,
    other: other,
    total: total,
    updatedAt: new Date().toISOString()
};

localStorage.setItem(
    "tripcraft-budget",
    JSON.stringify(budgetData)
);


if ( typeof showNotification === "function") {
    showNotification( "💰 Budget calculated successfully!");
}
return total;
}



if (calculateBtn) {
calculateBtn.addEventListener("click", calculateBudget);
}

const budgetInputs = [
transportInput,
hotelInput,
foodInput,
activitiesInput,
shoppingInput,
otherInput ];

budgetInputs.forEach(
function (input) {
    if (!input) {
        return;
    }

    input.addEventListener(
        "input",
        function () {
            calculateBudget();
        }
    );
});


function loadSavedBudget() {
const savedBudget = JSON.parse( localStorage.getItem( "tripcraft-budget" ));

if (!savedBudget) {
    return;
}

if (transportInput) {
    transportInput.value = savedBudget.transportation || 0;
}

if (hotelInput) {
    hotelInput.value = savedBudget.accommodation || 0;
}

if (foodInput) {
    foodInput.value = savedBudget.food || 0;
}

if (activitiesInput) {
    activitiesInput.value = savedBudget.activities || 0;
}

if (shoppingInput) {
    shoppingInput.value = savedBudget.shopping || 0;
}


if (otherInput) {
    otherInput.value = savedBudget.other || 0;
}

updateBudgetDisplay( savedBudget);
}

function updateBudgetDisplay(budget) {
if (totalBudget) {
    totalBudget.textContent = formatCurrency( budget.total || 0 );
}
if (transportResult) {
    transportResult.textContent = formatCurrency( budget.transportation || 0);
}
if (hotelResult) {
    hotelResult.textContent = formatCurrency( budget.accommodation || 0 );
}

if (foodResult) {
    foodResult.textContent = formatCurrency( budget.food || 0);
}

if (activitiesResult) {
    activitiesResult.textContent = formatCurrency( budget.activities || 0 );
}

if (shoppingResult) {
    shoppingResult.textContent =  formatCurrency( budget.shopping || 0 );
}

if (otherResult) {
    otherResult.textContent =
        formatCurrency(
            budget.other || 0
        );
}

}

/* =========================
9. PREVENT NEGATIVE VALUES
========================= */

budgetInputs.forEach(
function (input) {

    if (!input) {
        return;
    }


    input.addEventListener(
        "input",
        function () {

            if (
                parseFloat(this.value) < 0
            ) {

                this.value = 0;
            }

        }
    );

}

);

/* =========================
10. INITIALIZE
========================= */

document.addEventListener(
"DOMContentLoaded",
function () {

    loadSavedBudget();

    console.log(
        "💰 Budget calculator loaded."
    );

}

);