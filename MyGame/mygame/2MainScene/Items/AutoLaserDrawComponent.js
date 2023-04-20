class AutoLaserDrawComponent extends Component{
    name = "AutoLaserDrawComponent"
    start(){

    }
    update(){
        this.targetedEnemy = this.parent.getComponent("AutoLaserComponent").targetedEnemy
    }
    draw(ctx){
        if(this.targetedEnemy){
            //Purple
            ctx.strokeStyle = "#870e7b"
            ctx.beginPath()
            ctx.moveTo(this.transform.x,this.transform.y)
            ctx.lineTo(this.targetedEnemy.transform.x,this.targetedEnemy.transform.y)
            ctx.stroke()

        }

    }

}
window.AutoLaserDrawComponent = AutoLaserDrawComponent