const myTripsContainer =document.getElementById("myTripsContainer");
const emptyTrips =document.getElementById("emptyTrips");
const TRIPS_STORAGE_KEY ="tripcraft-trips";

function getSavedTrips() {
const savedTrips = localStorage.getItem( TRIPS_STORAGE_KEY );
if (!savedTrips) {
    return [];
}
try {
    return JSON.parse( savedTrips);
} catch (error) {
    console.error("Could not load trips:", error );
    return [];
}}

function saveTrips(trips) {
localStorage.setItem( TRIPS_STORAGE_KEY, JSON.stringify(trips));
}

function formatDate(dateString) {
if (!dateString) {
    return "Not specified";
}
const date = new Date( dateString + "T00:00:00" );
if (isNaN(date.getTime())) {
    return dateString;
}
return date.toLocaleDateString(
    "en-GB",
    {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }
);
}

function calculateDuration(startDate,endDate) {
if (!startDate || !endDate) {
    return 0;
}
const start =new Date(startDate + "T00:00:00");
const end = new Date(endDate + "T00:00:00" );
const difference = end.getTime() - start.getTime();
const days = Math.floor( difference / (1000 * 60 * 60 * 24));
return days + 1;
}
function getDestinationImage(
destination
) {
if (!destination) {
    return "images/hero.jpg";
}

const destinationImages = {
    "Cox's Bazar":
        "images/coxs-bazar.jpg",

    "Sajek Valley":
        "images/sajek.jpg",

    "Sylhet":
        "images/sylhet.jpg",

    "Bandarban":
        "images/bandarban.jpg",

    "Paris":
        "images/paris.jpg",

    "Bali":
        "images/bali.jpg",

    "Dhaka":
        "images/hero.jpg"

};


return ( destinationImages[  destination ] ||
    "images/hero.jpg"
);

}

function getTripType( destination ) {
const beachPlaces = [
    "Cox's Bazar",
    "Bali"
];

const mountainPlaces = [
    "Sajek Valley",
    "Bandarban"
];

if ( beachPlaces.includes( destination)) {
    return " Beach Trip";
}

if ( mountainPlaces.includes(destination)){
    return " Mountain Trip";
}
return " Travel Trip";
}

function renderTrips() {
if (!myTripsContainer) {
    return;
}
const trips = getSavedTrips();

myTripsContainer.innerHTML = "";

if (trips.length === 0) {
    myTripsContainer.style.display = "none";
    if (emptyTrips) {
        emptyTrips.style.display =  "block";     
    }
    return;
}

myTripsContainer.style.display = "grid";   
if (emptyTrips) {
    emptyTrips.style.display = "none";     
}

const sortedTrips = [...trips].reverse(); 
sortedTrips.forEach(
    function (trip) {
        const card = createTripCard(trip);
        myTripsContainer.appendChild( card  );
    }
);
}
function createTripCard(trip) {
const card = document.createElement( "div"  );
card.className = "trip-card";

const image = getDestinationImage(trip.destination );
const tripType = getTripType( trip.destination);
const duration = calculateDuration(trip.startDate,trip.endDate);
const activityCount = Array.isArray(trip.itinerary)
        ? trip.itinerary.length : 0;
const budget = Number(trip.budget ) || 0;

card.innerHTML = `
    <div class="trip-image">

        <img
            src="${image}"
            alt="${escapeHTML(
                trip.destination ||
                "Travel destination"
            )}"
            onerror="
                this.src='images/hero.jpg'
            "
        >

    </div>


    <div class="trip-info">

        <span class="tag">
            ${tripType}
        </span>


        <h3>
            ${escapeHTML(
                trip.name ||
                "Untitled Trip"
            )}
        </h3>


        <p>
            📍
            ${escapeHTML(
                trip.destination ||
                "Not specified"
            )}
        </p>


        <p>
            📅
            ${formatDate(
                trip.startDate
            )}
            -
            ${formatDate(
                trip.endDate
            )}
        </p>


        <p>
            👥
            ${trip.travelers || 1}
            Traveler${
                Number(
                    trip.travelers
                ) === 1
                    ? ""
                    : "s"
            }
        </p>


        <p>
            🗓️
            ${duration}
            Day${
                duration === 1
                    ? ""
                    : "s"
            }
        </p>


        <p>
            📍
            ${activityCount}
            Planned Activit${
                activityCount === 1
                    ? "y"
                    : "ies"
            }
        </p>


        <div class="trip-budget">

            <span>
                Total Budget
            </span>

            <strong>
                ${
                    budget > 0
                        ? formatCurrency(
                            budget
                        )
                        : "Not Set"
                }
            </strong>

        </div>


        <div class="trip-buttons">

            <button
                class="btn small-btn view-trip"
                data-id="${trip.id}"
            >
                View Trip
            </button>


            <button
                class="delete-trip"
                data-id="${trip.id}"
            >
                🗑️ Delete
            </button>

        </div>

    </div>

`;

const viewButton = card.querySelector(".view-trip");
viewButton.addEventListener("click",
    function () {
        showTripDetails(trip);
    }
);

const deleteButton =
    card.querySelector(
        ".delete-trip"
    );


deleteButton.addEventListener(
    "click",
    function () {

        deleteTrip(
            trip.id
        );

    }
);


return card;

}

