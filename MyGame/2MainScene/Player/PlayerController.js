import "../Items/AutoLaserObject.js"
import "../Items/ShieldObject.js"
import "../Items/PulseEmitterObject.js"
import "../Hud/UpgradeBackgroundObject.js"
import Time from "../../../engine/Time.js"
class PlayerController extends Component{
    name = "PlayerController"
    start(){
        //Stats
        this.size = 20
        this.speed = 4 * 1/Time.deltaTime
        this.level = 1
        this.currentExperience = 0
        this.experienceToLevel = 1
        this.maxHitpoints = 30
        this.hitpoints = this.maxHitpoints
        this.invincible = false
        this.invincibleTimer = 50
        this.xpPickupRange = 100

        this.weapon = this.parent.components[3]
        this.hasAutoLaser = false
        this.hasShield = false
        this.hasPulseEmitter = false

        this.upgrades = [
            {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"Damage",upgradeValue:0.1,upgradeName:"Damage++",upgradeDescription:"Increase damage of Peashooter by 10%"},
            {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"Capacity",upgradeValue:0.1,upgradeName:"Capacity++",upgradeDescription:"Increase ammo capacity of Peashooter by 10%"},
            {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"FireRate",upgradeValue:0.1,upgradeName:"FireRate++",upgradeDescription:"Increase Fire rate of Peashooter by 10%"},
            {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"ReloadSpeed",upgradeValue:0.1,upgradeName:"Reload++",upgradeDescrption:"Increase reload speed by 10%"}
        ]


        //Transform
        this.transform.x = 0
        this.transform.y = 0
        this.transform.sx = this.size
        this.transform.sy = this.size

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
            GameObject.instantiate(new UpgradeBackgroundObject())
            if(this.level == 2){
                this.updateListeners("Autolaser Aquired")
                GameObject.instantiate(new AutoLaserObject())
            }
            else if(this.level == 3){
                this.updateListeners("Sheild Aquired")
                GameObject.instantiate(new ShieldObject())
            }
            else if (this.level == 4){
                this.updateListeners("PulseEmitterAquired")
                GameObject.instantiate(new PulseEmitterObject())
            }
            else{
                this.updateListeners("ApplyUpgrade")
            }
            this.currentExperience = 0
        }

        //Movement
        {
        if(keysDown["w"]){
            this.transform.y -=this.speed * Time.deltaTime
        }
        if(keysDown["s"]){
            this.transform.y +=this.speed* Time.deltaTime
        }
        if(keysDown["a"]){
            this.transform.x -=this.speed* Time.deltaTime
        }
        if(keysDown["d"]){
            this.transform.x +=this.speed* Time.deltaTime
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
                this.body.fillStyle = "rgba(256, 48, 46,0.9)"
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