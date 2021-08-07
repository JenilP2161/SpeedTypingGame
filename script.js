
const quotes = [{ content: "Three things in human life are important. The first is to be kind. The second is to be kind. The third is to be kind.", author:"henry-james"},
    { content: "One's philosophy is not best expressed in words; it is expressed in the choices one makes... and the choices we make are ultimately our responsibility.", author: "Eleanor Roosevelt" },
    { content: "If I am not for myself, who will be for me? If I am not for others, what am I? And if not now, when?", author: "Rabbi Hillel" },
    { content: "The first requisite for success is the ability to apply your physical and mental energies to one problem incessantly without growing weary.", author: "Thomas Edison" },
    { content: "By accepting yourself and being fully what you are, your presence can make others happy.", author: "Jane Roberts" },
    { content: "Gratitude is not only the greatest of virtues, but the parent of all the others.", author: "Cicero" },
    { content: "When I dare to be powerful, to use my strength in the service of my vision, then it becomes less and less important whether I am afraid.", author: "Audre Lorde" },
    { content: "Let us resolve to be masters, not the victims, of our history, controlling our own destiny without giving way to blind suspicions and emotions.", author: "John F. Kennedy" },
    { content: "Prejudice is a burden that confuses the past, threatens the future and renders the present inaccessible.", author: "Maya Angelou" },
    { content: "Spectacular achievement is always preceded by unspectacular preparation.", author: "Robert Schuller" },
    { content: "One must be fond of people and trust them if one is not to make a mess of life.", author: "E. M. Forster"},
    { content: "If one is estranged from oneself, then one is estranged from others too. If one is out of touch with oneself, then one cannot touch others.", author: "Anne Lindbergh" },
    { content: "You will not be punished for your anger; you will be punished by your anger.", author: "Buddha" },]
const quoteDisplayElement = document.getElementById("quoteDisplay")
const quoteAuthorElement = document.getElementById("quoteAuthor")
const quoteInputElement = document.getElementById("quoteInput")
const timerElement = document.getElementById("timer")
const btnNextElement = document.getElementById("btnNext")

let myTime
let totalKeysPress = 0
let correctKeysPress
let incorrectKeysPress

let correct = true;

// document.getElementById("quoteInput").onkeydown = function(){    
//     totalKeysPress ++;
//     //console.log(totalKeysPress)
// }

document.getElementById("quoteInput").onkeydown = function(e){    
    
    if( !(e.key === "Shift" || e.key === "Backspace"))
    totalKeysPress ++;
    //console.log(totalKeysPress)
}

quoteInputElement.addEventListener('input', () => {
    
    correctKeysPress = 0
    incorrectKeysPress = 0
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false;
        }else if (character === characterSpan.innerText) {
            correctKeysPress ++
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
            correct = true;
        } else {
            incorrectKeysPress ++
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false;
        }

    })

    if(correct) {
        showTime();
        btnNextElement.value = " Play Again! "
        btnNextElement.addEventListener("click",renderNewQuote)
        
        //renderNewQuote()
    }
})

function showTime(){
    
    quoteDisplayElement.innerText = "Your time: " + myTime + "s.\n" +
    "Total keys press = " + totalKeysPress + "\n" +
    "Words Per Minute = " + Math.floor((totalKeysPress / 5)/(myTime/60)) + "\n" +
    "Correct keys press = " + correctKeysPress + "\n" +
    "Incorrect keys press = " + (totalKeysPress - correctKeysPress) + "\n" +
    "Accuracy(%) = " + ((correctKeysPress * 100 ) / totalKeysPress).toFixed(2) + " %" 
    quoteAuthorElement.innerText = ""
    quoteInputElement.style.display = "none"
    timerElement.style.visibility = "hidden"
    totalKeysPress = 0
    correctKeysPress = 0
    incorrectKeysPress = 0

    //btnNextElement.style.visibility = "hidden"
    //renderNewQuote()
}


 function renderNewQuote() {

    const random = Math.floor(Math.random()*quotes.length)
    btnNextElement.value ="Next Quote ->"
    quoteDisplayElement.innerText = '' //quote.content;
    quoteAuthorElement.innerText = quotes[random].author;
    quotes[random].content.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null;
    quoteInputElement.style.display = "block"
    timerElement.style.visibility = "visible"
    //btnNextElement.style.visibility = "visible"
    
    startTimer()
}
let startTime 
function startTimer(){
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(() => {
        timerElement.innerText = getTimerTime()
        myTime = getTimerTime()
    }, 1000);
}

function getTimerTime(){
    return Math.floor((new Date() - startTime) / 1000)
}

function nextQuote(){
    renderNewQuote();
}

renderNewQuote()
