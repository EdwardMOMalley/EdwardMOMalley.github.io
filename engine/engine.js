import "./SceneManager.js"
import "./Component.js"
import "./Scene.js"
import "./GameObject.js"
import "./Transform.js"
import "./Camera.js"
import "./Rectangle.js"
import "./RectangleStatic.js"
import "./Circle.js"
import "./Line.js"
import "./Text.js"
import "./Vector2.js"
import "./Time.js"
import "./Input.js"
import "./GUITextCentered.js"

class EngineGlobals{
    static requestedAspectRatio = 1
    static logicalWidth = 500
}
window.EngineGlobals = EngineGlobals

//True if the gamee is paused, false otherwise
let pause = false

//Add an aspect ratio
//Add logical coordinates

//Handle favicon
const link = document.createElement("link");
link.href = "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%3E%3Ctext%20x='0'%20y='14'%3E🎮%3C/text%3E%3C/svg%3E";
link.rel = "icon";
document.getElementsByTagName("head")[0].appendChild(link); // for IE6


//-----------------------------------------------------------
//Input Event handling
//-----------------------------------------------------------

//Get references to the canvas element and 
//the 2d context
let canvas = document.querySelector("#canv")
let ctx = canvas.getContext("2d");

//Store the state of the user input
//This will be in its own file eventually
let keysDown = []
let frameRate = 25;

//Add event handlers so we capture user input
//Note the strings has to be all lowercase, e.g. keydown not keyDown or KeyDown
document.addEventListener("keydown", keyDown)
document.addEventListener("keyup", keyUp)

//Key up event handlers
function keyUp(e) {
    keysDown[e.key] = false

    //Pause functionality
    if (e.key == "p") {
        pause = !pause
    }

}

//Key down event handlers.
//Remember that key down can be triggered
//Multiple times without a keyup event 
//If the user hold the key down ("repated keys")
function keyDown(e) {
    keysDown[e.key] = true

    //To prevent scrolling (if needed)
    //This has to be in keyDown, not keyup
    if (e.key == " ") {
        e.preventDefault()
    }
}

//-----------------------------------------------------------
//Game Loop
//-----------------------------------------------------------

//Update the engine
function engineUpdate() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    //Handle the case when there is a system level pause.
    if (pause) return
    Time.update()

    //Get a reference to the active scene.
    let scene = SceneManager.getActiveScene()
    if (SceneManager.changedSceneFlag && scene.start) {
        let camera = scene.gameObjects[0]
        scene.gameObjects = []
        scene.gameObjects.push(camera)

        //Loop through the objects from the previous scene
        //so can preserve some


        scene.start()
        SceneManager.changedSceneFlag = false
    }

    //Start any game objects that can be started
    //but have not.
    for (let gameObject of scene.gameObjects) {
        if (gameObject.start && !gameObject.started) {
            gameObject.start(ctx)
            gameObject.started = true
        }
    }

    //Start any components that can be started
    //but have not.
    for (let gameObject of scene.gameObjects) {
        for (let component of gameObject.components) {
            if (component.start && !component.started) {
                component.start(ctx)
                component.started = true
            }
        }
    }

    //Handle destroy here
    let keptGameObjects = []
    for (let gameObject of scene.gameObjects) {
        if (!gameObject.markedForDestroy) {
            keptGameObjects.push(gameObject)
        }
    }
    scene.gameObjects = keptGameObjects;

    //Call update on all components with an update function
    for (let gameObject of scene.gameObjects) {
        for (let component of gameObject.components) {
            if (component.update) {
                component.update(ctx)
            }
        }
    }
    Input.finishFrame()



}



