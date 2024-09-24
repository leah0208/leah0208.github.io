
        let isPlaying = false;
        const video = document.getElementById("video-player");
        const playPauseImg = document.getElementById("play-pause-img");
        const muteImg = document.getElementById("mute-img");
        const currentTimeDisplay = document.getElementById("current-time");
        const progressBarFill = document.getElementById("progress-bar-fill");

        function togglePlayPause() {
            if (isPlaying) {
                video.pause();
                playPauseImg.src = "./assets/icons/icons8-play.gif"; // Switch back to the play icon
            } else {
                video.play();
                playPauseImg.src = "./assets/icons/icons8-pause.gif"; // Switch to the pause icon
            }
            isPlaying = !isPlaying;
        }

        function muteUnmute() {
            video.muted = !video.muted;
            muteImg.src = video.muted ? "./assets/icons/icons8-no-audio-30.png" : "./assets/icons/icons8-audio-30.png"; // switch Mute/unmute ICONS
        }

        function rewind() {
            video.currentTime = Math.max(0, video.currentTime - 10);
        }

        function forward() {
            video.currentTime = Math.min(video.duration, video.currentTime + 10);
        }

        function restart() {
            video.currentTime = 0;
            video.play();
            isPlaying = true;
            playPauseImg.src = "./assets/icons/icons8-pause.gif"; // Switch to the pause icon
        }

        function updateCurrentTime() {
            const currentTime = Math.floor(video.currentTime);
            currentTimeDisplay.textContent = `Current Time: ${currentTime}s`;

            const progressPercent = (video.currentTime / video.duration) * 100;
            progressBarFill.style.width = `${progressPercent}%`;
        }

        video.addEventListener("timeupdate", updateCurrentTime);
        video.addEventListener("ended", () => {
            isPlaying = false;
            playPauseImg.src = "./assets/icons/icons8-play.gif"; // Switch back to the play icon
        });

        document.addEventListener("DOMContentLoaded", () => {
            video.play();
            isPlaying = true;
            playPauseImg.src = "./assets/icons/icons8-pause.gif"; // Switch to the pause icon
        });

        let hideControlsTimeout;

        function showControls() {
            clearTimeout(hideControlsTimeout);
            document.querySelector('.custom-controls').style.opacity = 1;
            hideControlsTimeout = setTimeout(hideControls, 2000);
        }

        function hideControls() {
            document.querySelector('.custom-controls').style.opacity = 0;
        }

        document.querySelector('.video-container').addEventListener('mousemove', showControls);
        
        showControls();

