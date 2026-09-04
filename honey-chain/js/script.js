// ================================
// HONEY CHAIN - MAIN JAVASCRIPT
// ================================

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);

    if (section) {
        section.scrollIntoView({
            behavior: "smooth"
        });
    }
}


// =================================
// PLATFORM MODAL
// =================================

function explorePlatform() {

    const modal = document.getElementById("platformModal");

    if (modal) {
        modal.classList.add("active");

        document.body.style.overflow = "hidden";
    }
}


function closePlatform() {

    const modal = document.getElementById("platformModal");

    if (modal) {
        modal.classList.remove("active");

        document.body.style.overflow = "auto";
    }
}


// =================================
// SELECT ROLE
// =================================

function selectRole(role) {

    const roles = document.querySelectorAll(".role-card");

    roles.forEach(card => {
        card.classList.remove("selected");
    });

    const selectedCard = document.querySelector(
        `[data-role="${role}"]`
    );

    if (selectedCard) {
        selectedCard.classList.add("selected");
    }

    // Small delay makes the selection animation visible
    setTimeout(() => {

        if (role === "beekeeper") {

            window.location.href = "beekeeper.html";

        }

        else if (role === "admin") {
    window.location.href = "admin.html";
}

        else if (role === "consumer") {
    window.location.href = "consumer.html";
}

    }, 250);
}


// =================================
// CLOSE MODAL ON BACKGROUND CLICK
// =================================

document.addEventListener("click", function (event) {

    const modal = document.getElementById("platformModal");

    if (
        modal &&
        event.target === modal
    ) {
        closePlatform();
    }

});

// =================================
// BEEKEEPER DASHBOARD
// =================================


function showDashboardSection(sectionId) {

    // Hide all sections

    const sections = document.querySelectorAll(
        ".dashboard-section"
    );

    sections.forEach(section => {

        section.classList.remove(
            "active-section"
        );

    });


    // Show selected section

    const selectedSection =
        document.getElementById(sectionId);

    if (selectedSection) {

        selectedSection.classList.add(
            "active-section"
        );

    }


    // Update navigation

    const links =
        document.querySelectorAll(
            ".dashboard-link"
        );

    links.forEach(link => {

        link.classList.remove(
            "active"
        );

    });


    // Find clicked navigation item

    const clickedLink =
        document.querySelector(
            `[onclick="showDashboardSection('${sectionId}')"]`
        );

    if (clickedLink) {

        clickedLink.classList.add(
            "active"
        );

    }

}


// =================================
// BATCH MODAL
// =================================

function openBatchModal() {

    const modal =
        document.getElementById(
            "batchModal"
        );

    if (modal) {

        modal.classList.add(
            "active"
        );

        document.body.style.overflow =
            "hidden";

    }

}


