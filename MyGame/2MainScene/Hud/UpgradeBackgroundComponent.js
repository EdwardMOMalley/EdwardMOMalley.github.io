


class UpgradeBackgroundComponent extends Component{
    name = "UpgradeBackgroundComponent"
    start(ctx){
        this.worldSize = GameObject.getObjectByName("FloorObject").getComponent("FloorComponent").size 
        this.transform.sx = EngineGlobals.logicalWidth- 50
        this.transform.sy = EngineGlobals.logicalWidth-100
        this.transform.x = this.worldSize/2
        this.transform.y = this.worldSize/2

    }
    update(ctx){
        if(Input.mouseUp){
            let mouseClick = Input.screenToGUI(ctx,Input.mouseX,Input.mouseY)
            if(Math.abs(mouseClick.x) < Math.abs(this.transform.sx/2) + this.worldSize/2){
                if(Math.abs(mouseClick.y) < Math.abs(this.transform.sy/2) + this.worldSize/2){
                    this.parent.destroy()
                    SceneManager.unpause()
                }
    
            }
        }

        

    }
}
window.UpgradeBackgroundComponent = UpgradeBackgroundComponent