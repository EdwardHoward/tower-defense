import Behavior from "../../internal/Behavior";
import OvalRenderer from "../OvalRenderer";
import Transform from "../Transform";
import GameObject from "../../internal/GameObject";
import GameManager from "../GameManager";
import Shoot from "./Shoot";

export default class TowerBehavior extends Behavior {
    public selected: boolean = false;

    private transform: Transform;
    private gameManager: GameManager;
    private shoot: Shoot;
    private rangeOval;

    start() {
        this.transform = this.getComponentWithType<Transform>(Transform);
        this.gameManager = GameObject.Find("GameManager").getComponent<GameManager>("GameManager");
        this.shoot = this.getComponentWithType<Shoot>(Shoot);

        const oval = {
            name: "Range",
            components: [{
                type: Transform,
                values: [
                    {
                        name: 'position',
                        value: { x: this.transform.position.x, y: this.transform.position.y }
                    }
                ]
            },
            {
                type: OvalRenderer,
                values: [
                    {
                        name: 'color',
                        value: 'rgba(255, 255, 255, 0.2)'
                    },
                    {
                        name: 'radius',
                        value: this.shoot.range
                    }
                ]
            }]
        }

        this.rangeOval = this.instantiate(oval);
    }

    update() {
        if (this.selected) {
            this.rangeOval.enabled = true;
        } else {
            this.rangeOval.enabled = false;
        }
    }

    onMouseDown() {
        this.gameManager.selectTower(this.gameObject);
    }
}