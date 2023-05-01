import "../../Hud/DamageTextObject.js"
import "../EnemyTemplate.js"
class BasicEnemyComponent extends EnemyTemplate {

    constructor(){
        super()
        this.name = "BasicEnemyComponent"
        this.type = "basic"
        this.hitMessage = "BasicEnemyHit"
        this.deadMessage = "BasicEnemyDestroyed"
        this.fillStyle = ("rgba(61, 7, 9,1)")
        this.size = 15
        this.speed = 3
        this.damage = 1
        this.maxHitpoints = 50
        this.hitpoints = this.maxHitpoints
        this.hitTimer = 0
        this.pulseHitTimer = 0
        this.distanceToPlayer = undefined
        this.lastDamageSource = undefined
    }
}
window.BasicEnemyComponent = BasicEnemyComponent