import "../Player/PlayerController.js"
import "../Items/Peashooter.js"
import "../Items/ScattershotComponent.js"
import "../Items/ExplosiveLauncher.js"
import "../Items/ShieldComponent.js"
import "./PlayerHealthbarComponent.js"
import "./PlayerAmmoBarComponent.js"
import "./PlayerReloadComponent.js"
import "./PlayerInventoryComponent.js"
class PlayerObject extends GameObject{
    name = "PlayerObject"
    fillStyle = "#33302e"
    start(){
        this.addComponent(new PlayerController())
        //Dark grayish
        this.addComponent(new Rectangle(this.fillStyle))
        //weapon always needs to be in components[3]
        //Peashooter, explosive launcher, scattershot
        this.addComponent(new Peashooter())
        //this.addComponent(new ScattershotComponent())
        //this.addComponent(new ExplosiveLauncher())
        this.addComponent(new PlayerInventoryComponent())
        this.addComponent(new PlayerHealthBarComponent())
        this.addComponent(new PlayerAmmoBarComponent())
        this.addComponent(new PlayerReloadComponent())
    }

}
window.PlayerObject = PlayerObject