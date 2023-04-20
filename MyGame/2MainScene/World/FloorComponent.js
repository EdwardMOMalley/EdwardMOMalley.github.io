class FloorComponent extends Component{
    name = "FloorComponent"
    start(){
        this.size = 500
        this.transform.sx = this.size
        this.transform.sy = this.size

        //green floor

        this.color = "#285428"
    }

    draw(ctx){
        ctx.fillStyle = this.color
        ctx.fillRect(this.transform.x-this.transform.sx/2,this.transform.y-this.transform.sy/2,this.transform.sx,this.transform.sy)
    }
}

window.FloorComponent = FloorComponent