import "./ProjectileComponent.js"
class ProjectileObject extends GameObject{
    name = "ProjectileObject"
    constructor(transformX,transformY,targetX,targetY) {
        super();
        this.transformx = transformX
        this.transformy = transformY
        this.targetX = targetX
        this.targetY = targetY


      }

    start(){
        this.transform.sy = 5
        this.transform.sx = 5
        this.transform.x = this.transformx
        this.transform.y = this.transformy
        this.addComponent(new ProjectileComponent(this.targetX,this.targetY)) 
        this.addComponent(new Circle("blue"))
 
    }

}

window.ProjectileObject = ProjectileObject