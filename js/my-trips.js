const deleteButtons = document.querySelectorAll(".delete-trip");
const viewButtons = document.querySelectorAll(".small-btn");

deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const card = button.parentElement.parentElement;
        const tripName = card.querySelector("h3").textContent;
        const answer = confirm("Delete " + tripName + "?");
        if (answer) {
            card.remove();
            alert("Trip deleted.");
        }

    });

});

viewButtons.forEach(function (button) {
    button.addEventListener("click", function () {

        const card = button.parentElement.parentElement;
        const tripName = card.querySelector("h3").textContent;

        alert(
            "Trip Name: " + tripName +
            "\n\nThis is your saved trip."
        );

    });

});


const savedTrips =
    JSON.parse(
        localStorage.getItem("tripcraft-trips")
    ) || [];


if (savedTrips.length > 0) {
    console.log("Saved Trips:");
    savedTrips.forEach(function (trip) {
        console.log(
            trip.name +
            " - " +
            trip.destination
        );

    });

}