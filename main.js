/**
 * Add turn
 * @param {number} tiro1 The first turn
 * @param {number} tiro2 The second turn
 * @param {number} tiro2 The third turn
 * @param {number} resultado The result from the game
*/

class Turno {
  constructor(tiro1 = 0, tiro2 = 0, tiro3 = 0, resultado = 0) {
    this.tiro1 = tiro1;
    this.tiro2 = tiro2;
    this.tiro3 = tiro3;
    this.resultado = resultado;
  }

  esStrike() {
    return this.tiro1 === 10;
  }

  esSpare() {
    return this.tiro1 + this.tiro2 === 10;
  }
}

class Juego {
  constructor() {
    this.turnos = [];
    this.puntaje = 0;
    this.cantTurnos = 10;
    this.t = 0;
  }

  bonoStrike() {
    const siguienteTurno = this.turnos[this.t + 1];
    const bono = siguienteTurno.tiro2 !== null ?
    siguienteTurno.tiro1 + siguienteTurno.tiro2 :
    siguienteTurno.tiro1;
    this.turnos[this.t].resultado += bono;
  }

  bonoSpare() {
    this.turnos[this.t].resultado += this.turnos[this.t + 1].tiro1;
  }

  tiroExtra() {
    const turnoActual = this.turnos[this.t];
    if (turnoActual.esStrike()) {
      const bono = turnoActual.tiro2 + turnoActual.tiro3;
      this.puntaje += 10 + bono;
      turnoActual.resultado = this.puntaje;
    } else if (turnoActual.esSpare()) {
      this.puntaje += turnoActual.tiro1 + turnoActual.tiro2 + turnoActual.tiro3;
      turnoActual.resultado = this.puntaje;
    } else {
      this.puntaje += turnoActual.tiro1 + turnoActual.tiro2;
      turnoActual.resultado = this.puntaje;
    }
  }

  objTurno(tiro1, tiro2 = 0, tiro3 = 0, resultado = 0) {
    const nuevoTurno = new Turno(tiro1, tiro2, tiro3, resultado);
    this.turnos.push(nuevoTurno);
  }

  getPuntajes() {
    const datosEstablecidos = [
      [1, 4],
      [4, 5],
      [6, 4],
      [5, 5],
      [10],
      [0, 1],
      [7, 3],
      [6, 4],
      [10],
      [2, 8, 6],
    ];

    for (let i = 0; i < this.cantTurnos; i++) {
      const datosTurno = datosEstablecidos[i];
      const num1 = datosTurno[0];
      const num2 = datosTurno[1];

      if (i === 9) {
        const num3 = datosTurno[2];
        this.objTurno(num1, num2, num3, 0);
      } else {
        this.objTurno(num1, num2);
      }
    }
    console.log(this.turnos);
  }

  initGame() {
    this.getPuntajes();
    for (this.t = 0; this.t < this.cantTurnos; this.t++) {
      if (this.t === 9) {
        this.tiroExtra();
      } else {
        const turnoActual = this.turnos[this.t];
        if (turnoActual.esStrike()) {
          this.puntaje += turnoActual.tiro1;
          turnoActual.resultado = this.puntaje;
          this.bonoStrike();
        } else {
          const sumaTurno = turnoActual.tiro1 + turnoActual.tiro2;
          this.puntaje += sumaTurno;
          if (turnoActual.esSpare()) {
            turnoActual.resultado = this.puntaje;
            this.bonoSpare();
          } else {
            turnoActual.resultado = this.puntaje;
          }
        }
        this.puntaje = turnoActual.resultado;
      }
    }
  }

  mostrarResultados() {
    this.turnos.forEach((pts) => {
      console.log('Resultado: ' + pts.resultado);
    });

    console.log('Puntaje final: ' + this.puntaje);
  }
}


const juego = new Juego(); // We create a new game object
juego.initGame();
juego.mostrarResultados();
