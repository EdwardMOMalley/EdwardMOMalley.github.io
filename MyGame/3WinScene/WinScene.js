import "./WinObject.js"

class WinScene extends Scene {
    constructor(){
        super("black")
    }
    start() {
        this.addGameObject(new WinObject())
    }
}


window.WinScene = WinScene