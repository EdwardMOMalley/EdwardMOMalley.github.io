import "./ProjectileObject.js"
class ScattershotComponent extends Component{
    name = "ScattershotComponent"
    start(){
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
        this.nearestDistance = 1000
        this.targetedEnemy = undefined
        this.enemyController = GameObject.getObjectByName("EnemyControlObject").getComponent("MainEnemyController")
        this.upgrades = [
            {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"Damage",upgradeValue:5,upgradeName:"Damage++",upgradeDescription:"Increase damage of Peashooter by 10%"},
            {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"Capacity",upgradeValue:1,upgradeName:"Capacity++",upgradeDescription:"Increase ammo capacity of Peashooter by 10%"},
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
            if (enemy.components[1].distanceToPlayer <= this.range) {
                if(!this.targetedEnemy){
                    this.targetedEnemy = enemy
                }
                if (this.targetedEnemy && enemy.components[1].distanceToPlayer < this.targetedEnemy.components[1].distanceToPlayer) {
                    this.targetedEnemy = enemy
                }
            }
        })
        if(this.targetedEnemy && this.targetedEnemy.components[1].distanceToPlayer > this.range){
            this.targetedEnemy = undefined
        }
        if(this.targetedEnemy && this.targetedEnemy.components[1].hitpoints <= 0){
            this.targetedEnemy = undefined
        }
        if(this.targetedEnemy){
            if(this.fireRateTimer <=0){
                if(this.ammoLoaded > 0){
                    GameObject.instantiate(new ProjectileObject(this.fillStyle,this.isExplosive,1,this.damage,1,this.projectileLifespan,this.transform.x,this.transform.y,this.targetedEnemy.transform.x,this.targetedEnemy.transform.y))
                    GameObject.instantiate(new ProjectileObject(this.fillStyle,this.isExplosive,1,this.damage,2,this.projectileLifespan,this.transform.x,this.transform.y,this.targetedEnemy.transform.x,this.targetedEnemy.transform.y))
                    GameObject.instantiate(new ProjectileObject(this.fillStyle,this.isExplosive,1,this.damage,3,this.projectileLifespan,this.transform.x,this.transform.y,this.targetedEnemy.transform.x,this.targetedEnemy.transform.y))


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

window.ScattershotComponent = ScattershotComponent