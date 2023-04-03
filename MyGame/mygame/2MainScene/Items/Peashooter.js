import "./ProjectileObject.js"
class Peashooter extends Component{
    name = "Peashooter"
    start(){
        this.fireRate = 20
        this.fireRateTimer = 0
        this.capacity = 6
        this.ammoLoaded = this.capacity
        this.reloadSpeed = 50
        this.reloadTimer = 0
        this.nearestDistance = 1000
        this.targetedEnemy
    }

    update(){

        this.enemies = GameObject.getObjectByName("EnemyControlObject").getComponent("MainEnemyController").currentEnemies

        this.enemies.forEach(enemy =>{
            let distance = Math.abs(this.transform.x-enemy.transform.y)+Math.abs(this.transform.y-enemy.transform.y)
            if( distance < this.nearestDistance){
                this.nearestDistance = distance
                this.targetedEnemy = enemy
            }
        
        })
        if(this.targetedEnemy){
            if(this.fireRateTimer >=this.fireRate){
                if(this.ammoLoaded > 0){
                    GameObject.instantiate(new ProjectileObject(this.transform.x,this.transform.y,this.targetedEnemy.transform.x,this.targetedEnemy.transform.y))
                    this.ammoLoaded--
                    this.fireRateTimer = 0
                }
            }
        }
        if(this.ammoLoaded <=0){
            this.reloadTimer++
            if(this.reloadTimer >=this.reloadSpeed){
                this.ammoLoaded = this.capacity
                this.reloadTimer = 0
            }
        }
        this.fireRateTimer++
        this.targetedEnemy = undefined
        this.nearestDistance = 1000

    }



}

window.Peashooter = Peashooter


