class StartComponent extends Component{
    name = "StartComponent"
    start(){
        this.hiScore = 0
        if(document.cookie){
            this.hiScore = document.cookie
        }
    }
    update() {
        if(keysDown["e"]){
            SceneManager.changeScene(1);

        }

        }


}
window.StartComponent = StartComponent