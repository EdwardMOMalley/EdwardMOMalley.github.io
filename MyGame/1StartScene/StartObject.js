import "./StartComponent.js"
import "./StartDrawComponent.js"
class StartObject extends GameObject{
    start(){
        this.transform.x = -logicalWidth/2
        this.transform.y = -logicalWidth/2
        this.addComponent(new StartComponent())
        this.addComponent(new StartDrawComponent())

    }


}
window.StartObject = StartObject