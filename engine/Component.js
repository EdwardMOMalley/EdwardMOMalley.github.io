class Component{
    name = ""

    parent

    started = false

    listeners = []

    pausable = true
    isPaused = false

    addListener(listener){
        this.listeners.push(listener)
    }

    updateListeners(eventName){
        for(let listener of this.listeners){
            if(listener.handleUpdate){
                listener.handleUpdate(this,eventName)
            }
        }
    }

    send(senderComponent,recieverComponent,eventName){
        if(recieverComponent.recieveMessage){
            recieverComponent.recieveMessage(senderComponent,eventName)
        }
    }


    get transform(){
        return this.parent.components[0]
    }

}

window.Component = Component