import "./AutoLaserComponent.js"
import "./AutoLaserDrawComponent.js"
class AutoLaserObject extends GameObject{
    name = "AutoLaserObject"
    constructor(){
        super()
    }
    start(){
        this.addComponent(new AutoLaserComponent())
        this.addComponent(new AutoLaserDrawComponent())
    }
}
window.AutoLaserObject = AutoLaserObject
