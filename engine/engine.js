import "./SceneManager.js"
import "./Component.js"
import "./Scene.js"
import "./GameObject.js"
import "./Transform.js"
import "./Camera.js"
import "./Rectangle.js"
import "./Circle.js"
import "./Line.js"
import "./Text.js"
import "./Vector2.js"

//True if the gamee is paused, false otherwise
let pause = false

//Add an aspect ratio
//Add logical coordinates

//Handle favicon
const link = document.createElement("link");
link.href = "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%3E%3Ctext%20x='0'%20y='14'%3E🎮%3C/text%3E%3C/svg%3E";
link.rel = "icon";
document.getElementsByTagName("head")[0].appendChild(link); // for IE6

let testOffset = 30;
let nextOffset = 25;

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
let mouseClick = [-1, -1]
let mouseX;
let mouseY
let frameRate = 25;

//Add event handlers so we capture user input
//Note the strings has to be all lowercase, e.g. keydown not keyDown or KeyDown
document.addEventListener("keydown", keyDown)
document.addEventListener("keyup", keyUp)

document.addEventListener("mousedown", mouseDown);
document.addEventListener("mouseup", mouseUp);
document.addEventListener("mousemove", mouseMove);


//Mouse event handlers
function mouseDown(e) {
    mouseClick[0] = e.clientX
    mouseClick[1] = e.clientY
    //console.log("mouseDown: " + e.clientX + " " + e.clientY)
}
function mouseUp(e) {
    mouseClick[0] = -1
    mouseClick[1] = -1
}
function mouseMove(e) {
    //console.log("mouseMove: " + e.clientX + " " + e.clientY)
}

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
    //Handle the case when there is a system level pause.
    if (pause) return

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
            gameObject.start()
            gameObject.started = true
        }
    }

    //Start any components that can be started
    //but have not.
    for (let gameObject of scene.gameObjects) {
        for (let component of gameObject.components) {
            if (component.start && !component.started) {
                component.start()
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



}

let aspectRatio = 1
let logicalWidth = 500

//Draw all the objects in the scene
function engineDraw() {

    //Match the size of the canvas to the browser's size
    //This allows us to respond to browser size changes
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight





    //Adjust for the camera
    ctx.fillStyle = Camera.main.getComponent("Camera").fillStyle;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    let currentAspectRatio = canvas.width / canvas.height;
    let offsetX = 0;
    let offsetY = 0;
    let actualWidth = canvas.width
    if (aspectRatio > currentAspectRatio) {
        let desiredHeight = canvas.width / aspectRatio;
        let amount = (canvas.height - desiredHeight) / 2;
        offsetY = amount;
    }
    else {
        let desiredWidth = canvas.height * aspectRatio
        let amount = (canvas.width - desiredWidth) / 2;
        offsetX = amount
        actualWidth -= 2 * amount
    }




    let scene = SceneManager.getActiveScene()



    ctx.save();

    let logicalScale = actualWidth / logicalWidth
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2)

    
    //Scaling isnt working because you're scaling x and y as the same value so it only scales correctly
    //when the game is a square
    ctx.scale(logicalScale, logicalScale)


    ctx.translate(-Camera.main.transform.x, -Camera.main.transform.y)


    //Loop through the components and draw them.
    for (let gameObject of scene.gameObjects) {
        for (let component of gameObject.components) {
            if (component.draw) {
                component.draw(ctx)
            }
        }
    }
    ctx.translate(offsetX, offsetY)
    ctx.restore()
    ctx.save()

    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2)
    ctx.scale(logicalScale, logicalScale)

    //Static draw
    for (let gameObject of scene.gameObjects) {
        for (let component of gameObject.components) {
            if (component.staticDraw) {
                component.staticDraw(ctx)
            }
        }
    }
    ctx.restore()


    if (aspectRatio > currentAspectRatio) {
        let desiredHeight = canvas.width / aspectRatio;
        let amount = (canvas.height - desiredHeight) / 2;
        ctx.fillStyle = "navy"
        ctx.fillRect(0, 0, canvas.width, amount-200);
        ctx.fillRect(0, canvas.height - amount, canvas.width, amount);
    }
    else {
        let desiredWidth = canvas.height * aspectRatio
        let amount = (canvas.width - desiredWidth) / 2;
        ctx.fillStyle = "navy"
        ctx.fillRect(0, 0, amount, canvas.height);
        ctx.fillRect(canvas.width - amount, 0, amount, canvas.height);
    }



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
window.mouseClick = mouseClick
window.logicalWidth = logicalWidth
