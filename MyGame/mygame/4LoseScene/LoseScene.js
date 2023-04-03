import "./LoseObject.js"
class LoseScene extends Scene {
    constructor(){
        super("black")
    }
    start() {

        this.addGameObject(new LoseObject())
    }
}




window.LoseScene = LoseScene