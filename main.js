let fullImage = document.querySelector('#full-image');
let magnifiedImage = document.querySelector('.magnified-image');
let prevSlide = document.querySelector('.fa-chevron-left');
let nextSlide = document.querySelector('.fa-chevron-right');
let sliderContainer = document.querySelector("#slider-container");
let thumbnail = document.querySelectorAll('.slider-item');
let caption = document.querySelector('#caption-text');

let thumbnailWidth;
let currentIndex = parseInt(thumbnail.length / 2 - 1);
let currentImage = 1;
let direction = 0;
const time = 3000;

// Afisarea imaginilor in ordinea initiala
thumbnail.forEach(function(element, index) {
			   
    element.style.order = index + 1;
});

// Afisarea primului slide
showSlide(currentIndex);
magnifier("full-image", "magnified-image");

// Evenimente
for (let i = 0; i < thumbnail.length; i++)
{
    thumbnail[i].addEventListener("click", function(){
        console.log("index-curent: " + (currentIndex + 1));
        console.log("ordinea " + this.style.order);
        if (this.style.order > thumbnail[currentIndex].style.order)
            direction = 1;
        
        if (this.style.order < thumbnail[currentIndex].style.order)
            direction = -1;
        
        console.log("Directia: " + direction)
        currentIndex = i;
        getDistance();
        showSlide(currentIndex);
        
        magnifier("full-image", "magnified-image");
       
    });
}

window.addEventListener('resize', function(){
    magnifier("full-image", "magnified-image");
});

sliderContainer.addEventListener('transitionend', () => {
    changeOrder();
});


// Functie pentru a schimba ordinea imaginilor
function changeOrder() 
{

    currentImage += direction;

    if(currentImage == thumbnail.length + 1)
    currentImage = 1;

    if (currentImage == 0)
    currentImage = thumbnail.length;
    
    console.log(currentImage)

    let order = 1;

    for(let i = currentImage; i <= thumbnail.length; i++) 
    {
        
        document.querySelector(".slider-item[data-position='" + i + "']").style.order = order;
        order++;
    }

    for(let i = 1; i < currentImage; i++) 
    {
        document.querySelector(".slider-item[data-position='" + i + "']").style.order = order;
        order++;
    }

    sliderContainer.classList.remove('slider-container-transition');
    sliderContainer.style.transform = 'translateY(0)';
}

// Functie pentru determinarea distantei pana la margine
function getDistance()
{
    thumbnailWidth = document.getElementById('slider-container').getBoundingClientRect();
    let currentThumb = thumbnail[currentIndex].getBoundingClientRect();
    let distance;

    if (direction == 1)
    {
        distance = parseInt((thumbnailWidth.height - currentThumb.top) * 100 / thumbnailWidth.height);
    }

    if (direction == -1)
    {
        distance = parseInt(currentThumb.bottom * 100 / thumbnailWidth.height);
    }
    console.log("Distanta: " + distance);
    if (distance <= 25)
        moveSlide(direction);
    
    

}

// Functie pentru afisarea slide-ului ales
function showSlide(newIndex)
{

    if (newIndex > thumbnail.length - 1)
    {
        currentIndex = 0;
    }

    if (newIndex < 0)
    {
        currentIndex = thumbnail.length - 1;
    }

    for (let i = 0; i < thumbnail.length; i++) 
    {
        thumbnail[i].className = thumbnail[i].className.replace(" active", "");
    }
    thumbnail[currentIndex].className += " active";
    

    fullImage.src = "images/img_" + currentIndex + ".jpg";
}

// Functie pentru miscarea slide-ului
function moveSlide(direction)
{
    sliderContainer.classList.add('slider-container-transition');
	sliderContainer.style.transform = `translateY(${-25 * direction}%)`;
}