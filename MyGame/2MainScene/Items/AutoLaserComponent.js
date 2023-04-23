class AutoLaserComponent extends Component {
    name = "AutoLaserComponent"
    start() {
        this.targetedEnemy = undefined
        this.damage = 1
        this.closestEnemyDistance = 10000
        this.enemyController = GameObject.getObjectByName("EnemyControlObject").getComponent("MainEnemyController")
        this.player = GameObject.getObjectByName("PlayerObject")
        this.range = 100
        this.upgrades = [
            {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"Damage",upgradeValue:0.1,upgradeName:"Damage++",upgradeDescription:"Increase damage of Peashooter by 10%"},
            {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"Capacity",upgradeValue:0.1,upgradeName:"Capacity++",upgradeDescription:"Increase ammo capacity of Peashooter by 10%"},
            {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"FireRate",upgradeValue:0.1,upgradeName:"FireRate++",upgradeDescription:"Increase Fire rate of Peashooter by 10%"},
            {isAvaliable:true,weaponType:"MainWeapon",upgradeType:"ReloadSpeed",upgradeValue:0.1,upgradeName:"Reload++",upgradeDescrption:"Increase reload speed by 10%"}
        ]

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