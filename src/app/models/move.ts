export class Move {
    public previousIndex: number;
    public currentIndex: number;


    constructor(previousIndex: number, currentIndex: number) {
        this.previousIndex = previousIndex;
        this.currentIndex = currentIndex;
    }
}
