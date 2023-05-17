import "./ShieldComponent.js"
class ShieldObject extends GameObject{
    name = "ShieldObject"
    layer = 5
    start(){
        //this.addComponent(new ShieldComponentDraw())
        //light blue
        this.addComponent(new Circle("#3c9ed6"))
        this.addComponent(new ShieldComponent())

    }
}
window.ShieldObject = ShieldObject