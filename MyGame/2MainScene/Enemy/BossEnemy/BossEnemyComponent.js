import "../../Hud/DamageTextObject.js"
import "../EnemyTemplate.js"
class BossEnemyComponent extends EnemyTemplate{
    name = "BossEnemyComponent"
    constructor(){
        super()
        this.type = "boss"
        this.hitmessage = "BossEnemyHit"
        this.deadMessage = "BossEnemyDestroyed"
        this.size = 30
        this.speed = 0.5
        this.damage = 20
        this.maxHitpoints = 500
        this.hitpoints = this.maxHitpoints
        this.hitTimerMax = 6
        this.hitTimer = this.hitTimerMax
    }
}
window.BossEnemyComponent = BossEnemyComponent