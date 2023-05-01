import "./DamageTextComponent.js"
import "./DamageTextDraw.js"
class DamageTextObject extends GameObject{
    constructor(text,originComponent,lifespan,offset,color){
        super()
        this.text = text
        this.originComponent = originComponent
        this.lifespan = lifespan
        this.offset = offset
        this.color = color

        }
    start(){
        this.addComponent(new DamageTextComponent(this.originComponent,this.lifespan,this.offset))
        this.addComponent(new DamageTextDraw(this.text,this.color))
    }


}

window.DamageTextObject = DamageTextObject