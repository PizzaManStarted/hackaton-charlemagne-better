function openNav() 
{
    document.getElementById("side_window_nav").style.width = "100vh";
    
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() 
{
    document.getElementById("side_window_nav").style.width = "0px";
    
    document.body.style.backgroundColor = "rgba(0,0,0,0)";
}