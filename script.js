// script.js
async function fetchTubeStatus() {
    try {
        const response = await fetch('https://api.tfl.gov.uk/Line/Elizabeth/Status');
        const data = await response.json();

        const statusContainer = document.getElementById('status-container');
        statusContainer.innerHTML = ''; // Clear previous status

        data.forEach(line => {
            const lineStatus = document.createElement('div');
            lineStatus.classList.add('line-status');

            if (line.lineStatuses[0].statusSeverityDescription === 'Good Service') {
                lineStatus.classList.add('good-service');
            } else {
                lineStatus.classList.add('disrupted');
            }

            lineStatus.innerText = `${line.name}: ${line.lineStatuses[0].statusSeverityDescription}`;
            statusContainer.appendChild(lineStatus);
        });

        // Update last updated time
        const now = new Date();
        document.getElementById('last-updated').innerText = 
            `Last updated: ${now.toLocaleTimeString()}`;

    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('status-container').innerHTML = 
            '<p>⚠️ Failed to load Tube status.</p>';
    }
}
// Fetch data every 30 seconds
fetchTubeStatus();
setInterval(fetchTubeStatus, 30000);
