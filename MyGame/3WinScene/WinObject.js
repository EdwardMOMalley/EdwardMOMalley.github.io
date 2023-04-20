import "./WinComponent.js"
import "./WinDrawComponent.js"
class WinObject extends GameObject{
    start(){
        this.transform.x = -logicalWidth/2
        this.transform.y = -logicalWidth/2
        this.addComponent(new WinComponent())
        this.addComponent(new WinDrawComponent())
    }


}


window.WinObject = WinObject