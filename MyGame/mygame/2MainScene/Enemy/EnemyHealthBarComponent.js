class EnemyHealthBarComponent extends Component{
    name = "EnemyHealthBarComponent"
    start(){
        this.maxHp = this.parent.getComponent("BasicEnemyComponent").maxHitpoints
    }
    update(){
        this.currentHp= this.parent.getComponent("BasicEnemyComponent").hitpoints
    }
    draw(ctx){
        ctx.fillStyle = "red"
        ctx.fillRect(this.transform.x-this.transform.sx/2,this.transform.y-this.transform.sy/2,this.transform.sx*(this.currentHp/this.maxHp),2)
    }
}
window.EnemyHealthBarComponent  = EnemyHealthBarComponent 