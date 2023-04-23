class MainTimer extends Component{
    name = "MainTimer"
    start(){
        this.timeGoal = 60 * 5
        this.currentTime = 0
        this.addListener(GameObject.getObjectByName("MainSceneControllerObject").getComponent("MainSceneController"))
        }

    update(){
        this.currentTime = (this.timeGoal - Time.time).toFixed(1)
        if(this.currentTime < 0){
            this.updateListeners("TimeVictory")
        }
    }
}
window.MainTimer = MainTimer