import {BallColor} from './ball-color';

export class Ball {
    public index: number;
    public color: BallColor;


    constructor(index: number, color: BallColor) {
        this.index = index;
        this.color = color;
    }
}
