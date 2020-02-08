const Gameboard = (() => {
    let board = [];
})();

const Game = (() => {

})();

const Player = (name, symbol) => {
    const sayName = () => console.log(`Hey ${name}!`);
    return { symbol, sayName }
};