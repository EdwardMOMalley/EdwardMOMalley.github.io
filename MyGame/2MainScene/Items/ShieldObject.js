import "./ShieldComponent.js"
class ShieldObject extends GameObject{
    name = "ShieldObject"
    start(){
        //this.addComponent(new ShieldComponentDraw())
        //light blue
        this.addComponent(new Rectangle("#3c9ed6"))
        this.addComponent(new ShieldComponent())

    }
}
window.ShieldObject = ShieldObject