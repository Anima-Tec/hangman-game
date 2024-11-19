const prompt = require('prompt-sync')();

// Utilidades
export const esLetraValida = (letra) => /^[a-z]$/.test(letra);

export const palabraContieneLetra = (palabra, letra) => palabra.includes(letra);

export const letraYaUsada = (letra, letrasUsadas) => letrasUsadas.includes(letra);

export const esVictoria = (listaPalabra, palabraAdivinada) =>
  listaPalabra.join('') === palabraAdivinada;

export const esVictoriaImpecable = (listaPalabra, palabraAdivinada, intentos) =>
  listaPalabra.join('') === palabraAdivinada && intentos === 0;

// Juego principal
export const juegoPrincipal = () => {
  // Elige una palabra para que un jugador adivine
  const palabra = prompt(
    'Ingresa una palabra para que otro jugador adivine: '
  ).toLowerCase();

  // Limpiar la consola
  console.log('\x1b[2J');

  // Palabra a adivinar
  const listaPalabra = palabra.split('');

  // Estado del juego
  let palabraAdivinada = Array(palabra.length).fill('_');
  let intentosFallidos = [];
  const vidasMaximas = 6;

  const imprimirEstadoJuego = () => {
    console.log('\n' + palabraAdivinada.join(' '));
    console.log(`Número de errores: ${intentosFallidos.join(', ')}`);
    console.log(`Vidas restantes: ${vidasMaximas - intentosFallidos.length}\n`);
  };

  // Inicio del juego
  console.log('¡Bienvenido al Ahorcado!');
  imprimirEstadoJuego();

  // Bucle principal
  while (
    palabraAdivinada.includes('_') &&
    intentosFallidos.length < vidasMaximas
  ) {
    // Imprimir separador
    console.log("--------------------");

    // Pedir al jugador que adivine una letra
    const intento = prompt('Ingresa una letra: ').toLowerCase();

    // Verificar si el intento es válido
    if (!intento || intento.length !== 1 || !esLetraValida(intento)) {
      console.log('Por favor, ingresa solamente una letra válida.');
      continue;
    }

    // Verificar si la letra ya fue usada
    if (
      palabraContieneLetra(palabraAdivinada, intento) ||
      letraYaUsada(intento, intentosFallidos)
    ) {
      console.log('Ya adivinaste esa letra, intenta con otra.');
      continue;
    }

    // Verificar si la letra está en la palabra
    if (listaPalabra.includes(intento)) {
      listaPalabra.forEach((char, index) => {
        if (char === intento) palabraAdivinada[index] = intento;
      });
      console.log(`¡Letra correcta!`);
    } else {
      intentosFallidos.push(intento);
      console.log(`¡Letra equivocada!`);
    }

    imprimirEstadoJuego();
  }

  // Verificar si el jugador tuvo victoria imbatible
  if (esVictoriaImpecable(listaPalabra, palabraAdivinada, intentosFallidos)) {
    console.log(
      `¡Felicidades! Adivinasate la palabra de primera: ${palabra}. Tomá una estrella de oro ⭐.`
    );
  }

  // Verificar si el jugador tuvo victoria
  if (esVictoria(listaPalabra, palabraAdivinada)) {
    console.log(`¡Felicidades! Adivinaste la palabra: ${palabra}.`);
  }

  // Verificar si el jugador perdió
  if (palabraAdivinada.join('') === palabra) {
    console.log(`¡Felicidades! Adivinaste la palabra: ${palabra}.`);
  } else {
    console.log(
      `¡Juego terminado! La palabra era: ${palabra}. Intenta de nuevo.`
    );
  }
};

// Comienza el juego principal
juegoPrincipal();
