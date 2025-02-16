


function createChatMessage()
{
    // create a new div element
    const newDiv = document.createElement("div");

    // and give it some content
    const newContent = document.createTextNode("Hi there and greetings!");
    
    newDiv.classList.add("container");
    newDiv.classList.add("darker");
    
    const currentDiv = document.getElementById("scroll-container");

    // add the text node to the newly created div
    newDiv.appendChild(newContent);

    currentDiv.appendChild(newDiv);

    
    console.log(currentDiv);
    
}