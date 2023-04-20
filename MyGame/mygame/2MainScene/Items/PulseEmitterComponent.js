import "./EnergyWaveObject.js"
class PulseEmitterComponent extends Component{
    name = "PulseEmitterComponent"
    start(){
        this.pulseFrequency = 220
        this.pulseTimer = 0
        this.pulseDamage = 0
        this.pulseLifespan = 200
        this.pulseRadius = 200
        this.upgrades = [
            {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"Damage",upgradeValue:0.1,upgradeName:"Damage++",upgradeDescription:"Increase damage of Peashooter by 10%"},
            {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"Capacity",upgradeValue:0.1,upgradeName:"Capacity++",upgradeDescription:"Increase ammo capacity of Peashooter by 10%"},
            {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"FireRate",upgradeValue:0.1,upgradeName:"FireRate++",upgradeDescription:"Increase Fire rate of Peashooter by 10%"},
            {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"ReloadSpeed",upgradeValue:0.1,upgradeName:"Reload++",upgradeDescrption:"Increase reload speed by 10%"}
        ]

    }
    update(){
        this.pulseTimer++
        if(this.pulseTimer >= this.pulseFrequency){
            GameObject.instantiate(new EnergyWaveObject(this.pulseDamage,this.pulseLifespan,this.pulseRadius))
            this.pulseTimer = 0
        }
        

    }
}
window.PulseEmitterComponent = PulseEmitterComponent