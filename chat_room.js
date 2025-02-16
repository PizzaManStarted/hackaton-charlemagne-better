
const url = "http://127.0.0.1:11434/api/generate";

const persona = "You are a teacher whose goal is to explain each steps and submit small excercices to find the solution of the question that was given by your student. For learning purpose you don't give any response, only tips. After each steps, end with an exercice if possible to check his understanding and then wait a input : the answer of the exercice or 'next' if there is no exercice. If the answer is wrong try to explain the last step differently. Here is the question of your student :"
let chat = [[0, persona]];

function query() {

    let prompt = document.getElementById('fname').value;
    chat.push([0, prompt]);
    createChatMessage(0, prompt)

    console.log(chat.map(x => (x[0] ? "IA :":"User : ") + x[1]).join("\n\n"))
    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            model: "llama3.2",
            prompt: chat.map(x => (x[0] ? "IA :":"User : ") + x[1]).join("\n\n"),
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
            chat.push([1, data.response]);
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

    console.log(text)

    const newDiv = document.createElement("div");

    sentences = text.split("\n")
    sentences.forEach(s => {
        newDiv.appendChild(document.createTextNode(s));
        newDiv.appendChild(document.createElement("br"));
    });
    
    newDiv.classList.add("container");
    if (who) {
        newDiv.classList.add("darker");
        newDiv.classList.add("left");
    } else {
        newDiv.classList.add("right");
    }
    
    const currentDiv = document.getElementById("scroll-container");
    // add the text node to the newly created div
    currentDiv.appendChild(newDiv);

    console.log(currentDiv);
    
}
