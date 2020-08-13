import Behavior from "../../internal/Behavior";
import GameObject from "../../internal/GameObject";
import Transform from "../Transform";
import Victor from "victor";
import Time from "../../system/Time";
import MoveTowards from "../MoveTowards";
import FollowTarget from "../FollowTarget";
import FollowPathTwo from "../FollowPathTwo";
import BulletBehavior from "../BulletBehavior";
import OvalRenderer from "../OvalRenderer";

export default class Shoot extends Behavior {
    private transform: Transform;
    private last = 0;

    public range;
    public speed = 60;

    start() {
        this.transform = this.getComponent<Transform>("Transform");
    }

    update() {
        const enemies = GameObject.FindByTag("Enemy");
        let inRange = [] as Array<GameObject>;

        enemies.forEach(enemy => {
            const pos = enemy.getComponent<Transform>("Transform").position;
            const distance = new Victor(this.transform.position.x, this.transform.position.y).distance(new Victor(pos.x, pos.y));

            if (distance < this.range) {
                inRange.push(enemy);
            }
        });

        inRange.sort((a: GameObject, b: GameObject) => {
            console.log(a, b);
            const aPath = a.getComponent<FollowPathTwo>("FollowPathTwo");
            const bPath = b.getComponent<FollowPathTwo>("FollowPathTwo");

            if (aPath && bPath) {
                return aPath.currentWaypoint - bPath.currentWaypoint;
            }

            return 0;
        });

        // TODO: this should be a setting, shooting first or last enemy
        //inRange.length - 1
        const closest = inRange[0];

        if (closest) {
            if (!this.last || Time.time - this.last > this.speed) {
                this.last = Time.time;

                const closestPosition = closest.getComponent<Transform>("Transform").position;

                this.instantiate({
                    name: "Bullet" + Math.random().toString(36).substr(2, 9),
                    components: [{
                        type: Transform,
                        values: [
                            {
                                name: 'position',
                                value: { x: this.transform.position.x, y: this.transform.position.y, z: 0 }
                            }
                        ]
                    },
                    {
                        type: OvalRenderer,
                        values: [
                            {
                                name: 'color',
                                value: '#FFFF00'
                            },
                            {
                                name: 'radius',
                                value: 2.5
                            }
                        ]
                    },
                    {
                        type: FollowTarget,
                        values: [
                            {
                                name: 'target',
                                value: closest
                            }
                        ]
                    },
                    {
                        type: MoveTowards,
                        values: [
                            {
                                name: 'startPosition',
                                value: new Victor(this.transform.position.x + 12, this.transform.position.y + 12)
                            },
                            {
                                name: 'endPosition',
                                value: new Victor(closestPosition.x, closestPosition.y)
                            },
                            {
                                name: 'speed',
                                value: 10
                            }
                        ]
                    }, {
                        type: BulletBehavior,
                        values: [
                            {
                                name: 'damage',
                                value: 1
                            }
                        ]
                    }]
                });
            }
        }
    }
}