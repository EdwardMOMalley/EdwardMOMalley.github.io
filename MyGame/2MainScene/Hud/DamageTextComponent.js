class DamageTextComponent extends Component{
    constructor(originComponent,lifespan,offset){
        super()
        this.originComponent = originComponent
        this.subTimer = 0
        this.lifespan = lifespan
        this.offset = offset
    }


    start(){

    }
    update(){     
        this.transform.x = this.originComponent.parent.transform.x-this.originComponent.parent.transform.sx/2
        this.transform.y = this.originComponent.parent.transform.y-this.originComponent.parent.transform.sy/2-(15*this.subTimer/this.lifespan) - this.offset

        if(!SceneManager.isRunning){

        }
            if(this.subTimer <=this.lifespan){
            this.subTimer++
        }
        if(this.subTimer > this.lifespan){
            this.parent.destroy()
        }

    }
}

window.DamageTextComponent = DamageTextComponent