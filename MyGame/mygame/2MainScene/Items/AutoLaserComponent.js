class AutoLaserComponent extends Component {
    name = "AutoLaserComponent"
    start() {
        this.targetedEnemy = undefined
        this.damage = 1
        this.closestEnemyDistance = 10000
        this.enemyController = GameObject.getObjectByName("EnemyControlObject").getComponent("MainEnemyController")
        this.player = GameObject.getObjectByName("PlayerObject")
        this.range = 100

    }
    update() {
        if (!SceneManager.isRunning) {
            return
        }
        this.transform.x = this.player.transform.x
        this.transform.y = this.player.transform.y
        if (this.enemyController.currentEnemies) {
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
            this.send(this,this.targetedEnemy.components[1],"LaserHit")
        }



    }

}
window.AutoLaserComponent = AutoLaserComponent