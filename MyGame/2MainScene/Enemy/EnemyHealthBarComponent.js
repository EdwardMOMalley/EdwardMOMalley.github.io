class EnemyHealthBarComponent extends Component{
    name = "EnemyHealthBarComponent"
    start(){
        this.body = undefined
        if(this.parent.getComponent("BossEnemyComponent")){
            this.body = this.parent.getComponent("BossEnemyComponent")
        }
        if(this.parent.getComponent("BasicEnemyComponent")){
            this.body = this.parent.getComponent("BasicEnemyComponent")
        }
        this.maxHp = this.body.maxHitpoints

    }
    update(){
        if(this.body.hitpoints >=0){
            this.currentHp= this.body.hitpoints
        }
        else{
            this.currentHp = 0
        }

    }
    draw(ctx){
        ctx.fillStyle = "red"
        ctx.fillRect(this.transform.x-this.transform.sx/2,this.transform.y-this.transform.sy/2,this.transform.sx*(this.currentHp/this.maxHp),2)
    }
}
window.EnemyHealthBarComponent  = EnemyHealthBarComponent 