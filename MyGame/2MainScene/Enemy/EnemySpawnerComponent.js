import "./1BasicEnemy/BasicEnemyObject.js"
import "./BossEnemy/BossEnemyObject.js"
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
        
        this.functionMainSpawner()
        //this.functionSingleTest()
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
        if(eventName == "SmallBasicEnemyDestroyed"){
            this.numberOfEnemies--
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



    spawnWaveStressTest(directionStart,directionEnd){
        this.spawnAngle = directionStart
        this.spawnAmount = 250
        for(let i = 0; i < this.spawnAmount; i++){
            if(this.spawnAngle >= directionEnd){
                this.spawnAngle = directionStart
            }
            this.spawnX = this.playerTransform.x + this.minDistance * Math.cos(this.spawnAngle)
            this.spawnY = this.playerTransform.y + this.minDistance * Math.sin(this.spawnAngle)
            GameObject.instantiate(new BasicEnemyObject(this.spawnX,this.spawnY))
            this.spawnAngle += Math.PI/(this.spawnAmount/2)
            this.numberOfEnemies++
        }
        this.spawnAngle = 0
    }

    spawnWaveHalfCircle(){
        //set spawn angle to 0, add enemy, rotate x degrees, spawn again until angle == 0 again.
        this.spawnAngle = 0
        this.spawnAmount = 12
        for(let i = 0; i < this.spawnAmount; i++){
            if(this.spawnAngle >= Math.PI){
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
        this.spawnAmount = 6
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
                    this.spawnSingleBasic()
                    this.spawnSingleBasic()
                }
                this.spawnTimer = 0
            }
            this.spawnTimer++ 
        }
        if(this.timeRatio <= 0.90 && this.timeRatio > 0.80){
            console.log("90%")
            if(this.numberOfBosses < this.maxBosses){
                this.spawnSingleBoss()
            }
            this.maxEnemies = 1
            this.spawnRate = 35
            if(this.spawnTimer >= this.spawnRate){
                if(this.numberOfEnemies <= this.maxEnemies){
                    this.spawnWaveHalfCircle()
                    this.spawnTimer = 0
                }
            }
            this.spawnTimer++ 
        }
        if(this.timeRatio <= 0.80 && this.timeRatio > 0.70){
            console.log("80%")
            this.maxEnemies = 5
            this.spawnRate = 30
            if(this.spawnTimer % 9 == 0){
                this.spawnSingleBasic()
            }
            if(this.spawnTimer >= this.spawnRate){
                if(this.numberOfEnemies <= this.maxEnemies){
                    
                    this.spawnWaveHalfCircle()
                    this.spawnTimer = 0
                }
            }
            this.spawnTimer++ 
        }
        if(this.timeRatio <= 0.70 && this.timeRatio > 0.60){
            console.log("70%")
            this.maxEnemies = 9
            this.spawnRate = 30
            if(this.spawnTimer % 8 == 0){
                this.spawnSingleBasic()
            }
            if(this.spawnTimer >= this.spawnRate){
                if(this.numberOfEnemies <= this.maxEnemies){
                    this.spawnWaveHalfCircle()
                    this.spawnWaveHalfCircle()
                    this.spawnTimer = 0
                }
            }
            this.spawnTimer++ 
        }
        if(this.timeRatio <= 0.60 && this.timeRatio > 0.50){
            console.log("60%")
            this.maxEnemies = 12
            this.spawnRate = 30
            if(this.spawnTimer % 7 == 0){
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
        if(this.timeRatio <= 0.50 && this.timeRatio > 0.40){
            console.log("50%")
            this.maxEnemies = 50
            this.spawnRate = 25
            if(this.spawnTimer >= this.spawnRate){
                if(this.numberOfEnemies <= this.maxEnemies){
                    this.spawnWaveFullCircle()
                    this.spawnWaveFullCircle()
                    this.spawnWaveFullCircle()
                    this.spawnWaveFullCircle()
                    this.spawnTimer = 0
                }
            }
            this.spawnTimer++ 
        }
        if(this.timeRatio <= 0.40 && this.timeRatio > 0.30){
            console.log("40%")
            this.maxEnemies = 50
            this.spawnRate = 25
            if(this.spawnTimer >= this.spawnRate){
                if(this.numberOfEnemies <= this.maxEnemies){
                    this.spawnWaveStressTest(0,Math.PI/2)
                    this.spawnTimer = 0
                }
            }
            this.spawnTimer++ 
        }
        if(this.timeRatio <= 0.30 && this.timeRatio > 0.20){
            console.log("30%")
            this.maxEnemies = 50
            this.spawnRate = 25
            if(this.numberOfBosses < 3){
                this.spawnSingleBoss
            }
            if(this.spawnTimer >= this.spawnRate){
                if(this.numberOfEnemies <= this.maxEnemies){
                    this.spawnWaveStressTest(0,Math.PI*2)
                    this.spawnTimer = 0
                }
            }
            this.spawnTimer++ 
        }
        if(this.timeRatio <= 0.20 && this.timeRatio > 0.10){
            console.log("30%")
            this.maxEnemies = 50
            this.spawnRate = 25
            if(this.numberOfBosses < 6){
                this.spawnSingleBoss
            }
            if(this.spawnTimer >= this.spawnRate){
                if(this.numberOfEnemies <= this.maxEnemies){
                    this.spawnWaveStressTest(0,Math.PI/2)
                    this.spawnWaveStressTest(Math.PI,Math.PI+Math.PI/2)
                    this.spawnTimer = 0
                }
            }
            this.spawnTimer++ 
        }
        if(this.timeRatio <= 0.10 && this.timeRatio > 0.00){
            console.log("30%")
            this.maxEnemies = 50
            this.spawnRate = 25
            if(this.numberOfBosses < 6){
                this.spawnSingleBoss
            }
            if(this.spawnTimer >= this.spawnRate){
                if(this.numberOfEnemies <= this.maxEnemies){
                    this.spawnWaveStressTest(0,Math.PI)
                    this.spawnWaveStressTest(Math.PI,Math.PI*2)
                    this.spawnTimer = 0
                }
                this.spawnWaveFullCircle()
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
                    this.spawnSingleBasic()
                   
                }
                this.spawnTimer = 0
            }
            this.spawnTimer++ 
        }
    }

    functionHalfTest(){
        if(this.timeRatio <= 1 && this.timeRatio > 0){
            this.maxEnemies = 1
            if(this.spawnTimer >= this.spawnRate){
                if(this.numberOfEnemies < this.maxEnemies){
                    this.spawnWaveHalfCircle()
                   
                }
                this.spawnTimer = 0
            }
            this.spawnTimer++ 
        }
    }
}

window.EnemySpawnerComponent = EnemySpawnerComponent