/* =========================
11. VIEW TRIP DETAILS
========================= */

function showTripDetails(
trip
) {
const duration = calculateDuration( trip.startDate,trip.endDate);
let itineraryHTML = "";
if ( Array.isArray(trip.itinerary) &&trip.itinerary.length > 0) {
  itineraryHTML =trip.itinerary.map(function (
                    activity,
                    index
                ) {
                    return `

                        <div style="
                            padding:10px 0;
                            border-bottom:
                            1px solid #e2e8f0;
                        ">

                            <strong>
                                Day ${index + 1}
                            </strong>

                            <br>

                            ${
                                activity.name
                                    ? escapeHTML(
                                        activity.name
                                    )
                                    : "No activity name"
                            }

                            ${
                                activity.time
                                    ? `
                                        <br>
                                        ⏰ ${activity.time}
                                      `
                                    : ""
                            }

                            ${
                                activity.location
                                    ? `
                                        <br>
                                        📍
                                        ${escapeHTML(
                                            activity.location
                                        )}
                                      `
                                    : ""
                            }

                        </div>

                    `;

                }
            )
            .join("");

} else {

    itineraryHTML = `
        <p style="
            color:#64748b;
            padding:15px 0;
        ">
            No activities planned yet.
        </p>
    `;
}
const modal =
    document.createElement(
        "div"
    );


modal.className =
    "trip-details-modal";


modal.innerHTML = `

    <div style="
        position:fixed;
        inset:0;
        background:rgba(15,23,42,0.65);
        z-index:9999;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:20px;
    ">

        <div style="
            width:min(650px,100%);
            max-height:85vh;
            overflow-y:auto;
            background:white;
            border-radius:18px;
            padding:30px;
            box-shadow:
                0 25px 60px
                rgba(0,0,0,0.25);
        ">

            <div style="
                display:flex;
                justify-content:
                space-between;
                align-items:
                flex-start;
                gap:20px;
                margin-bottom:20px;
            ">

                <div>

                    <span style="
                        display:inline-block;
                        padding:5px 10px;
                        border-radius:50px;
                        background:#ecfeff;
                        color:#0ea5a4;
                        font-size:12px;
                        font-weight:700;
                    ">
                        ${getTripType(
                            trip.destination
                        )}
                    </span>

                    <h2 style="
                        margin-top:10px;
                        color:#172033;
                    ">
                        ${escapeHTML(
                            trip.name
                        )}
                    </h2>

                </div>


                <button
                    class="close-modal"
                    style="
                        width:35px;
                        height:35px;
                        border:none;
                        border-radius:50%;
                        background:#f1f5f9;
                        cursor:pointer;
                        font-size:18px;
                    "
                >
                    ×
                </button>

            </div>


            <div style="
                display:grid;
                grid-template-columns:
                repeat(2,1fr);
                gap:12px;
                margin-bottom:25px;
            ">

                <div style="
                    padding:15px;
                    background:#f8fafc;
                    border-radius:10px;
                ">
                    <small>
                        Destination
                    </small>

                    <strong style="
                        display:block;
                        margin-top:4px;
                        color:#172033;
                    ">
                        📍
                        ${escapeHTML(
                            trip.destination
                        )}
                    </strong>
                </div>


                <div style="
                    padding:15px;
                    background:#f8fafc;
                    border-radius:10px;
                ">
                    <small>
                        Travelers
                    </small>

                    <strong style="
                        display:block;
                        margin-top:4px;
                        color:#172033;
                    ">
                        👥
                        ${trip.travelers || 1}
                    </strong>
                </div>


                <div style="
                    padding:15px;
                    background:#f8fafc;
                    border-radius:10px;
                ">
                    <small>
                        Duration
                    </small>

                    <strong style="
                        display:block;
                        margin-top:4px;
                        color:#172033;
                    ">
                        🗓️
                        ${duration} Days
                    </strong>
                </div>


                <div style="
                    padding:15px;
                    background:#f8fafc;
                    border-radius:10px;
                ">
                    <small>
                        Budget
                    </small>

                    <strong style="
                        display:block;
                        margin-top:4px;
                        color:#0ea5a4;
                    ">
                        ${
                            Number(
                                trip.budget
                            ) > 0
                                ? formatCurrency(
                                    trip.budget
                                )
                                : "Not Set"
                        }
                    </strong>
                </div>

            </div>


            <h3 style="
                color:#172033;
                margin-bottom:10px;
            ">
                🗓️ Itinerary
            </h3>


            <div>
                ${itineraryHTML}
            </div>


            <button
                class="btn primary-btn close-modal"
                style="
                    width:100%;
                    margin-top:25px;
                "
            >
                Close
            </button>

        </div>

    </div>

`;


document.body.appendChild(
    modal
);


/* Close modal */

modal
    .querySelectorAll(
        ".close-modal"
    )
    .forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    modal.remove();

                }
            );

        }
    );


