document.addEventListener('DOMContentLoaded', function () {
    const alarmsList = document.getElementById('alarms-list');
    const setAlarmBtn = document.getElementById('set-alarm-btn');
    const clockDisplay = document.getElementById('clock-display');

    // Function to play a ringtone
    function playRingtone() {
        const audio = new Audio('alarm-clock-short-6402.mp3');
        audio.play();
        // You can also add additional actions here, like showing an alert message.
        alert('Alarm time is up!');
    }

    function updateClock() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const amPm = hours >= 12 ? 'PM' : 'AM';

        // Format the time with leading zeros
        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${amPm}`;

        clockDisplay.textContent = formattedTime;
    }

    // Update the clock display initially
    updateClock();

    // Update the clock display every second
    setInterval(updateClock, 1000);

    setAlarmBtn.addEventListener('click', function () {
        const alarmHours = document.getElementById('alarm-hours').value;
        const alarmMinutes = document.getElementById('alarm-minutes').value;
        const alarmSeconds = document.getElementById('alarm-seconds').value;
        const alarmAmPm = document.getElementById('alarm-am-pm').value;

        // Create a string for the alarm time
        const alarmTime = `${alarmHours}:${alarmMinutes}:${alarmSeconds} ${alarmAmPm}`;
        
        // Create a list item with a delete button
        const alarmItem = document.createElement('li');
        alarmItem.textContent = alarmTime;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style = "margin-left:10px;"
        deleteButton.className = 'btn btn-outline-danger';

        // Add a click event listener to delete the alarm when the button is clicked
        deleteButton.addEventListener('click', function () {
            alarmItem.remove(); // Remove the list item when the delete button is clicked
        });

        alarmItem.appendChild(deleteButton);
        alarmsList.appendChild(alarmItem);

        // Reset the input fields
        document.getElementById('alarm-hours').value = '12';
        document.getElementById('alarm-minutes').value = '00';
        document.getElementById('alarm-seconds').value = '00';
        document.getElementById('alarm-am-pm').value = 'AM';

        // Calculate the time remaining until the alarm
        const now = new Date();
        const [hours, minutes, seconds] = alarmTime.split(':');
        const alarmDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), alarmAmPm === 'PM' ? parseInt(hours, 10) + 12 : parseInt(hours, 10), parseInt(minutes, 10), parseInt(seconds, 10));
        const timeRemaining = alarmDate - now;

        if (timeRemaining > 0) {
            // Schedule the alert and ringtone playback when the alarm time is reached
            setTimeout(playRingtone, timeRemaining);
        }
    });
});

