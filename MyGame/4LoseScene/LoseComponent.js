class LoseComponent extends Component{
    name = "LoseComponent"
    update() {
        if(keysDown["r"]){
            SceneManager.changeScene(0)
        }
    }

}

window.LoseComponent = LoseComponent