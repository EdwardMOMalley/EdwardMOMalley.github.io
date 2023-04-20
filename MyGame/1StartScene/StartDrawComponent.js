class StartDrawComponent extends Component{
    name = "StartDrawComponent"

    draw(ctx) {
        ctx.fillStyle = "white"
        ctx.font = "20px helvettica"
        ctx.fillText("M Y  G A M E",this.transform.x/2,this.transform.y/2)
        ctx.fillText("P R E S S  'E'  T O  P L A Y",this.transform.x/2,this.transform.y/2+50)

    }


}
window.StartDrawComponent = StartDrawComponent