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
            if(!enemy.parent.markedForDestroy){
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
                                    if(enemy.transform.y == enemy2.transform.y){
                                        enemy.transform.y += Math.random()*(2*2 - 1) + 1
                                    }
                                    if(enemy.transform.x == enemy2.transform.x){
                                       enemy.transform.x +=  Math.random()*(2*2 - 1) + 1
                                    }
                                   
                                }
                            }
                        }
        
                    })
                }) 

    }

    handleUpdate(component,eventName){
        if(eventName == "BasicEnemySpawned"){
            this.currentEnemies.push(component)
            //console.log("BasicEnemySpawned")
        }


    }

}
window.MainEnemyController = MainEnemyController