class EnergyWaveComponent extends Component{
    constructor(damage,lifespan,radius){
        super()
        this.damage = damage
        this.lifespan = lifespan
        this.maxRadius = radius
    }
    name = "EnergyWaveComponent"
 
    start(){
        this.timeAlive = 0
        this.enemyController = GameObject.getObjectByName("EnemyControlObject").getComponent("MainEnemyController")
        this.player = GameObject.getObjectByName("PlayerObject").getComponent("PlayerController")
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
        this.transform.x = this.player.transform.x
        this.transform.y = this.player.transform.y
        this.transform.sx = this.maxRadius*(this.timeAlive/this.lifespan)
        this.enemies = this.enemyController.currentEnemies
        this.enemies.forEach(enemy => {
            this.delta.x = Math.abs(this.transform.x - (enemy.transform.x))
            this.delta.y = Math.abs(this.transform.y - (enemy.transform.y))
            let distance = Math.sqrt(this.delta.x*this.delta.x + this.delta.y*this.delta.y)
            
            if(distance < this.transform.sx + (enemy.transform.sx/2)){
                if(distance < this.transform.sx + (enemy.transform.sy/2)){
                    this.angle = Math.atan2(enemy.transform.y - this.transform.y,enemy.transform.x - this.transform.x)
                    this.velocity = {
                        x: this.maxRadius*2/this.lifespan * Math.cos(this.angle),
                        y: this.maxRadius*2/this.lifespan* Math.sin(this.angle)
                    }
                        this.send(this,enemy,"EnergyWaveHit")
                }
            }
        })

        if(this.timeAlive >= this.lifespan){
            this.parent.destroy()
        }

    }
}
window.EnergyWaveComponent = EnergyWaveComponent