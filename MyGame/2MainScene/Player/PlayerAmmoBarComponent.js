class PlayerAmmoBarComponent extends Component{

    name = "PlayerAmmoBarComponent"

    start(){


    }
    update(){
        this.capacity = this.parent.components[3].capacity
        this.currentAmmo= this.parent.components[3].ammoLoaded

    }

    draw(ctx){
        ctx.fillStyle = "blue"
        ctx.fillRect(this.transform.x-this.transform.sx/2,this.transform.y+this.transform.sy/2-2,this.transform.sx*(this.currentAmmo/this.capacity),2)


    }
    
    //   HP / MaxHp = ratio
    // Bar = playersize * ratio



}

window.PlayerAmmoBarComponent = PlayerAmmoBarComponent