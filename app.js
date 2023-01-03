const prizes = ['holiday','migros','setcard','starbucks','watsons','holiday','migros','setcard','starbucks','watsons','holiday','migros','setcard','starbucks','watsons','holiday','migros','setcard','starbucks','watsons','holiday','migros','setcard','starbucks','watsons'];
const columns = document.querySelectorAll('[data-column]');
const slots = document.querySelector('[data-slots]');
const spinButton = document.querySelector('[spin-button]');
const popupOverlay = document.querySelector('[data-overlay]');
const popupContainer = document.querySelector('[data-popup-container]');
const popupContent = document.querySelector('[data-popup-content]');
const popupTitle = document.querySelector('[data-popup-title]');
const closeButton = document.querySelector('[close-button]');
const tryAgainButton = document.querySelector('[try-again-button]');

const setcardPrize = '70₺ SETCARD'
const starbucksPrize = '100₺ STARBUCKS HEDİYE ÇEKİ'
const migrosPrize = '120₺ MİGROS HEDİYE ÇEKİ'
const watsonsPrize = '150₺ WATSONS HEDİYE ÇEKİ'
const holidatPrize = 'KAFA İZNİ'

const spinningSound = new Audio('/sounds/spinning-sound.wav');
const winningSound = new Audio('/sounds/winning-sound.wav');
const hugeWinningSound = new Audio('/sounds/huge-winning-sound.wav');
const disappointmentSound = new Audio('/sounds/disappointment-sound.mp3');

const createPrizes = () => {
  columns.forEach(column => {
    let shuffledPrizes = prizes.sort((a, b) => 0.5 - Math.random());
  
    for (let i = 0; i < shuffledPrizes.length; i++) {
      let img = document.createElement('img');
      
      img.classList.add('row');
      img.src = `/images/${shuffledPrizes[i]}-logo.png`;
      img.alt = shuffledPrizes[i];
  
      column.insertAdjacentElement('afterbegin', img);
    }
  })
}

const reCreate = () => {
  columns.forEach(column => column.innerHTML = '');
  popupOverlay.classList.remove('-open');
  tryAgainButton.classList.remove('-show');
  spinButton.removeAttribute('disabled');
  slots.classList.toggle('spinning', false);
  createPrizes();
}

const spin = (elem) => {
  elem.setAttribute('disabled', true);
  slots.classList.toggle('spinning', true);

  setTimeout(() => {
    spinningSound.play();  
  }, 500);
  
  let results = [];
  columns.forEach(column => results.push(column.children[23].alt));

  let count = {};
  results.forEach(function(i) { count[i] = (count[i]||0) + 1;});

  let numberOfElement = Object.values(count);

  count = Object.entries(count).sort((a,b) => b[1]-a[1]);

  let prize = ''
  if (count[0][0] == "setcard") prize = setcardPrize;
  if (count[0][0] == "starbucks") prize = starbucksPrize;
  if (count[0][0] == "migros") prize = migrosPrize;
  if (count[0][0] == "watsons") prize = watsonsPrize;
  if (count[0][0] == "holiday") prize = holidatPrize;

  setTimeout(() => {
    if (numberOfElement.includes(3)) {
      popupOverlay.classList.add('-open');
      popupTitle.innerHTML = "TEBRİKLER!";
      popupContent.innerHTML = `2X ${prize} kazandınız`;
      hugeWinningSound.play();  
    } else if (numberOfElement.includes(2)) {
      popupOverlay.classList.add('-open');
      popupTitle.innerHTML = "TEBRİKLER!";
      popupContent.innerHTML = `${prize} kazandınız`;
      winningSound.play();  
    } else {
      popupOverlay.classList.add('-open');
      popupTitle.innerHTML = "NANAY!";
      popupContent.innerHTML = `☹️ Çok iyi biri olursanız tekrar denemenize müsade ederim`;
      disappointmentSound.play();  
      setTimeout(() => {
        tryAgainButton.classList.add('-show');
      }, 2000);
    }
  }, 4000);
}

const closePopup = (e) => {
  if (e.srcElement == popupOverlay || e.srcElement == closeButton);
    popupOverlay.classList.remove('-open');
}

popupOverlay.addEventListener('click', closePopup);
tryAgainButton.addEventListener('click', reCreate);

window.onload = function () {
	createPrizes();
};
