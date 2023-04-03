import "../Enemy/1BasicEnemy/BasicEnemyObject.js"
import "../Items/ExperienceObject.js"
class EnemySpawnerComponent extends Component{

    name = "EnemySpawnerComponent"
    start(){
        this.spawnRate = 25
        this.spawnTimer = 0
        this.numberOfEnemies = 0
        this.playerObject = GameObject.getObjectByName("PlayerObject")
        this.addListener(this.parent.components[1])
    }

    update(){
        if(!SceneManager.isRunning){
            return
        }

        if(this.spawnTimer >= this.spawnRate){
            if(this.numberOfEnemies <= 3){
                GameObject.instantiate(new BasicEnemyObject())
                this.numberOfEnemies++
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


}

window.EnemySpawnerComponent = EnemySpawnerComponent