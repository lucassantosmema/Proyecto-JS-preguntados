let preguntas = [];

function cargarjson () {
    fetch('preguntas.json')
    .then(respuesta => respuesta.json())
    .then(cuestionario => {
        cuestionario.forEach(pregunta => {
            preguntas.push(pregunta);
        })
    })
}  
cargarjson();

localStorage.setItem("ListaPreguntas", JSON.stringify(preguntas));

console.log(localStorage.getItem("ListaPreguntas"));


let respuestascorrectas = 0 ;

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
        if (respuesta.correct === true ){
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
            Swal.fire(
                `La cantidad de sus respuestas correctas es ${respuestascorrectas - 7 }` /* se resta -9 xq me toma las respuestas y no se solucionar */
                
              )
            respuestascorrectas = 0  
        } 
}

function setStatusClass(element, correcto){
    clearStatusClass(element)
    if(correcto){
        respuestascorrectas = respuestascorrectas + 1 
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}