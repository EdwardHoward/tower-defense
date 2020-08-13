
import Health from "../Health";
import Behavior from "../../internal/Behavior";
import GameObject from "../../internal/GameObject";
import { enemyPrefab } from "../../prefabs/player";
import RectRenderer from "../RectRenderer";
import FollowPath from "../FollowPath";
import FollowPathTwo from "../FollowPathTwo";
import { enemyData } from "../../prefabs/enemies";
import Transform from "../Transform";

export default class EnemyBehavior extends Behavior {
    private health: Health;
    private transform: Transform;
    private followPath: FollowPathTwo;

    public reward: number;
    public spawns: [];

    start() {
        this.health = this.getComponentWithType<Health>(Health);
        this.transform = this.getComponentWithType<Transform>(Transform);
        this.followPath = this.getComponentWithType<FollowPathTwo>(FollowPathTwo);
    }

    update() {

    }

    onHit(damage) {
        this.health.health -= damage;
    }

    onDie() {
        this.gameObject.destroy();

        if (this.spawns) {
            this.spawns.forEach((spawn) => {
                const enemy = enemyData[spawn];

                this.instantiate({
                    ...enemyPrefab,
                    components: [
                        ...enemyPrefab.components,
                        {
                            type: RectRenderer,
                            values: [
                                {
                                    name: 'color',
                                    value: enemy.color
                                },
                                {
                                    name: 'width',
                                    value: 24
                                },
                                {
                                    name: 'height',
                                    value: 24
                                },
                                {
                                    name: 'displayOrder',
                                    value: 3
                                }
                            ]
                        },
                        {
                            type: Health,
                            values: [
                                {
                                    name: 'health',
                                    value: enemy.health
                                }
                            ]
                        },
                        {
                            type: EnemyBehavior,
                            values: [
                                {
                                    name: 'reward',
                                    value: enemy.reward
                                },
                                {
                                    name: 'spawns',
                                    value: enemy.spawns
                                }
                            ]
                        },
                        {
                            type: FollowPathTwo,
                            values: [
                                {
                                    name: 'speed',
                                    value: enemy.speed
                                },
                                {
                                    name: 'currentWaypoint',
                                    value: this.followPath.currentWaypoint
                                }
                            ]
                        },
                    ]
                }, { x: this.transform.position.x, y: this.transform.position.y });
            });
        }

        const gameManager = GameObject.Find("GameManager");
        gameManager.sendMessage("enemyKilled", this.reward);
    }
}