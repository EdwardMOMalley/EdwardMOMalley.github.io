class ExplosionComponent extends Component{
    name = "ExplosionComponent"
    constructor(damage,radius){
        super()
        this.damage = damage
        this.radius = radius

    }
    start(){
        this.timeAlive = 1
        this.lifeSpan = 10
        this.transform.sx = 5
        this.maxSize = this.radius
        this.enemyController = GameObject.getObjectByName("EnemyControlObject").getComponent("MainEnemyController")
        this.delta = {
            x: 0,
            y: 0
        }
        

    }

    update(){
        if (!SceneManager.isRunning) {
            return
        }
        this.timeAlive++
        if(this.timeAlive >= this.lifeSpan){
            this.parent.destroy()
        }
        this.transform.sx = this.maxSize*(this.timeAlive/this.lifeSpan)
        this.parent.components[2].greenval = 256 - 256*(this.timeAlive/this.lifeSpan)

        this.enemies = this.enemyController.currentEnemies
        this.enemies.forEach(enemy => {
            this.delta.x = Math.abs(this.transform.x - (enemy.transform.x))
            this.delta.y = Math.abs(this.transform.y - (enemy.transform.y))
            let distance = Math.sqrt(this.delta.x*this.delta.x + this.delta.y*this.delta.y)
            if(distance < this.transform.sx + (enemy.transform.sx/2)){
                if(distance < this.transform.sx + (enemy.transform.sy/2)){
                    this.angle = Math.atan2(enemy.transform.y - this.transform.y,enemy.transform.x - this.transform.x)
                    this.velocity = {
                        x: 10 * Math.cos(this.angle),
                        y: 10 * Math.sin(this.angle)
                    }
                        this.send(this,enemy,"ExplosiveHit")
                }
            }
        })

    }
    //currentsize = MaxSize * (timealive/lifespawn)


}
window.ExplosionComponent = ExplosionComponent