<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Health Insurance Risk Calculator</title>
	<style>
		body {
			font-family: Arial, Helvetica, sans-serif;
			background-color: #678497;
			color: #333;
		}
		h1, h2, h3 {
			text-align: center;
			color: #333;
			margin-top: 0;
		}
		form {
			background-color: #53f5e5;
			max-width: 600px;
			margin: 0 auto;
			padding: 20px;
			border-radius: 5px;
			box-shadow: 0 0 10px rgba(0,0,0,0.2);
		}
		label {
			display: block;
			margin-bottom: 5px;
			font-weight: bold;
			color: #333;
		}
		input[type="text"] {
			padding: 10px;
			font-size: 16px;
			border: 1px solid #e897be;
			border-radius: 3px;
			width: 100%;
			box-sizing: border-box;
		}
		input[type="radio"] {
			margin-right: 5px;
		}
		button {
			display: block;
			margin: 20px auto 0;
			padding: 10px 20px;
			font-size: 16px;
			background-color: #1E90FF;
			color: #33c8e9;
			border: none;
			border-radius: 3px;
			cursor: pointer;
		}
		button:hover {
			background-color: #00BFFF;
		}
		#results {
			background-color: #62d2ff;
			max-width: 600px;
			margin: 20px auto;
			padding: 20px;
			border-radius: 5px;
			box-shadow: 0 0 10px rgba(0,0,0,0.2);
			display: none;
		}
		table {
			margin-bottom: 10px;
			width: 100%;
			border-collapse: collapse;
		}
		th, td {
			padding: 8px;
			text-align: left;
			border: 1px solid #3eccd1;
		}
		th {
			background-color: #48dad0;
		}
		.low-risk {
			color: #75f575;
			font-weight: bold;
		}
		.moderate-risk {
			color: #FFA500;
			font-weight: bold;
		}
		.high-risk {
			color: #FF4500;
			font-weight: bold;
		}
		.uninsurable {
			color: #808080;
			font-weight: bold;
		}
		.error {
			color: #FF4500;
			font-weight: bold;
			margin-top: 5px;
		}
	</style>
<head>
	<style>
		.result {
			display: block;
		}
	</style>
