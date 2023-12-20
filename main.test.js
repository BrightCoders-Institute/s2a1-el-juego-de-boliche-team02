const {Turno, Juego} = require('./main.js');
describe('Entire Game', () => {
  it('should initialize the game and calculate final scores', () => {
    const juego = new Juego();
    juego.initGame();
    juego.mostrarResultados();
    // Add assertions to check if the final scores are correct
  });
});

describe('Turn class', () => {
  it('should correctly identify a strike', () => {
    const turno = new Turno(10, 0, 0, 0);
    expect(turno.esStrike()).toBe(true);
  });
});
