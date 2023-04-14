import "./ExplosionComponent.js"
import "./ExplosionDrawComponent.js"
class ExplosionObject extends GameObject{
    constructor(locX,locY){
        super()
        this.transform.x = locX
        this.transform.y = locY
    }
    name = "ExplosionObject"
    start(){

        this.addComponent(new ExplosionComponent())
        this.addComponent(new ExplosionDrawComponent())

    }

}

window.ExplosionObject = ExplosionObject