class HudTimerComponent extends Component{
    name = "HudTimerComponent"
    start(){
        this.mainTimer = GameObject.getObjectByName("MainTimerObject").getComponent("MainTimer")
        this.worldSize = GameObject.getObjectByName("FloorObject").getComponent("FloorComponent").size 
        this.transform.x = this.worldSize/2
        this.transform.y = 20
        this.transform.sx = 55
        this.transform.sy = 20

    }
    update(){

    }

    staticDraw(ctx){
        ctx.fillStyle = "black"
        ctx.fillRect(this.transform.x-5,this.transform.y-this.transform.sy,this.transform.sx,this.transform.sy)
        ctx.fillStyle = "white"
        ctx.font = "20px helvettica"
        if(this.mainTimer.currentTime>99.9){
            ctx.fillText(this.mainTimer.currentTime,this.transform.x-1,this.transform.y-1)
        }
        if(this.mainTimer.currentTime > 10 && this.mainTimer.currentTime <=99.9){
            ctx.fillText(this.mainTimer.currentTime,this.transform.x+4,this.transform.y-1)
        }
        if(this.mainTimer.currentTime > 0 && this.mainTimer.currentTime <=10){
            ctx.fillText(this.mainTimer.currentTime,this.transform.x+8,this.transform.y-1)
        }
        

    }
}

window.HudTimerComponent = HudTimerComponent