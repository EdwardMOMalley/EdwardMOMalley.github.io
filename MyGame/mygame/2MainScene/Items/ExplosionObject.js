import "./ExplosionComponent.js"
import "./ExplosionDrawComponent.js"
class ExplosionObject extends GameObject{
    constructor(damage,radius,locX,locY){
        super()
        this.damage = damage
        this.radius = radius
        this.transform.x = locX
        this.transform.y = locY
    }
    name = "ExplosionObject"
    start(){

        this.addComponent(new ExplosionComponent(this.damage,this.radius))
        this.addComponent(new ExplosionDrawComponent())

    }

}

window.ExplosionObject = ExplosionObject