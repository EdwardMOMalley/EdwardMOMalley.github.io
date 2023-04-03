class LoseDrawComponent extends Component{
    name = "LoseDrawComponent"

    draw(ctx){
        ctx.fillStyle = "white"
        ctx.font = "20px helvettica"
        ctx.fillText("Y O U  L O S E",this.transform.x/2,this.transform.y/2)
        ctx.fillText("P R E S S  'R'  T O  R E T R Y",this.transform.x/2,this.transform.y/2+50)
    
    }


}

window.LoseDrawComponent = LoseDrawComponent