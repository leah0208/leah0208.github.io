// const video = document.querySelector("#custom-video-player");
// const playPauseBtn = document.querySelector("#play-pause-btn");
// const playPauseImg = document.querySelector("#play-pause-img");
// const progressBar = document.querySelector("#progress-bar-fill");
// video.removeAttribute("controls");
// // playPauseBtn.addEventListener("click", togglePlayPause);
// video.addEventListener("timeupdate", updateProgressBar);
// function togglePlayPause() {
//   if (video.paused || video.ended) {
//     video.play();
//     playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
//   } else {
//     video.pause();
//     playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
//   }
// }
// function updateProgressBar() {
//   const value = (video.currentTime / video.duration) * 100;
//   progressBar.style.width = value + "%";
// }
// // Add other functionalities here

/*playlists*/
let index = -1;

let isPlaying = false;
const video = document.getElementById("video-player");
const playPauseImg = document.getElementById("play-pause-img");
const muteImg = document.getElementById("mute-img");
const currentTimeDisplay = document.getElementById("current-time");
const progressBarFill = document.getElementById("progress-bar-fill");

let isRandom = false;

let videoList = [
  {
    videoSrc: "http://v3.janreszz.com/video/m9/2.mp4",
    thumbnailSrc: "./assets/icons/Screenshot 2024-09-24 at 6.09.37 PM.png",
  },
  {
    videoSrc: "http://v3.janreszz.com/video/m9/3.mp4",
    thumbnailSrc: "./assets/icons/Screenshot 2024-09-24 at 6.21.53 PM.png",
  },
  {
    videoSrc: "http://v3.janreszz.com/video/m9/4.mp4",
    thumbnailSrc: "./assets/icons/Screenshot 2024-09-24 at 6.10.10 PM.png",
  },
];

function createRightVideos(list) {
  let rightContainer = document.querySelector(".right-container");
  for (let i = 0; i < list.length; i++) {
    let videoItem = document.createElement("div");
    videoItem.classList.add("video-item");
    videoItem.setAttribute("onclick", `playVideo('${list[i].videoSrc}', '${list[i].thumbnailSrc}')`);
    let videoItemImg = document.createElement("img");
    videoItemImg.setAttribute("src", list[i].thumbnailSrc);
    videoItem.appendChild(videoItemImg);
    rightContainer.appendChild(videoItem);
  }
}

createRightVideos(videoList);

function togglePlayPause() {
  if (isPlaying) {
    video.pause();
    playPauseImg.src = "./assets/icons/icons8-play.gif"; // play
  } else {
    video.play();
    playPauseImg.src = "./assets/icons/icons8-pause.gif"; // pause
  }
  isPlaying = !isPlaying;
}

function muteUnmute() {
  video.muted = !video.muted;
  muteImg.src = video.muted ? "./assets/icons/icons8-no-audio-30.png" : "./assets/icons/icons8-audio-30.png"; // mute/unmute
}

function restart() {
  video.currentTime = 0;
  video.play();
  isPlaying = true;
  playPauseImg.src = "./assets/icons/icons8-pause.gif"; // switch to pause icon
}

function updateCurrentTime() {
  const currentTime = Math.floor(video.currentTime);
  const progressPercent = (video.currentTime / video.duration) * 100;
  progressBarFill.style.width = `${progressPercent}%`;
}

video.addEventListener("timeupdate", updateCurrentTime);

video.addEventListener("ended", () => {
  // isPlaying = false;
  // playPauseImg.src = "./assets/icons/icons8-play.gif"; // switch to play icon
  next();
});

document.addEventListener("DOMContentLoaded", () => {
  video.play();
  isPlaying = true;
  playPauseImg.src = "./assets/icons/icons8-pause.gif"; // switch to pause icon
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

function playVideo(videoSrc, thumbnailSrc, flag) {
  let temp = {
    videoSrc: video.src,
    thumbnailSrc: video.poster,
  }
  video.src = videoSrc;
  video.poster = thumbnailSrc;
  video.play();
  isPlaying = true;
  playPauseImg.src = "./assets/icons/icons8-pause.gif";

  const currentIndex = videoList.findIndex(video => video.videoSrc === videoSrc);
  index = currentIndex;
  if (currentIndex > -1) {
    const currentVideo = videoList.splice(currentIndex, 1)[0];
    !flag ? videoList.push(temp) : videoList.unshift(temp);
    const rightContainer = document.querySelector(".right-container");
    rightContainer.innerHTML = '';
    createRightVideos(videoList);
  }
}

function setVolume(value) {
  video.volume = value;
}

function next() {

  if (isRandom) {
    index = Math.floor(Math.random() * videoList.length);
  } else {
    index = 0;
  }
  playVideo(videoList[index].videoSrc, videoList[index].thumbnailSrc);
}

function prev() {
  if (isRandom) {
    index = Math.floor(Math.random() * videoList.length);
  } else {
    index = 2;
  }
  playVideo(videoList[index].videoSrc, videoList[index].thumbnailSrc, true);
}


function toggleRandom() {
  isRandom = !isRandom;
  const randomImg = document.getElementById("random-img");
  randomImg.src = isRandom ? "./assets/icons/icons8-shuffle-30.png" : "./assets/icons/icons8-repeat-30.png"; // change 
}

function toggleFullScreen() {
  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) { // Safari 
      video.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { // Safari 
      document.webkitExitFullscreen();
    }
  }
}

video.addEventListener('dblclick', toggleFullScreen);





