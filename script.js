const preguntas = [
    {
        pregunta:'Cuantos goles tiene Messi Actualmente?',
        respuesta:[
         { text: '120', correct:false},
         { text: '910', correct:false},
         { text: '772', correct:true},
         { text: '768', correct:false}
        ]
    },
    {
        pregunta:'Quien es el mejor futbolista del mundo?',
        respuesta:[
         { text: 'Messi', correct:true},
         { text: 'Cristiano', correct:true},
         { text: 'Maradona', correct:false},
         { text: 'Pele', correct:false}
        ]
    },
    {
        pregunta:'En que año descendio River Plate?',
        respuesta:[
         { text: '2010', correct:false},
         { text: '2012', correct:false},
         { text: '2011', correct:true},
         { text: '2018', correct:false}
        ]
    },
    {
        pregunta:'Quien gano el mundial 2018?',
        respuesta:[
         { text: 'Francia', correct:true},
         { text: 'Argentina', correct:false},
         { text: 'Brasil', correct:false},
         { text: 'Honduras', correct:false}
        ]
    },
    {
        pregunta:'Cual fue el resultado de la final de libertadores entre Boca y River en 2018?',
        respuesta:[
         { text: '3-1 River', correct:true},
         { text: '3-1 Boca', correct:false},
         { text: '2-0 Boca', correct:false},
         { text: '4-0 River', correct:false}
        ]
    },
    {
        pregunta:'Quien es el mejor futbolista del mundo?',
        respuesta:[
         { text: 'Messi', correct:true},
         { text: 'Cristiano', correct:true},
         { text: 'Maradona', correct:false},
         { text: 'Pele', correct:false}
        ]
    },
    {
        pregunta:'Quien es el mas ganador de balones de oro?',
        respuesta:[
         { text: 'Messi', correct:true},
         { text: 'Cristiano', correct:false},
         { text: 'Ronaldinho', correct:false},
         { text: 'Van Basten', correct:false}
        ]
    },

]

const botonEmpezar = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const preguntascontainerElement = document.getElementById
('preguntas-container')
const preguntasElement = document.getElementById('pregunta')
const botonesRespuesta = document.getElementById('respuesta-btn')

let preguntasAleatorias , preguntaActual

botonEmpezar.addEventListener('click', empezarJuego)
nextButton.addEventListener('click', () => {
    preguntaActual++
    siguientePregunta()
})

function empezarJuego(){
    botonEmpezar.classList.add('hide')
    preguntasAleatorias = preguntas.sort(() => Math.random() - .5)
    preguntaActual = 0
    preguntascontainerElement.classList.remove('hide')
    siguientePregunta()
}
function siguientePregunta(){
    resetear()
    mostrarPregunta(preguntasAleatorias[preguntaActual])
}

function mostrarPregunta(pregunta){
    preguntasElement.innerText = pregunta.pregunta
    pregunta.respuesta.forEach(respuesta => {
        const button = document.createElement('button')
        button.innerText = respuesta.text
        button.classList.add('btn')
        if (respuesta.correct){
            button.dataset.correct = respuesta.correct
        }
        button.addEventListener('click',elegirRespuesta)
        botonesRespuesta.appendChild(button)
    })
}

function resetear(){
    clearStatusClass(document.body);
    nextButton.classList.add('hide')
    while(botonesRespuesta.firstChild){
        botonesRespuesta.removeChild
        (botonesRespuesta.firstChild)
    }
}

function elegirRespuesta(e){
    const botonSeleccionado = e.target
    const correct = botonSeleccionado.dataset.correct
    setStatusClass(document.body,correct)
    Array.from(botonesRespuesta.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(preguntasAleatorias.length > preguntaActual + 1 ){
        nextButton.classList.remove('hide')
        } else {
            botonEmpezar.innerText = 'Reiniciar'
            botonEmpezar.classList.remove('hide')
        }
}

function setStatusClass(element, correcto){
    clearStatusClass(element)
    if(correcto){
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}