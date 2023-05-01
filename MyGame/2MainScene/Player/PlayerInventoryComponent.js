import "../Hud/DamageTextObject.js"
import "../Items/AutoLaserObject.js"
import "../Items/PulseEmitterObject.js"
import "../Items/ShieldObject.js"
class PlayerInventoryComponent extends Component{
    name = "PlayerInventoryComponent"
    start(){
        
        //Main weapon and main weapon upgrades
        this.weapon = this.parent.components[3]
        this.primaryUpgrades = this.weapon.upgrades

        //Player upgrades include speed, hp, playersize
        this.player = this.parent.components[1]
        this.playerUpgrades = this.player.upgrades

        //Items include autolaser, shield, pulsewave?
        this.itemUpgrades = []

        this.masterUpgrades = []

        for(let upgrade of this.primaryUpgrades){
            this.masterUpgrades.push(upgrade)
        }
        for(let upgrade of this.playerUpgrades){
            this.masterUpgrades.push(upgrade)
        }

    }
    update(){

    }
    handleUpdate(component,eventName){
        if(eventName == "ApplyUpgrade"){
            this.primaryUpgrades.sort(() => Math.random() - 0.5)
            if(this.primaryUpgrades[0].upgradeType == "Damage"){
                if(this.primaryUpgrades[0].upgradeValue >= 1){
                    this.weapon.damage +=this.primaryUpgrades[0].upgradeValue
                }
                else{
                    this.weapon.damage +=Math.round(this.weapon.damage* this.primaryUpgrades[0].upgradeValue)
                }
   
                GameObject.instantiate(new DamageTextObject(this.primaryUpgrades[0].upgradeName,this,50,50,"purple"))
                console.log("Damage: " + this.weapon.damage)
            }
            if(this.primaryUpgrades[0].upgradeType == "Capacity"){
                if(this.primaryUpgrades[0].upgradeValue >= 1){
                    this.weapon.capacity += this.primaryUpgrades[0].upgradeValue
                }
                else{
                    this.weapon.capacity +=Math.round(this.weapon.capacity* this.primaryUpgrades[0].upgradeValue)
                }
                GameObject.instantiate(new DamageTextObject(this.primaryUpgrades[0].upgradeName,this,50,50,"purple"))
                console.log("Capacity: " + this.weapon.capacity)
            }
            if(this.primaryUpgrades[0].upgradeType == "FireRate"){
                this.weapon.fireRate -=Math.round(this.weapon.fireRate* this.primaryUpgrades[0].upgradeValue)
                GameObject.instantiate(new DamageTextObject(this.primaryUpgrades[0].upgradeName,this,50,50,"purple"))
                console.log("FireRate:  " + this.weapon.fireRate)
            }
            if(this.primaryUpgrades[0].upgradeType == "ReloadSpeed"){
                this.weapon.reloadSpeed -= Math.round(this.weapon.reloadSpeed * this.primaryUpgrades[0].upgradeValue)
                GameObject.instantiate(new DamageTextObject(this.primaryUpgrades[0].upgradeName,this,50,50,"purple"))
                console.log("ReloadSpeed: " + this.weapon.reloadSpeed)
            }
            if(this.primaryUpgrades[0].upgradeType == "Radius"){
                this.weapon.explosionRadius += this.weapon.baseExplosionRadius*this.primaryUpgrades[0].upgradeValue
                GameObject.instantiate(new DamageTextObject(this.primaryUpgrades[0].upgradeName,this,50,50,"purple"))
                console.log("Explosion Radius: " + this.weapon.explosionRadius)
            }


        }

        if(eventName == "Autolaser Aquired"){
            GameObject.instantiate(new DamageTextObject("Autolaser Aquired!",this,50,50,"blue"))
            GameObject.instantiate(new AutoLaserObject())
            
        }
        if(eventName == "Shield Aquired"){
            GameObject.instantiate(new DamageTextObject("Shield Aquired",this,50,50,"blue"))
            GameObject.instantiate(new ShieldObject())
            
        }
        if(eventName == "PulseEmitter Aquired"){
            GameObject.instantiate(new DamageTextObject("Pulse Emitter Aquired!",this,50,50,"blue"))
            GameObject.instantiate(new PulseEmitterObject())
            
        }

    }

    getUpgrade(){

        return this.primaryUpgrades[0]
        
    }

    recieveMessage(weapon, eventName) {
        if(eventName == "SendUpgrades"){
            for(let upgrade of weapon.upgrades){
                this.masterUpgrades.push(upgrade)
            }
            this.masterUpgrades.sort(() => Math.random() - 0.5)
            console.log(this.masterUpgrades)
        }
    }


}

window.PlayerInventoryComponent = PlayerInventoryComponent