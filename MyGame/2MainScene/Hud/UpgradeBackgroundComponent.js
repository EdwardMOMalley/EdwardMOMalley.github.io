


class UpgradeBackgroundComponent extends Component{
    name = "UpgradeBackgroundComponent"
    start(ctx){
        this.worldSize = GameObject.getObjectByName("FloorObject").getComponent("FloorComponent").size 
        this.transform.sx = 100
        this.transform.sy = 100
        this.transform.x = 0
        this.transform.y = 0

    }
    update(ctx){
        if(Input.mouseUp){
            let mouseClick = Input.screenToWorld(ctx,Input.mouseX,Input.mouseY)
            if(Math.abs(mouseClick.x) < Math.abs(this.transform.sx/2)){
                if(Math.abs(mouseClick.y) < Math.abs(this.transform.sy/2)){
                    this.parent.destroy()
                    SceneManager.unpause()
                }
    
            }
        }

        

    }
}
window.UpgradeBackgroundComponent = UpgradeBackgroundComponent