//Draw all the objects in the scene
function engineDraw() {

    //Match the size of the canvas to the browser's size
    //This allows us to respond to browser size changes






    //Adjust for the camera
    ctx.fillStyle = Camera.main.getComponent("Camera").fillStyle;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    let browserAspectRatio = canvas.width / canvas.height;
    let offsetX = 0;
    let offsetY = 0;
    let browserWidth = canvas.width
    if (EngineGlobals.requestedAspectRatio > browserAspectRatio) {
        let desiredHeight = canvas.width / EngineGlobals.requestedAspectRatio;
        let amount = (canvas.height - desiredHeight) / 2;
        offsetY = amount;
    }
    else {
        let desiredWidth = canvas.height * EngineGlobals.requestedAspectRatio
        let amount = (canvas.width - desiredWidth) / 2;
        offsetX = amount
        browserWidth -= 2 * amount
    }




    let scene = SceneManager.getActiveScene()



    ctx.save();

    let logicalScale = browserWidth / EngineGlobals.logicalWidth
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2)

    
    //Scaling isnt working because you're scaling x and y as the same value so it only scales correctly
    //when the game is a square
    ctx.scale(logicalScale, logicalScale)


    ctx.translate(-Camera.main.transform.x, -Camera.main.transform.y)


    let min = scene.gameObjects.filter(go=>go.components.some(c=>c.draw))
    .map(go => go.layer)
    .reduce((previous, current)=>Math.min(previous, current),0)

    let max = scene.gameObjects.filter(go=>go.components.some(c=>c.draw))
    .map(go => go.layer)
    .reduce((previous, current)=>Math.max(previous, current),0)

    //Loop through the components and draw them.
    for (let i = min; i <= max; i++) {
        let gameObjects = scene.gameObjects.filter(go=>go.layer==i)

        for (let gameObject of gameObjects) {
            for (let component of gameObject.components) {
                if (component.draw) {
                    component.draw(ctx)
                }
            }
        }
    }
    
    
    ctx.restore()

    let zeroX = 0
    let zeroY = 0
    if (EngineGlobals.requestedAspectRatio > browserAspectRatio) {
        let desiredHeight = canvas.width / EngineGlobals.requestedAspectRatio;
        let amount = (canvas.height - desiredHeight) / 2;
        zeroY = amount
        ctx.fillStyle = "navy"
        ctx.fillRect(0, 0, canvas.width, amount);
        ctx.fillRect(0, canvas.height - amount, canvas.width, amount);
    }
    else {
        let desiredWidth = canvas.height * EngineGlobals.requestedAspectRatio
        let amount = (canvas.width - desiredWidth) / 2;
        zeroX = amount
        ctx.fillStyle = "navy"
        ctx.fillRect(0, 0, amount, canvas.height);
        ctx.fillRect(canvas.width - amount, 0, amount, canvas.height);
    }

    ctx.save()
    ctx.translate(zeroX,zeroY)
    ctx.scale(logicalScale, logicalScale)
    //Static draw
    for (let i = min; i <= max; i++) {
        let gameObjects = scene.gameObjects.filter(go=>go.layer==i)

        for (let gameObject of gameObjects) {
            for (let component of gameObject.components) {
                if (component.staticDraw) {
                    component.staticDraw(ctx)
                }
            }
        }
    }
    ctx.restore()






    //Check if it's too wide
    //Calculate the letter boxing amount
    //Fill the letter boxes

    //Draw debugging information
    let debug = false;
    if (debug) {
        let y = 50;
        for (let gameObject of scene.gameObjects) {
            ctx.fillStyle = "white"
            ctx.font = "20px Courier"
            let string = gameObject.name + " (" + gameObject.transform.x + "," + gameObject.transform.y + ")"
            ctx.fillText(string, 50, y);
            y += 20;
        }
    }
}

/**
 * Start the game and set the browser tabe title
 * @param {string} title The title of teh browser window
 */
function start(title) {
    document.title = title
    Input.start()
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    function gameLoop() {
        engineUpdate()

        engineDraw()

    }

    //Run the game loop 25 times a second
    setInterval(gameLoop, 1000 / frameRate)

}





//Add certain functions to the global namespace
//This allows us to call these functions without
//a prefix, which better matches Unity

/** Start the game in 'play mode1 */
window.start = start;

/** Expose the update calls for the testing routines */
window.engineUpdate = engineUpdate;
window.engineDraw = engineDraw;
window.frameRate = frameRate;



/** The state of the keyboard.. */
window.keysDown = keysDown;
