import "./ProjectileComponent.js"
class ProjectileObject extends GameObject{
    name = "ProjectileObject"
    constructor(fillStyle,isExplosive,explosiveRadius,damage,pelletNumber,lifespan,transformX,transformY,targetX,targetY) {
        super();
        this.fillStyle = fillStyle
        this.damage = damage
        this.isExplosive = isExplosive
        this.explosiveRadius = explosiveRadius
        this.pelletNumber = pelletNumber
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
        this.addComponent(new ProjectileComponent(this.isExplosive,this.explosiveRadius,this.damage,this.pelletNumber,this.projectileLifespan,this.targetX,this.targetY)) 
        this.addComponent(new Circle(this.fillStyle))
 
    }

}

window.ProjectileObject = ProjectileObject