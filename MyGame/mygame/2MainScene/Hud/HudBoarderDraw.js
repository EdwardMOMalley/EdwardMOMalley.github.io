class HudBoarderDraw extends Component{
    start(){
        this.worldSize = GameObject.getObjectByName("FloorObject").getComponent("FloorComponent").size
        this.half = this.worldSize/2
    }

    staticDraw(ctx){
        ctx.fillStyle = "Black"
        ctx.fillRect(-this.half,-this.half,this.worldSize,this.worldSize/20)
        ctx.fillRect(-this.half,this.half-this.worldSize/4,this.worldSize,this.worldSize/4)

        ctx.fillRect(-this.half,-this.half,this.worldSize/15,this.worldSize)
        ctx.fillRect(this.half-this.worldSize/15,-this.half,this.worldSize/15,this.worldSize)

    }


}

window.HudBoarderDraw = HudBoarderDraw