function closeBatchModal() {

    const modal =
        document.getElementById(
            "batchModal"
        );

    if (modal) {

        modal.classList.remove(
            "active"
        );

        document.body.style.overflow =
            "auto";

    }


// =================================
// CREATE HONEY BATCH
// =================================

function createBatch(event) {

    event.preventDefault();

    const hive =
        document.getElementById("batchHive").value;

    const quantity =
        document.getElementById("batchQuantity").value;

    const source =
        document.getElementById("floralSource").value;

    const harvestDate =
        document.getElementById("harvestDate").value;


    // Generate a prototype batch ID

    const batchId =
        "HC-2026-" +
        Math.floor(
            100 + Math.random() * 900
        );


    // Store batch temporarily in browser

    const batch = {

        id: batchId,

        hive: hive,

        quantity: quantity,

        source: source,

        harvestDate: harvestDate,

        beekeeper: "Rajesh Kumar",

        location: "Haryana",

        status: "Verified"

    };


    localStorage.setItem(
        "honeyChainBatch",
        JSON.stringify(batch)
    );


    // Close creation modal

    closeBatchModal();


    // Show success modal

    showBatchSuccess(batch);

}


// =================================
// AI SIMULATION
// =================================

function simulateAIAlert() {

    alert(
        "🧠 AI ANALYSIS COMPLETE\n\n" +

        "Hive #HC-003\n\n" +

        "Temperature: 38.7°C\n" +
        "Humidity: 78%\n" +

        "Risk Score: 78%\n\n" +

        "⚠ Elevated environmental stress detected.\n\n" +

        "Recommendation:\n" +
        "Inspect Hive #HC-003 within 24 hours."
    );

}
// =================================
// HIVE SENSOR SIMULATION
// =================================

function simulateHiveChange() {

    const temp =
        document.getElementById("hive3Temp");

    const humidity =
        document.getElementById("hive3Humidity");

    const status =
        document.getElementById("hive3Status");


    if (!temp || !humidity || !status) {
        return;
    }


    // Simulate healthy conditions

    temp.textContent = "33.6°C";

    humidity.textContent = "65%";

    status.textContent = "Healthy";

    status.classList.remove("warning");

    status.classList.add("healthy");


    // Show feedback

    alert(
        "✓ Hive conditions updated\n\n" +
        "Temperature: 33.6°C\n" +
        "Humidity: 65%\n\n" +
        "Colony condition: HEALTHY"
    );

}
// =================================
// BATCH SUCCESS MODAL
// =================================

function showBatchSuccess(batch) {

    document.getElementById(
        "successBatchId"
    ).textContent = batch.id;

    document.getElementById(
        "successHive"
    ).textContent = batch.hive;

    document.getElementById(
        "successQuantity"
    ).textContent =
        batch.quantity + " kg";

    document.getElementById(
        "successSource"
    ).textContent = batch.source;


    document.getElementById(
        "batchSuccessModal"
    ).classList.add("active");


    document.body.style.overflow = "hidden";
}


function closeBatchSuccess() {

    document.getElementById(
        "batchSuccessModal"
    ).classList.remove("active");

    document.body.style.overflow = "auto";
}


// =================================
// QR GENERATION
// =================================

function generateQR() {

    const storedBatch =
        localStorage.getItem("honeyChainBatch");

    if (!storedBatch) {

        alert(
            "No honey batch found.\n\n" +
            "Please create a batch first."
        );

        return;
    }


    const batch =
        JSON.parse(storedBatch);


    const qrContainer =
        document.getElementById("realQRCode");


    if (!qrContainer) {
        return;
    }


    /*
        Clear previous QR code.
    */

    qrContainer.innerHTML = "";


    /*
        The QR contains the batch ID.

        Example:

        HC-2026-482
    */

    new QRCode(qrContainer, {

        text:
    window.location.href
        .replace("beekeeper.html", "consumer.html")
        .split("?")[0]
        + "?batch="
        + encodeURIComponent(batch.id),

        width: 190,

        height: 190,

        colorDark: "#111111",

        colorLight: "#ffffff",

        correctLevel:
            QRCode.CorrectLevel.H

    });


    /*
        Display batch information.
    */

    const qrBatchId =
        document.getElementById("qrBatchId");

    if (qrBatchId) {
        qrBatchId.textContent = batch.id;
    }


    closeBatchSuccess();


    const qrModal =
        document.getElementById("qrModal");

    if (qrModal) {

        qrModal.classList.add("active");

        document.body.style.overflow =
            "hidden";
    }

}


function closeQR() {

    document.getElementById(
        "qrModal"
    ).classList.remove("active");

    document.body.style.overflow =
        "auto";
}


// =================================
// CONSUMER PREVIEW
// =================================

function openConsumerPreview() {

    const storedBatch =
        localStorage.getItem(
            "honeyChainBatch"
        );


    if (!storedBatch) {

        alert(
            "No honey batch found."
        );

        return;
    }


    window.location.href =
        "consumer.html";

}

// =================================
// SIMULATE HIVE STRESS
// =================================

function simulateHiveStress() {

    const temperature =
        document.getElementById(
            "aiTemperature"
        );

    const humidity =
        document.getElementById(
            "aiHumidity"
        );

    const weight =
        document.getElementById(
            "aiWeight"
        );

    const activity =
        document.getElementById(
            "aiActivity"
        );

    const health =
        document.getElementById(
            "aiHealthScore"
        );

    const healthStatus =
        document.getElementById(
            "aiHealthStatus"
        );

    const recommendationTitle =
        document.getElementById(
            "recommendationTitle"
        );

    const recommendationText =
        document.getElementById(
            "recommendationText"
        );

    const recommendationCard =
        document.getElementById(
            "recommendationCard"
        );

    const sensorCards =
        document.querySelectorAll(
            ".sensor-card"
        );


    // =========================
    // CHECK CURRENT STATE
    // =========================

    const isHealthy =
        health.textContent === "92";


    if (isHealthy) {

        // =========================
        // STRESS STATE
        // =========================

        temperature.textContent =
            "39.4°C";

        humidity.textContent =
            "82%";

        weight.textContent =
            "45.7 kg";

        activity.textContent =
            "Abnormal";

        health.textContent =
            "61";

        healthStatus.textContent =
            "At Risk";

        healthStatus.classList.remove(
            "health-good"
        );

        healthStatus.classList.add(
            "health-danger"
        );

        recommendationTitle.textContent =
            "Hive stress detected";

        recommendationText.textContent =
            "Hive #HC-001 is showing elevated " +
            "temperature and humidity with " +
            "reduced weight. Immediate inspection " +
            "is recommended.";

        recommendationCard.classList.add(
            "recommendation-warning"
        );


        sensorCards.forEach(card => {

            card.classList.add(
                "sensor-warning"
            );

        });


        alert(
            "⚠ AI ALERT\n\n" +
            "Hive #HC-001\n\n" +
            "Temperature: 39.4°C\n" +
            "Humidity: 82%\n" +
            "Weight: 45.7 kg\n\n" +
            "AI Health Score: 61/100\n\n" +
            "Hive stress detected.\n" +
            "Inspection recommended."
        );

    }

    else {

        // =========================
        // RETURN TO HEALTHY
        // =========================

        temperature.textContent =
            "33.8°C";

        humidity.textContent =
            "67%";

        weight.textContent =
            "48.2 kg";

        activity.textContent =
            "Normal";

        health.textContent =
            "92";

        healthStatus.textContent =
            "Healthy";

        healthStatus.classList.remove(
            "health-danger"
        );

        healthStatus.classList.add(
            "health-good"
        );

        recommendationTitle.textContent =
            "Conditions look optimal";

        recommendationText.textContent =
            "Hive #HC-001 is currently operating " +
            "within healthy environmental ranges. " +
            "Continue regular monitoring.";

        recommendationCard.classList.remove(
            "recommendation-warning"
        );


        sensorCards.forEach(card => {

            card.classList.remove(
                "sensor-warning"
            );

        });


        alert(
            "✓ HIVE CONDITIONS NORMAL\n\n" +
            "AI analysis indicates healthy " +
            "environmental conditions.\n\n" +
            "Health Score: 92/100"
        );

    }

}

/* =====================================================
   KVIC ADMIN DASHBOARD
===================================================== */

function showAdminSection(sectionId) {

    const sections =
        document.querySelectorAll(".dashboard-section");

    sections.forEach(section => {
        section.classList.remove("active-section");
    });


    const selectedSection =
        document.getElementById(sectionId);

    if (selectedSection) {
        selectedSection.classList.add("active-section");
    }


    const links =
        document.querySelectorAll(".dashboard-link");

    links.forEach(link => {
        link.classList.remove("active");
    });


    const clickedLink =
        document.querySelector(
            `[onclick="showAdminSection('${sectionId}')"]`
        );

    if (clickedLink) {
        clickedLink.classList.add("active");
    }
}


/* Load newly created beekeeper batch */

function loadAdminBatch() {

    const storedBatch =
        localStorage.getItem("honeyChainBatch");

    if (!storedBatch) {
        alert(
            "No newly created batch found.\n\n" +
            "Create a batch from the Beekeeper Dashboard first."
        );

        return;
    }


    const batch =
        JSON.parse(storedBatch);


    const table =
        document.getElementById("adminBatchTable");


    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td><strong>${batch.id}</strong></td>

        <td>${batch.beekeeper}</td>

        <td>${batch.hive}</td>

        <td>${batch.quantity} kg</td>

        <td>${batch.source}</td>

        <td>
            <span class="table-status healthy">
                ${batch.status}
            </span>
        </td>
    `;


    table.prepend(newRow);


    alert(
        "✓ Registry Updated\n\n" +
        "Batch " + batch.id +
        " has been loaded into the KVIC registry."
    );
}


/* Resolve admin alert */

function resolveAlert(button) {

    const alertBox =
        button.closest(".full-alert");

    if (!alertBox) return;


    alertBox.style.opacity = "0.5";

    button.textContent = "Resolved";

    button.disabled = true;

    alert(
        "✓ Alert resolved successfully."
    );
}

/* =====================================================
   CONSUMER HONEY VERIFICATION
===================================================== */

function verifyHoney() {

    const input =
        document.getElementById("verifyBatchId");

    const result =
        document.getElementById("verificationResult");

    if (!input || !result) return;


    const enteredId =
        input.value.trim().toUpperCase();


    if (enteredId === "") {

        alert(
            "Please enter a Honey Chain Batch ID."
        );

        return;
    }


    /*
        Get batch stored by the Beekeeper Dashboard.
    */

    const storedBatch =
        localStorage.getItem("honeyChainBatch");


    let batch = null;


    if (storedBatch) {
        batch = JSON.parse(storedBatch);
    }


    /*
        Check whether entered ID matches
        the registered prototype batch.
    */

    if (
        batch &&
        enteredId === batch.id.toUpperCase()
    ) {

        result.innerHTML = `

            <div class="result-card">

                <div class="result-status">

                    <div class="result-check">
                        ✓
                    </div>

                    <div>

                        <h2>
                            Honey Verified
                        </h2>

                        <p>
                            This batch exists in the
                            Honey Chain registry.
                        </p>

                    </div>

                </div>


                <div class="result-details">

                    <div class="result-detail">
                        <span>Batch ID</span>
                        <strong>${batch.id}</strong>
                    </div>

                    <div class="result-detail">
                        <span>Status</span>
                        <strong>✓ Verified</strong>
                    </div>

                    <div class="result-detail">
                        <span>Beekeeper</span>
                        <strong>${batch.beekeeper}</strong>
                    </div>

                    <div class="result-detail">
                        <span>Location</span>
                        <strong>${batch.location}</strong>
                    </div>

                    <div class="result-detail">
                        <span>Hive</span>
                        <strong>${batch.hive}</strong>
                    </div>

                    <div class="result-detail">
                        <span>Floral Source</span>
                        <strong>${batch.source}</strong>
                    </div>

                    <div class="result-detail">
                        <span>Harvest Quantity</span>
                        <strong>${batch.quantity} kg</strong>
                    </div>

                    <div class="result-detail">
                        <span>Harvest Date</span>
                        <strong>${batch.harvestDate}</strong>
                    </div>

                </div>


                <div class="traceability-box">

                    <h3>
                        Honey Traceability Journey
                    </h3>


                    <div class="trace-line">

                        <div class="trace-step">

                            <div class="trace-dot">
                                🐝
                            </div>

                            <span>
                                Hive Registered
                            </span>

                        </div>


                        <div class="trace-connector"></div>


                        <div class="trace-step">

                            <div class="trace-dot">
                                🍯
                            </div>

                            <span>
                                Harvested
                            </span>

                        </div>


                        <div class="trace-connector"></div>


                        <div class="trace-step">

                            <div class="trace-dot">
                                🔐
                            </div>

                            <span>
                                Batch Secured
                            </span>

                        </div>


                        <div class="trace-connector"></div>


                        <div class="trace-step">

                            <div class="trace-dot">
                                📦
                            </div>

                            <span>
                                Packaged
                            </span>

                        </div>

                    </div>

                </div>

            </div>
        `;

    }


    else {

        result.innerHTML = `

            <div class="result-card failed">

                <div class="result-status">

                    <div class="result-check">
                        ✕
                    </div>

                    <div>

                        <h2>
                            Batch Not Found
                        </h2>

                        <p style="color:#d88989;">
                            Verification unsuccessful
                        </p>

                    </div>

                </div>


                <div class="failed-message">

                    ⚠️ We could not find
                    <strong>${enteredId}</strong>
                    in the Honey Chain registry.

                    <br><br>

                    Please check the Batch ID printed on
                    the product packaging and try again.

                </div>

            </div>

        `;

    }


    result.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
    

}
/* =====================================================
   AUTO VERIFY FROM QR CODE
===================================================== */

function autoVerifyFromQR() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const batchId =
        params.get("batch");


    if (!batchId) {
        return;
    }


    const input =
        document.getElementById("verifyBatchId");


    if (!input) {
        return;
    }


    /*
        Put the Batch ID into the input box.
    */

    input.value = batchId;


    /*
        Automatically verify the batch.
    */

    setTimeout(() => {

        verifyHoney();

    }, 500);

}


/*
    Run automatically when consumer.html loads.
*/

if (
    window.location.pathname
        .toLowerCase()
        .includes("consumer.html")
) {

    autoVerifyFromQR();

}
