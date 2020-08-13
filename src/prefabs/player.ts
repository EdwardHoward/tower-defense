import Transform from "../behaviors/Transform"
import RectRenderer from "../behaviors/RectRenderer"
import PlayerBehavior from "../behaviors/PlayerBehavior"
import RigidBody from "../behaviors/RigidBody"

export const playerPrefab = {
    name: "Player",
    components: [{
        type: Transform,
        values: [
            {
                name: 'position',
                value: { x: 800 + 10, y: 600 - 10 - 50, z: 0 }
            }
        ]
    },
    {
        type: RectRenderer,
        values: [
            {
                name: 'color',
                value: '#00ff00'
            },
            {
                name: 'width',
                value: 180
            },
            {
                name: 'height',
                value: 50
            }
        ]
    },
    {
        type: PlayerBehavior,
        values: [
            {
                name: 'speed',
                value: 1
            }
        ]
    }, {
        type: RigidBody
    }]
}

export const enemyPrefab = {
    name: "Enemy",
    tag: "Enemy",
    components: [{
        type: Transform,
        values: [
            {
                name: 'position',
                value: { x: Math.random() * 800, y: Math.random() * 600, z: 0 }
            }
        ]
    }]
}