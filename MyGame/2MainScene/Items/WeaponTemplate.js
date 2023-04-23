import "./ProjectileObject.js"
class WeaponTemplate extends Component{
    name = "Peashooter"
    fillStyle = "#E1C16E"
    fireRate = 20
    fireRateTimer = 0
    capacity = 6
    damage = 25
    range = 150
    pellets = 1
    ammoLoaded = this.capacity
    reloadSpeed = 50
    reloadTimer = 0
    projectileLifespan = 25
    isExplosive = false
    isReloading = false
    start(){
        this.nearestDistance = 1000
        this.targetedEnemy = undefined
        this.enemyController = GameObject.getObjectByName("EnemyControlObject").getComponent("MainEnemyController")
        this.upgrades = [
            {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"Damage",upgradeValue:0.1,upgradeName:"Damage++",upgradeDescription:"Increase damage of Peashooter by 10%"},
            {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"Capacity",upgradeValue:0.1,upgradeName:"Capacity++",upgradeDescription:"Increase ammo capacity of Peashooter by 10%"},
            {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"FireRate",upgradeValue:0.1,upgradeName:"FireRate++",upgradeDescription:"Increase Fire rate of Peashooter by 10%"},
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
                }
                if (this.targetedEnemy && enemy.distanceToPlayer < this.targetedEnemy.distanceToPlayer) {
                    this.targetedEnemy = enemy
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
                    for(let i = 1; i < this.pellets+1; i++){
                        GameObject.instantiate(new ProjectileObject(this.fillStyle,this.isExplosive,1,this.damage,i,this.projectileLifespan,this.transform.x,this.transform.y,this.targetedEnemy.transform.x,this.targetedEnemy.transform.y))
                    }
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
        this.nearestDistance = 1000

    }

    handleUpdate(component,eventName){
        console.log(component + "   " + eventName)
        if(eventName == "Upgrade"){
            console.log("here")
            
        }


    }



}

window.WeaponTemplate = WeaponTemplate


