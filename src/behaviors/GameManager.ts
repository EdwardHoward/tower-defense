import Behavior from "../internal/Behavior";
import GameObject from "../internal/GameObject";
import TowerBehavior from "./Towers/TowerBehavior";
import Input from "../system/Input";
import { towerPrefab } from "../prefabs/tower";
import Time from "../system/Time";
import { enemyPrefab } from "../prefabs/player";
import Health from "./Health";
import { enemyData } from "../prefabs/enemies";
import EnemyBehavior from "./Enemy/EnemyBehavior";
import FollowPath from "./FollowPathTwo";
import OvalRenderer from "./OvalRenderer";

const enemyIds = [
    "red",
    "blue"
]

const levels = [
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 1, 1, 1, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 1, 1, 0,
    ],
    [
        0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0,
        1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
        1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1,
        1, 0, 1, 0, 0, 1, 0, 1
    ]
]

export default class GameManager extends Behavior {
    selected: GameObject;
    placing: string = "tower";
    money: number = 20;
    spawnTime = 30;

    playing: boolean = false;

    currentLevel = 0;
    spawnIndex = 0;
    lastTime = 0;

    start() {

    }

    update() {
        if (this.playing && (!this.lastTime || Time.time - this.lastTime > this.spawnTime)) {
            this.lastTime = Time.time;

            const enemyId = levels[this.currentLevel][this.spawnIndex];
            const enemy = enemyData[enemyIds[enemyId]];
            this.spawnIndex++;

            if (this.spawnIndex >= levels[this.currentLevel].length) {
                this.playing = false;
                this.currentLevel++;
            }

            this.instantiate({
                ...enemyPrefab,
                components: [
                    ...enemyPrefab.components,
                    {
                        type: OvalRenderer,
                        values: [
                            {
                                name: 'color',
                                value: enemy.color
                            },
                            {
                                name: 'radius',
                                value: 12
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
                        type: FollowPath,
                        values: [
                            {
                                name: 'speed',
                                value: enemy.speed
                            }
                        ]
                    },
                ]
            }, { x: -25, y: 50 + 25 - 12 });
        }

        if (Input.mouseDown && Input.mouseWasDown) {
            const mousePosition = Input.mousePosition;

            if (this.money >= 10) {
                const map = GameObject.Find("Map");
                map.sendMessage("onPlace", {
                    x: mousePosition.x,
                    y: mousePosition.y,
                    prefab: towerPrefab
                });
            }

            const towers = GameObject.FindByTag("Tower");
            towers.forEach(tower => {
                const towerBehavior = tower.getComponent<TowerBehavior>("TowerBehavior");
                towerBehavior.selected = false;
            });
        }
    }

    selectTower(selected) {
        this.selected = selected;

        const towers = GameObject.FindByTag("Tower");


        towers.forEach(tower => {
            const towerBehavior = tower.getComponent<TowerBehavior>("TowerBehavior");
            towerBehavior.selected = false;
        });

        this.selected.getComponent<TowerBehavior>("TowerBehavior").selected = true;
    }

    towerPlaced(amount: number) {
        this.money -= amount;
    }

    enemyKilled(amount: number) {
        this.money += amount;
    }

    startRound() {
        if (this.currentLevel >= levels.length) {
            this.currentLevel = 0;
            console.log("win");
        }

        this.spawnIndex = 0;

        this.playing = true;
    }
}