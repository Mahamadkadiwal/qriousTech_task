'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

  
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');

let curSlide = 0;
let maxSlide = slides.length;

// slider.style.transform = 'scale(0.4) translateX(-800px)';
// slider.style.overflow = 'visible';

const gotoSlide = function (slide){
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
}
gotoSlide(0);

const nextSlide = function(){
  if(curSlide === maxSlide-1){
    curSlide = 0;
  } else{
    curSlide++;
  } 

  gotoSlide(curSlide);
}

const previousSlide = function(){
  if(curSlide === 0){
    curSlide = maxSlide;
  } else{
    curSlide--;
  }
  gotoSlide(curSlide);
}

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', previousSlide);

document.addEventListener('keydown', function(e){
  if(e.key === 'ArrowLeft') previousSlide();
  e.key === 'ArrowRight' && nextSlide();
})