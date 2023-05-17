import "./SwarmEnemyComponent.js"
import "../EnemyHealthBarComponent.js"
class SwarmEnemyObject extends GameObject{
    name = "BasicEnemyObject"
    layer = 1
    constructor(x,y){
        super()
        this.transform.x = x*1.2
        this.transform.y = y*1.2
    }
    start(){
        this.addComponent(new SwarmEnemyComponent())
        //Orange
        this.addComponent(new Rectangle("#87572f"))
       // this.addComponent(new EnemyHealthBarComponent())
    }

}

window.SwarmEnemyObject = SwarmEnemyObject