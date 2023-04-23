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
            SceneManager.getActiveScene().gameObjects.forEach(obj => {
                if(obj.name != "CameraGameObject"){
                    obj.destroy()
                }
            })
            SceneManager.changeScene(3)
            console.log("PlayerDied")

        }
        if(eventName == "TimeVictory"){
            SceneManager.changeScene(2)
        }

    }
}

window.MainSceneController = MainSceneController