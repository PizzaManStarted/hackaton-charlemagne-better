

let boxes = [];

async function query() {

    console.log("asking AI...")
    let prompt = document.getElementById('fname').value;
    boxes.push([0, prompt]);
    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            model: "llama3.2",
            prompt: `${prompt}. short answer`,
            stream: false,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            boxes.push([1, data.response]);
            
        })
        .catch(function (err) {
            console.log("Fetch Error :-S", err);
        });
}

function display() {

    const cells = boxes.map(e => {
        if (e[0]) {

        } else {

        }
    });

    document.body.getElementsById("").innerHTML = cells;
}

function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}

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
