// Lista de preguntas
const preguntas = [
  {
    pregunta: "¿Cuál es el río más largo del mundo?",
    opciones: ["Nilo", "Amazonas", "Yangtsé", "Misisipi"],
    correcta: 1
  },
  {
    pregunta: "¿Quién pintó 'La última cena'?",
    opciones: ["Miguel Ángel", "Leonardo da Vinci", "Picasso", "Van Gogh"],
    correcta: 1
  },
  {
    pregunta: "¿En qué año llegó el hombre a la Luna?",
    opciones: ["1965", "1969", "1972", "1975"],
    correcta: 1
  },
  {
    pregunta: "¿Cuál es el país con mayor población del mundo?",
    opciones: ["India", "China", "Estados Unidos", "Rusia"],
    correcta: 0
  },
  {
    pregunta: "¿Qué planeta es conocido como el planeta rojo?",
    opciones: ["Marte", "Júpiter", "Venus", "Saturno"],
    correcta: 0
  },
  {
    pregunta: "¿Cuál es el océano más grande?",
    opciones: ["Atlántico", "Pacífico", "Índico", "Ártico"],
    correcta: 1
  }
];

// Mezclar preguntas aleatoriamente
function mezclar(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Cargar preguntas
const quizDiv = document.getElementById('quiz');
const preguntasAleatorias = mezclar([...preguntas]).slice(0, 5);

preguntasAleatorias.forEach((p, index) => {
  const divPregunta = document.createElement('div');
  divPregunta.classList.add('question');

  const preguntaElem = document.createElement('p');
  preguntaElem.textContent = `${index + 1}. ${p.pregunta}`;
  divPregunta.appendChild(preguntaElem);

  p.opciones.forEach((opcion, i) => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `pregunta${index}`;
    input.value = opcion;
    label.appendChild(input);
    label.append(` ${opcion}`);
    divPregunta.appendChild(label);
    divPregunta.appendChild(document.createElement('br'));
  });

  quizDiv.appendChild(divPregunta);
});

// Manejar envío
document.getElementById('quizForm').addEventListener('submit', function(e) {
  e.preventDefault();
  let puntaje = 0;
  const respuestas = [];

  preguntasAleatorias.forEach((p, index) => {
    const seleccionada = document.querySelector(`input[name="pregunta${index}"]:checked`);
    if (seleccionada) {
      respuestas.push(`${p.pregunta} - ${seleccionada.value}`);
      if (seleccionada.value === p.opciones[p.correcta]) {
        puntaje++;
      }
    } else {
      respuestas.push(`${p.pregunta} - No respondida`);
    }
  });

  // Mostrar puntaje
  document.getElementById('score').textContent = `Tu calificación: ${puntaje} / ${preguntasAleatorias.length}`;

  // Crear campos ocultos para enviar a Formspree
  const form = document.getElementById('quizForm');
  const inputRespuestas = document.createElement('input');
  inputRespuestas.type = 'hidden';
  inputRespuestas.name = 'Respuestas';
  inputRespuestas.value = respuestas.join(' | ');
  form.appendChild(inputRespuestas);

  const inputPuntaje = document.createElement('input');
  inputPuntaje.type = 'hidden';
  inputPuntaje.name = 'Puntaje';
  inputPuntaje.value = `${puntaje}/${preguntasAleatorias.length}`;
  form.appendChild(inputPuntaje);

  // Enviar formulario
  form.submit();
});
