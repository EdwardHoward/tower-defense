import Behavior from "../../internal/Behavior";
import Input from "../../system/Input";
import GameObject from "../../internal/GameObject";

export default class MapBehavior extends Behavior {
    board = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]

    start() {

    }

    update() {

    }

    onPlace(params) {
        const xx = params.x;
        const yy = params.y;
        const prefab = params.prefab;

        const x = Math.floor(xx / 50);
        const y = Math.floor(yy / 50);

        if (x < 16 && y < 12 && x >= 0 && y >= 0) {
            if (this.board[x + y * 16] == 0) {
                this.board[x + y * 16] = 1;
                this.instantiate(prefab, { x: x * 50 + 12, y: y * 50 + 12 });

                const gameManager = GameObject.Find("GameManager");
                gameManager.sendMessage("towerPlaced", 10);
            }
        }
    }
}