import "./1BasicEnemy/BasicEnemyObject.js"
import "./BossEnemy/BossEnemyObject.js"
import "./SwarmEnemy/SwarmEnemyObject.js"
class EnemySpawnerComponent extends Component{

    name = "EnemySpawnerComponent"
    start(){
        this.spawnRate = 50
        this.spawnTimer= 50
        this.timeRatio = 0
        this.spawnAmount = 1
        this.minDistance = 300
        this.maxEnemies = 50
        this.maxBosses = 1
        this.swarmSize = 10
        this.numberOfEnemies = 0
        this.numberOfBosses = 0
        this.spawnAngle = 0
        this.spawnX = 0
        this.spawny = 0
        this.maxTime = GameObject.getObjectByName("MainTimerObject").getComponent("MainTimer").timeGoal
        this.playerObject = GameObject.getObjectByName("PlayerObject")
        this.addListener(this.parent.components[1])

    }

    update(){
        if (!SceneManager.isRunning) {
            return
        }
        if( GameObject.getObjectByName("MainTimerObject")){
            this.timeRemaining = GameObject.getObjectByName("MainTimerObject").getComponent("MainTimer").currentTime
        }
        this.timeRatio = this.timeRemaining/this.maxTime
        //Need to spawn enemies off screen in a rotation around player.
        //X and y need to be greater than camera size
        //get angle using gpt
        this.playerTransform = this.playerObject.transform
        if(!SceneManager.isRunning){
            return
        }
        
        //this.functionMainSpawner()
        this.functionSingleTest()
          //this.functionStressTest()
          

    }

    handleUpdate(component,eventName){
        if(eventName == "BasicEnemyDestroyed"){
            this.numberOfEnemies--
            GameObject.instantiate(new ExperienceObject(component.transform.x,component.transform.y))
        }
        if(eventName == "BossEnemyDestroyed"){
            this.numberOfBosses--
            GameObject.instantiate(new ExperienceObject(component.transform.x,component.transform.y))
        }

    }

    spawnSingleBoss(){
        this.spawnAngle = Math.random()*(Math.PI*2 - 0) + 0
        this.spawnX = this.playerTransform.x + this.minDistance * Math.cos(this.spawnAngle)
        this.spawnY = this.playerTransform.y + this.minDistance * Math.sin(this.spawnAngle)
        GameObject.instantiate(new BossEnemyObject(this.spawnX,this.spawnY))
        this.numberOfBosses++
    }

    spawnSingleBasic(){
        this.spawnAngle = Math.random()*(Math.PI*2 - 0) + 0
        this.spawnX = this.playerTransform.x + this.minDistance * Math.cos(this.spawnAngle)
        this.spawnY = this.playerTransform.y + this.minDistance * Math.sin(this.spawnAngle)
        GameObject.instantiate(new BasicEnemyObject(this.spawnX,this.spawnY))
        this.numberOfEnemies++
    }

    spawnSingleSwarm(){
        this.spawnAngle = Math.random()*(Math.PI*2 - 0) + 0
        this.spawnX = this.playerTransform.x + this.minDistance * Math.cos(this.spawnAngle)
        this.spawnY = this.playerTransform.y + this.minDistance * Math.sin(this.spawnAngle)
        for(let i = 0; i < this.swarmSize; i++){
            GameObject.instantiate(new SwarmEnemyObject(this.spawnX,this.spawnY))
            this.numberOfEnemies++
        }
    }

    spawnWaveStressTest(){
        this.spawnAngle = 0
        this.spawnAmount = 500
        for(let i = 0; i < this.spawnAmount; i++){
            if(this.spawnAngle >= Math.PI/3){
                this.spawnAngle = 0
            }
            this.spawnX = this.playerTransform.x + this.minDistance * Math.cos(this.spawnAngle)
            this.spawnY = this.playerTransform.y + this.minDistance * Math.sin(this.spawnAngle)
            GameObject.instantiate(new BasicEnemyObject(this.spawnX,this.spawnY))
            this.spawnAngle += Math.PI/(this.spawnAmount/2)
            this.numberOfEnemies++
        }
        this.spawnAngle = 0
    }

