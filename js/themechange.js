// Function to toggle the theme
function toggleTheme(isInitializing = false) {
    var toggleBtn = document.getElementById("toggle-theme");
    var body = document.body;
    var navbar = document.querySelector('.navbar');
    var svgIcon = document.querySelector('.navbar-brand img');
    var fullscreenbtn = document.querySelector('.btn-fss');
    var para = document.querySelector('.lead-mijhotext');
    var heading = document.querySelector('.display-4');

    if (!isInitializing) {
        isNightMode = !isNightMode; // Toggle the theme mode only if not initializing
        localStorage.setItem('isNightMode', isNightMode); // Store the theme mode
    } else {
        // Check localStorage and set the default to night mode if no preference is found
        if (localStorage.getItem('isNightMode') === null) {
            isNightMode = true;
            localStorage.setItem('isNightMode', isNightMode);
        } else {
            isNightMode = localStorage.getItem('isNightMode') === 'true';
        }
    }

    if (isNightMode) {
        // Apply night mode styles
        body.style.backgroundImage = "url(./images/9.jpg)";
        body.style.color = "white";
        navbar.style.backgroundColor = "#660000";
        toggleBtn.classList.add("night");
        para.style.color = "white";
        heading.style.color= "#f16161";
        para.style.textShadow= "none";
        heading.style.textShadow= "none";
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        svgIcon.src = "svg/blackicon.svg";
        if (fullscreenbtn) {
            fullscreenbtn.style.backgroundColor = "white";
            fullscreenbtn.style.color = "black";
        }
    } else {
        // Apply day mode styles
        body.style.backgroundImage = "url(./images/10.jpg)";
        body.style.color = "black";
        navbar.style.backgroundColor = "#3b3a3a";
        toggleBtn.classList.remove("night");
        para.style.color = "white";
        heading.style.color= "#660000";
        para.style.textShadow= "1px 1px #ff0000";
        heading.style.textShadow= "2px 2px white";
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        svgIcon.src = "https://cdn2.steamgriddb.com/icon_thumb/b21f9f98829dea9a48fd8aaddc1f159d.png";
        if (fullscreenbtn) {
            fullscreenbtn.style.backgroundColor = "black";
            fullscreenbtn.style.color = "white";
        }
    }
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
    toggleTheme(true);
});
