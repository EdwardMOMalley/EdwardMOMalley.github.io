import "../../Hud/DamageTextObject.js"
class BasicEnemyComponent extends Component{
    name = "BasicEnemyComponent"
    start(){
        this.size = 15
        this.speed = 1
        this.damage = 10
        this.maxHitpoints = 50
        this.hitpoints = this.maxHitpoints
        this.hitTimerMax = 5
        this.hitTimer = this.hitTimerMax



        this.worldSize = GameObject.getObjectByName("FloorObject").getComponent("FloorComponent").size
        this.playerLocation = GameObject.getObjectByName("PlayerObject").transform
        this.body = this.parent.getComponent("Rectangle")
        this.defaultFill = this.body.fillStyle
        
        this.transform.sx = this.size
        this.transform.sy = this.size
        //this.transform.x = Math.floor(Math.random()*this.worldSize/2)
        //this.transform.y = Math.floor(Math.random()*(this.worldSize/2)-this.size/2)
        this.addedVelocityX = 0
        this.addedVelocityY = 0

        this.addListener(GameObject.getObjectByName("PlayerObject").getComponent("PlayerController"))
        this.addListener(GameObject.getObjectByName("EnemyControlObject").getComponent("MainEnemyController"))
        this.addListener(GameObject.getObjectByName("EnemyControlObject").getComponent("EnemySpawnerComponent"))
        this.updateListeners("BasicEnemySpawned")
    }

    update(){

        if(!SceneManager.isRunning){
            return
        }
        if(this.hitTimer < this.hitTimerMax){
            this.body.fillStyle = "red"
            this.hitTimer++
        }
        if(this.hitTimer >= this.hitTimerMax){
            this.body.fillStyle = this.defaultFill
        }

        this.angle = Math.atan2(this.playerLocation.y-this.transform.y,this.playerLocation.x-this.transform.x)
        this.velocity = {
            x: (this.speed * Math.cos(this.angle))+ this.addedVelocityX,
            y: (this.speed * Math.sin(this.angle))+ this.addedVelocityY
        }
        if(Math.abs(this.addedVelocityX)<0.75){
            this.addedVelocityX = 0
        }
        if(Math.abs(this.addedVelocityY)<0.75){
            this.addedVelocityY = 0
        }
        if(this.addedVelocityX > 0){
            this.addedVelocityX -=0.75
        }
        if(this.addedVelocityY > 0){
            this.addedVelocityY -= 0.75
        }
        if(this.addedVelocityX < 0){
            this.addedVelocityX +=0.75
        }
        if(this.addedVelocityY < 0){
            this.addedVelocityY += 0.75
        }
        this.transform.x += this.velocity.x
        this.transform.y += this.velocity.y

        if(Math.abs(this.playerLocation.x-this.transform.x) <= (this.playerLocation.sx+this.transform.sx)/2){
            if(Math.abs(this.playerLocation.y-this.transform.y)<(this.playerLocation.sy+this.transform.sy)/2){
                this.updateListeners("BasicEnemyHit")
            }
        }

        if(this.hitpoints <=0){
            this.updateListeners("BasicEnemyDestroyed")
            this.parent.destroy()
        }


    }
    recieveMessage(weapon,eventName){
        if(eventName == "ProjectileHit"){
            if(this.hitTimer == this.hitTimerMax){
                this.hitTimer = 0
                this.hitpoints -=weapon.damage
                this.addedVelocityX +=weapon.velocity.x*0.75
                this.addedVelocityY += weapon.velocity.y*0.75
                GameObject.instantiate(new DamageTextObject(weapon.damage,this))
            }
        }
        if(eventName == "ShieldHit"){
            if(this.hitTimer == this.hitTimerMax){
                this.hitTimer = 0
                this.hitpoints -= weapon.damage
                this.addedVelocityX += weapon.velocity.x
                this.addedVelocityY += weapon.velocity.y
                GameObject.instantiate(new DamageTextObject(weapon.damage,this))
            }

        }

    }



}
window.BasicEnemyComponent = BasicEnemyComponent