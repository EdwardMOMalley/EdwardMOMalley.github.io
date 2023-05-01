class Input{
    static mouseX = 0
    static mouseY = 0

    static lastMouseX = 0
    static lastMouseY = 0
    static mouseDown = false
    static mouseUp = false
    static finishFrame() {
        Input.lastMouseX = Input.mouseX
        Input.lastMouseY = Input.mouseY
        Input.tick = 0
        Input.mouseUp = false
    }

    static getLogicalScale(ctx){
        let browserAspectRatio = ctx.canvas.width/ctx.canvas.height
        let browserWidth = ctx.canvas.width
        if(EngineGlobals.requestedAspectRatio <= browserAspectRatio){
            browserWidth -= (ctx.canvas.width - ctx.canvas.height * EngineGlobals.requestedAspectRatio)
        }
        return browserWidth/EngineGlobals.logicalWidth
    }

    static getLogicalScaleZoomable(ctx){
        let browserAspectRatio = ctx.canvas.width / ctx.canvas.height
        let browserWidth = ctx.canvas.width
        if (EngineGlobals.requestedAspectRatio <= browserAspectRatio)
          browserWidth -= (ctx.canvas.width - ctx.canvas.height * EngineGlobals.requestedAspectRatio)
    
        return browserWidth / EngineGlobals.logicalWidth * Camera.main.transform.sx
        
    }

    static getZeros(ctx){
        let browserAspectRatio = ctx.canvas.width/ctx.canvas.height
        let zeroX = 0;
        let zeroY = 0;
        let browserWidth = ctx.canvas.width

        if (EngineGlobals.requestedAspectRatio > browserAspectRatio){
            zeroY = (ctx.canvas.height - ctx.canvas.width / EngineGlobals.requestedAspectRatio) / 2
        }
        else{
            zeroX = (ctx.canvas.width - ctx.canvas.height * EngineGlobals.requestedAspectRatio) / 2
        }


  
      return { zeroX, zeroY }
    }
    static screenToGUI(ctx,x,y){
        let zeros = Input.getZeros(ctx)
        let sx = Input.getLogicalScale(ctx)
        let sy = sx
        x -= zeros.zeroX
        y -= zeros.zeroY
        x /= sx
        y /= sy
        return{x,y}
    }

    static screenToWorld(ctx,x,y){
        let sx = Input.getLogicalScaleZoomable(ctx)
        let sy = sx
        x -= ctx.canvas.width / 2
        y -= ctx.canvas.height / 2

        x /= sx
        y /= sy
        x+= Camera.main.transform.x
        y += Camera.main.transform.y

        return{x,y}
    }

    static GUIToScreen(ctx,x,y){
        let logicalScale = Input.getLogicalScale(ctx)

        let zeros = Input.getZeros(ctx,x,y)
        x *= logicalScale
        y *= logicalScale
        x += zeros.zeroX
        y += zeros.zeroY
        return {x,y}
    }

    static GUIToWorld(ctx,x,y){
        let logicalScale = Input.getLogicalScale(ctx)
        let sx = Input.getLogicalScaleZoomable(ctx)
        let sy = sx

        let zeros = Input.getZeros(ctx,x,y)

        y *= logicalScale
        x *= logicalScale
        x += zeros.zeroX
        y += zeros.zeroY
        x -= ctx.canvas.width/2
        y -= ctx.canvas.height/2
        x /= sx
        y /= sy
        x += Camera.main.transform.x
        y += Camera.main.transform.y
        return {x,y}
    }

    static worldToScreen(ctx,x,y){
        let sx = Input.getLogicalScaleZoomable(ctx)
        let sy = sx
        x -= Camera.main.transform.x
        y -= Camera.main.transform.y

        x *= sx
        y *= sy

        x += ctx.canvas.width/2
        y += ctx.canvas.height/2
        return{x,y}
    }

    static worldToGUI(ctx,x,y){
        let sxz = Camera.getLogicalScaleZoomable(ctx)
        let syz = sxz
        let sx = Camera.getLogicalScale(ctx)
        let sy = sx
        let zeros = Camera.getZeros(ctx)
        x -= Camera.main.transform.x
        y -= Camera.main.transform.y
        x *= sxz
        y *= syz
        x += ctx.canvas.width/2
        y += ctx.canvas.height/2

        x-= zeros.zeroX
        y -= zeros.zeroY

        x /= sx
        y /= sy
        return {x,y}
    }
static start(){
    let canvas = document.querySelector("#canv")

    canvas.addEventListener("mousemove",(e) => {
        Input.mouseX = e.clientX
        Input.mouseY = e.clientY
    })
    canvas.addEventListener("mousedown", (e) => {
        Input.lastMouseX = Input.mouseX;
        Input.lastMouseY = Input.mouseY;
  
        Input.mouseX = e.clientX
        Input.mouseY = e.clientY
        Input.mouseDown = true;
      })
      canvas.addEventListener("mouseup", (e) => {
        Input.lastMouseX = Input.mouseX;
        Input.lastMouseY = Input.mouseY;
        Input.mouseX = e.clientX
        Input.mouseY = e.clientY
        Input.mouseDown = false
        Input.mouseUp = true
      })
      document.addEventListener("keyup", (e) => { })
      document.addEventListener("keydown", (e) => { })
      document.addEventListener("keypress", (e) => { })
}
}
window.Input = Input
export default Input