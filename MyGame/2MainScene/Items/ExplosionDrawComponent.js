class ExplosionDrawComponent extends Component{
    name = "ExplosionDrawComponent"
    start(){
        this.redval = 256
        this.greenval = 256
        this.opacity = 1

    }

    update(){

    }
    draw(ctx){
        //Red-orange explosion
        "rgba(256, 0, 0,0.4)"
        ctx.fillStyle = "rgba(" + this.redval + "," + this.greenval + ", 7," + this.opacity,")"
        ctx.strokeStyle = "red"
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(this.transform.x, this.transform.y, this.transform.sx, 0, Math.PI * 2)
        ctx.fill()
        //ctx.stroke();

    }
}
window.ExplosionDrawComponent = ExplosionDrawComponent