class WinComponent extends Component {
    update() {
        if(keysDown["r"]){
            SceneManager.changeScene(0)
        }
    }
}

window.WinComponent = WinComponent