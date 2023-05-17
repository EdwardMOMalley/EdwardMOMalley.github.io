class AutoLaserComponent extends Component {
    name = "AutoLaserComponent"
    start() {
        this.targetedEnemy = undefined
        this.damage = 3
        this.closestEnemyDistance = 10000
        this.enemyController = GameObject.getObjectByName("EnemyControlObject").getComponent("MainEnemyController")
        this.player = GameObject.getObjectByName("PlayerObject")
        this.range = 100
        this.upgrades = [
            {isAvaliable:true,weaponType:"laser",upgradeType:"Damage",upgradeValue:1,upgradeName:"Damage++",upgradeDescription:"Increase the per-tick damage of Autolaser by 1"},
            {isAvaliable:true,weaponType:"laser",upgradeType:"Range",upgradeValue:0.1,upgradeName:"Range++",upgradeDescription:"Increase the range of Autolaser by 10%"},
        ]
        this.send(this,GameObject.getObjectByName("PlayerObject").components[4],"SendUpgrades")

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
            this.send(this,this.targetedEnemy,"LaserHit")
        }



    }

}
window.AutoLaserComponent = AutoLaserComponent