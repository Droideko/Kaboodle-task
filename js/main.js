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

const movieContainer = document.querySelector('.movie-container');
const movieContent = document.querySelector('.movie-container__content');
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
   const {title, year, poster, rank, likes_count, comments_count} = info;
   const container = document.createElement('div');
   container.classList.add('slider__block');
   const [myTitle, myMovie, myActions]  = [createTitle(title, year), createMovie(poster, title), createActions(comments_count, rank, likes_count)];
   [myTitle,  myMovie, myActions].forEach(item => container.append(item));
   // console.log(info);
   return container;
}

function createTitle(name, year){
   const title = document.createElement('h5');
   const data = [name, '<br/>', year];
   data.forEach(item => title.innerHTML += item);
   title.classList.add('slider__block-title');
   return title;
}

function createMovie(link, alt){
   const posterContainer = document.createElement('div');
   posterContainer.classList.add('slider__block-poster')
   const posterImage = document.createElement('img');
   [posterImage.src, posterImage.alt] = [link, alt];
   posterImage.classList.add('slider__block-image')
   let buttons = ['play', 'more', 'reload'];
   buttons = buttons.map(name => {
      const btn = document.createElement('div');
      btn.classList.add(`slider__block-${name}`);
      const buttonImg = document.createElement('img');
      buttonImg.src = `../svg/${name}-button.svg`;
      btn.append(buttonImg);

      if (name === 'play'){
         const link = 'https://www.youtube.com/embed/LM0sZZ1xFDs';
         btn.addEventListener('click', () => {
            movieContainer.style.display = 'block';
            if (movieContent.firstChild){
               movieContent.removeChild(movieContent.firstChild);
            }
            const movie = document.createElement('iframe');
            movie.classList.add('movie-container__movie');
            movie.src = link;
            movie.frameBorder = 0;
            movieContent.append(movie);
            document.getElementById('close').addEventListener('click', () => {
               movieContainer.classList.add('animBack');
               setTimeout(() => {
                  movieContainer.style.display = 'none';
                  movie.remove();
                  movieContainer.classList.remove('animBack');
               },1000);               
            });        
         });
      }
      return btn;
   }); 
   posterContainer.append(posterImage);
   buttons.forEach(item => posterContainer.append(item));
   return posterContainer;
}

function createActions(comments, ranks, likes){
   const actionsContainer = document.createElement('div');
   actionsContainer.classList.add('slider__actions');
   let actionsButtons = ['share', 'comment', 'rank', 'like'];
   actionsButtons = actionsButtons.map(name => {
      const [block, count, img] = ['div', 'p', 'img'].map(item => document.createElement(item));
      block.classList.add('slider__actions-block');
      switch(name){
         case "share": {
            count.textContent = '';    
            img.src = `../svg/products/actions/${name}.svg`       
         } break;
         case "comment": {
            count.textContent = comments || 0;  
            img.src = `../svg/products/actions/${name}.svg`
         } break;
         case "rank": {
            count.textContent = ranks || 0;  
            img.src = `../svg/products/actions/${name}.svg`
         } break;
         case "like": {
            count.textContent = likes || 0;  
            img.src = `../svg/products/actions/${name}.svg`
         } break;
         default: count.textContent = '';  
      }
      [count, img].forEach(item => block.append(item));   
      return block;
   });
   actionsButtons.forEach(item => actionsContainer.append(item));
   return actionsContainer;
}

//  Coming soon buttons

const buttonsSoon = document.querySelectorAll('.soon-item');
let activeButton;
[...buttonsSoon].forEach(btn => {
   if (btn.classList.contains('navigation-item_active')){
      activeButton = btn;
   }
   btn.addEventListener('click', e => {
      e.preventDefault();
      const li = e.currentTarget;
      if (li.classList.contains('navigation-item_active')){
         return;
      }
      activeButton.classList.remove('navigation-item_active');
      activeButton = li;
      li.classList.add('navigation-item_active');
   });
});

//  Most popular buttons

const buttonsPopular = document.querySelectorAll('.popular-item');
let activeButtonPopular;
[...buttonsPopular].forEach(btn => {
   if (btn.classList.contains('navigation-item_active')){
      activeButtonPopular = btn;
   }
   btn.addEventListener('click', e => {
      e.preventDefault();
      const li = e.currentTarget;
      if (li.classList.contains('navigation-item_active')){
         return;
      }
      activeButtonPopular.classList.remove('navigation-item_active');
      activeButtonPopular = li;
      li.classList.add('navigation-item_active');
   });
});