</head>
<body>
    
	<div class="container">
		<h1>Insurance Risk Assessment</h1>
		<p>Please answer the following questions to calculate your insurance risk.</p>

		<form onsubmit="return calculateRisk()">
			<label for="age">Age (years)</label>
			<input type="text" id="age" name="age" placeholder="Enter your age in years">

			<label for="height">Height (feet/inches)</label>
			<input type="text" id="height-feet" name="height-feet" placeholder="Feet"> 
			<input type="text" id="height-inches" name="height-inches" placeholder="Inches">

			<label for="weight">Weight (pounds)</label>
			<input type="text" id="weight" name="weight" placeholder="Enter your weight in pounds">

			<label for="bp-systolic">Blood Pressure (systolic/diastolic)</label>
			<input type="text" id="bp-systolic" name="bp-systolic" placeholder="Systolic"> 
			<input type="text" id="bp-diastolic" name="bp-diastolic" placeholder="Diastolic">

			<label for="diabetes">Do you have a family history of diabetes?</label>
			<select id="diabetes" name="diabetes">
				<option value="">Select an option</option>
				<option value="yes">Yes</option>
				<option value="no">No</option>
			</select>

            <label for="cancer">Do you have a family history of cancer?</label>
		    <select id="cancer" name="cancer">
                <option value="">Select an option</option>
				<option value="yes">Yes</option>
				<option value="no">No</option>
			</select>

            <label for="heart-disease"> Do you have a family history ofheart disease?</label>
            <select id="heart-disease" name="heart-disease">
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
    
            <label for="smoker">Do you smoke?</label>
            <select id="smoker" name="smoker">
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
    
            <input type="submit" value="Calculate Risk" onclick="return calculateRisk()">
        </form>
    
        <div class="result" id="result">
            <h3>Insurance Risk Assessment Result:</h3>
            <p id="risk-score"></p>
            <p id="risk-level"></p>
        </div>
    
    </div>
    
    <script>
        function calculateRisk() {
           
            var age = parseInt(document.getElementById('age').value);
            var heightFeet = parseInt(document.getElementById('height-feet').value);
            var heightInches = parseInt(document.getElementById('height-inches').value);
            var weight = parseInt(document.getElementById('weight').value);
            var bpSystolic = parseInt(document.getElementById('bp-systolic').value);
            var bpDiastolic = parseInt(document.getElementById('bp-diastolic').value);
            var diabetes = document.getElementById('diabetes').value;
            var cancer = document.getElementById('cancer').value;
            var heartDisease = document.getElementById('heart-disease').value;
            var smoker = document.getElementById('smoker').value;

                    // validate inputs
        if (isNaN(age) || isNaN(heightFeet) || isNaN(heightInches) || isNaN(weight) || isNaN(bpSystolic) || isNaN(bpDiastolic)) {
            alert('Please enter numeric values for age, height, weight, and blood pressure.');
            return false;
        }
        if (age < 0 || heightFeet < 0 || heightInches < 0 || weight < 0 || bpSystolic < 0 || bpDiastolic < 0) {
        alert('Please enter positive values for age, height, weight, and blood pressure.');
        return false;
        }
        if (heightFeet > 8 || heightInches > 11) {
            alert('Please enter a valid height.');
            return false;
        }
        if (weight > 1000) {
            alert('Please enter a valid weight.');
            return false;
        }
        if (bpSystolic > 300 || bpDiastolic > 200) {
            alert('Please enter a valid blood pressure.');
            return false;
        }

        // calculate BMI
        var heightInchesTotal = (heightFeet * 12) + heightInches;
        var bmi = (weight / (heightInchesTotal * heightInchesTotal)) * 703;

        // calculate risk score
        var riskScore = 0;
        if (age >= 40 && age < 60) {
            riskScore += 1;
        } else if (age >= 60) {
            riskScore += 2;
        }
        if (bmi >= 30) {
            riskScore += 2;
        } else if (bmi >= 25) {
            riskScore += 1;
        }
        if (bpSystolic >= 140 || bpDiastolic >= 90) {
            riskScore += 2;
        } else if (bpSystolic >= 120 || bpDiastolic >= 80) {
            riskScore += 1;
        }
        if (diabetes === 'yes') {
            riskScore += 2;
        }
        if (cancer === 'yes') {
            riskScore += 2;
        }
        if (heartDisease === 'yes') {
            riskScore += 2;
        }
        if (smoker === 'yes') {
            riskScore += 2;
        }

        // display risk level
        var riskLevel = '';
        if (riskScore <= 3) {
            riskLevel = 'low👍👍';
        } else if (riskScore <= 6) {
            riskLevel = 'moderate';
        } else if (riskScore <= 9) {
            riskLevel = 'high👎👎';
        } else {
            riskLevel = 'uninsurable❌❌';
        }

        // display result
        var resultElement = document.getElementById('result');
        resultElement.style.display = 'block';
        document.getElementById('risk-score').innerHTML = 'Your insurance risk score is ' + riskScore + '.';
        document.getElementById('risk-level').innerHTML = 'Your insurance risk level is ' + riskLevel + '.';

        
        var continueEvaluating = confirm("Do you want to evaluate another person?");
        if (continueEvaluating) {
            // reset form values
            document.getElementById('age').value = '';
            document.getElementById('height-feet').value = '';
            document.getElementById('height-inches').value = '';
            document.getElementById('weight').value = '';
            document.getElementById('bp-systolic').value = '';
            document.getElementById('bp-diastolic').value = '';
            document.getElementById('diabetes').value = '';
            document.getElementById('cancer').value = '';
            document.getElementById('heart-disease').value = '';
            document.getElementById('smoker').value = '';
            
            document.getElementById('person').innerHTML = parseInt(document.getElementById('person').innerHTML) + 1;
            document.getElementById('person-form').style.display = 'block';
            document.getElementById('person').innerHTML = parseInt(document.getElementById('person').innerHTML) + 1;
            document.getElementById('person-form').style.display = 'block';

            // hide current form and result
            document.getElementById('risk-level').innerHTML = '';
            document.getElementById('risk-score').innerHTML = '';
            document.getElementById('result').style.display = 'none';

            } else {
            alert("Thank you for using our insurance risk evaluation tool!");
    }

        return false;
    }
   

</script>
</body>
</html>
