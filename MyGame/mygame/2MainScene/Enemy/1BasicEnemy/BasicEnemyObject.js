import "./BasicEnemyComponent.js"
import "../EnemyHealthBarComponent.js"
class BasicEnemyObject extends GameObject{
    name = "BasicEnemyObject"
    start(){
        this.addComponent(new BasicEnemyComponent())
        this.addComponent(new Rectangle("yellow"))
        this.addComponent(new EnemyHealthBarComponent())
    }

}

window.BasicEnemyObject = BasicEnemyObject