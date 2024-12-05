// Get the form and table elements
const workForm = document.getElementById('workForm');
const workTable = document.getElementById('workTable');

// Hourly rate for different companies
const hourlyRates = {
    gulf: 6.5, // Gulf company hourly rate in GBP
    transportUK: 15 // Transport UK company hourly rate in GBP
};

// Function to handle form submission and log work hours
workForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form data
    const company = document.getElementById('company').value;
    const date = document.getElementById('date').value;
    const inHours = document.getElementById('inHours').value;
    const inMinutes = document.getElementById('inMinutes').value;
    const outHours = document.getElementById('outHours').value;
    const outMinutes = document.getElementById('outMinutes').value;

    // Convert in time and out time to Date objects
    let inTime = new Date(`${date}T${inHours}:${inMinutes}:00`);
    let outTime = new Date(`${date}T${outHours}:${outMinutes}:00`);

    // If the out time is earlier than the in time, assume it's for the next day
    if (outTime <= inTime) {
        outTime.setDate(outTime.getDate() + 1); // Move the out time to the next day
    }

    // Calculate worked hours (in decimal format)
    const workedMilliseconds = outTime - inTime;
    const workedHours = workedMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours

    // Adjust the worked hours for Transport UK if less than 6 hours
    let adjustedWorkedHours = workedHours;
    if (company === 'transportUK' && workedHours < 6) {
        adjustedWorkedHours = 6; // Minimum of 6 hours
    }

    // Calculate earnings
    const hourlyRate = hourlyRates[company];
    const earnings = adjustedWorkedHours * hourlyRate;

    // Create a row for the table with the logged data
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${company === 'gulf' ? 'Gulf' : 'Transport UK'}</td>
        <td>${date}</td>
        <td>${adjustedWorkedHours.toFixed(2)} hours</td>
        <td>£${earnings.toFixed(2)}</td>
        <td>${company === 'gulf' ? 'Gulf' : 'UK'}</td>
        <td><button class="deleteButton">Delete</button></td>
    `;

    // Append the row to the table
    workTable.appendChild(row);

    // Reset the form
    workForm.reset();
});

// Add event listener for delete buttons
workTable.addEventListener('click', function (event) {
    if (event.target.classList.contains('deleteButton')) {
        // Remove the row when delete button is clicked
        event.target.closest('tr').remove();
    }
});
