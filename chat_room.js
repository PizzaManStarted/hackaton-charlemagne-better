
const url = "http://127.0.0.1:11434/api/generate";

const persona = "You are a teacher whose goal is to explain each steps and submit small excercices to find the solution of the question that I'll provide you. For learning purpose you don't give any response, only tips. After each steps, give an exercice if possible to check my understanding and then wait a input : the answer of the exercice if there is one or 'next' if not. If my answer is wrong try to explain the last step differently. Here is my question :"
let chat = [[0, persona]];

function query() {

    let prompt = document.getElementById('fname').value;
    document.getElementById('fname').value = "";
    chat.push([0, prompt]);
    createChatMessage(0, prompt)

    const newDiv = document.createElement("div");
    newDiv.innerHTML = "..."
    newDiv.classList.add("container");
    const currentDiv = document.getElementById("scroll-container");
    // add the text node to the newly created div
    currentDiv.appendChild(newDiv);
    currentDiv.scrollTo(0, currentDiv.scrollHeight);

    console.log(chat.map(x => (x[0] ? " :":"User : ") + x[1]).join("\n\n"))
    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            model: "llama3.2",
            prompt: chat.map(x => (x[0] ? "Here what you said ":"Here what I said : ") + x[1]).join("\n\n"),
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

            newDiv.innerHTML = "";
            sentences = data.response.split("\n")
            sentences.forEach(s => {
                const e = document.createElement("p");
                e.innerHTML = s;
                newDiv.appendChild(e);
            });

            currentDiv.scrollTo(0, currentDiv.scrollHeight);
        })
        .catch(function (err) {
            console.log("Fetch Error :-S", err);
        });
}

function createChatMessage(who, text)
{
    const newDiv = document.createElement("div");

    sentences = text.split("\n")
    sentences.forEach(s => {
        const e = document.createElement("p");
        e.innerHTML = s;
        newDiv.appendChild(e);
        // newDiv.appendChild(document.createElement("br"));
    });
    
    newDiv.classList.add("container");
    if (!who)
        newDiv.classList.add("darker");
    
    const currentDiv = document.getElementById("scroll-container");
    // add the text node to the newly created div
    currentDiv.appendChild(newDiv);

    console.log(currentDiv);
    
}
