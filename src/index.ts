import GameObject from "./internal/GameObject";
import Canvas from "./system/Canvas";
import Input from "./system/Input";
import { playerPrefab } from "./prefabs/player";
import Time from "./system/Time";
import { towerPrefab } from "./prefabs/tower";
import MapBehavior from "./behaviors/Map/MapBehavior";
import GameManager from "./behaviors/GameManager";
import MoneyBehavior from "./behaviors/UI/MoneyBehavior";

interface IPrefab {
    name;
    tag?;
    components;
}

const json = [
    {
        name: 'GameManager',
        tag: 'GameManager',
        components: [
            {
                type: GameManager
            }
        ]
    },
    {
        name: 'Map',
        tag: 'Map',
        components: [
            {
                type: MapBehavior
            }
        ]
    },
    {
        name: 'Money',
        tag: 'Money',
        components: [
            {
                type: MoneyBehavior
            }
        ]
    }, playerPrefab] as Array<IPrefab>;

const canvas = Canvas.getInstance();
const graphics = canvas.context;

function start() {
    Input.init();

    json.forEach(obj => {
        const object = new GameObject(obj.name, obj.tag);
        obj.components.forEach(component => {
            const behavior = new component.type(object);

            if (component.values) {
                component.values.forEach(value => {
                    behavior[value.name] = value.value;
                });
            }

            object.behaviors.set(component.type.name, behavior);
        });

        object.start();
    });
}

function update(now) {
    requestAnimationFrame(update);

    clearScreen();

    Time.time++;

    GameObject.getObjects().forEach(obj => {
        obj.update();
    });

    canvas.render();

    Input.update();
}

var img = new Image();   // Create new img element

function clearScreen() {
    graphics.fillStyle = "#e0e0e0";
    graphics.fillRect(0, 0, 1000, 600);

    Canvas.getInstance().context.drawImage(img, 0, 0);
}

img.addEventListener('load', function () {
    start();
    requestAnimationFrame(update);
}, false);

img.src = require("./assets/map.png"); //'myImage.png'; // Set source path