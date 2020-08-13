import Transform from "../behaviors/Transform"
import RectRenderer from "../behaviors/RectRenderer"
import RigidBody from "../behaviors/RigidBody"
import Shoot from "../behaviors/Towers/Shoot"
import TowerBehavior from "../behaviors/Towers/TowerBehavior"

export const towerPrefab = {
    name: "Tower",
    tag: "Tower",
    components: [{
        type: Transform,
        values: [
            {
                name: 'position',
                value: { x: 200, y: 200, z: 0 }
            }
        ]
    },
    {
        type: RectRenderer,
        values: [
            {
                name: 'color',
                value: '#0000ff'
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
        type: Shoot,
        values: [
            {
                name: 'range',
                value: 130
            }
        ]
    }, {
        type: RigidBody
    },
    {
        type: TowerBehavior
    }]
}