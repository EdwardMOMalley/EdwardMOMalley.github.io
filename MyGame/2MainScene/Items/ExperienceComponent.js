

class ExperienceComponent extends Component{
    name = "ExperienceComponent"
    start(){
        this.playerLocation = GameObject.getObjectByName("PlayerObject").transform
        this.player = GameObject.getObjectByName("PlayerObject").getComponent("PlayerController")
        this.speed = this.player.speed*1.5
        this.addListener(this.player)
        this.delta = {
            x: 0,
            y: 0
        }
        this.distanceToPlayer
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

        this.delta.x = Math.abs(this.transform.x - (this.playerLocation.x))
        this.delta.y = Math.abs(this.transform.y - (this.playerLocation.y))
        this.distanceToPlayer = Math.sqrt(this.delta.x * this.delta.x + this.delta.y * this.delta.y)
        if(this.distanceToPlayer <= this.player.xpPickupRange){
            this.transform.x += this.velocity.x
            this.transform.y += this.velocity.y
        }
        if(this.distanceToPlayer <= this.player.size){
                this.updateListeners("ExperiencePickup")
            }

}

}
window.ExperienceComponent = ExperienceComponent