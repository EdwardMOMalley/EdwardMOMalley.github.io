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
   
                console.log("Damage: " + this.weapon.damage)
            }
            if(this.primaryUpgrades[0].upgradeType == "Capacity"){
                if(this.primaryUpgrades[0].upgradeValue >= 1){
                    this.weapon.capacity += this.primaryUpgrades[0].upgradeValue
                }
                else{
                    this.weapon.capacity +=Math.round(this.weapon.capacity* this.primaryUpgrades[0].upgradeValue)
                }
                console.log("Capacity: " + this.weapon.capacity)
            }
            if(this.primaryUpgrades[0].upgradeType == "FireRate"){
                this.weapon.fireRate -=Math.round(this.weapon.fireRate* this.primaryUpgrades[0].upgradeValue)
                console.log("FireRate:  " + this.weapon.fireRate)
            }
            if(this.primaryUpgrades[0].upgradeType == "ReloadSpeed"){
                this.weapon.reloadSpeed -= Math.round(this.weapon.reloadSpeed * this.primaryUpgrades[0].upgradeValue)
                console.log("ReloadSpeed: " + this.weapon.reloadSpeed)
            }
            if(this.primaryUpgrades[0].upgradeType == "Radius"){
                this.weapon.explosionRadius += this.weapon.baseExplosionRadius*this.primaryUpgrades[0].upgradeValue
                console.log("Explosion Radius: " + this.weapon.explosionRadius)
            }


        }
        if(eventName == "AutoLaserAquired"){
            console.log("Autolaser")
            
        }
        if(eventName == "ShieldAquired"){
            console.log("shield")
            
        }
        if(eventName == "PulseEmitterAquired"){
            console.log("pulsemitter")
            
        }

    }

    getUpgrade(){

        return this.primaryUpgrades[0]
        
    }


}

window.PlayerInventoryComponent = PlayerInventoryComponent