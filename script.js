document.addEventListener('DOMContentLoaded', function() {
    // Mock data
    const mockSymptoms = ["fever", "cough", "headache", "fatigue", "nausea"];
    const mockDiseases = {
        "fever,cough": [
            { name: "Common Cold", probability: 85, prevention: "Rest and drink fluids." },
            { name: "Flu", probability: 60, prevention: "Get a flu vaccine." }
        ],
        "headache,fatigue": [
            { name: "Migraine", probability: 70, prevention: "Avoid triggers like stress." }
        ]
    };

    // DOM elements
    const symptomsContainer = document.getElementById('symptomsContainer');
    const symptomList = document.getElementById('symptomList');
    const addSymptomBtn = document.getElementById('addSymptom');
    const predictBtn = document.getElementById('predictButton');
    const resultsDiv = document.getElementById('predictionResults');

    // Populate symptom datalist
    mockSymptoms.forEach(symptom => {
        const option = document.createElement('option');
        option.value = symptom;
        symptomList.appendChild(option);
    });

    // Add new symptom input
    addSymptomBtn.addEventListener('click', () => {
        const newEntry = document.createElement('div');
        newEntry.className = 'symptom-entry';
        newEntry.innerHTML = `
            <input type="text" class="symptom-input" placeholder="Enter a symptom" list="symptomList">
            <button class="remove-symptom">Remove</button>
        `;
        symptomsContainer.appendChild(newEntry);
        
        // Add remove functionality
        newEntry.querySelector('.remove-symptom').addEventListener('click', () => {
            if (document.querySelectorAll('.symptom-entry').length > 1) {
                newEntry.remove();
            }
        });
    });

    // Predict diseases
    predictBtn.addEventListener('click', () => {
        const symptoms = Array.from(document.querySelectorAll('.symptom-input'))
            .map(input => input.value.trim())
            .filter(Boolean);

        if (symptoms.length === 0) {
            resultsDiv.innerHTML = '<div class="error">Please enter at least one symptom.</div>';
            return;
        }

        // Simulate prediction
        resultsDiv.innerHTML = '<div class="loading">Analyzing symptoms...</div>';
        
        setTimeout(() => {
            const key = symptoms.join(',');
            const predictions = mockDiseases[key] || [
                { 
                    name: "No specific match", 
                    probability: 0, 
                    prevention: "Consult a doctor for unusual symptoms." 
                }
            ];

            displayResults(predictions);
        }, 1000);
    });

    function displayResults(predictions) {
        let html = '<h3>Prediction Results</h3>';
        
        predictions.forEach(pred => {
            html += `
                <div class="prediction-card">
                    <h4>${pred.name}</h4>
                    <p>Probability: <strong>${pred.probability}%</strong></p>
                    <p>Prevention: ${pred.prevention}</p>
                </div>
            `;
        });

        resultsDiv.innerHTML = html;
    }
});