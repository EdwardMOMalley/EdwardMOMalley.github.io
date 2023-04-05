class MainTimer extends Component{
    name = "MainTimer"
    start(){
        this.timeGoal = 60
        this.currentTime = this.timeGoal
        this.subTimer = 0

        this.addListener(GameObject.getObjectByName("MainSceneControllerObject").getComponent("MainSceneController"))
        }

    update(){
        this.subTimer++
            if(this.subTimer >= 25){
            this.currentTime--
            this.subTimer = 0
        }
        if(this.currentTime < 0){
            this.updateListeners("TimeVictory")

        }

    }
}
window.MainTimer = MainTimer