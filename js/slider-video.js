export default function sliderVideo() {
  // video player
  const player = document.querySelector(".video-player")
  const mainVideo = document.querySelector(".main-video")
  const video = document.querySelector(".video-poster")
  const playIcon = document.querySelector(".play-icon")
  const buttonPlay = document.querySelector(".button-play")
  const buttonPause = document.querySelector(".button-pause")
  const buttonVolume = document.querySelector(".button-volume")
  const buttonMute = document.querySelector(".button-mute")
  const fullScreen = document.querySelector(".button-fullscreen")
  const fullExit = document.querySelector(".button-fullexit")
  const progress = document.querySelector(".input-progress")
  const volume = document.querySelector(".input-volume")

  // slider
  const prev = document.querySelector(".pagination-prev")
  const next = document.querySelector(".pagination-next")
  const paginationDots = document.querySelectorAll(".pagination-dot")

  const items = document.querySelector(".video-slider")

  let slides = items.getElementsByClassName("video-slide")
  let slideOne = slides[0]
  let sledeTwo = slides[1]
  let sledeThree = slides[2]
  let lastSlide = slides[slides.length - 1]
  let preLastSlide = slides[slides.length - 2]
  let prePreLastSlide = slides[slides.length - 3]
  let cloneOne = slideOne.cloneNode(true)
  let cloneTwo = sledeTwo.cloneNode(true)
  let cloneThree = sledeThree.cloneNode(true)
  let cloneLast = lastSlide.cloneNode(true)
  let clonePreLast = preLastSlide.cloneNode(true)
  let clonePrePreLast = prePreLastSlide.cloneNode(true)

  let slidesLength = slides.length
  const flexGap = 42

  items.prepend(clonePrePreLast, clonePreLast, cloneLast)
  items.append(cloneOne, cloneTwo, cloneThree)

  prev.addEventListener("click", shiftSlidePrev)
  next.addEventListener("click", shiftSlideNext)
  items.addEventListener("transitionend", checkIndex)
  paginationDots.forEach((el, i) =>
    el.addEventListener("click", (event) => {
      if (el === event.target) {
        videoNum = i
        updateVideo(videoNum)
        shiftSlideOnDots(i)
      }
    })
  )

  function updateVideo(num) {
    video.currentTime = 0
    video.pause()
    video.src = `./assets/images/video/video${num}.mp4`
    video.poster = `./assets/images/video/poster${num}.jpeg`
    playIcon.style.display = "block"
    buttonPause.style.display = "none"
    buttonPlay.style.display = "block"
    video.muted = false
    buttonMute.style.display = "none"
    buttonVolume.style.display = "block"
  }

  let posInitial
  let slideSize =
    items.getElementsByClassName("video-slide")[0].offsetWidth + flexGap
  let index = 0
  let indexDots = 0
  let allowShift = true
  let videoNum = 0

  let progressItem = document.querySelectorAll(".pagination-dot")
  progressItem[indexDots].classList.add("active")

  function shiftSlidePrev() {
    progressItem[indexDots].classList.remove("active")
    items.classList.add("smooth")
    posInitial = items.offsetLeft
    if (allowShift) {
      items.style.left = posInitial + slideSize + "px"
      posInitial = posInitial + slideSize
      index--
      getIndexDots()
      updateVideo(indexDots)
    }
    allowShift = false
  }

  function shiftSlideNext() {
    progressItem[indexDots].classList.remove("active")
    items.classList.add("smooth")
    posInitial = items.offsetLeft
    if (allowShift) {
      items.style.left = posInitial - slideSize + "px"
      posInitial = posInitial - slideSize
      index++
      getIndexDots()
      updateVideo(indexDots)
    }
    allowShift = false
  }

  function shiftSlideOnDots(num) {
    if (num === indexDots) {
      return
    }
    progressItem[indexDots].classList.remove("active")
    items.classList.add("smooth")
    if (allowShift) {
      if (num == 0) {
        items.style.left = -slideSize * 3 + "px"
        posInitial = -slideSize * 3
        index = 0
        getIndexDots()
      }
      if (num == 1) {
        items.style.left = -slideSize * 4 + "px"
        posInitial = -slideSize * 4
        index = 1
        getIndexDots()
      }
      if (num == 2) {
        items.style.left = -slideSize * 5 + "px"
        posInitial = -slideSize * 5
        index = 2
        getIndexDots()
      }
      if (num == 3) {
        items.style.left = -slideSize * 6 + "px"
        posInitial = -slideSize * 6
        index = 3
        getIndexDots()
      }
      if (num == 4) {
        items.style.left = -slideSize * 7 + "px"
        posInitial = -slideSize * 7
        index = 4
        getIndexDots()
      }
    }
    allowShift = false
  }

  function checkIndex() {
    items.classList.remove("smooth")
    if (index == -3) {
      items.style.left = -(slidesLength * slideSize) + "px"
      index = slidesLength - 3
      getIndexDots()
    }
    if (index == slidesLength) {
      items.style.left = -(3 * slideSize) + "px"
      index = 0
      getIndexDots()
    }
    progressItem[indexDots].classList.add("active")
    allowShift = true
    // console.log(index);
  }

  function getIndexDots() {
    if (index >= 0 && index <= 4) {
      indexDots = index
    }
    switch (index) {
      case -1:
        indexDots = 4
        break
      case -2:
        indexDots = 3
        break
      case -3:
        indexDots = 2
        break
      case 5:
        indexDots = 0
        break
      case 6:
        indexDots = 1
        break
      case 7:
        indexDots = 2
        break
    }
  }

  // for main player

  function togglePlay() {
    const method = video.paused ? "play" : "pause"
    video[method]()
  }

  function updateButton() {
    if (this.paused) {
      playIcon.style.display = "block"
      buttonPause.style.display = "none"
      buttonPlay.style.display = "block"
    } else {
      playIcon.style.display = "none"
      buttonPlay.style.display = "none"
      buttonPause.style.display = "block"
    }
  }

  function toggleMute() {
    if (video.muted) {
      video.muted = false
      buttonMute.style.display = "none"
      buttonVolume.style.display = "block"
    } else {
      video.muted = true
      buttonVolume.style.display = "none"
      buttonMute.style.display = "block"
    }
  }

  function toggleFullScreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      player.requestFullscreen()
    }
  }

  function updateIconFullScreen() {
    if (document.fullscreenElement) {
      mainVideo.classList.add("full")
      fullScreen.classList.add("not-active")
      fullExit.classList.add("active")
    } else {
      mainVideo.classList.remove("full")
      fullScreen.classList.remove("not-active")
      fullExit.classList.remove("active")
    }
  }

  function inputRange(input) {
    const value = input.value
    input.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
  }

  function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100 || 0
    progress.value = percent
    inputRange(progress)
  }

  function changeProgress() {
    video.currentTime = (this.value / 100) * video.duration
    if (video.currentTime < video.duration) {
      video.play()
    }
  }

  function changeVolume() {
    video.volume = this.value / 100
    if (video.volume <= 0.01) {
      video.muted = true
      buttonVolume.style.display = "none"
      buttonMute.style.display = "block"
    } else {
      video.muted = false
      buttonMute.style.display = "none"
      buttonVolume.style.display = "block"
    }
  }

  video.addEventListener("click", togglePlay)
  playIcon.addEventListener("click", togglePlay)
  buttonPlay.addEventListener("click", togglePlay)
  buttonPause.addEventListener("click", togglePlay)

  video.addEventListener("play", updateButton)
  video.addEventListener("pause", updateButton)
  buttonVolume.addEventListener("click", toggleMute)
  buttonMute.addEventListener("click", toggleMute)

  fullScreen.addEventListener("click", toggleFullScreen)
  fullExit.addEventListener("click", toggleFullScreen)
  document.addEventListener("fullscreenchange", updateIconFullScreen)

  video.addEventListener("timeupdate", handleProgress)
  progress.addEventListener("input", () => inputRange(progress))
  progress.addEventListener("input", changeProgress)

  volume.addEventListener("input", () => inputRange(volume))
  volume.addEventListener("input", changeVolume)

  Array.from(slides).forEach((item) =>
    item.addEventListener("click", () => {
      video.pause()
      const method = item.paused ? "play" : "pause"
      item[method]()
    })
  )
}
