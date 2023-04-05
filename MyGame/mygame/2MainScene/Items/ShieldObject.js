import "./ShieldComponent.js"
class ShieldObject extends GameObject{
    name = "ShieldObject"
    start(){
        //this.addComponent(new ShieldComponentDraw())
        this.addComponent(new Rectangle("white"))
        this.addComponent(new ShieldComponent())

    }
}
window.ShieldObject = ShieldObject