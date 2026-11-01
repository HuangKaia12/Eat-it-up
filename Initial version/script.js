'use strict';
// Assets contain whole foods; all foods share the same HTML mask.
const foods = [
  {id:'cookie',name:'Chocolate Chip Cookie',src:'assets/foods/cookie.svg',alt:'A round chocolate chip cookie'},
  {id:'pizza',name:'Cheese Pizza',src:'assets/foods/pizza.svg',alt:'A round cheese pizza with tomato and basil'},
  {id:'pancake',name:'Butter Pancake',src:'assets/foods/pancake.svg',alt:'A round pancake with syrup and butter'}
];
let selectedFoodId = foods[0]?.id ?? null;
let bites = 0;
let imageStatus = 'loading';
let loadToken = 0;
const $ = id => document.getElementById(id);
const select = $('food-select');
for (const food of foods) {
  const option = document.createElement('option');
  option.value = food.id; option.textContent = food.name; select.append(option);
}
function render() {
  const food = foods.find(item => item.id === selectedFoodId);
  $('food-name').textContent = food?.name ?? 'No food available';
  $('eat').disabled = !food || imageStatus !== 'ready' || bites === 3;
  select.disabled = foods.length === 0;
  $('food-image').setAttribute('visibility', food && imageStatus === 'ready' && bites < 3 ? 'visible' : 'hidden');
  $('bite-one').setAttribute('visibility', bites >= 1 ? 'visible' : 'hidden');
  $('bite-two').setAttribute('visibility', bites >= 2 ? 'visible' : 'hidden');
  $('food-title').textContent = food ? `${food.alt}, ${bites}/3 bites eaten` : 'No food available';
  $('stage-note').hidden = !(food && imageStatus === 'ready' && bites === 3);
  $('progress').textContent = !food ? 'No food available' : imageStatus === 'loading' ? 'Loading food…' : imageStatus === 'error' ? 'Image could not load. Choose another food or check the asset path.' : `${bites}/3 bites eaten${bites === 3 ? ', all gone' : ''}`;
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
  // Use an independent preloader so stale requests cannot update the new food.
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
function eat() { if (imageStatus === 'ready' && bites < 3 && foods.some(f => f.id === selectedFoodId)) { bites += 1; render(); } }
function reset() { bites = 0; if (imageStatus === 'error') loadFood(); else render(); }
function selectFood() { selectedFoodId = select.value; bites = 0; loadFood(); }
$('eat').addEventListener('click', eat);
$('reset').addEventListener('click', reset);
select.addEventListener('change', selectFood);
loadFood();
