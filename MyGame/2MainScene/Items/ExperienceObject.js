import "./ExperienceComponent.js"
class ExperienceObject extends GameObject{
    constructor(x,y) {
        super();
        this.transform.x = x
        this.transform.y = y


      }
    name = "ExperienceObject"
    start(){
        this.transform.sx = 2
        //Gold Color
        this.addComponent(new Circle("#FFD700"))
        this.addComponent(new ExperienceComponent())  
    }

}

window.ExperienceObject = ExperienceObject