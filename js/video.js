var player;
var startTime = 12;
var endTime = 58939;
var isNightMode = true;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: '_oOZG5-tqpA',
        playerVars: {
            'start': startTime,
            'end': endTime,
            'controls': 0,
            'modestbranding': 1,
            'rel': 0,
            'showinfo': 0,
            'iv_load_policy': 3,
            'fs': 0,
            'disablekb': 1,
            'playsinline': 1,
            'vq': '1440p',
            'loop': 1,
            'autoplay': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });
}

function onPlayerReady(event) {
    event.target.seekTo(startTime);
    event.target.playVideo();
    initializeScrollbar();
    updateMarkers();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        var durationCheck = setInterval(function () {
            if (player.getCurrentTime() >= endTime) {
                player.pauseVideo();
                player.seekTo(startTime);
                clearInterval(durationCheck);
            } else {
                updateMarkers();
            }
        }, 1000);
    }
}

function onPlayerError(event) {
    console.log('Error:', event.data);
}

function togglePlayPause() {
    if (player.getPlayerState() == YT.PlayerState.PLAYING) {
        pauseVideo();
    } else {
        playVideo();
    }
}

function playVideo() {
    player.playVideo();
    document.getElementById('playPauseIcon').classList.remove('fa-play');
    document.getElementById('playPauseIcon').classList.add('fa-pause');
}

function pauseVideo() {
    player.pauseVideo();
    document.getElementById('playPauseIcon').classList.remove('fa-pause');
    document.getElementById('playPauseIcon').classList.add('fa-play');
}

function toggleMuteUnmute() {
    if (player.isMuted()) {
        player.unMute();
        document.getElementById('muteUnmuteIcon').classList.remove('fa-volume-mute');
        document.getElementById('muteUnmuteIcon').classList.add('fa-volume-up');
    } else {
        player.mute();
        document.getElementById('muteUnmuteIcon').classList.remove('fa-volume-up');
        document.getElementById('muteUnmuteIcon').classList.add('fa-volume-mute');
    }
}

function setVolume(volume) {
    player.setVolume(volume);
}

// Enter fullscreen mode
function enterFullscreen() {
    var iframe = document.getElementById('player');
    var overlay = document.getElementById('overlay');

    // Remove overlay before entering fullscreen
    overlay.style.display = 'none';

    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
    } else if (iframe.webkitEnterFullscreen) {
        iframe.webkitEnterFullscreen();
    } else if (iframe.children[0] && iframe.children[0].webkitEnterFullscreen) {
        iframe.children[0].webkitEnterFullscreen();
    } else if (iframe.mozRequestFullScreen) { // Firefox
        iframe.mozRequestFullScreen();
    } else if (iframe.msRequestFullscreen) { // IE/Edge
        iframe.msRequestFullscreen();
    } else if (iframe.enterFullscreen) { // iOS Safari
        iframe.enterFullscreen();
    }

    // Re-add overlay after entering fullscreen
    setTimeout(function() {
        overlay.style.display = 'block';
    }, 1000); // Adjust delay as needed
}



function initializeScrollbar() {
    var scrollbar = document.getElementById('scrollbarHandle');
    var videoDuration = endTime - startTime;

    scrollbar.addEventListener('input', function () {
        var percent = scrollbar.value / 100;
        var newPosition = percent * videoDuration;
        player.seekTo(startTime + newPosition);
    });

    setInterval(function () {
        var currentTime = player.getCurrentTime();
        var percent = (currentTime - startTime) / videoDuration * 100;
        scrollbar.value = percent;
    }, 1000 / 60); // Update every frame
}

function updateMarkers() {
    var currentTime = player.getCurrentTime();
    document.getElementById('startMarker').textContent = formatTime(currentTime);
    document.getElementById('endMarker').textContent = formatTime(endTime);
}

function formatTime(time) {
    var hours = Math.floor(time / 3600);
    var minutes = Math.floor((time % 3600) / 60);
    var seconds = Math.floor(time % 60);

    var formattedTime = '';

    if (hours > 0) {
        formattedTime += hours + ':';
    }

    formattedTime += (minutes < 10 ? '0' : '') + minutes + ':';
    formattedTime += (seconds < 10 ? '0' : '') + seconds;

    return formattedTime;
}

document.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
        case 32: // Spacebar
            togglePlayPause();
            break;
        case 37: // Left arrow key
            seekBy(-30); // Seek backward by 30 seconds
            break;
        case 39: // Right arrow key
            seekBy(30); // Seek forward by 30 seconds
            break;
    }
});

function seekBy(seconds) {
    var currentTime = player.getCurrentTime();
    var newTime = currentTime + seconds;
    if (newTime < startTime) {
        newTime = startTime;
    } else if (newTime > endTime) {
        newTime = endTime;
    }
    player.seekTo(newTime, true);
}

var totalLengthInSeconds = 58939; // 16 hours, 22 minutes, and 19 seconds
var progressPercentage = ((endTime - startTime) / totalLengthInSeconds) * 100;
var progressBar = document.getElementById('progressBar');
progressBar.style.width = progressPercentage + '%';
progressBar.innerText = Math.round(progressPercentage) + '%';
