import "./BasicEnemyComponent.js"
import "../EnemyHealthBarComponent.js"
class BasicEnemyObject extends GameObject{
    name = "BasicEnemyObject"
    constructor(x,y){
        super()
        this.transform.x = x
        this.transform.y = y
    }
    start(){
        this.addComponent(new BasicEnemyComponent())
        this.addComponent(new Rectangle("yellow"))
        this.addComponent(new EnemyHealthBarComponent())
    }

}

window.BasicEnemyObject = BasicEnemyObject