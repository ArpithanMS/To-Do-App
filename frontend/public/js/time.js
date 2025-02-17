function updateTime() {
    var dt = new Date();
    document.getElementById("datetime").innerHTML = dt.toLocaleString();
}

// Update the time every second (1000 milliseconds)
setInterval(updateTime, 1000);

// Call the function immediately to display the time without waiting for the first interval
updateTime();