
const url = "http://127.0.0.1:11434/api/generate";


let is_answering_question = false;
let last_question = "";

function query() {

    if (is_answering_question) {
        check_response()
        return
    } else {
        is_answering_question = true;
    }

    console.log("asking AI...")
    let prompt = document.getElementById('fname').value;
    last_question = prompt;
    createChatMessage(0, prompt)

    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            model: "llama3.2",
            prompt: `${prompt}. short guide, without markdown, without answer.`,
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
            createChatMessage(1, data.response)
        })
        .catch(function (err) {
            console.log("Fetch Error :-S", err);
        });
}

function check_response() {
    console.log("asking AI...")
    let prompt = document.getElementById('fname').value;
    createChatMessage(0, prompt)

    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            model: "llama3.2",
            prompt: `Is "${prompt}" the answer at the question "${last_question}" ? answer with Yes or No.`,
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
            console.log(data.response)
            createChatMessage(1, data.response)
        })
        .catch(function (err) {
            console.log("Fetch Error :-S", err);
        });
}

function createChatMessage(who, text)
{
    const currentDiv = document.getElementById("scroll-container");
    const prefab = document.getElementsByClassName("container")[0].cloneNode(true);

    // const newContent = document.createTextNode(text);
    
    // newDiv.classList.add("container");
    // if (who) newDiv.classList.add("darker");

    const newContent = document.getElementsByTagName("p")[0];
    newContent.textContent = "Test"
    
    
    

    


    currentDiv.appendChild(prefab);

    console.log(currentDiv);
    
}
