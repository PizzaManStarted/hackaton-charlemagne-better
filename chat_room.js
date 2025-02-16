


function createChatMessage()
{
    const currentDiv = document.getElementById("scroll-container");
    const prefab = document.getElementsByClassName("container")[0].cloneNode(true);

    // and give it some content
    const newContent = document.getElementsByTagName("p")[0];
    newContent.textContent = "Test"
    
    
    
    


    currentDiv.appendChild(prefab);

    
    console.log(currentDiv);
    
}