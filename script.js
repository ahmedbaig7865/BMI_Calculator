let currentUnit = 'metric';

function setUnit(unit) {
    currentUnit = unit;
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector(`.tab[onclick="setUnit('${unit}')"]`).classList.add('active');

    document.querySelectorAll('.us-unit').forEach(el => el.style.display = unit === 'us' ? 'block' : 'none');
    document.querySelectorAll('.metric-unit').forEach(el => el.style.display = unit === 'metric' ? 'block' : 'none');
}

function calculateBMI() {
    const age = parseInt(document.getElementById('age').value);
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const resultDiv = document.getElementById('result');

    if (!age || age < 2 || age > 120) {
        resultDiv.innerHTML = 'Please enter a valid age (2-120).';
        return;
    }

    let height, weight;
    if (currentUnit === 'us') {
        const feet = parseFloat(document.getElementById('height-ft').value);
        const inches = parseFloat(document.getElementById('height-in').value);
        weight = parseFloat(document.getElementById('weight-lb').value);
        height = (feet * 12 + inches) * 0.0254; // Convert to meters
    } else {
        height = parseFloat(document.getElementById('height-cm').value) / 100; // Convert cm to meters
        weight = parseFloat(document.getElementById('weight-kg').value);
    }

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        resultDiv.innerHTML = 'Please enter valid height and weight.';
        return;
    }

    const bmi = weight / (height * height);
    let category = '';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi >= 18.5 && bmi < 25) category = 'Healthy Weight';
    else if (bmi >= 25 && bmi < 30) category = 'Overweight';
    else category = 'Obese';

    resultDiv.innerHTML = `
        <p><strong>Your BMI:</strong> ${bmi.toFixed(1)} (${category})</p>
        <p><strong>Underweight:</strong> BMI < 18.5</p>
        <p><strong>Healthy Weight:</strong> 18.5–24.9</p>
        <p><strong>Overweight:</strong> 25.0–29.9</p>
        <p><strong>Obesity:</strong> 30.0 and Above</p>
    `;
}

function clearInputs() {
    document. PIE.getElementById('age').value = '25';
    document.getElementById('height-ft').value = '5';
    document.getElementById('height-in').value = '10';
    document.getElementById('weight-lb').value = '160';
    document.getElementById('height-cm').value = '120';
    document.getElementById('weight-kg').value = '';
    document.getElementById('result').innerHTML = '';
}