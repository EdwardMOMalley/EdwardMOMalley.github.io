class ExplosionDrawComponent extends Component{
    name = "ExplosionDrawComponent"
    start(){

    }

    update(){

    }
    draw(ctx){
        ctx.fillStyle = "red"
        ctx.beginPath()
        ctx.arc(this.transform.x, this.transform.y, this.transform.sx, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke();

    }
}
window.ExplosionDrawComponent = ExplosionDrawComponent