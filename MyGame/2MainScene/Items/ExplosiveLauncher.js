import "./WeaponTemplate.js"
class ExplosiveLauncher extends WeaponTemplate{
    constructor(){
        super()
        this.name = "ExplosiveLauncher"
        this.fillStyle = "#000000"
        this.fireRate = 20
        this.fireRateTimer = 0
        this.capacity = 1
        this.damage = 50
        this.baseExplosionRadius = 50
        this.explosionRadius = this.baseExplosionRadius
        this.range = 200
        this.pellets = 1
        this.ammoLoaded = this.capacity
        this.reloadSpeed = 125
        this.reloadTimer = 0
        this.projectileLifespan = 30
        this.isExplosive = true
        this.isReloading = false
        this.nearest = 10000
    }
    start(){

        this.targetedEnemy = undefined
        this.enemyController = GameObject.getObjectByName("EnemyControlObject").getComponent("MainEnemyController")
        this.upgrades = [
            {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"Damage",upgradeValue:0.1,upgradeName:"Damage++",upgradeDescription:"Increase damage of Peashooter by 10%"},
            {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"Capacity",upgradeValue:1,upgradeName:"Capacity++",upgradeDescription:"Increase ammo capacity of Peashooter by 10%"},
            {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"Radius",upgradeValue:0.5,upgradeName:"Radius++",upgradeDescription:"Increase explosion radius of Explosive Launcher by 50%"},
            {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"ReloadSpeed",upgradeValue:0.1,upgradeName:"Reload++",upgradeDescrption:"Increase reload speed by 10%"}
        ]
    }

    update(){
        if (!SceneManager.isRunning) {
            return
        }
        if(this.enemyController.currentEnemies){
            this.enemies = this.enemyController.currentEnemies
        }



        this.enemies.forEach(enemy => {
            if (enemy.distanceToPlayer <= this.range) {
                if(!this.targetedEnemy){
                    this.targetedEnemy = enemy
                    this.nearest = this.targetedEnemy.distanceToPlayer
                }
                if (this.targetedEnemy && enemy.distanceToPlayer < this.targetedEnemy.distanceToPlayer) {
                    this.targetedEnemy = enemy
                    this.nearest = this.targetedEnemy.distanceToPlayer
                }
            }
        })
        if(this.targetedEnemy && this.targetedEnemy.distanceToPlayer > this.range){
            this.targetedEnemy = undefined
        }
        if(this.targetedEnemy && this.targetedEnemy.hitpoints <= 0){
            this.targetedEnemy = undefined
        }
        if(this.targetedEnemy){
            if(this.fireRateTimer <=0){
                if(this.ammoLoaded > 0){
                    GameObject.instantiate(new ProjectileObject(this.fillStyle,this.isExplosive,this.explosionRadius,this.damage,this.pellets,this.projectileLifespan,this.transform.x,this.transform.y,this.targetedEnemy.transform.x,this.targetedEnemy.transform.y))
                    this.ammoLoaded--
                    this.fireRateTimer = this.fireRate
                }
            }
        }
        if(this.ammoLoaded <=0){
            this.reloadTimer++
            this.isReloading = true
            if(this.reloadTimer >=this.reloadSpeed){
                this.ammoLoaded = this.capacity
                this.reloadTimer = 0
                this.isReloading = false
            }
        }
        this.fireRateTimer--
        //this.targetedEnemy = undefined
    }

    handleUpdate(component,eventName){
        console.log(component + "   " + eventName)
        if(eventName == "Upgrade"){
            console.log("here")
            
        }


    }



}

window.ExplosiveLauncher = ExplosiveLauncher


