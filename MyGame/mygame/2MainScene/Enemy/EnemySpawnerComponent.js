import "./1BasicEnemy/BasicEnemyObject.js"
import "./BossEnemy/BossEnemyObject.js"
import "../Items/ExperienceObject.js"
class EnemySpawnerComponent extends Component{

    name = "EnemySpawnerComponent"
    start(){
        this.spawnRate = 500000000000
        this.spawnTimer= 500000000000
        this.spawnAmount = 1
        this.minDistance = 300
        this.maxEnemies = 1
        this.numberOfEnemies = 0
        this.spawnAngle = 0
        this.spawnX = 0
        this.spawny = 0
        this.playerObject = GameObject.getObjectByName("PlayerObject")
        this.addListener(this.parent.components[1])

    }

    update(){
        //Need to spawn enemies off screen in a rotation around player.
        //X and y need to be greater than camera size
        //get angle using gpt
        this.playerTransform = this.playerObject.transform
        if(!SceneManager.isRunning){
            return
        }


        //separate spawn freqeuncy and spawn patterns

        if(this.spawnTimer >= this.spawnRate){
            if(this.numberOfEnemies <= this.maxEnemies){
                //this.spawnWaveFullCircle()
                this.spawnWaveStressTest()
               // this.spawnSingleBasic()
            }
            this.spawnTimer = 0
        }
        this.spawnTimer++ 

    }

    handleUpdate(component,eventName){
        if(eventName == "BasicEnemyDestroyed"){
            this.numberOfEnemies--
            GameObject.instantiate(new ExperienceObject(component.parent.transform))
        }

    }
    spawnSingleBoss(){
        this.spawnAngle = Math.random()*(Math.PI*2 - 0) + 0
        this.spawnX = this.playerTransform.x + this.minDistance * Math.cos(this.spawnAngle)
        this.spawnY = this.playerTransform.y + this.minDistance * Math.sin(this.spawnAngle)
        GameObject.instantiate(new BossEnemyObject(this.spawnX,this.spawnY))
        this.numberOfEnemies++

    }
    spawnSingleBasic(){
        this.spawnAngle = Math.random()*(Math.PI*2 - 0) + 0
        this.spawnX = this.playerTransform.x + this.minDistance * Math.cos(this.spawnAngle)
        this.spawnY = this.playerTransform.y + this.minDistance * Math.sin(this.spawnAngle)
        GameObject.instantiate(new BasicEnemyObject(this.spawnX,this.spawnY))
        this.numberOfEnemies++
    }
    spawnWaveStressTest(){
        this.spawnAngle = 0
        this.spawnAmount = 2500
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
        this.spawnAmount = 50
        for(let i = 0; i < this.spawnAmount; i++){
            this.spawnX = this.playerTransform.x + this.minDistance * Math.cos(this.spawnAngle)
            this.spawnY = this.playerTransform.y + this.minDistance * Math.sin(this.spawnAngle)
            GameObject.instantiate(new BasicEnemyObject(this.spawnX,this.spawnY))
            this.spawnAngle += Math.PI/(this.spawnAmount/2)
            this.numberOfEnemies++

        }
        this.spawnAngle = 0

    }


}

window.EnemySpawnerComponent = EnemySpawnerComponent