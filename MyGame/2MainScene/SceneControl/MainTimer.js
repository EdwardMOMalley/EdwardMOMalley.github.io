class MainTimer extends Component{
    name = "MainTimer"
    start(){
        this.timeGoal = 60 * 5
        this.currentTime = this.timeGoal
        this.subTimer = frameRate

        this.addListener(GameObject.getObjectByName("MainSceneControllerObject").getComponent("MainSceneController"))
        }

    update(){
        this.subTimer--
            if(this.subTimer <= 0){
            this.currentTime--
            this.subTimer = frameRate
        }
        if(this.currentTime < 0){
            this.updateListeners("TimeVictory")

        }

    }
}
window.MainTimer = MainTimer