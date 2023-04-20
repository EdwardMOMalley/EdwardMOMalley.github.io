import "./HudHealthBarComponent.js"
import "./HudHealthBarDrawComponent.js"
class HudHealthBarObject extends GameObject{
    name = "HudHealthBarObject"
    start(){
        this.addComponent(new HudHealthBarComponent())
        this.addComponent(new HudHealthBarDrawComponent())
    }

}
window.HudHealthBarObject = HudHealthBarObject