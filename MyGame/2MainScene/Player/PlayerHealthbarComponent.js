class PlayerHealthBarComponent extends Component{
    name = "PlayerHealthBarComponent"

    start(){

        this.maxHp = this.parent.getComponent("PlayerController").maxHitpoints
    }
    update(){
        this.currentHp= this.parent.getComponent("PlayerController").hitpoints
    }

    draw(ctx){
        ctx.fillStyle = "red"
        ctx.fillRect(this.transform.x-this.transform.sx/2,this.transform.y-this.transform.sy/2,this.transform.sx*(this.currentHp/this.maxHp),2)


    }
    
    //   HP / MaxHp = ratio
    // Bar = playersize * ratio


}

window.PlayerHealthBarComponent  = PlayerHealthBarComponent 