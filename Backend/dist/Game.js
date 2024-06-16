"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const Messages_1 = require("./Messages");
class Game {
    constructor(player1, player2) {
        this.Movecount = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.moves = [];
        this.starttime = new Date();
        this.player1.send(JSON.stringify({
            type: Messages_1.INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: Messages_1.INIT_GAME,
            payload: {
                color: "black"
            }
        }));
    }
    makeMove(socket, move) {
        console.log(this.board.board);
        if (this.Movecount % 2 === 0 && socket !== this.player1) {
            return;
        }
        if (this.Movecount % 2 === 0 && socket !== this.player2) {
            return;
        }
        try {
            this.board.move(move);
            this.Movecount++;
        }
        catch (e) {
            return;
        }
        if (this.board.isGameOver()) {
            this.player1.emit(JSON.stringify({
                type: Messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }));
            return;
        }
        if (this.board.moves().length % 2 === 0) {
            this.player2.send(JSON.stringify({
                type: "move",
                payload: move
            }));
        }
        else {
            this.player1.send(JSON.stringify({
                type: "move",
                payload: move
            }));
        }
        this.Movecount++;
        // if(socket===this.player1 || socket===this.player2){
        //     this.moves.push(move);
        //     this.board=move;
        //     this.checkWinner();
    }
}
exports.Game = Game;
