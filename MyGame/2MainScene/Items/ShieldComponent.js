class ShielComponent extends Component {
    name = "ShieldComponent"
    start() {
        this.damage = 35
        this.shieldSize = 6
        this.shieldRadius = 70
        this.angularVelocity = 0.4
        this.angle = 0
        this.enemyController = GameObject.getObjectByName("EnemyControlObject").getComponent("MainEnemyController")
        this.player = GameObject.getObjectByName("PlayerObject")
        this.centerX = this.player.transform.x
        this.centerY = this.player.transform.y
        this.transform.sx = this.shieldSize
        this.transform.sy = this.shieldSize
        this.upgrades = [
            {isAvaliable:true,weaponType:"shield",upgradeType:"Damage",upgradeValue:0.1,upgradeName:"Damage++",upgradeDescription:"Increases shield damage by 10%"},
            {isAvaliable:true,weaponType:"shield",upgradeType:"Size",upgradeValue:0.1,upgradeName:"Size++",upgradeDescription:"Increases shield size by 10%"},
            {isAvaliable:true,weaponType:"shield",upgradeType:"Radius",upgradeValue:0.1,upgradeName:"Radius++",upgradeDescription:"Increases shield radius by 10%"},
            {isAvaliable:true,weaponType:"shield",upgradeType:"Velocity",upgradeValue:0.1,upgradeName:"Velocity++",upgradeDescrption:"Increases shield velocity by 10%"}
        ]
        this.send(this,GameObject.getObjectByName("PlayerObject").components[4],"SendUpgrades")

        this.delta = {
            x: 0,
            y: 0
        }
    }

    update() {
        if(!SceneManager.isRunning){
            return
        }
        this.velocity = {
            x: 5 * Math.cos(this.angle),
            y: 5 * Math.sin(this.angle)
        }
        this.enemies = this.enemyController.currentEnemies
        this.centerX = this.player.transform.x
        this.centerY = this.player.transform.y
        this.angle += this.angularVelocity
        this.transform.x = this.centerX + this.shieldRadius * Math.cos(this.angle)
        this.transform.y = this.centerY + this.shieldRadius * Math.sin(this.angle)

        this.enemies.forEach(enemy => {
            this.delta.x = Math.abs(this.transform.x - (enemy.transform.x))
            this.delta.y = Math.abs(this.transform.y - (enemy.transform.y))
            let distance = Math.sqrt(this.delta.x*this.delta.x + this.delta.y*this.delta.y)
            
            if(distance < this.transform.sx + (enemy.transform.sx/2)){
                if(distance < this.transform.sx + (enemy.transform.sy/2)){
                    this.send(this,enemy,"ShieldHit")
                }
            }
        })

    }
}

window.ShieldComponent = ShielComponent