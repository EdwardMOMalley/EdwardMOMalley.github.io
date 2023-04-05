class HudTimerComponent extends Component{
    name = "HudTimerComponent"
    start(){
        this.mainTimer = GameObject.getObjectByName("MainTimerObject").getComponent("MainTimer")
        this.worldSize = GameObject.getObjectByName("FloorObject").getComponent("FloorComponent").size 
        this.transform.x = 0-10
        this.transform.y = -250+20

    }
    update(){

    }

    staticDraw(ctx){
        ctx.fillStyle = "white"
        ctx.font = "20px helvettica"
        ctx.fillText(this.mainTimer.currentTime,this.transform.x,this.transform.y)
        

    }
}

window.HudTimerComponent = HudTimerComponent