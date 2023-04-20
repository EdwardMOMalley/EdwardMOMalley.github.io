import "./StartObject.js"
class StartScene extends Scene{
    constructor(){
        super("black")
    }
    start(){
        this.addGameObject(new StartObject())
    }
}

window.StartScene = StartScene