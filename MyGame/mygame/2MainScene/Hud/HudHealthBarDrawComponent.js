class HudHealthBarDrawComponent extends Component{

    staticDraw(ctx){
        ctx.fillStyle = "red"
        ctx.fillRect(this.transform.x,this.transform.y,this.transform.sx,this.transform.sy)
    }


}

window.HudHealthBarDrawComponent = HudHealthBarDrawComponent