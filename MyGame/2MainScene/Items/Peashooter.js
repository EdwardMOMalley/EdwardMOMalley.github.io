import "./WeaponTemplate.js"

class Peashooter extends WeaponTemplate{

    constructor(){
        super()
        this.name = "Peashooter"
        this.fillStyle = "#E1C16E"
        this.fireRate = 20
        this.fireRateTimer = 0
        this.capacity = 6
        this.damage = 25
        this.range = 150
        this.pellets = 1
        this.ammoLoaded = this.capacity
        this.reloadSpeed = 50
        this.reloadTimer = 0
        this.projectileLifespan = 25
        this.isExplosive = false
        this.isReloading = false
    }
}

window.Peashooter = Peashooter


