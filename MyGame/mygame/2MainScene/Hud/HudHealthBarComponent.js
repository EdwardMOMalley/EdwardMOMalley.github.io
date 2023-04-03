class HudHealthBarComponent extends Component{
    start(){

        this.player = GameObject.getObjectByName("PlayerObject").getComponent("PlayerController")
        this.playerMaxHp = this.player.hitpoints
        this.floor = GameObject.getObjectByName("FloorObject").getComponent("FloorComponent")
        this.worldSize = this.floor.size


        this.transform.sx = 10
        this.transform.sy = 100
        this.transform.x = this.worldSize/2-this.transform.sx/2
        this.transform.y = 0


    }

    update(){
        this.currentHp = this.player.hitpoints
        this.transform.sy = this.worldSize*(this.currentHp/this.playerMaxHp)

        //WorldSize
        //Current / Max = percentage
        //percentage * worldsize = bar

        //Hud needs to be in its own entire engine segment. one that isn't affected by the translations. Otherwise
        //every hud object will need to essentially be treated as a player, and every enemy has to know
    
    }

}

window.HudHealthBarComponent = HudHealthBarComponent