import "./WeaponTemplate.js"
class ScattershotComponent extends WeaponTemplate{

    constructor(){
        super()
        this.name = "ScattershotComponent"
        this.fillStyle = "#edb83b"
        this.fireRate = 10
        this.fireRateTimer = 0
        this.capacity = 2
        this.damage = 10
        this.range = 125
        this.ammoLoaded = this.capacity
        this.reloadSpeed = 30
        this.reloadTimer = 0
        this.projectileLifespan = 20
        this.isExplosive = false
        this.isReloading = false
    }
    
}
window.ScattershotComponent = ScattershotComponent