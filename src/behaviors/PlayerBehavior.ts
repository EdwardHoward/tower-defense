import Behavior from "../internal/Behavior";
import Transform from "./Transform";
import RectRenderer from "./RectRenderer";
import { enemyPrefab } from "../prefabs/player";
import GameManager from "./GameManager";
import GameObject from "../internal/GameObject";

export default class PlayerBehavior extends Behavior {
    private transform;
    private rectangle;
    private gameManager: GameManager;

    public speed: number;

    private time = 0;

    start() {
        this.transform = this.getComponent<Transform>("Transform");
        this.rectangle = this.getComponent<RectRenderer>("RectRenderer");
        this.gameManager = GameObject.Find("GameManager").getComponent<GameManager>("GameManager");
    }

    update() {
        if (this.gameManager.playing) {
            this.rectangle.color = "#ff0000";
        } else {
            this.rectangle.color = "#00ff00";
        }
    }

    onMouseDown() {
        if (!this.gameManager.playing) {
            this.gameManager.sendMessage("startRound");
        }
    }
}