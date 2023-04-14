import "./ProjectileComponent.js"
class ProjectileObject extends GameObject{
    name = "ProjectileObject"
    constructor(isExplosive,damage,lifespan,transformX,transformY,targetX,targetY) {
        super();
        this.damage = damage
        this.isExplosive = isExplosive
        this.projectileLifespan = lifespan
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
        //explosive,damage,lifespawn,target
        this.addComponent(new ProjectileComponent(this.isExplosive,this.damage,this.projectileLifespan,this.targetX,this.targetY)) 
        this.addComponent(new Circle("blue"))
 
    }

}

window.ProjectileObject = ProjectileObject