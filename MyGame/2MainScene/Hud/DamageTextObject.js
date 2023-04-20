import "./DamageTextComponent.js"
import "./DamageTextDraw.js"
class DamageTextObject extends GameObject{
    constructor(text,originComponent){
        super()
        this.text = text
        this.originComponent = originComponent
        }
    start(){
        this.addComponent(new DamageTextComponent(this.originComponent))
        this.addComponent(new DamageTextDraw(this.text))
    }


}

window.DamageTextObject = DamageTextObject