    spawnWaveFullCircle(){
        //set spawn angle to 0, add enemy, rotate x degrees, spawn again until angle == 0 again.
        this.spawnAngle = 0
        this.spawnAmount = 12
        for(let i = 0; i < this.spawnAmount; i++){
            this.spawnX = this.playerTransform.x + this.minDistance * Math.cos(this.spawnAngle)
            this.spawnY = this.playerTransform.y + this.minDistance * Math.sin(this.spawnAngle)
            GameObject.instantiate(new BasicEnemyObject(this.spawnX,this.spawnY))
            this.spawnAngle += Math.PI/(this.spawnAmount/2)
            this.numberOfEnemies++
        }
        this.spawnAngle = 0
    }

    functionMainSpawner(){
        if(this.timeRatio <= 1 && this.timeRatio > 0.95){
            console.log("100%")
            this.maxEnemies = 5
            if(this.spawnTimer >= this.spawnRate){
                if(this.numberOfEnemies <= this.maxEnemies){
                    this.spawnSingleBasic()
                }
                this.spawnTimer = 0
            }
            this.spawnTimer++ 
        }
        if(this.timeRatio <= 0.95 && this.timeRatio > 0.90){
            console.log("95%")
            this.maxEnemies = 10
            this.spawnRate = 40
            if(this.spawnTimer >= this.spawnRate){
                if(this.numberOfEnemies <= this.maxEnemies){
                    this.spawnSingleBasic()
                }
                this.spawnTimer = 0
            }
            this.spawnTimer++ 
        }
        if(this.timeRatio <= 0.90 && this.timeRatio > 0.85){
            console.log("90%")
            if(this.numberOfBosses < this.maxBosses){
                this.spawnSingleBoss()
            }
            this.maxEnemies = 24
            this.spawnRate = 30
            if(this.spawnTimer >= this.spawnRate){
                if(this.numberOfEnemies <= this.maxEnemies){
                    //this.spawnWaveFullCircle()
                    this.spawnTimer = 0
                }
            }
            this.spawnTimer++ 
        }
        if(this.timeRatio <= 0.85 && this.timeRatio > 0.80){
            console.log("85%")
            this.maxEnemies = 30
            this.spawnRate = 35
            if(this.spawnTimer % 2 == 0){
                this.spawnSingleBasic()
                this.spawnSingleBasic()
                this.spawnSingleBasic()
            }
            this.spawnTimer++ 
        }
        if(this.timeRatio <= 0.80 && this.timeRatio > 0.75){
            console.log("80%")
            this.maxEnemies = 36
            this.spawnRate = 30
            if(this.spawnTimer % 2 == 0){
                this.spawnSingleBasic()
            }
            if(this.spawnTimer >= this.spawnRate){
                if(this.numberOfEnemies <= this.maxEnemies){
                    this.spawnWaveFullCircle()
                    this.spawnTimer = 0
                }
            }
            this.spawnTimer++ 
        }
    }

    functionStressTest(){
        if(this.timeRatio <= 1 && this.timeRatio > 0){
            this.maxEnemies = 1
            if(this.spawnTimer >= this.spawnRate){
                if(this.numberOfEnemies <= this.maxEnemies){
                    this.spawnWaveStressTest()
                }
                this.spawnTimer = 0
            }
            this.spawnTimer++ 
        }
    }

    functionSingleTest(){
        if(this.timeRatio <= 1 && this.timeRatio > 0){
            this.maxEnemies = 1
            if(this.spawnTimer >= this.spawnRate){
                if(this.numberOfEnemies < this.maxEnemies){
                    this.spawnSingleSwarm()
                   
                }
                this.spawnTimer = 0
            }
            this.spawnTimer++ 
        }
    }
}

window.EnemySpawnerComponent = EnemySpawnerComponent