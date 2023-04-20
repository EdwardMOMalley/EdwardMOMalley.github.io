import "./ProjectileObject.js"
class ExplosiveLauncher extends Component{
    name = "ExplosiveLauncher"
    start(){
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
        this.reloadSpeed = 50
        this.reloadTimer = 0
        this.projectileLifespan = 30
        this.isExplosive = true
        this.isReloading = false
        this.nearestDistance = 1000
        this.targetedEnemy = undefined
        this.enemyController = GameObject.getObjectByName("EnemyControlObject").getComponent("MainEnemyController")
        this.upgrades = [
           // {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"Damage",upgradeValue:0.1,upgradeName:"Damage++",upgradeDescription:"Increase damage of Peashooter by 10%"},
            {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"Capacity",upgradeValue:1,upgradeName:"Capacity++",upgradeDescription:"Increase ammo capacity of Peashooter by 10%"},
            {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"Radius",upgradeValue:0.5,upgradeName:"Radius++",upgradeDescription:"Increase explosion radius of Peashooter by 10%"},
            //{isAvaliable:true,weaponType:"MainWeapon",upgradeType:"ReloadSpeed",upgradeValue:0.1,upgradeName:"Reload++",upgradeDescrption:"Increase reload speed by 10%"}
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
        this.nearestDistance = 1000

    }

    handleUpdate(component,eventName){
        console.log(component + "   " + eventName)
        if(eventName == "Upgrade"){
            console.log("here")
            
        }


    }



}

window.ExplosiveLauncher = ExplosiveLauncher


