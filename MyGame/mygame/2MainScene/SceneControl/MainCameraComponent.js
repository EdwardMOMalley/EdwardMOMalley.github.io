class MainCameraComponent extends Component{
    start(){
        this.player = GameObject.getObjectByName("PlayerObject").getComponent("PlayerController")
        this.floor = GameObject.getObjectByName("FloorObject").getComponent("FloorComponent")
        this.parent.transform.x = 0
        this.parent.transform.y = 0
    }
    update(){
        if(!SceneManager.isRunning){
            return
        }
        this.player = GameObject.getObjectByName("PlayerObject").getComponent("PlayerController")
        this.worldSize = this.floor.size
        this.size = this.player.size
        this.speed = this.player.speed
        this.parent.transform = this.player.transform

    }
    
}
window.MainCameraComponent = MainCameraComponent