/* Close when clicking outside */

modal
    .firstElementChild
    .addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                this
            ) {

                modal.remove();

            }

        }
    );


/* ESC key */

function closeWithEscape(
    event
) {

    if (
        event.key === "Escape"
    ) {

        modal.remove();

        document.removeEventListener(
            "keydown",
            closeWithEscape
        );
    }
}


document.addEventListener(
    "keydown",
    closeWithEscape
);

}

/* =========================
12. DELETE TRIP
========================= */

function deleteTrip(
tripId
) {

const trips =
    getSavedTrips();


const trip =
    trips.find(
        function (item) {

            return (
                item.id === tripId
            );

        }
    );


if (!trip) {
    return;
}


const confirmDelete =
    confirm(
        `Are you sure you want to delete "${trip.name}"?`
    );


if (!confirmDelete) {
    return;
}


const updatedTrips =
    trips.filter(
        function (item) {

            return (
                item.id !== tripId
            );

        }
    );


saveTrips(
    updatedTrips
);


renderTrips();


if (
    typeof showNotification ===
    "function"
) {

    showNotification(
        `${trip.name} deleted successfully.`,
        "warning"
    );
}

}

/* =========================
13. FORMAT CURRENCY
========================= */

function formatCurrency(
amount
) {

return "৳ " +
    Number(amount)
        .toLocaleString(
            "en-BD",
            {
                maximumFractionDigits: 0
            }
        );

}

/* =========================
14. ESCAPE HTML
========================= */

function escapeHTML(
value
) {

if (!value) {
    return "";
}


return String(value)
    .replace(
        /&/g,
        "&amp;"
    )
    .replace(
        /</g,
        "&lt;"
    )
    .replace(
        />/g,
        "&gt;"
    )
    .replace(
        /"/g,
        "&quot;"
    )
    .replace(
        /'/g,
        "&#039;"
    );

}

/* =========================
15. INITIALIZE
========================= */

document.addEventListener(
"DOMContentLoaded",
function () {

    renderTrips();

    console.log(
        "💙 My Trips loaded."
    );

}

);