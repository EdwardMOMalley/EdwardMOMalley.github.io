class PlayerInventoryComponent extends Component{
    name = "PlayerInventoryComponent"
    primaryUpgrades = []
    start(){
        //Add main weapon to listeners
        this.weapon = this.parent.components[3]

        this.peashooterUpgrades = [
            {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"Damage",upgradeValue:0.1,upgradeName:"Damage++",upgradeDescription:"Increase damage of Peashooter by 10%"},
            {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"Capacity",upgradeValue:0.1,upgradeName:"Capacity++",upgradeDescription:"Increase ammo capacity of Peashooter by 10%"},
            {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"FireRate",upgradeValue:0.1,upgradeName:"FireRate++",upgradeDescription:"Increase Fire rate of Peashooter by 10%"},
            {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"ReloadSpeed",upgradeValue:0.1,upgradeName:"Reload++",upgradeDescrption:"Increase reload speed by 10%"}
        ]

        if(this.parent.components[3].name == "Peashooter"){
            this.primaryUpgrades = this.peashooterUpgrades
        }
    }
    update(){
        this.primaryUpgrades.sort(() => Math.random() - 0.5)

    }

    handleUpdate(component,eventName){
        if(eventName == "ApplyUpgrade"){
            this.primaryUpgrades.sort(() => Math.random() - 0.5)
            if(this.primaryUpgrades[0].upgradeType == "Damage"){
                this.weapon.damage +=Math.round(this.weapon.damage* this.primaryUpgrades[0].upgradeValue)
                console.log("Damage: " + this.weapon.damage)
            }
            if(this.primaryUpgrades[0].upgradeType == "Capacity"){
                this.weapon.capacity +=Math.round(this.weapon.capacity* this.primaryUpgrades[0].upgradeValue)
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


        }

    }

    getUpgrade(){

        return this.primaryUpgrades[0]
        
    }


}

window.PlayerInventoryComponent = PlayerInventoryComponent