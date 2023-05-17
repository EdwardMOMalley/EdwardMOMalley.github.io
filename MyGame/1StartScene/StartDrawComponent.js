class StartDrawComponent extends Component{
    name = "StartDrawComponent"
    start(){
        this.hiScore = this.parent.components[1].hiScore
    }

    draw(ctx) {
        ctx.fillStyle = "white"
        ctx.font = "20px helvettica"
        ctx.fillText("C U B E  C O M B A T",this.transform.x/2,this.transform.y/2)
        ctx.fillText("P R E S S  'E'  T O  P L A Y",this.transform.x/2,this.transform.y/2+50)
        ctx.fillText("High Score : " + this.hiScore + " seconds survived.",this.transform.x/2,this.transform.y/2+100)

    }


}
window.StartDrawComponent = StartDrawComponent