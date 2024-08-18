'use strict'

// Scroll onClick + smooth -----------------------------------------

document.addEventListener('click', documentActions);

function documentActions(e) {
    const targetElement = e.target;

    // open menu------------------------

    if(targetElement.closest('.icon-menu')) {
        document.documentElement.classList.toggle('menu-open');
    }

    // ------------------------------------------

    if(targetElement.closest('[data-goto]')) {
        const goTo = targetElement.closest('[data-goto]').dataset.goto;
        const goToElement = document.querySelector(goTo);
        const headerHeight = document.querySelector('.header').offsetHeight;
        document.documentElement.classList.remove('menu-open');

        if(goToElement) {
            window.scrollTo({
                top: goToElement.offsetTop - (headerHeight),
                behavior:'smooth'
            })
        }
        e.preventDefault();
    }
}

// data-goto = '.className' inside tag 'a'

// Creating elment menu-buttons ------------------------------------
// Simple create element nav----------------------------------------

const getList = document.querySelector('.nav__list');
const arrHtml = `
            <div class = 'header__btns--visible'>
                <a href="#" class="header__btn">Sign in</a>
                <a href="#" class="header__btn header__btn--green">Start Trial</a>
            </div>
            `

function addButtons () {
    if (window.innerWidth <= 395) {
        getList.insertAdjacentHTML('beforeend', arrHtml);
        let visibleButton = document.querySelector('.header__btns--visible');

    } else {
        getList.insertAdjacentHTML('beforeend', '');
    } 
}
addButtons()

// Video-player settings ----------------------------------------
// Add Buttons --------------------------------------------------
const player = document.querySelector(".success__player");
const video = document.querySelector(".success__video");
const toggleButton = document.querySelector(".controls__button");
let playBtn = `<img src="./src/img/play.svg" alt="Play" class="controls__play">`
let pauseBtn = `<img src="./src/img/pause.svg" alt="Pause" class="controls__play controls__play--pause">`
function togglePlay() {
  if (video.paused || video.ended) {
    video.play();
    player.style.boxShadow = '0px 0px 0px 2px rgba(255,255,255,0.5)';
  } else {  
    video.pause();
    player.style.boxShadow = 'none';
  }
}
function updateToggleButton() {
  toggleButton.innerHTML = video.paused ? playBtn : pauseBtn;
}
toggleButton.addEventListener("click", togglePlay);
video.addEventListener("load", updateToggleButton);
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateToggleButton);
video.addEventListener("pause", updateToggleButton);
video.addEventListener("mouseon", updateToggleButton);
// Add ProgressBar --------------------------------------------
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");

function handleProgress() {
    const progressPercentage = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${progressPercentage}%`;
  }
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
video.addEventListener("timeupdate", handleProgress);
// Control progressBar ----------------------------------------
progress.addEventListener("click", scrub);
let mousedown = false;
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mouseup", () => (mousedown = false));
// Volume control inputs --------------------------------------
const slider = document.querySelector(".volume__slider");

function handleSliderUpdate() {
    video[this.name] = this.value;
  }
slider.addEventListener("change", handleSliderUpdate);
// Open full size screen --------------------------------------

document.addEventListener('click', fullScreenPlayer);

function fullScreenPlayer (e) {
  let targetElementPlayer = e.target;
  // Open player ---------------------------------------------
  if(targetElementPlayer.closest('.size-btn')) {
    document.documentElement.classList.toggle('size-btn--full');
  }
}

// Skip buttons mobile ----------------------------------------
// const skipBtns = document.querySelectorAll("[data-skip]");
// function handleSkip() {
//     video.currentTime += +this.dataset.skip;
//   }
//   skipBtns.forEach((btn) => {
//     btn.addEventListener("dblclick", handleSkip);
//     btn.addEventListener("mousedown", function (){
//         btn.style.opacity = '1';
//     })
//     btn.addEventListener("mouseup", function (){
//         btn.style.opacity = '0';
//     })
//   });
// Controls Keys ----------------------------------------------
document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        togglePlay();
        e.preventDefault()
    };
  });

// Create animations fullpage ----------------------------------------------------------------------

window.addEventListener('scroll', animationOnScroll)
window.addEventListener('load', animationOnScroll)

function animationOnScroll() {
  let gotElements = document.querySelectorAll('.page section').forEach((e) => {
    let element = e.dataset.show; 
    const visibleStep = 300;   
    if(element === 'banner') {
        let currentEl = e;        
        let bannerContent = document.querySelector('.banner__content');
        currentEl.offsetHeight >= scrollY ? bannerContent.classList.add('left') : bannerContent.classList.remove('left');     
    } 
    if(element === 'steps') {
      let currentEl = e;
      let title = document.querySelector('.steps__title');
      let textRight = document.querySelector('.steps__text');
      currentEl.offsetTop <= scrollY + visibleStep ? title.classList.add('left') : title.classList.remove('left');
      currentEl.offsetTop <= scrollY + visibleStep ? textRight.classList.add('right') : textRight.classList.remove('right');
      let cardItem = document.querySelector('.cards__item');
      currentEl.offsetTop <= scrollY ? cardItem.classList.add('left') : null;
      let cardItemCentr = document.querySelector('.cards__item--centered');
      currentEl.offsetTop <= scrollY ? cardItemCentr.classList.add('bottom') : null;
      let cardItemThird = document.querySelector('.cards__item--third');
      currentEl.offsetTop <= scrollY ? cardItemThird.classList.add('right') : null;
  } 
  if (element === 'success') {
    let currentEl = e;
    let succesText = document.querySelector('.success__content');
    let video = document.querySelector('.success__player');
    currentEl.offsetTop <= scrollY + visibleStep ? succesText.classList.add('left') : succesText.classList.remove('left');
    currentEl.offsetTop <= scrollY + visibleStep ? video.style.opacity = '1' : null;
  }
  if (element === 'costomise') {
    let currentEl = e;
    let costomiseText = document.querySelector('.costomise__content');
    let cvItem = document.querySelector('.cv');
    let costomiseImg = document.querySelector('.costomise__img')
    currentEl.offsetTop <= scrollY + visibleStep ? costomiseText.classList.add('right') : costomiseText.classList.remove('right');
    currentEl.offsetTop <= scrollY + visibleStep ? costomiseImg.style.opacity = '1' : costomiseImg.style.opacity = '0';
    currentEl.offsetTop <= scrollY + visibleStep ? cvItem.style.transform = 'scale(1)' : cvItem.style.transform = 'scale(0)';
  }
  });
}


// Create form -----------------------------------------------------

const wrapper = document.querySelector('.wrapper');

function showForm (e) {
  const currentBtn = e.target;
  if (currentBtn.closest(`[class*='--green']`)) {
    const form = `
            <div class="form-block">
            <form class="form">
                <div class ="form__close">×</div>
                <input placeholder="Name" class="form__input name" required type="name">
                <input placeholder="E-mail" class="form__input email" required type="email">
                <input placeholder="Phone" class="form__input number" required type="tel">
                <textarea placeholder="Message" rows="3" name="text" class="form__textarea message"></textarea>
                <div class="form__buttons">
                    <button class="form__buttons-btn submit">Submit</button>
                </div>
            </form>
        </div>   
`     
    wrapper.insertAdjacentHTML('beforebegin', form)
    const formEl = document.querySelector('.form-block');
    if (formEl) {
      function deleteForm (e) {
        let closeBtn = e.target;
        if(closeBtn.closest('.form__close'))
        formEl.remove()
      }
      document.addEventListener('click',deleteForm);
    }
  }
  // e.preventDefault()
}
document.addEventListener('click',showForm);


