class ExplosionDrawComponent extends Component{
    name = "ExplosionDrawComponent"
    start(){
        this.redval = 256
        this.greenval = 256

    }

    update(){

    }
    draw(ctx){
        //Red-orange explosion
        ctx.fillStyle = "rgb(" + this.redval + "," + this.greenval + ", 7)"
        ctx.beginPath()
        ctx.arc(this.transform.x, this.transform.y, this.transform.sx, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke();

    }
}
window.ExplosionDrawComponent = ExplosionDrawComponent