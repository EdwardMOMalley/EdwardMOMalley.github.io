import "./HudBoarderDraw.js"
class HudBoarderObject extends GameObject{
    start(){
        this.addComponent(new HudBoarderDraw())
    }


}
window.HudBoarderObject = HudBoarderObject