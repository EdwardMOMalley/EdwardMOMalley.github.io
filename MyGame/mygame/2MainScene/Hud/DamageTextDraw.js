class DamageTextDraw extends Component{
    constructor(text){
        super()
        this.text = text
    }
    draw(ctx){
        ctx.fillStyle = "white"
        ctx.font = "20px helvettica"
        ctx.fillText(this.text,this.transform.x,this.transform.y)
    }
}
window.DamageTextDraw = DamageTextDraw