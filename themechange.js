function toggleTheme() {
    var toggleBtn = document.getElementById("toggle-theme");
    var body = document.body;
    var navbar = document.querySelector('.navbar');
    var svgIcon = document.querySelector('.navbar-brand img'); // Target the SVG icon
    var fullscreenbtn = document.querySelector('.btn-fss');

    if (isNightMode) {
        // Switch to day mode
        body.style.backgroundColor = "white";
        body.style.color = "black";
        navbar.style.backgroundColor = "#3b3a3a"; // Change navbar background color
        toggleBtn.classList.remove("night");
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        svgIcon.src = "https://cdn2.steamgriddb.com/icon_thumb/b21f9f98829dea9a48fd8aaddc1f159d.png"; 
        fullscreenbtn.style.backgroundColor= "black";
        fullscreenbtn.style.color= "white"
    } else {
        // Switch to night mode
        body.style.backgroundColor = "#3b3a3a";
        body.style.color = "white";
        navbar.style.backgroundColor = "#660000"; // Change navbar background color
        toggleBtn.classList.add("night");
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        svgIcon.src = "./blackicon.svg"; // Change SVG icon for night mode
        fullscreenbtn.style.backgroundColor= "white";
        fullscreenbtn.style.color= "black";
    }

    isNightMode = !isNightMode; // Toggle the theme mode
}