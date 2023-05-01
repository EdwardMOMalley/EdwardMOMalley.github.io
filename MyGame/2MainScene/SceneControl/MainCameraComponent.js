class MainCameraComponent extends Component{
    start(){
        this.parent.transform.x = 0
        this.parent.transform.y = 0
        this.parent.transform.sx = 1
    }
    update(){
        if(!SceneManager.isRunning){
            return
        }
        let player = GameObject.getObjectByName("PlayerObject").getComponent("PlayerController")
        let maxDifference = 10;
         let differenceX = player.transform.x - this.transform.x
         let differenceY = player.transform.y - this.transform.y
  
        if (differenceX > maxDifference) {
            this.transform.x += .1 * (differenceX - maxDifference)
        }
        else if (differenceX < -maxDifference) {
            this.transform.x += .1 * (differenceX + maxDifference)
        }
        if (differenceX > maxDifference) {
            this.transform.x += .1 * (differenceX - maxDifference)
        }
        else if (differenceX < -maxDifference) {
            this.transform.x += .1 * (differenceX + maxDifference)
        }

        if (differenceY > maxDifference) {
            this.transform.y += .1 * (differenceY - maxDifference)
        }
        else if (differenceY < -maxDifference) {
            this.transform.y += .1 * (differenceY + maxDifference)
        }
        if (differenceY > maxDifference) {
            this.transform.y += .1 * (differenceY - maxDifference)
        }
        else if (differenceY < -maxDifference) {
            this.transform.y += .1 * (differenceY + maxDifference)
        }


    }
    
}
window.MainCameraComponent = MainCameraComponent