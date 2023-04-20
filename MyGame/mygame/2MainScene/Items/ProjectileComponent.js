
import "./ExplosionObject.js"
class ProjectileComponent extends Component {
    constructor(explosive,explosionRadius, damage,pelletNumber, lifespan, targetX, targetY) {
        super()
        this.isExplosive = explosive
        this.explosionRadius = explosionRadius
        this.damage = damage
        this.pelletNumber = pelletNumber
        this.projectileLifespan = lifespan
        this.targetX = targetX
        this.targetY = targetY


    }
    start() {
        this.velocty = {
            x: 1,
            y: 1
        }

        if(this.pelletNumber == 1){
            this.angle = Math.atan2(this.targetY - this.transform.y, this.targetX - this.transform.x)
            this.velocity = {
                x: 10 * Math.cos(this.angle),
                y: 10 * Math.sin(this.angle)
            }

        }
        else if (this.pelletNumber % 2 == 0){
            this.angle = Math.atan2(this.targetY - this.transform.y, this.targetX - this.transform.x)+Math.PI/24
            this.velocity = {
                x: 10 * Math.cos(this.angle),
                y: 10 * Math.sin(this.angle)
            }
        }
        else if(this.pelletNumber % 2 != 0 ){
            this.angle = Math.atan2(this.targetY - this.transform.y, this.targetX - this.transform.x)-Math.PI/24
            this.velocity = {
                x: 10 * Math.cos(this.angle),
                y: 10 * Math.sin(this.angle)
            }

        }

        this.delta = {
            x: 0,
            y: 0
        }
        this.projectileLifespan = 25
        this.enemyController = GameObject.getObjectByName("EnemyControlObject").getComponent("MainEnemyController")

    }

    update() {
        if (!SceneManager.isRunning) {
            return
        }
        this.enemies = this.enemyController.currentEnemies


        this.transform.x += this.velocity.x
        this.transform.y += this.velocity.y
        if (this.projectileLifespan > 0) {
            this.projectileLifespan--
        }
        if (this.projectileLifespan <= 0) {
            if (this.isExplosive) {
                GameObject.instantiate(new ExplosionObject(this.damage,this.explosionRadius,this.transform.x,this.transform.y))
            }
            this.parent.destroy()
        }

        this.enemies.forEach(enemy => {
            if (enemy.getComponent("BossEnemyComponent")) {
                this.delta.x = Math.abs(this.transform.x - (enemy.transform.x))
                this.delta.y = Math.abs(this.transform.y - (enemy.transform.y))
                let distance = Math.sqrt(this.delta.x * this.delta.x + this.delta.y * this.delta.y)
                if (distance <= this.transform.sx + (enemy.transform.sx / 2)) {
                    if (distance <= this.transform.sx + (enemy.transform.sy / 2)) {
                        this.angle = Math.atan2(enemy.transform.y - this.transform.y, enemy.transform.x - this.transform.x)
                        this.velocity = {
                            x: 10 * Math.cos(this.angle),
                            y: 10 * Math.sin(this.angle)
                        }
                        if (this.isExplosive) {
                            GameObject.instantiate(new ExplosionObject(this.damage,this.explosionRadius,this.transform.x, this.transform.y))
                            this.parent.destroy()
    
                        }
                        else {
                            this.send(this, enemy.getComponent("BossEnemyComponent"), "ProjectileHit")
                            this.parent.destroy()
                        }
    
                    }
                }
        }
        if (enemy.getComponent("BasicEnemyComponent")) {
            this.delta.x = Math.abs(this.transform.x - (enemy.transform.x))
            this.delta.y = Math.abs(this.transform.y - (enemy.transform.y))
            let distance = Math.sqrt(this.delta.x * this.delta.x + this.delta.y * this.delta.y)
            if (distance <= this.transform.sx + (enemy.transform.sx / 2)) {
                if (distance <= this.transform.sx + (enemy.transform.sy / 2)) {
                    this.angle = Math.atan2(enemy.transform.y - this.transform.y, enemy.transform.x - this.transform.x)
                    this.velocity = {
                        x: 10 * Math.cos(this.angle),
                        y: 10 * Math.sin(this.angle)
                    }
                    if (this.isExplosive) {
                        GameObject.instantiate(new ExplosionObject(this.damage,this.explosionRadius,this.transform.x, this.transform.y))
                        this.parent.destroy()

                    }
                    else {
                        this.send(this, enemy.getComponent("BasicEnemyComponent"), "ProjectileHit")
                        this.parent.destroy()
                    }

                }
            }
    }


    })

}
}

window.ProjectileComponent = ProjectileComponent