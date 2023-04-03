import "../Player/PlayerController.js"
import "../Items/Peashooter.js"
import "./PlayerHealthbarComponent.js"
class PlayerObject extends GameObject{
    name = "PlayerObject"
    start(){
        this.addComponent(new PlayerController())
        this.addComponent(new Rectangle("gray"))
        this.addComponent(new PlayerHealthBarComponent())
        this.addComponent(new Peashooter())
    }

}
window.PlayerObject = PlayerObject