import "./EnergyWaveComponent.js"
class EnergyWaveObject extends GameObject{
    constructor(damage,lifespan,radius){
        super()
        this.damage = damage
        this.lifespan = lifespan
        this.radius = radius
    }
    name = "EnergyWaveObject"
    start(){
        this.addComponent(new EnergyWaveComponent(this.damage,this.lifespan,this.radius))
        this.addComponent(new Circle("transparent","purple",5))
    }
}
window.EnergyWaveObject = EnergyWaveObject