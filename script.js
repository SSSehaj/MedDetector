document.addEventListener("DOMContentLoaded", () => {
    const conditions = [
      {
        name: "COVID-19",
        keywords: ["fever", "dry cough", "fatigue", "loss of taste", "loss of smell", "shortness of breath", "difficulty breathing", "chills", "body ache"],
        critical: true,
        precautions: [
          "Isolate yourself",
          "Wear a mask",
          "Monitor oxygen level",
          "Consult a doctor immediately"
        ]
      },
      {
        name: "HIV/AIDS",
        keywords: ["chronic fatigue", "night sweats", "weight loss", "frequent infections", "skin rashes", "swollen lymph nodes"],
        critical: true,
        precautions: [
          "Get tested immediately",
          "Consult an infectious disease specialist",
          "Avoid unprotected sex",
          "Do not share needles"
        ]
      },
      {
        name: "Tuberculosis",
        keywords: ["persistent cough", "coughing blood", "chest pain", "night sweats", "unexplained weight loss", "fever", "fatigue"],
        critical: true,
        precautions: [
          "Get a chest X-ray",
          "Avoid close contact with others",
          "Wear a mask",
          "Consult a TB specialist"
        ]
      },
      {
        name: "Sepsis",
        keywords: ["high heart rate", "confusion", "extreme pain", "clammy skin", "fever", "shortness of breath", "low blood pressure"],
        critical: true,
        precautions: [
          "Seek emergency medical attention",
          "Do not wait to see a doctor",
          "Monitor vitals closely",
          "Immediate hospitalization required"
        ]
      },
      {
        name: "Flu",
        keywords: ["fever", "chills", "sore throat", "muscle aches", "fatigue", "dry cough", "headache", "runny nose", "nausea"],
        critical: false,
        precautions: [
          "Stay in bed and rest",
          "Drink warm fluids",
          "Avoid public places",
          "Take flu meds if prescribed"
        ]
      },
      {
        name: "Migraine",
        keywords: ["headache", "nausea", "sensitivity to light", "throbbing pain", "visual aura"],
        critical: false,
        precautions: [
          "Avoid triggers like light or stress",
          "Take prescribed meds",
          "Rest in dark room",
          "Stay hydrated"
        ]
      },
      {
        name: "Allergies",
        keywords: ["itchy eyes", "sneezing", "runny nose", "rash", "hives", "congestion"],
        critical: false,
        precautions: [
          "Avoid allergens",
          "Take antihistamines",
          "Keep house dust-free",
          "Use air purifier"
        ]
      },
      {
        name: "Common Cold",
        keywords: ["sore throat", "sneezing", "cough", "runny nose", "congestion", "mild headache"],
        critical: false,
        precautions: [
          "Drink warm liquids",
          "Rest well",
          "Gargle with salt water",
          "Avoid cold food"
        ]
      }
    ];
  
    document.getElementById("symptomForm").addEventListener("submit", function (e) {
      e.preventDefault();
  
      const name = document.getElementById("name").value;
      const age = document.getElementById("age").value;
      const gender = document.getElementById("gender").value;
      const symptoms = document.getElementById("symptomInput").value.toLowerCase();
  
      const oldWarning = document.querySelector(".alert-danger");
      if (oldWarning) oldWarning.remove();
  
      let bestMatch = null;
      let maxMatches = 0;
  
      for (const condition of conditions) {
        const matchCount = condition.keywords.filter(keyword => symptoms.includes(keyword)).length;
        if (matchCount > maxMatches) {
          maxMatches = matchCount;
          bestMatch = condition;
        }
      }
  
      document.getElementById("rName").textContent = name;
      document.getElementById("rAge").textContent = age;
      document.getElementById("rGender").textContent = gender;
      document.getElementById("rSymptoms").textContent = symptoms;
  
      const diagnosis = bestMatch ? bestMatch.name : "No clear diagnosis. Consult a doctor.";
      document.getElementById("rDiagnosis").textContent = diagnosis;
  
      const precautionList = document.getElementById("rPrecautions");
      precautionList.innerHTML = "";
  
      if (bestMatch && bestMatch.precautions) {
        bestMatch.precautions.forEach(p => {
          const li = document.createElement("li");
          li.textContent = p;
          precautionList.appendChild(li);
        });
      } else {
        const li = document.createElement("li");
        li.textContent = "No specific precautions available. Seek medical advice.";
        precautionList.appendChild(li);
      }
  
      // Check for critical disease
      const isCritical = bestMatch?.critical && bestMatch.keywords.every(keyword => symptoms.includes(keyword));
  
      // Severity Score
      let severityPercent = 0;
      if (bestMatch) {
        const total = bestMatch.keywords.length;
        const matched = bestMatch.keywords.filter(keyword => symptoms.includes(keyword)).length;
        severityPercent = Math.round((matched / total) * 100);
      }
  
      // Update Severity Bar
      const severityBar = document.getElementById("severityBar");
      severityBar.style.width = severityPercent + "%";
      severityBar.textContent = severityPercent + "%";
      severityBar.setAttribute("aria-valuenow", severityPercent);
  
      if (severityPercent < 30) {
        severityBar.className = "progress-bar bg-success";
      } else if (severityPercent <= 70) {
        severityBar.className = "progress-bar bg-warning";
      } else {
        severityBar.className = "progress-bar bg-danger";
      }
  
      // Show warning if critical
      if (isCritical) {
        const warningDiv = document.createElement("div");
        warningDiv.className = "alert alert-danger mt-3 text-center font-weight-bold";
        warningDiv.innerHTML = `
          <h4>⚠️ Critical Condition Detected</h4>
          <p>This may be a serious illness like <strong>${bestMatch.name}</strong>.</p>
          <p>Please seek <u>immediate medical attention</u>!</p>
        `;
        document.getElementById("report").prepend(warningDiv);
      }
  
      document.getElementById("report").classList.remove("d-none");
      document.getElementById("report").scrollIntoView({ behavior: "smooth" });
    });
  

// ✅ PDF DOWNLOAD FUNCTION with Footer
window.downloadPDF = function () {
    const report = document.getElementById('report');
    const name = document.getElementById('rName').textContent || "Medical_Report";
    const newWin = window.open('', '_blank');
    newWin.document.write('<html><head><title>Medical Report</title>');
    newWin.document.write('<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">');
    newWin.document.write('</head><body>');
    newWin.document.write('<div class="container mt-5">' + report.innerHTML + '</div>');
    
    // Add credit footer
    newWin.document.write('<footer class="text-center mt-5" style="font-size: 0.9rem; color: gray;">Created by Paksh Sawariya</footer>');
  
    newWin.document.write('</body></html>');
    newWin.document.close();
    newWin.print();
  };
})  