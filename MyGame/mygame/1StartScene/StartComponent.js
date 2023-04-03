class StartComponent extends Component{
    name = "StartComponent"
    update() {
        if(keysDown["e"]){
            SceneManager.changeScene(1);

        }

        }


}
window.StartComponent = StartComponent