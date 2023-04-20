window.addEventListener('load', fetchQuestions())
let allQuestions = []
let box = document.getElementById('box')

async function fetchQuestions() {
    const response = await fetch('https://opentdb.com/api.php?amount=30&amp;category=18')
    const json = await response.json()
    
    allQuestions = json.results.map(pergunta => {
        const {question, category, difficulty, type, 
            correct_answer, incorrect_answers } = pergunta

        return {
            question,
            category,
            difficulty,
            type,
            correct_answer,
            incorrect_answers
        }
    })
    console.log(json)
    addElement()
}

function addElement(){
    let questions = "<div id='questionBox'>"

    allQuestions.forEach(pergunta => {
        const {question, category, difficulty, type, 
            correct_answer, incorrect_answers } = pergunta

        const questionHTML = `
            <div id="question">
                <h1>${question}</h1>
            </div>
            <div id="box2">
                <p>Categoria: </p>
                <p id='descriptions'>${category}</p>
                <p>Dificuldade: </p>
                <p id='descriptions'>${difficulty}</p>
                <p>Tipo: </p>
                <p id='descriptions'>${type}</p>
                <p>Respota correta: </p>
                <p id='descriptions2'>${correct_answer}</p>
                <p>Respostas incorretas</p>
                <p id='descriptions3'>${incorrect_answers}</p>
            </div>
        `
        questions += questionHTML
    })
    questions += '</div>'
    box.innerHTML = questions
    
}