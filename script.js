'use strict';
// Whole food assets share one mask.
const foods = [
  {id:'cookie',name:'Cookie',src:'assets/foods/cookie.svg',alt:'Chocolate chip cookie'},
  {id:'pizza',name:'Pizza',src:'assets/foods/pizza.svg',alt:'Cheese pizza with tomato and basil'},
  {id:'pancake',name:'Pancake',src:'assets/foods/pancake.svg',alt:'Pancake with syrup and butter'}
];
let selectedFoodId = foods[0]?.id ?? null;
let bites = 0;
let eatenCount = 0;
let imageStatus = 'loading';
let loadToken = 0;
// A small pool lets rapid bites overlap without cutting off the previous crunch.
let biteSounds = [];
let soundIndex = 0;
try {
  biteSounds = Array.from({length: 3}, () => {
    const sound = new Audio('assets/audio/bite.wav');
    sound.preload = 'auto';
    sound.volume = 0.65;
    return sound;
  });
} catch (_) { /* Food interaction also works without audio support. */ }
function playBite() {
  if (!biteSounds.length) return;
  try {
    const sound = biteSounds[soundIndex++ % biteSounds.length];
    sound.currentTime = 0;
    const playing = sound.play();
    if (playing && typeof playing.catch === 'function') playing.catch(() => {});
  } catch (_) { /* Missing or blocked audio must not interrupt the interaction. */ }
}
const $ = id => document.getElementById(id);
const select = $('food-select');
for (const food of foods) {
  const option = document.createElement('option');
  option.value = food.id; option.textContent = food.name; select.append(option);
}
function render() {
  const food = foods.find(item => item.id === selectedFoodId);
  const counterText = `Eaten: ${eatenCount}`;
  if ($('eaten-count').textContent !== counterText) $('eaten-count').textContent = counterText;
  $('food-name').textContent = food?.name ?? 'No food available';
  $('eat').disabled = !food || imageStatus !== 'ready' || bites === 3;
  select.disabled = foods.length === 0;
  $('food-image').setAttribute('visibility', food && imageStatus === 'ready' && bites < 3 ? 'visible' : 'hidden');
  $('bite-one').setAttribute('visibility', bites >= 1 ? 'visible' : 'hidden');
  $('bite-two').setAttribute('visibility', bites >= 2 ? 'visible' : 'hidden');
  $('food-title').textContent = food ? `${food.alt}, ${bites} of 3 bites` : 'No food available';
  $('stage-note').hidden = !(food && imageStatus === 'ready' && bites === 3);
  $('progress').textContent = !food ? 'No food available' : imageStatus === 'loading' ? 'Loading…' : imageStatus === 'error' ? 'Image unavailable. Reset or choose another food.' : `${bites} / 3${bites === 3 ? ' — Done' : ''}`;
}
function loadFood() {
  const token = ++loadToken;
  const food = foods.find(item => item.id === selectedFoodId);
  imageStatus = 'loading';
  const image = $('food-image');
  image.onload = null; image.onerror = null;
  image.removeAttribute('href');
  render();
  if (!food) return;
  // Ignore stale image requests.
  const loader = new Image();
  loader.onload = () => {
    if (token !== loadToken) return;
    image.onload = () => { if (token === loadToken) { imageStatus = 'ready'; render(); } };
    image.onerror = () => { if (token === loadToken) { imageStatus = 'error'; render(); } };
    image.setAttribute('href', food.src);
  };
  loader.onerror = () => { if (token === loadToken) { imageStatus = 'error'; render(); } };
  loader.src = food.src;
}
function eat() {
  if (imageStatus !== 'ready' || bites >= 3 || !foods.some(f => f.id === selectedFoodId)) return;
  bites += 1;
  if (bites === 3) eatenCount += 1;
  render();
  playBite();
}
function reset() { bites = 0; if (imageStatus === 'error') loadFood(); else render(); }
function selectFood() { selectedFoodId = select.value; bites = 0; loadFood(); }
$('eat').addEventListener('click', eat);
$('reset').addEventListener('click', reset);
select.addEventListener('change', selectFood);
loadFood();

