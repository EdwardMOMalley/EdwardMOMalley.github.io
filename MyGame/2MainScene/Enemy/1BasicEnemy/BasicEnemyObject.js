import "./BasicEnemyComponent.js"
import "../EnemyHealthBarComponent.js"
class BasicEnemyObject extends GameObject{
    name = "BasicEnemyObject"
    layer = 1
    constructor(x,y){
        super()
        this.transform.x = x
        this.transform.y = y
    }
    start(){
        this.addComponent(new BasicEnemyComponent())
        //Dark red
        this.addComponent(new Rectangle("#3d0709"))
        this.addComponent(new EnemyHealthBarComponent())
    }

}

window.BasicEnemyObject = BasicEnemyObject