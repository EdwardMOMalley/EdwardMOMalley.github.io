import "../../Hud/DamageTextObject.js"
import "../EnemyTemplate.js"
class SwarmEnemyComponent extends EnemyTemplate {

    constructor(){
        super()
        this.name = "SwarmEnemyComponent"
        this.type = "swarm"
        this.hitMessage = "SwarmEnemyHit"
        this.deadMessage = "BasicEnemyDestroyed"
        this.fillStyle = ("rgba(135,87,47,1)")
        this.size = 12
        this.speed = 5
        this.damage = 1
        this.maxHitpoints = 5
        this.hitpoints = this.maxHitpoints
        this.hitTimer = 0
        this.pulseHitTimer = 0
        this.distanceToPlayer = undefined
        this.lastDamageSource = undefined
    }
}
window.SwarmEnemyComponent = SwarmEnemyComponent