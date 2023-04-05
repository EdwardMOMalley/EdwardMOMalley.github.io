import "./ExperienceComponent.js"
class ExperienceObject extends GameObject{
    constructor(transform) {
        super();
        this.transform = transform
        this.transform.sx = 1


      }
    name = "ExperienceObject"
    start(){
        this.transform.sy = 5
        this.transform.sx = 5
        this.addComponent(new Circle("orange"))
        this.addComponent(new ExperienceComponent())  
    }

}

window.ExperienceObject = ExperienceObject