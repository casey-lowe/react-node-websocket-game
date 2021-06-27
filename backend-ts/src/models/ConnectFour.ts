import { Color } from '../types';

const width = 7;
const height = 6;

export class ConnectFour {
  private currentColor: Color = Color.Blue;
  private map: Color[][] = []; // order is [left -> right][bottom -> top]

  constructor() {
    this.resetMap();
  }

  private switchColor(): Color {
    return this.currentColor === Color.Blue ? Color.Red : Color.Blue;
  }

  resetMap(): void {
    for (let i = 0; i < width; i++) {
      this.map.push([]);
    }
  }

  addBall(column: number): {
    color: Color;
    position: [number, number];
  } {
    // todo: limit height

    // add ball to map
    this.map[column].push(this.currentColor);

    // the position new ball is added
    const addedPosition: [number, number] = [height - this.map[column].length - 1, column]; // order is [top -> bottom, left -> right]

    this.switchColor();

    return {
      color: this.currentColor,
      position: addedPosition,
    };
  }

  getCurrentColor(): Color {
    return this.currentColor;
  }
}
