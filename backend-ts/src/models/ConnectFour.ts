import { Color } from '../types';

const width = 7;
const height = 6;

export class ConnectFour {
  private currentColor: Color = Color.Blue;
  private board: Color[][] = []; // order is [left -> right][bottom -> top]
  private players: Color[] = [];

  constructor() {
    this.resetMap();
    this.players = [];
  }

  private switchColor(): Color {
    return this.currentColor === Color.Blue ? Color.Red : Color.Blue;
  }

  resetMap(): void {
    for (let i = 0; i < width; i++) {
      this.board.push([]);
    }
  }

  addBall(column: number): {
    addedPosition: [number, number];
    addedColor: Color;
    currentColor: Color;
  } {
    // todo: limit height

    // add ball to map
    this.board[column].push(this.currentColor);

    // the position new ball is added
    const addedPosition: [number, number] = [height - this.board[column].length - 1, column]; // order is [top -> bottom, left -> right]
    const addedColor = this.currentColor;

    this.switchColor();

    return {
      addedPosition: addedPosition,
      addedColor,
      currentColor: this.currentColor,
    };
  }

  addPlayer(): Color | null {
    if (this.players.length === 2) {
      return null;
    }

    let player: Color;

    if (!this.players.length) {
      player = Color.Blue;
    } else {
      player = this.players[0] === Color.Blue ? Color.Red : Color.Blue;
    }

    this.players.push(player);
    return player;
  }
}

export default new ConnectFour();
