import GameManager from "../GameManager";
import GameObject from "../../internal/GameObject";
import Canvas from "../../system/Canvas";
import Behavior from "../../internal/Behavior";

export default class MoneyBehavior extends Behavior {
    private gameManager: GameObject;
    private canvas: Canvas;
    
    start() {
        this.gameManager = GameObject.Find("GameManager");
        this.canvas = Canvas.getInstance();
    }

    update() {
        const money = this.gameManager.getComponent<GameManager>("GameManager");

        this.canvas.context.fillStyle = "#000000";
        this.canvas.context.font = "30px Arial";
        this.canvas.context.fillText("Money: " + money.money, 800 + 10, 30);
    }
}