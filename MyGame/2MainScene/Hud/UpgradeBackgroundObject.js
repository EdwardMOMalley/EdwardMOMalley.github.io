import "./UpgradeBackgroundComponent.js"
class UpgradeBackgroundObject extends GameObject{
    name = "UpgradeBackgroundObject"
    start(){
        this.addComponent(new UpgradeBackgroundComponent())
        this.addComponent(new RectangleStatic("black"))
        this.addComponent(new GUITextCentered("Level Up, click for upgrade!"))
        SceneManager.pause()
    }
}
window.UpgradeBackgroundObject = UpgradeBackgroundObject