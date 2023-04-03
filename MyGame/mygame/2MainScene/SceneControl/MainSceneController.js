class MainSceneController extends Component{
    name = "MainSceneController"
    start(){
        
    }
    update(){

    }
    handleUpdate(component,eventName){
        if(eventName == "PlayerDied"){
            GameObject.getObjectByName("CameraGameObject").transform.x = 0
            GameObject.getObjectByName("CameraGameObject").transform.y = 0
            SceneManager.changeScene(3)
            console.log("PlayerDied")

        }

    }
}

window.MainSceneController = MainSceneController