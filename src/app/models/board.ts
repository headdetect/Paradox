import {Ball} from './ball';
import {Move} from './move';
import {Neighbor} from './neighbor';

export class Board {

    constructor() {
        this._generateGrid();
    }

    // Probably could have done some more calculation, but im too lazy //
    public static LAYOUT = [4, 5, 6, 7, 6, 5, 4];
    public static DISTANCE_LAYOUT = {
        3: [0, 1, 2, 3, 4, 8, 9, 14, 15, 21, 22, 27, 28, 32, 33, 34, 35, 36],
        2: [5, 6, 7, 10, 13, 16, 20, 23, 26, 29, 30, 31],
        1: [11, 12, 17, 19, 24, 25, 26],
        0: [18],
    };

    public balls: Ball[] = [];
    public movesHistory: Move[];

    public static getIndex(row: number, pit: number) {
        let sum = 0;

        for (let i = 0; i < row; i++) {
            sum += Board.LAYOUT[i];
        }

        return sum + pit;
    }

    public static findDistance(index) {
        for (let i = 0; i < 4; i++) {
            if (Board.DISTANCE_LAYOUT[i].indexOf(index) !== -1) {
                return i;
            }
        }

        throw Error(`Pit ${index} not found in distances`);
    }

    private _generateGrid() {
        // Set size to 36 spots //
        for (let i = 0; i < 36; i++) {
            this.balls.push(null);
        }
    }


    public neighbors(ball: Ball): Neighbor[] {

        return null;
    }
}
