function magnifier(fullImage, magnifiedImage) 
{

    let image = document.getElementById(fullImage);
    let result = document.getElementById(magnifiedImage);
    let ratioX
    let ratioY;

    // Variabile pentru modificare lupei
    const scale = 5;
    let width = 100;
    let height = 120;
    let lens = document.createElement("DIV");

    lens.setAttribute("class", "magnifier-lens");
   
    image.parentElement.insertBefore(lens, image);
    
    lens.style.backgroundImage = "url('" + image.src + "')";
    lens.style.backgroundRepeat = "no-repeat";
    lens.style.backgroundSize = image.width + "px " + image.height + "px";

    // Evenimente pentru miscarea mouse-ului
    lens.addEventListener('mousemove', moveLens);
    image.addEventListener('mousemove', moveLens);
    image.addEventListener('wheel', function(){
        result.style.backgroundImage = "";
        zoom(event);
        moveLens();

    });

    for (let i = 0; i < thumbnail.length; i++)
    {
        thumbnail[i].addEventListener('click', function(){
            
        lens.remove();
        result.style.backgroundImage = "";
        
        });
    }

    window.addEventListener('resize', function(){
        lens.remove();
    });

    // Functie pentru marirea si micsorarea lupei
    function zoom(event) 
    {

        let delta = Math.sign(event.deltaY);

        if (delta > 0)
        {
            if (width <= 240)
            width += scale;

            if (height <= 260)
                height += scale;
        }

        if (delta < 0)
        {
            if (width >= 40)
                width -= scale;

            if (height >= 60)
                height -= scale;
        }


        lens.style.width = width + "px";
        lens.style.height = height + "px";
    }

    // Functie pentru miscarea lupei
    function moveLens(event) 
    {
        ratioX = result.offsetWidth / lens.offsetWidth;
        ratioY = result.offsetHeight / lens.offsetHeight;
        result.style.backgroundImage = "url('" + image.src + "')";
        result.style.backgroundSize = (image.width * ratioX) + "px " + (image.height * ratioY) + "px";
        
        // Determinarea pozitiei cursorului
        let position = getCursorPos(event);
        
        // Determinarea pozitiei lupei
        let x = position.x - (lens.offsetWidth / 2);
        let y = position.y - (lens.offsetHeight / 2);
        
        // Limitam aria de deplasare a lupei
        if (x > image.width - lens.offsetWidth) 
            x = image.width - lens.offsetWidth;
        if (x < 0) 
            x = 0;
        if (y > image.height - lens.offsetHeight) 
            y = image.height - lens.offsetHeight;
        if (y < 0) 
            y = 0;
        
        // Setarea pozitiei lupei
        lens.style.left = x + "px";
        lens.style.top = y + "px";
        
        // Afisarea rezultatului
        result.style.backgroundPosition = "-" + (x * ratioX) + "px -" + (y * ratioY) + "px";

        // Setarea background-ului pentru lupa
        lens.style.backgroundPosition = "-" + x + "px -" + y + "px";

    }

    // Functie pentru determinarea pozitiei cursorului
    function getCursorPos(event) 
    {
        var x = 0;
        let y = 0;
        event = event || window.event;

        x = event.offsetX;
        y = event.offsetY;

        return {x : x, y : y};
    }

}