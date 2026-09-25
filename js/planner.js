const tripNameInput =
document.getElementById("tripName");

const destinationInput =
document.getElementById("destination");

const startDateInput =
document.getElementById("startDate");

const endDateInput =
document.getElementById("endDate");

const travelersInput =
document.getElementById("travelers");

const createTripBtn =
document.getElementById("createTripBtn");

const addDayBtn =
document.getElementById("addDayBtn");

const itineraryContainer =
document.getElementById("itineraryContainer");

/* =========================
2. TRIP DATA
========================= */

let itinerary = [];

/* =========================
3. SET MINIMUM DATE
========================= */

function setMinimumDate() {

if (!startDateInput || !endDateInput) {
    return;
}


const today =
    new Date()
        .toISOString()
        .split("T")[0];


startDateInput.min = today;

endDateInput.min = today;

}

setMinimumDate();

/* =========================
4. START DATE CHANGE
========================= */

if (startDateInput) {

startDateInput.addEventListener(
    "change",
    function () {

        const startDate =
            this.value;

        if (!startDate) {
            return;
        }

        endDateInput.min = startDate;


        /* If end date is before start date */

        if (
            endDateInput.value &&
            endDateInput.value < startDate
        ) {

            endDateInput.value = "";
        }
    }
);

}

/* =========================
5. ADD ACTIVITY
========================= */

if (addDayBtn) {

addDayBtn.addEventListener(
    "click",
    function () {

        addActivity();

    }
);

}

function addActivity(
activityName = "",
activityTime = "",
activityLocation = ""
) {

if (!itineraryContainer) {
    return;
}


const activityId =
    Date.now();


const activity = {

    id: activityId,

    name: activityName,

    time: activityTime,

    location: activityLocation
};


itinerary.push(activity);


renderItinerary();

}

/* =========================
6. RENDER ITINERARY
========================= */

function renderItinerary() {

if (!itineraryContainer) {
    return;
}


itineraryContainer.innerHTML = "";


/* If there are no activities */

if (itinerary.length === 0) {

    itineraryContainer.innerHTML = `

        <div style="
            text-align:center;
            padding:40px 20px;
            color:#64748b;
        ">

            <div style="
                font-size:2.5rem;
                margin-bottom:10px;
            ">
                🗓️
            </div>

            <p>
                No activities added yet.
            </p>

            <p style="
                font-size:0.85rem;
                margin-top:5px;
            ">
                Click "+ Add Activity" to start planning.
            </p>

        </div>
    `;

    return;
}


/* Create one day card for each activity */

itinerary.forEach(
    function (activity, index) {

        const dayCard =
            document.createElement("div");

        dayCard.className =
            "day-card";


        dayCard.dataset.id =
            activity.id;


        dayCard.innerHTML = `

            <div class="day-header">

                <div>

                    <span>
                        DAY ${index + 1}
                    </span>

                    <h3>
                        ${getDayTitle(index)}
                    </h3>

                </div>

            </div>


            <div class="activity-form">

                <input
                    type="text"
                    class="activity-name"
                    placeholder="Activity name"
                    value="${escapeHTML(activity.name)}"
                >

                <input
                    type="time"
                    class="activity-time"
                    value="${activity.time}"
                >

                <input
                    type="text"
                    class="activity-location"
                    placeholder="Location"
                    value="${escapeHTML(activity.location)}"
                >

                <button
                    class="delete-btn"
                    onclick="deleteActivity(${activity.id})"
                >
                    🗑️
                </button>

            </div>
        `;


        itineraryContainer.appendChild(
            dayCard
        );


        /* Add input listeners */

        const nameInput =
            dayCard.querySelector(
                ".activity-name"
            );

        const timeInput =
            dayCard.querySelector(
                ".activity-time"
            );

        const locationInput =
            dayCard.querySelector(
                ".activity-location"
            );


        nameInput.addEventListener(
            "input",
            function () {

                activity.name =
                    this.value;

            }
        );


        timeInput.addEventListener(
            "change",
            function () {

                activity.time =
                    this.value;

            }
        );


        locationInput.addEventListener(
            "input",
            function () {

                activity.location =
                    this.value;

            }
        );

    }
);

}

