class WinDrawComponent extends Component {
    draw(ctx) {
        ctx.fillStyle = "white"
        ctx.font = "20px helvettica"
        ctx.fillText("Y O U  W O N",this.transform.x/2,this.transform.y/2)
        ctx.fillText("P R E S S  'R'  T O  P L A Y  A G A I N",this.transform.x/2,this.transform.y/2+50)
    }
}


window.WinDrawComponent = WinDrawComponent