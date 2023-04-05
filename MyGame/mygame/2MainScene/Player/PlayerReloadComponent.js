
class PlayerReloadComponent extends Component{

    start(){
        this.weapon = this.parent.getComponent("PlayerController").weapon
        }
    draw(ctx){
        if(this.weapon.isReloading){
            ctx.fillStyle = "white"
            ctx.font = "12px helvettica"
            ctx.fillText("Reloading!",this.transform.x-15,this.transform.y-15)
        }
    }


}

window.PlayerReloadComponent = PlayerReloadComponent