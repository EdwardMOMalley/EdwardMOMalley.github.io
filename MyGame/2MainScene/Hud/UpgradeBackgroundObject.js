import "./UpgradeBackgroundComponent.js"
class UpgradeBackgroundObject extends GameObject{
    name = "UpgradeBackgroundObject"
    start(){
        this.addComponent(new UpgradeBackgroundComponent())
        this.addComponent(new Rectangle())
        SceneManager.pause()
    }
}
window.UpgradeBackgroundObject = UpgradeBackgroundObject