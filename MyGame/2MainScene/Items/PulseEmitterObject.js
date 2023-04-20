import "./PulseEmitterComponent.js"
class PulseEmitterObject extends GameObject{
    name = "PulseEmitterObject"
    start(){
        this.addComponent(new PulseEmitterComponent())
        

    }
}
window.PulseEmitterObject = PulseEmitterObject