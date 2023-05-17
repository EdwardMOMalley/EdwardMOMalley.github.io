import "../Items/AutoLaserObject.js"
import "../Items/ShieldObject.js"
import "../Items/PulseEmitterObject.js"
import "../Hud/UpgradeBackgroundObject.js"
class PlayerController extends Component{
    name = "PlayerController"
    start(){
        //Stats
        this.size = 20
        this.speed = 4
        this.level = 1
        this.currentExperience = 0
        this.experienceToLevel = 1
        this.maxHitpoints = 5
        this.hitpoints = this.maxHitpoints
        this.invincible = false
        this.invincibleTimer = 50
        this.xpPickupRange = 100

        this.weapon = this.parent.components[3]


        this.upgrades = [
            {isAvaliable:true,weaponType:"player",upgradeType:"Speed",upgradeValue:0.1,upgradeName:"Speed++",upgradeDescription:"Increase speed by 10%"},
            {isAvaliable:true,weaponType:"player",upgradeType:"Hitpoints",upgradeValue:10,upgradeName:"HP++",upgradeDescription:"Increase total HP by  10"},
            {isAvaliable:true,weaponType:"player",upgradeType:"XpRate",upgradeValue:0.1,upgradeName:"XP++",upgradeDescription:"Increase XP gained by  10%"}, 
            {isAvaliable:true,weaponType:"player",upgradeType:"AutoLaser",upgradeValue:0,upgradeName:"Auto Laser",upgradeDescription:"Aquire a laser that automatically aims and fires at the nearest enemy"},
            {isAvaliable:true,weaponType:"player",upgradeType:"Shield",upgradeValue:0,upgradeName:"Shield",upgradeDescription:"Aquire a shield that rotates around the player, damaging and pushing enemies away"},  
            {isAvaliable:true,weaponType:"player",upgradeType:"PulseEmitter",upgradeValue:0,upgradeName:"Pulse Emitter",upgradeDescription:"Aquire a pulse emitter that shoots waves of energy periodically that push enemies away"},            
          
            
           
        ]


        //Transform
        this.transform.x = 0
        this.transform.y = 0
        this.transform.sx = this.size
        this.transform.sy = this.size

        this.velocity = {
            x: 0,
            y: 0
        }
        this.addedVelocityX = 0
        this.addedVelocityY = 0

        //Required World Information and Listeners
        this.worldSize = GameObject.getObjectByName("FloorObject").getComponent("FloorComponent").size
        this.addListener(GameObject.getObjectByName("MainSceneControllerObject").getComponent("MainSceneController"))
        this.addListener(this.parent.getComponent("PlayerInventoryComponent"))
        this.body = this.parent.components[2]
    }

    update(ctx){

        if(!SceneManager.isRunning){
            return
        }
        
        if(this.invincible){
            this.invincibleTimer--
        }
        if(this.invincibleTimer<=0){
            this.body.fillStyle = this.parent.fillStyle
            this.invincibleTimer = 50
            this.invincible = false
        }

        if(this.hitpoints <=0){
            this.updateListeners("PlayerDied")
        }
        if(this.currentExperience >= this.experienceToLevel){
            this.level++
            this.experienceToLevel +=2
            GameObject.instantiate(new UpgradeBackgroundObject())
            if(this.level == 2){
                this.updateListeners("Autolaser Aquired")

            }
            else if(this.level == 3){
                this.updateListeners("Shield Aquired")

            }
            else if (this.level == 4){
                this.updateListeners("PulseEmitter Aquired")
            }
            else{
                this.updateListeners("ApplyUpgrade")
            }
            this.currentExperience = 0
        }

        //Movement
        {
        if(keysDown["w"]){
            this.velocity.y = -this.speed*1
        }
        if(keysDown["s"]){
            this.velocity.y = this.speed*1
        }
        if(keysDown["a"]){
            this.velocity.x = -this.speed*1
        }
        if(keysDown["d"]){
            this.velocity.x = this.speed*1
        }
        this.transform.x += this.velocity.x +this.addedVelocityX
        this.transform.y += this.velocity.y + this.addedVelocityY
        if(this.velocity.y <=0 && !keysDown["w"]){
            this.velocity.y++
        }
        if(this.velocity.y>0 && !keysDown["s"]){
            this.velocity.y--
        }
        if(this.velocity.x <=0 && !keysDown["a"]){
            this.velocity.x++
        }
        if(this.velocity.x>0 && !keysDown["d"]){
            this.velocity.x--
        }
        if (this.addedVelocityX > 0) {
            this.addedVelocityX -= 0.75
        }
        if (this.addedVelocityY > 0) {
            this.addedVelocityY -= 0.75
        }
        if (this.addedVelocityX < 0) {
            this.addedVelocityX += 0.75
        }
        if (this.addedVelocityY < 0) {
            this.addedVelocityY += 0.75
        }
        if (Math.abs(this.addedVelocityX) < 0.75) {
            this.addedVelocityX = 0
        }
        if (Math.abs(this.addedVelocityY) < 0.75) {
            this.addedVelocityY = 0
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
                GameObject.instantiate(new DamageTextObject(component.damage,this,25,0,"white"))
                this.body.fillStyle = "rgba(256, 48, 46,0.9)"
                this.addedVelocityX += component.velocity.x*4
                this.addedVelocityY += component.velocity.y*4
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