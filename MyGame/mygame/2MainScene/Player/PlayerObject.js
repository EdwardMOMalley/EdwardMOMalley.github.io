import "../Player/PlayerController.js"
import "../Items/Peashooter.js"
import "../Items/ShieldComponent.js"
import "./PlayerHealthbarComponent.js"
import "./PlayerAmmoBarComponent.js"
import "./PlayerReloadComponent.js"
import "./PlayerInventoryComponent.js"
class PlayerObject extends GameObject{
    name = "PlayerObject"
    start(){
        //weapon always needs to be in components[3]
        this.addComponent(new PlayerController())
        this.addComponent(new Rectangle("gray"))
        this.addComponent(new Peashooter())
        this.addComponent(new PlayerInventoryComponent())
        this.addComponent(new PlayerHealthBarComponent())
        this.addComponent(new PlayerAmmoBarComponent())
        this.addComponent(new PlayerReloadComponent())
    }

}
window.PlayerObject = PlayerObject