import "./LoseComponent.js"
import "./LoseDrawComponent.js"
class LoseObject extends GameObject{
    name = "LoseObject"

    start(){


        this.transform.sx = 100
        this.transform.sy = 100
        this.transform.x = -logicalWidth/2
        this.transform.y = -logicalWidth/2
        //this.addComponent(new Rectangle("green"))
        this.addComponent(new LoseComponent())

        this.addComponent(new LoseDrawComponent())
    }


}

window.LoseObject = LoseObject