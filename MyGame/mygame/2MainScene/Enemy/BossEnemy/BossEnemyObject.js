import "./BossEnemyComponent.js"
import "../EnemyHealthBarComponent.js"
class BossEnemyObject extends GameObject{
    name = "BossEnemyObject"
    constructor(x,y){
        super()
        this.transform.x = x
        this.transform.y = y
    }
    start(){
        this.addComponent(new BossEnemyComponent())
        this.addComponent(new Rectangle("yellow"))
        this.addComponent(new EnemyHealthBarComponent())
    }

}

window.BossEnemyObject = BossEnemyObject