import "./EnemySpawnerComponent.js"
import "./MainEnemyController.js"
class EnemyControlObject extends GameObject{
    name = "EnemyControlObject"
    start(){
        this.addComponent(new MainEnemyController())
        this.addComponent(new EnemySpawnerComponent())

    }
}
window.EnemyControlObject = EnemyControlObject