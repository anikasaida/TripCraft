const transport = document.getElementById("transport");
const hotel = document.getElementById("hotel");
const food = document.getElementById("food");
const activities = document.getElementById("activities");
const shopping = document.getElementById("shopping");
const other = document.getElementById("other");

const calculateBtn = document.getElementById("calculateBtn");



if (calculateBtn) {

    calculateBtn.addEventListener("click", function () {

        let transportCost = Number(transport.value);
        let hotelCost = Number(hotel.value);
        let foodCost = Number(food.value);
        let activitiesCost = Number(activities.value);
        let shoppingCost = Number(shopping.value);
        let otherCost = Number(other.value);


        let total =
            transportCost +
            hotelCost +
            foodCost +
            activitiesCost +
            shoppingCost +
            otherCost;

        document.getElementById("transportResult").textContent =
            "৳ " + transportCost;

        document.getElementById("hotelResult").textContent =
            "৳ " + hotelCost;

        document.getElementById("foodResult").textContent =
            "৳ " + foodCost;

        document.getElementById("activitiesResult").textContent =
            "৳ " + activitiesCost;

        document.getElementById("shoppingResult").textContent =
            "৳ " + shoppingCost;

        document.getElementById("otherResult").textContent =
            "৳ " + otherCost;

        document.getElementById("totalBudget").textContent =
            "৳ " + total;


        const budget = {
            transport: transportCost,
            hotel: hotelCost,
            food: foodCost,
            activities: activitiesCost,
            shopping: shoppingCost,
            other: otherCost,
            total: total
        };

        localStorage.setItem(
            "tripcraft-budget",
            JSON.stringify(budget)
        );


        alert("Budget calculated successfully!");

    });

}


const savedBudget =
    JSON.parse(localStorage.getItem("tripcraft-budget"));

if (savedBudget && transport) {
    transport.value = savedBudget.transport;
    hotel.value = savedBudget.hotel;
    food.value = savedBudget.food;
    activities.value = savedBudget.activities;
    shopping.value = savedBudget.shopping;
    other.value = savedBudget.other;

}