import "../Items/ExperienceObject.js"
class MainEnemyController extends Component{
    name = "MainEnemyController"
    start(){
        this.currentEnemies = []
        this.keptEnemies = []

    }

    update(){

        if(!SceneManager.isRunning){
            return
        }
        this.keptEnemies = []
        for(let enemy of this.currentEnemies){
            if(!enemy.markedForDestroy){
                this.keptEnemies.push(enemy)
            }
        }
        this.currentEnemies = this.keptEnemies


                //Enemy - Enemy collision 
                this.currentEnemies.forEach(enemy =>{
                    this.currentEnemies.forEach(enemy2 =>{
                        if(enemy != enemy2){
                            if(Math.abs(enemy.transform.x-enemy2.transform.x)<enemy.transform.sx/2+enemy2.transform.sx/2){
                                if(Math.abs(enemy.transform.y-enemy2.transform.y)<enemy.transform.sy/2+enemy2.transform.sy/2){
                                    if(enemy.transform.x > enemy2.transform.x){
                                        enemy.transform.x +=1
                                    }
                                    if(enemy.transform.x < enemy2.transform.x){
                                        enemy.transform.x -=1
                                    }
                                    if(enemy.transform.y > enemy2.transform.y){
                                        enemy.transform.y +=1
                                    }
                                    if(enemy.transform.y < enemy2.transform.y){
                                        enemy.transform.y -=1
                                    }
                                }
                            }
                        }
        
                    })
                }) 

    }

    handleUpdate(component,eventName){
        if(eventName == "BasicEnemySpawned"){
            this.currentEnemies.push(component.parent)
            //console.log("BasicEnemySpawned")
        }
        if(eventName == "BasicEnemyDestroyed"){
            this.numberOfEnemies--
            console.log("here4")
            GameObject.instantiate(new ExperienceObject(component.parent.transform.x,component.parent.transform.y))
        }
        if(eventName == "BossEnemyDestroyed"){
            this.numberOfBosses--
            GameObject.instantiate(new ExperienceObject(component.parent.transform.x,component.parent.transform.y))
        }

    }

}
window.MainEnemyController = MainEnemyController