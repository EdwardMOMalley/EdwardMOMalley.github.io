import "./ProjectileObject.js"
class Peashooter extends Component{
    name = "Peashooter"
    start(){
        this.fireRate = 20
        this.fireRateTimer = 0
        this.capacity = 6
        this.damage = 25
        this.range = 150
        this.ammoLoaded = this.capacity
        this.reloadSpeed = 50
        this.reloadTimer = 0
        this.projectileLifespan = 25
        this.isExplosive = true
        this.isReloading = false
        this.nearestDistance = 1000
        this.targetedEnemy = undefined
        this.enemyController = GameObject.getObjectByName("EnemyControlObject").getComponent("MainEnemyController")
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
                    GameObject.instantiate(new ProjectileObject(this.isExplosive,this.damage,this.projectileLifespan,this.transform.x,this.transform.y,this.targetedEnemy.transform.x,this.targetedEnemy.transform.y))
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

window.Peashooter = Peashooter


