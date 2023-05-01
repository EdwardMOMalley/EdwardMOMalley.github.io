class DamageTextDraw extends Component{
    constructor(text,color){
        super()
        this.text = text
        this.fillStyle = color
    }
    draw(ctx){
        ctx.fillStyle = this.fillStyle
        ctx.font = "15px helvettica"
        ctx.fillText(this.text,this.transform.x,this.transform.y)
    }
}
window.DamageTextDraw = DamageTextDraw