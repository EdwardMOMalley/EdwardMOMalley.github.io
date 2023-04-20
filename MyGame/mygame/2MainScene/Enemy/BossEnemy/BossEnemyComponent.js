import "../../Hud/DamageTextObject.js"
class BossEnemyComponent extends Component{
    name = "BossEnemyComponent"
    start(){
        this.type = "boss"
        this.size = 30
        this.speed = 0.5
        this.damage = 20
        this.maxHitpoints = 500
        this.hitpoints = this.maxHitpoints
        this.hitTimerMax = 6
        this.hitTimer = this.hitTimerMax
        this.delta = {
            x: 0,
            y: 0
        }


        this.worldSize = GameObject.getObjectByName("FloorObject").getComponent("FloorComponent").size
        this.playerLocation = GameObject.getObjectByName("PlayerObject").transform
        this.body = this.parent.getComponent("Rectangle")
        this.transform.sx = this.size
        this.transform.sy = this.size
        this.defaultFill = this.body.fillStyle
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

        this.delta.x = Math.abs(this.transform.x - (this.playerLocation.x))
        this.delta.y = Math.abs(this.transform.y - (this.playerLocation.y))
        this.distanceToPlayer = Math.sqrt(this.delta.x * this.delta.x + this.delta.y * this.delta.y)

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
        if(Math.abs(this.addedVelocityX)<1){
            this.addedVelocityX = 0
        }
        if(Math.abs(this.addedVelocityY)<1){
            this.addedVelocityY = 0
        }
        if(this.addedVelocityX > 0){
            this.addedVelocityX -=1
        }
        if(this.addedVelocityY > 0){
            this.addedVelocityY -= 1
        }
        if(this.addedVelocityX < 0){
            this.addedVelocityX +=1
        }
        if(this.addedVelocityY < 0){
            this.addedVelocityY += 1
        }
        this.transform.x += this.velocity.x
        this.transform.y += this.velocity.y

        if(Math.abs(this.playerLocation.x-this.transform.x) <= (this.playerLocation.sx+this.transform.sx)/2){
            if(Math.abs(this.playerLocation.y-this.transform.y)<(this.playerLocation.sy+this.transform.sy)/2){
                this.updateListeners("BasicEnemyHit")
            }
        }

        if(this.hitpoints <=0){
            this.updateListeners("BossEnemyDestroyed")
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
        if(eventName == "ExplosiveHit"){
            this.hitTimer = 0  
            this.hitpoints -= weapon.damage
            this.addedVelocityX += weapon.velocity.x
            this.addedVelocityY += weapon.velocity.y
            GameObject.instantiate(new DamageTextObject(weapon.damage,this))
        }
        if(eventName == "LaserHit"){
            this.hitpoints -= weapon.damage
           // GameObject.instantiate(new DamageTextObject(weapon.damage,this))

    }
    if(eventName == "EnergyWaveHit"){
        this.addedVelocityX += weapon.velocity.x
        this.addedVelocityY += weapon.velocity.y
    }


    }



}
window.BossEnemyComponent = BossEnemyComponent