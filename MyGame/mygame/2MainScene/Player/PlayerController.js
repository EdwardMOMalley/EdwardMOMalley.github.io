class PlayerController extends Component{
    name = "PlayerController"
    start(){
        //Stats
        this.size = 20
        this.speed = 10
        this.level = 1
        this.currentExperience = 0
        this.experienceToLevel = 1
        this.maxHitpoints = 30
        this.hitpoints = this.maxHitpoints
        this.invincible = false
        this.invincibleTimer = 50


        //Transform
        this.transform.x = 0
        this.transform.y = 0
        this.transform.sx = this.size
        this.transform.sy = this.size

        //Required World Information and Listeners
        this.worldSize = GameObject.getObjectByName("FloorObject").getComponent("FloorComponent").size
        this.addListener(GameObject.getObjectByName("MainSceneControllerObject").getComponent("MainSceneController"))
        this.body = this.parent.components[2]
    }

    update(){
        if(!SceneManager.isRunning){
            return
        }
        
        if(this.invincible){
            this.invincibleTimer--
        }
        if(this.invincibleTimer<=0){
            this.body.fillStyle = "gray"
            this.invincibleTimer = 50
            this.invincible = false
        }

        if(this.hitpoints <=0){
            this.updateListeners("PlayerDied")
        }
        if(this.currentExperience >= this.experienceToLevel){
            this.level++
            this.currentExperience = 0
        }

        //Movement
        {
        if(keysDown["w"]){
            this.transform.y -=this.speed
        }
        if(keysDown["s"]){
            this.transform.y +=this.speed
        }
        if(keysDown["a"]){
            this.transform.x -=this.speed
        }
        if(keysDown["d"]){
            this.transform.x +=this.speed
        }
        if(this.transform.x < (-this.worldSize/2)+this.size/2){
            this.transform.x = (-this.worldSize/2)+this.size/2
        }
        if(this.transform.y < (-this.worldSize/2)+this.size/2){
            this.transform.y = (-this.worldSize/2)+this.size/2
        }
        if(this.transform.x > this.worldSize/2-this.size/2){
            this.transform.x = this.worldSize/2-this.size/2
        }
        if(this.transform.y > this.worldSize/2-this.size/2){
            this.transform.y = this.worldSize/2-this.size/2
        }
    }

    }
    handleUpdate(component,eventName){
        if(eventName == "BasicEnemyHit"){
            if(!this.invincible){
                this.hitpoints -=component.damage
                GameObject.instantiate(new DamageTextObject(component.damage,this))
                this.body.fillStyle = "red"
                this.transform.x += component.velocity.x*4
                this.transform.y += component.velocity.y*4
                this.invincible = true
            }

        }
        if(eventName == "ExperiencePickup"){
            this.currentExperience++
            component.parent.destroy()
        }

    }

}
window.PlayerController = PlayerController