import "../World/FloorComponent.js"
import "../Player/PlayerObject.js"
import "../Enemy/EnemySpawnerComponent.js"
import "./MainCameraComponent.js"
import "./MainSceneController.js"
import "../Enemy/EnemyControlObject.js"
import "../Hud/HudTimerObject.js"
import "./MainTimer.js"
import Time from "../../../engine/Time.js"
class MainScene extends Scene{
    constructor(){
        //Dark blue background
        super("#1d1c2e")
    }
    start(){
        Time.time = 0;
        

        //Controller
        if(GameObject.getObjectByName("CameraGameObject").components.length <= 2){
            Camera.main.addComponent(new MainCameraComponent())
        }
        this.addGameObject(new GameObject("MainSceneControllerObject").addComponent(new MainSceneController()))


        //World
        this.addGameObject(new GameObject("FloorObject").addComponent(new FloorComponent()))

        //Timer
        this.addGameObject(new GameObject("MainTimerObject").addComponent(new MainTimer()))

        //Player
        this.addGameObject(new PlayerObject())

        //Enemies
        this.addGameObject(new EnemyControlObject())

        //Hud
       // this.addGameObject(new HudBoarderObject())
        //this.addGameObject(new HudHealthBarObject())
        this.addGameObject(new HudTimerObject())
    }

}

window.MainScene = MainScene