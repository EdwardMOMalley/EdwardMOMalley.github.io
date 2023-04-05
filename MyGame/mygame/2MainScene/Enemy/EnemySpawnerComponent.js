import "../Enemy/1BasicEnemy/BasicEnemyObject.js"
import "../Items/ExperienceObject.js"
class EnemySpawnerComponent extends Component{

    name = "EnemySpawnerComponent"
    start(){
        this.spawnRate = 25
        this.spawnTimer = 0
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

        if(this.spawnTimer >= this.spawnRate){
            if(this.numberOfEnemies <= 50){
                this.spawnX = this.playerTransform.x + 250 * Math.cos(this.spawnAngle)
                this.spawnY = this.playerTransform.y + 250 * Math.sin(this.spawnAngle)
                GameObject.instantiate(new BasicEnemyObject(this.spawnX,this.spawnY))
                this.spawnAngle += Math.PI/6
                this.numberOfEnemies++
            }
            this.spawnTimer = 0
        }
        this.spawnTimer++ 
        if(this.spawnAngle >= Math.PI*2){
            this.spawnAngle = 0
        }


        
        

    }

    handleUpdate(component,eventName){
        if(eventName == "BasicEnemyDestroyed"){
            this.numberOfEnemies--
            GameObject.instantiate(new ExperienceObject(component.parent.transform))
        }

    }


}

window.EnemySpawnerComponent = EnemySpawnerComponent