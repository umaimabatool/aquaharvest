document.addEventListener("DOMContentLoaded", () => {

    // =============================
    // 🐟 ELEMENTS
    // =============================

    const fishDrop = document.getElementById("fishDrop");
    const fishFile = document.getElementById("fishFile");
    const fishPreview = document.getElementById("fishPreview");
    const runFishAI = document.getElementById("runFishAI");
    const fishResult = document.getElementById("fishResult");

    let fishImage = null;

    // =============================
    // 📤 IMAGE UPLOAD SYSTEM
    // =============================

    if (fishDrop && fishFile) {

        fishDrop.addEventListener("click", () => fishFile.click());

        fishFile.addEventListener("change", (e) => {

            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();

            reader.onload = (event) => {
                fishImage = event.target.result;

                fishPreview.innerHTML = `
                    <img src="${fishImage}" class="preview-img" />
                `;
            };

            reader.readAsDataURL(file);
        });
    }

    // =============================
    // 🧠 FAKE AI ENGINE (SMART LOGIC)
    // =============================

    function runFishFakeAI() {

        const diseases = [
            {
                name: "Fin Rot Disease",
                confidence: 93,
                keywords: ["fin", "damage", "broken", "rot"],
                treatment: "Salt bath treatment + improve water quality + reduce stress"
            },
            {
                name: "Fungal Infection",
                confidence: 89,
                keywords: ["white", "cotton", "patch", "spots"],
                treatment: "Antifungal medication + clean aquarium + isolate fish"
            },
            {
                name: "Columnaris Infection",
                confidence: 86,
                keywords: ["mouth", "wound", "lesion", "ulcer"],
                treatment: "Antibiotics + oxygen increase + quarantine tank"
            },
            {
                name: "Ich (White Spot Disease)",
                confidence: 91,
                keywords: ["tiny", "dots", "white", "grain"],
                treatment: "Increase temperature + salt treatment + anti-parasitic medicine"
            },
            {
                name: "Healthy Fish",
                confidence: 96,
                keywords: ["clear", "bright", "smooth", "active"],
                treatment: "No treatment needed — maintain water conditions"
            }
        ];

        const fakeVision = [
            "fish detected",
            "bright coloration",
            "slight fin damage",
            "white spots observed",
            "healthy movement",
            "skin irregularity"
        ];

        const detectedFeature = fakeVision[Math.floor(Math.random() * fakeVision.length)];

        let match = diseases.find(d =>
            d.keywords.some(k => detectedFeature.includes(k))
        );

        if (!match) {
            match = {
                name: "Unknown Condition",
                confidence: 70,
                treatment: "Observe fish, change water, monitor behavior closely"
            };
        }

        return {
            feature: detectedFeature,
            result: match
        };
    }

    // =============================
    // 🚀 RUN AI BUTTON
    // =============================

    if (runFishAI) {

        runFishAI.addEventListener("click", () => {

            if (!fishImage) {
                fishResult.innerHTML = `
                    <p style="color:red;">⚠️ Please upload a fish image first</p>
                `;
                return;
            }

            fishResult.innerHTML = `<p>🧠 AI analyzing fish health...</p>`;

            setTimeout(() => {

                const ai = runFishFakeAI();

                fishResult.innerHTML = `
                    <h4>🐟 Fish AI Diagnosis</h4>

                    <p><b>Detected Feature:</b> ${ai.feature}</p>
                    <p><b>Disease:</b> ${ai.result.name}</p>
                    <p><b>Confidence:</b> ${ai.result.confidence}%</p>

                    <hr>

                    <p><b>💊 Treatment Plan:</b></p>
                    <p>${ai.result.treatment}</p>
                `;

            }, 1300);
        });
    }

    // =============================
    // 💧 POND CALCULATOR MODULE
    // =============================

    const runCalc = document.getElementById("runCalc");

    if (runCalc) {

        runCalc.addEventListener("click", () => {

            const volume = parseFloat(document.getElementById("pondVolume").value);
            const count = parseInt(document.getElementById("fishCount").value);
            const type = document.getElementById("fishType").value;
            const pondResult = document.getElementById("pondResult");

            if (!volume || !count) {
                pondResult.innerHTML = `<p style="color:red;">Enter valid values</p>`;
                return;
            }

            const density = (count / volume).toFixed(2);
            const feed = (count * 0.03).toFixed(2);
            const oxygen = (volume * 0.01).toFixed(2);

            pondResult.innerHTML = `
                <h4>💧 Pond Analysis</h4>
                <p><b>Fish Type:</b> ${type}</p>
                <p><b>Stock Density:</b> ${density} fish/L</p>
                <p><b>Daily Feed:</b> ${feed} kg</p>
                <p><b>Oxygen Need:</b> ${oxygen} mg/L</p>
            `;
        });
    }

});