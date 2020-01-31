// Slider 

const slider = document.querySelector('.slider-inner');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
   isDown = true;
   slider.classList.add('slider-inner_active');
   startX = e.pageX - slider.offsetLeft;
   scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseup', () => {
   isDown = false;   
   slider.classList.remove('slider-inner_active');
});

slider.addEventListener('mousemove', (e) => {
   if (!isDown) return;
   e.preventDefault();
   const x = e.pageX - slider.offsetLeft;
   const walk = x - startX;
   slider.scrollLeft = scrollLeft - walk;
});

slider.addEventListener('mouseleave', () => {
   isDown = false;
   slider.classList.remove('slider-inner_active');   
});

// import data.json


const url = `https://api.myjson.com/bins/p2dnz`;
async function getData(url){
   try {
      const response = await fetch(url);
      return await response.json();
   } catch(err){
      alert(err);
   }
}
getData(url).then(data => {
   data.forEach(item => {
      const element = createElement(item);
      slider.append(element);      
   });
}).then(() => {
   const widthSlider = slider.scrollWidth;
   const screenWidth = window.innerWidth;
   slider.scrollLeft = widthSlider/2 - screenWidth/2;
});

function createElement(info){
   const {title, year, poster} = info;
   const container = document.createElement('div');
   container.classList.add('slider__block');
   const [myTitle, myYear, myMovie]  = [createTitle(title), createYear(year), createMovie(poster, title)];
   [myTitle, myYear, myMovie].forEach(item => container.append(item))
   // console.log(info)



   return container;
}

function createTitle(text){
   const title = document.createElement('h5');
   title.textContent = text;
   title.classList.add('slider__block-title');
   return title;
}

function createYear(text){
   const year = document.createElement('p');
   year.textContent = text;
   year.classList.add('slider__block-year');
   return year;
}

function createMovie(link, alt){
   const posterContainer = document.createElement('div');
   posterContainer.classList.add('slider__block-poster')
   const posterImage = document.createElement('img');
   posterImage.src = link;
   posterImage.alt = alt;
   posterImage.classList.add('slider__block-image')
   let buttons = ['play', 'more', 'reload'];
   buttons = buttons.map(name => {
      const btn = document.createElement('div');
      btn.classList.add(`slider__block-${name}`);
      return btn;
   });
   posterContainer.append(posterImage);
   buttons.forEach(item => posterContainer.append(item));
   return posterContainer;
}