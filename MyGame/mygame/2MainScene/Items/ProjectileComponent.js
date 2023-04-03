class ProjectileComponent extends Component{
    constructor(targetX,targetY){
        super()
        this.targetX = targetX
        this.targetY = targetY

    }
    start(){
        this.angle = Math.atan2(this.targetY-this.transform.y,this.targetX-this.transform.x)
        this.velocity = {
            x: 10 * Math.cos(this.angle),
            y:10 * Math.sin(this.angle)
        }
        this.projectileLifespan =25
        this.velocity
        this.damage = 25
        this.enemyController = GameObject.getObjectByName("EnemyControlObject").getComponent("MainEnemyController")

    }

    update(){
        if(!SceneManager.isRunning){
            return
        }
        this.enemies = this.enemyController.currentEnemies


        this.transform.x += this.velocity.x
        this.transform.y += this.velocity.y
        if(this.projectileLifespan >0){
            this.projectileLifespan--
        }
        if(this.projectileLifespan <= 0){
            this.projectileLifespan = 25
            this.parent.destroy()
        }

        this.enemies.forEach(enemy =>{
            if(Math.abs(enemy.transform.x-this.transform.x)<this.transform.sx/2+enemy.transform.sx/2){
                if(Math.abs(enemy.transform.y-this.transform.y)<this.transform.sx/2 +enemy.transform.sy/2){
                    this.send(this,enemy.getComponent("BasicEnemyComponent"),"ProjectileHit")
                    this.parent.destroy()
                }
            }
        })

    }
}

window.ProjectileComponent = ProjectileComponent