class ExperienceComponent extends Component{
    name = "ExperienceComponent"
    start(){
        this.playerLocation = GameObject.getObjectByName("PlayerObject").transform
        this.player = GameObject.getObjectByName("PlayerObject")
        this.speed = this.player.getComponent("PlayerController").speed*1.1
        this.addListener(GameObject.getObjectByName("PlayerObject").getComponent("PlayerController"))
    }
    update(){
        if(!SceneManager.isRunning){
            return
        }

        this.angle = Math.atan2(this.player.transform.y-this.transform.y,this.player.transform.x-this.transform.x)
        this.velocity = {
            x: this.speed * Math.cos(this.angle),
            y:this.speed * Math.sin(this.angle)
        }

        if(Math.abs(this.playerLocation.x+this.transform.x - this.playerLocation.x*2)<this.transform.sx/2 + (this.player.transform.sx/2)*6){
            if(Math.abs(this.playerLocation.y+this.transform.y - this.playerLocation.y*2)<this.transform.sy/2 + (this.player.transform.sy/2)*6){
                this.transform.x += this.velocity.x
                this.transform.y += this.velocity.y
            }

        }
        if(Math.abs(this.playerLocation.x+this.transform.x - this.playerLocation.x*2)<this.transform.sx/2 + (this.player.transform.sx/2)){
            if(Math.abs(this.playerLocation.y+this.transform.y - this.playerLocation.y*2)<this.transform.sy/2 + (this.player.transform.sy/2)){
                this.updateListeners("ExperiencePickup")
            }
        }
    
}

}
window.ExperienceComponent = ExperienceComponent