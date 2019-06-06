import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Platform} from '@ionic/angular';
import {fromEvent} from 'rxjs';
import {pairwise, switchMap, takeUntil} from 'rxjs/operators';
import {Board} from '../../models/board';

@Component({
    selector: 'pdx-game',
    templateUrl: './game.page.html',
    styleUrls: ['./game.page.scss'],
})
export class GamePage implements AfterViewInit {

    @ViewChild('canvas') public canvas: ElementRef;

    private board: Board;
    private ctx: CanvasRenderingContext2D;
    private boardSize = window.innerWidth;
    private highlighedIndex;

    constructor(private platform: Platform) {
        this.board = new Board();
    }

    ngAfterViewInit() {
        this.platform.ready().then(() => {
            document.addEventListener('backbutton', () => {
                console.log('Back pressed');
            }, false);
        });


        // get the context
        const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
        this.ctx = canvasEl.getContext('2d');

        // set the width and height
        canvasEl.width = this.boardSize;
        canvasEl.height = this.boardSize;

        // set some default properties about the line
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = '#000';

        this.draw();

        // // we'll implement this method to start capturing mouse events
        this.captureEvents(canvasEl);
    }

    private captureEvents(canvasEl: HTMLCanvasElement) {
        canvasEl.onpointerup = (event: PointerEvent) => {
            const pos = {
                x: event.x,
                y: event.y
            };


            console.log("clicked: ", pos);
        };
    }

    private draw() {
        // in case the context is not set
        if (!this.ctx) {
            return;
        }

        this.drawGrid();
    }

    private markHexagon(centerX, centerY, radius, rotation = 0) {
        this.ctx.beginPath();
        this.ctx.moveTo(centerX + radius * Math.sin(                    rotation), centerY + radius * Math.cos(                      rotation));
        this.ctx.lineTo(centerX + radius * Math.sin(    (Math.PI / 3) + rotation), centerY + radius * Math.cos(    (Math.PI / 3) + rotation));
        this.ctx.lineTo(centerX + radius * Math.sin(2 * (Math.PI / 3) + rotation), centerY + radius * Math.cos(2 * (Math.PI / 3) + rotation));
        this.ctx.lineTo(centerX + radius * Math.sin(3 * (Math.PI / 3) + rotation), centerY + radius * Math.cos(3 * (Math.PI / 3) + rotation));
        this.ctx.lineTo(centerX + radius * Math.sin(4 * (Math.PI / 3) + rotation), centerY + radius * Math.cos(4 * (Math.PI / 3) + rotation));
        this.ctx.lineTo(centerX + radius * Math.sin(5 * (Math.PI / 3) + rotation), centerY + radius * Math.cos(5 * (Math.PI / 3) + rotation));
        this.ctx.lineTo(centerX + radius * Math.sin(6 * (Math.PI / 3) + rotation), centerY + radius * Math.cos(6 * (Math.PI / 3) + rotation));
        this.ctx.closePath();
    }

    private drawGrid() {
        const center = this.boardSize / 2;
        const boardRadius = this.boardSize / 2 - 25;
        const rotation = Math.PI / 2;
        const pitRadius = (boardRadius - 20) / 7;
        const pitWidth = pitRadius * 2;

        this.markHexagon(center , center, boardRadius, rotation);
        this.ctx.stroke();


        let startingX = center + boardRadius * Math.sin(3 * (Math.PI / 3)) - 68;
        const startingY = center + boardRadius * Math.cos(2 * (Math.PI / 3)) - 33;

        for (let row = 0; row < Board.LAYOUT.length; row++) {
            for (let pit = 0; pit < Board.LAYOUT[row]; pit++) {
                const index = Board.getIndex(row, pit);

                const pitCenterX = startingX + (pit * pitWidth);
                const pitCenterY = startingY + (row * (pitWidth - 5));

                this.drawBall(index, pitCenterX, pitCenterY, pitRadius);
            }

            if (row < Board.LAYOUT.length / 2 - 1) {
                startingX -= pitRadius;
            } else {
                startingX += pitRadius;
            }
        }
    }

    private drawBall(ballIndex, pitCenterX, pitCenterY, pitRadius) {
        const ball = this.board.balls[ballIndex];
        const highlighted = this.highlighedIndex === ballIndex;

        this.markHexagon(pitCenterX, pitCenterY, pitRadius);

        if (!ball) {
            this.ctx.strokeStyle = highlighted ? '#1abd9c' : '#7d878c';
            this.ctx.setLineDash([3]);
            this.ctx.stroke();
        } else {
            const color = ball.color;
        }


        this.ctx.strokeText(ballIndex.toString(), pitCenterX, pitCenterY);
    }
}
