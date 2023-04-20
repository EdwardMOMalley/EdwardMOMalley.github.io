import "./HudTimerComponent.js"

class HudTimerObject extends GameObject{
    name = "HudTimerObject"
    start(){
        this.addComponent(new HudTimerComponent())

    }
}

window.HudTimerObject = HudTimerObject