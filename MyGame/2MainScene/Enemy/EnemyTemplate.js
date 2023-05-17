class EnemyTemplate extends Component {
    name = "EnemyTemplate"
    type = "basic"
    fillStyle = "rgba(61, 7, 9,1)"
    size = 15
    speed = 3
    damage = 10
    maxHitpoints = 50
    hitpoints = this.maxHitpoints
    hitTimer = 0
    pulseHitTimer = 0
    distanceToPlayer = undefined
    lastDamageSource = undefined
    hitMessage = "EnemyTemplateHit"
    deadMessage = "EnemyTemplateDestroyed"
    deadMessageSmall = "SmallEnemyTemplateDestroyed"
    
    start() {
        this.worldSize = GameObject.getObjectByName("FloorObject").getComponent("FloorComponent").size
        this.playerLocation = GameObject.getObjectByName("PlayerObject").transform
        this.enemySpawner = GameObject.getObjectByName("EnemyControlObject").getComponent("EnemySpawnerComponent")
        if((this.enemySpawner.timeRatio) < 0.5){
            if(this.type == "basic"){
                this.maxHitpoints = 5
                this.size = 11
                this.speed = 4
                this.fillStyle = "rgba(44, 7, 9,1)"
            }
        }
        else{
            this.maxHitpoints = (1-this.enemySpawner.timeRatio)*this.maxHitpoints + this.maxHitpoints
        }
        this.hitpoints = this.maxHitpoints
        this.body = this.parent.getComponent("Rectangle")
        this.defaultFill = this.body.fillStyle
        this.transform.sx = this.size
        this.transform.sy = this.size
        this.addedVelocityX = 0
        this.addedVelocityY = 0
        this.pulseVelocityX = 0
        this.pulseVelocityY = 0
        this.dampenerValX = 1
        this.dampenerValY = 1
        this.delta = {
            x: 0,
            y: 0
        }

        this.addListener(GameObject.getObjectByName("PlayerObject").getComponent("PlayerController"))
        this.addListener(GameObject.getObjectByName("EnemyControlObject").getComponent("MainEnemyController"))
        this.addListener(this.enemySpawner)
        this.updateListeners("BasicEnemySpawned")
    }

    update() {


        if (!SceneManager.isRunning) {
            return
        }
        this.delta.x = Math.abs(this.transform.x - (this.playerLocation.x))
        this.delta.y = Math.abs(this.transform.y - (this.playerLocation.y))
        this.distanceToPlayer = Math.sqrt(this.delta.x * this.delta.x + this.delta.y * this.delta.y)

        //Hit
        if(Math.abs(this.hitTimer) < 1){
            this.hitTimer = 0
        }
        if(Math.abs(this.pulseHitTimer) < 1){
            this.pulseHitTimer = 0
        }
        if (this.hitTimer > 0) {
            this.body.fillStyle = "rgba(256, 0, 0,0.4)"
            this.hitTimer--
        }
        if(this.pulseHitTimer > 0) {
            this.body.fillStyle = "purple"
            this.pulseHitTimer--
        }
        //Recover
        else {
                this.pulseVelocityX = 0
                this.pulseVelocityY = 0
                if(this.hitTimer> 0){
                    this.body.fillStyle = "rgba(256, 0, 0,0.4)"
                }
                else{
                    this.body.fillStyle = this.defaultFill
                }
        }
        this.angle = Math.atan2(this.playerLocation.y - this.transform.y, this.playerLocation.x - this.transform.x)
        this.velocity = {
            x: (this.speed * Math.cos(this.angle))*this.dampenerValX + this.addedVelocityX + this.pulseVelocityX,
            y: (this.speed * Math.sin(this.angle))*this.dampenerValY + this.addedVelocityY + this.pulseVelocityY
        }
        if (Math.abs(this.addedVelocityX) < 0.75) {
            this.addedVelocityX = 0
            this.dampenerValX = 1
        }
        else{
            this.dampenerValX = 0
        }
        if (Math.abs(this.addedVelocityY) < 0.75) {
            this.addedVelocityY = 0
            this.dampenerValY = 1
        }
        else{
            this.dampenerValY = 0

        }
        if (this.addedVelocityX > 0) {
            this.addedVelocityX -= 0.75
        }
        if (this.addedVelocityY > 0) {
            this.addedVelocityY -= 0.75
        }
        if (this.addedVelocityX < 0) {
            this.addedVelocityX += 0.75
        }
        if (this.addedVelocityY < 0) {
            this.addedVelocityY += 0.75
        }
        this.transform.x += this.velocity.x
        this.transform.y += this.velocity.y
        if (Math.abs(this.playerLocation.x - this.transform.x) <= (this.playerLocation.sx + this.transform.sx) / 2) {
            if (Math.abs(this.playerLocation.y - this.transform.y) < (this.playerLocation.sy + this.transform.sy) / 2) {
                this.updateListeners(this.hitMessage)
            }
        }
        if (this.hitpoints <= 0) {
            if(this.size < 14){
                this.updateListeners(this.deadMessageSmall)
            }
            else{
                this.updateListeners(this.deadMessage)
            }

            this.parent.destroy()

        }
    }
    recieveMessage(weapon, eventName) {
        if (eventName == "ProjectileHit") {

            if (this.hitTimer == 0) {
                this.hitTimer = 25
                this.hitpoints -= weapon.damage
                this.addedVelocityX += weapon.velocity.x * 0.75
                this.addedVelocityY += weapon.velocity.y * 0.75
                this.lastDamageSource = weapon.name
                GameObject.instantiate(new DamageTextObject(weapon.damage, this,25))
            }
        }
        if (eventName == "ShieldHit") {
                this.hitpoints -= weapon.damage
                this.addedVelocityX += weapon.velocity.x
                this.addedVelocityY += weapon.velocity.y
                this.lastDamageSource = weapon.name
                GameObject.instantiate(new DamageTextObject(weapon.damage, this,25,0,"white"))
            
        }
        if (eventName == "ExplosiveHit") {
            if (this.hitTimer == 0) {
                this.hitTimer = 30
                this.hitpoints -= weapon.damage
                this.addedVelocityX += weapon.velocity.x
                this.addedVelocityY += weapon.velocity.y
                this.lastDamageSource = weapon.name
                if(this.size > 14){
                    GameObject.instantiate(new DamageTextObject(weapon.damage, this,25,0,"white"))
                }
            }
        }
        if (eventName == "LaserHit") {
            this.hitpoints -= weapon.damage
            //GameObject.instantiate(new DamageTextObject(weapon.damage,this,25,0,"white"))
        }

        if(eventName == "EnergyWaveHit"){
            if(this.pulseHitTimer == 0){
                //time remaining = lifespan * sx/maxradius
                this.pulseHitTimer = weapon.lifespan - weapon.lifespan * weapon.transform.sx/weapon.maxRadius
                this.pulseVelocityX += weapon.velocity.x
                this.pulseVelocityY += weapon.velocity.y
                this.lastDamageSource = weapon.name
            }
        }
    }
}
window.EnemyTemplate = EnemyTemplate