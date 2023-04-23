class UpgradeBackgroundComponent extends Component{
    name = "UpgradeBackgroundComponent"
    start(){
        this.worldSize = GameObject.getObjectByName("FloorObject").getComponent("FloorComponent").size 
        this.transform.sx = 100
        this.transform.sy = 100
        this.transform.x = this.worldSize/2
        this.transform.y = this.worldSize/2
    }
    update(){
        

    }
}
window.UpgradeBackgroundComponent = UpgradeBackgroundComponent