/* =========================
7. DAY TITLE
========================= */

function getDayTitle(index) {

const titles = [

    "First Day",
    "Second Day",
    "Third Day",
    "Fourth Day",
    "Fifth Day",
    "Sixth Day",
    "Seventh Day",
    "Eighth Day",
    "Ninth Day",
    "Tenth Day"

];


return (
    titles[index] ||
    `Day ${index + 1}`
);

}

/* =========================
8. DELETE ACTIVITY
========================= */

function deleteActivity(id) {

const activityIndex =
    itinerary.findIndex(
        function (activity) {
            return activity.id === id;
        }
    );


if (activityIndex === -1) {
    return;
}


const deletedActivity =
    itinerary[activityIndex];


itinerary.splice(
    activityIndex,
    1
);


renderItinerary();


if (
    typeof showNotification ===
    "function"
) {

    showNotification(
        `${deletedActivity.name || "Activity"} removed.`,
        "warning"
    );
}

}

/* =========================
9. CREATE TRIP
========================= */

if (createTripBtn) {

createTripBtn.addEventListener(
    "click",
    createTrip
);

}

function createTrip() {

/* Get values */

const tripName =
    tripNameInput.value.trim();

const destination =
    destinationInput.value.trim();

const startDate =
    startDateInput.value;

const endDate =
    endDateInput.value;

const travelers =
    parseInt(
        travelersInput.value
    ) || 1;


/* =========================
   VALIDATION
   ========================= */

if (!tripName) {

    showNotification(
        "Please enter a trip name.",
        "error"
    );

    tripNameInput.focus();

    return;
}


if (!destination) {

    showNotification(
        "Please select a destination.",
        "error"
    );

    destinationInput.focus();

    return;
}


if (!startDate) {

    showNotification(
        "Please select a start date.",
        "error"
    );

    startDateInput.focus();

    return;
}


if (!endDate) {

    showNotification(
        "Please select an end date.",
        "error"
    );

    endDateInput.focus();

    return;
}


if (endDate < startDate) {

    showNotification(
        "End date cannot be before start date.",
        "error"
    );

    endDateInput.focus();

    return;
}


if (travelers < 1) {

    showNotification(
        "Number of travelers must be at least 1.",
        "error"
    );

    travelersInput.focus();

    return;
}


/* =========================
   CREATE TRIP OBJECT
   ========================= */

const trip = {

    id:
        Date.now(),

    name:
        tripName,

    destination:
        destination,

    startDate:
        startDate,

    endDate:
        endDate,

    travelers:
        travelers,

    itinerary:
        itinerary,

    createdAt:
        new Date().toISOString(),

    budget:
        0
};


/* =========================
   GET OLD TRIPS
   ========================= */

let savedTrips =
    JSON.parse(
        localStorage.getItem(
            "tripcraft-trips"
        )
    ) || [];


/* =========================
   SAVE NEW TRIP
   ========================= */

savedTrips.push(trip);


localStorage.setItem(
    "tripcraft-trips",
    JSON.stringify(savedTrips)
);


/* =========================
   SUCCESS
   ========================= */

showNotification(
    "🎉 Trip created successfully!"
);


/* =========================
   CLEAR FORM
   ========================= */

tripNameInput.value = "";

destinationInput.value = "";

startDateInput.value = "";

endDateInput.value = "";

travelersInput.value = "1";


/* Clear itinerary */

itinerary = [];

renderItinerary();


/* =========================
   REDIRECT
   ========================= */

setTimeout(
    function () {

        window.location.href =
            "my-trips.html";

    },
    1200
);

}

/* =========================
10. ESCAPE HTML
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
11. INITIAL ACTIVITY
========================= */

document.addEventListener(
"DOMContentLoaded",
function () {

    /*
     * The HTML already contains
     * one example activity.
     *
     * We create the first activity
     * in JavaScript as well.
     */

    if (
        itineraryContainer &&
        itinerary.length === 0
    ) {

        itinerary.push({

            id: Date.now(),

            name: "",

            time: "",

            location: ""

        });


        renderItinerary();
    }


    console.log(
        "🗓️ Trip planner loaded."
    );

}

);