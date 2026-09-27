const tripName = document.getElementById("tripName");
const destination = document.getElementById("destination");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const travelers = document.getElementById("travelers");
const createTripBtn = document.getElementById("createTripBtn");

if (createTripBtn) {
    createTripBtn.addEventListener("click", function() {

        if (tripName.value === "") {
            alert("Please enter trip name.");
            return;
        }

        if (destination.value === "") {
            alert("Please select destination.");
            return;
        }

        if (startDate.value === "") {
            alert("Please select start date.");
            return;
        }

        if (endDate.value === "") {
            alert("Please select end date.");
            return;
        }

        if (endDate.value < startDate.value) {
            alert("End date cannot be before start date.");
            return;
        }

        const savedBudget = JSON.parse(
            localStorage.getItem("tripcraft-budget")
        ) || {};

        const trip = {
            name: tripName.value,
            destination: destination.value,
            startDate: startDate.value,
            endDate: endDate.value,
            travelers: travelers.value,
            budget: savedBudget.total || 0
        };

        let trips = JSON.parse(
            localStorage.getItem("tripcraft-trips")
        ) || [];

        trips.push(trip);

        localStorage.setItem(
            "tripcraft-trips",
            JSON.stringify(trips)
        );

        alert("Trip created successfully!");

        window.location.href = "my-trips.html";
    });
}