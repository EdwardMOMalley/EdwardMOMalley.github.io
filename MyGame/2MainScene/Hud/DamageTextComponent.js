class DamageTextComponent extends Component{
    constructor(originComponent){
        super()
        this.originComponent = originComponent
    }


    start(){
        this.subTimer = 0

    }
    update(){     
        this.transform.x = this.originComponent.parent.transform.x-this.originComponent.parent.transform.sx/2
        this.transform.y = this.originComponent.parent.transform.y-this.originComponent.parent.transform.sy/2-(15*this.subTimer/25)

        if(!SceneManager.isRunning){

        }
            if(this.subTimer <=25){
            this.subTimer++
        }
        if(this.subTimer > 25){
            this.parent.destroy()
        }

    }
}

window.DamageTextComponent = DamageTextComponent