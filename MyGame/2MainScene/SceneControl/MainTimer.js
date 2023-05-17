class MainTimer extends Component{
    name = "MainTimer"
    start(){
        this.timeSurvivedThisRun = 0
        this.timeGoal = 50 * 2
        this.currentTime = 0
        this.addListener(GameObject.getObjectByName("MainSceneControllerObject").getComponent("MainSceneController"))

        }

    update(){
        this.currentTime = parseFloat((this.timeGoal - Time.time).toFixed(1))
        StaticVariables.timeSurvivedThisRun = (this.timeGoal - this.currentTime).toFixed(1)
        if(document.cookie){
            if(parseFloat((this.timeGoal - this.currentTime).toFixed(1)) > document.cookie){
                console.log("setting high score")
                document.cookie = parseFloat((this.timeGoal - this.currentTime).toFixed(1))
            }

        }

        if(this.currentTime < 0){
            this.updateListeners("TimeVictory")
        }
    }
}

class StaticVariables{
    static timeSurvivedThisRun
}
window.MainTimer = MainTimer
window.StaticVariables = StaticVariables