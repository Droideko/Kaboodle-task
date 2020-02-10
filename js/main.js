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

// Vertical slider

const verticalSlider = document.querySelector('.vertical-inner');
let isDownVertical = false;
let startY;
let scrollTop;

verticalSlider.addEventListener('mousedown', (e) => {
   isDownVertical = true;
   startY = e.pageY - verticalSlider.offsetTop;
   scrollTop = verticalSlider.scrollTop;
});

verticalSlider.addEventListener('mouseup', () => {
   isDownVertical = false;   
});

verticalSlider.addEventListener('mousemove', (e) => {
   if (!isDownVertical) return;
   e.preventDefault();
   const y = e.pageY - verticalSlider.offsetTop;
   const walk = y - startY;
   verticalSlider.scrollTop = scrollTop - walk;
});
verticalSlider.addEventListener('mouseleave', () => {
   isDown = false; 
});

// import data.json 'Coming soon'

const movieContainer = document.querySelector('.movie-container');
const movieContent = document.querySelector('.movie-container__content');
const urlSoon = `https://api.myjson.com/bins/p2dnz`;
async function getDataSoon(url){
   try {
      const response = await fetch(url);
      return await response.json();
   } catch(err){
      alert(err);
   }
}
getDataSoon(urlSoon).then(data => {
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
   const {title, year, poster, likes_count, comments_count} = info;
   let {rank} = info;
   if (!rank) rank = info.expectations_count || 0;
   const container = document.createElement('div');
   container.classList.add('slider__block');
   const [myTitle, myMovie, myActions] = 
      [
         createTitle(title, year), 
         createMovie(poster, title), 
         createActions(comments_count, rank, likes_count)
      ];
   [myTitle,  myMovie, myActions].forEach(item => container.append(item));
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
   posterContainer.classList.add('slider__block-poster');
   const posterImage = document.createElement('img');
   [posterImage.src, posterImage.alt] = [link, alt];
   posterImage.classList.add('slider__block-image');
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

//  Coming soon buttons & Most popular buttons

const [buttonsSoon, buttonsPopular] = [document.querySelectorAll('.soon-item'), document.querySelectorAll('.popular-item')];
[buttonsSoon, buttonsPopular].forEach(buttons => activeButtons(buttons));

function activeButtons(buttons){
   let activeButton;
   [...buttons].forEach(btn => {
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
}

// import data.json 'Most popular'

const popularContainer = document.querySelector('.vertical-inner');
const urlPopular = `https://api.myjson.com/bins/p2dnz`;
async function getDataPopular(url){
   try {
      const response = await fetch(url);
      return await response.json();
   } catch(err){
      alert(err);
   }
}
getDataPopular(urlPopular).then(data => {
   data.forEach(item => {
      const element = createElementPopular(item);
      popularContainer.append(element);
   });
});

function createElementPopular(info){
   const {title, year, poster, likes_count, comments_count, director, writer, content} = info;
   let {rank} = info;
   if (!rank) rank = info.expectations_count || 0;
   const container = document.createElement('div');
   container.classList.add('vertical-container');
   const block = document.createElement('div');
   block.classList.add('vertical-container__block');
   const [myPoster, myGrade, myPopularInfo] = 
      [
         createPoster(poster, title), 
         createGrade(rank), 
         createPopularInfo(title, year, director, writer, content, likes_count, rank, comments_count)
      ];
   [myPoster, myGrade, myPopularInfo].forEach(item => block.append(item));
   container.append(block);
   return container;
}

function createPoster(link, alt){
   const posterContainer = document.createElement('div');
   posterContainer.classList.add('vertical-container__poster');
   const posterImage = document.createElement('img');
   [posterImage.src, posterImage.alt] = [link, alt];
   posterImage.classList.add('vertical-container__image');
   const playButton = document.createElement('div');
   playButton.classList.add('vertical-container__play');
   const buttonImg = document.createElement('img');
   [buttonImg.src, buttonImg.alt]  = [`../svg/play-button.svg`, `play`];
   playButton.append(buttonImg);
   posterContainer.append(posterImage);
   posterContainer.append(playButton);
   return posterContainer;
}

function createGrade(rank){
   const rankContainer = document.createElement('div');
   rankContainer.classList.add('vertical-container__rank');
   const svg = document.createElement('object');   
   svg.data = '../svg/circle.svg';
   svg.type = 'image/svg+xml';
   const text = document.createElement('p');
   text.textContent = rank;
   [svg, text].forEach(item => rankContainer.append(item));
   return rankContainer;
}

function createPopularInfo(title, year, director, writer, content, likes, rank, comments){
   const movieContainer = document.createElement('div');
   movieContainer.classList.add('vertical-container__inner');

   const movieTitle = document.createElement('h3');
   movieTitle.classList.add('vertical-container__title');
   movieTitle.textContent = title;

   const movieInfo = document.createElement('h4');
   movieInfo.classList.add('vertical-container__info');
   movieInfo.textContent = `${year} | Director: ${director} | Writer: ${writer}`;

   const movieText = document.createElement('p');
   movieText.classList.add('vertical-container__text');
   movieText.textContent = content;

   const actions = createActions(comments, rank, likes);

   const movieRead = document.createElement('a');
   movieRead.href = '#';
   movieRead.classList.add('vertical-container__link');
   movieRead.textContent = `Read more`;

   [movieTitle, movieInfo, movieText, actions, movieRead].forEach(item => {
      movieContainer.append(item);     
   });
   return movieContainer;

   function createActions(comments, ranks, likes){
      const actionsContainer = document.createElement('ul');
      actionsContainer.classList.add('vertical-container__actions');
      let actionsButtons = ['share', 'comment', 'rank', 'like'];
      actionsButtons = actionsButtons.map(name => {
         const [block, count, img] = ['li', 'p', 'img'].map(item => document.createElement(item));
         block.classList.add('vertical-container__actions-block');
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
}


