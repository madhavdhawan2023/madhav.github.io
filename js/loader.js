$(document).ready(function() {
    // Load the navbar
    $("#navbarmain").load("include/navbar.html", function() {
        // Once the navbar is loaded, initialize any required JS for the navbar if needed
    });

    // Function to load content dynamically
    function loadContent(page) {
        $("#content").load(page, function() {
            // Any additional actions after loading content can be added here
        });
    }

    // Function to get the current hash without the '#'
    function getCurrentHash() {
        return window.location.hash.substring(1);
    }

    // Function to set the hash and load content
    function updatePage(page) {
        var currentHash = getCurrentHash();
        if (currentHash === page) {
            // If the current hash matches the page, reload the content
            window.location.reload();
        } else {
            // Otherwise, update the hash and load new content
            window.location.hash = page;
            loadContent(page);
        }
    }

    // Check the URL hash on page load
    var initialPage = getCurrentHash() || 'main.html';
    loadContent(initialPage);

    // Using click events to load different pages and update the hash
    $(document).on('click', '.nav-link', function(e) {
        e.preventDefault();
        var page = $(this).attr('href');
        updatePage(page);
    });
});
