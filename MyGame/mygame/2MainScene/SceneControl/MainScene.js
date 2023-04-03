import "../World/FloorComponent.js"
import "../Player/PlayerObject.js"
import "../Enemy/EnemySpawnerComponent.js"
import "./MainCameraComponent.js"
import "./MainSceneController.js"
import "../Enemy/EnemyControlObject.js"
import "../Hud/HudHealthBarObject.js"
import "../Hud/HudHealthBarObject.js"
import "../Hud/HudBoarderObject.js"
class MainScene extends Scene{
    constructor(){
        super("brown")
    }
    start(){

        //Controller
        if(GameObject.getObjectByName("CameraGameObject").components.length <= 2){
            Camera.main.addComponent(new MainCameraComponent())
        }
        this.addGameObject(new GameObject("MainSceneControllerObject").addComponent(new MainSceneController()))

        //World
        this.addGameObject(new GameObject("FloorObject").addComponent(new FloorComponent()))

        //Player
        this.addGameObject(new PlayerObject())

        //Enemies
        this.addGameObject(new EnemyControlObject())

        //Hud
       // this.addGameObject(new HudBoarderObject())
        //this.addGameObject(new HudHealthBarObject())
    }

}

window.MainScene = MainScene