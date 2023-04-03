import "/engine/engine.js"
import "./1StartScene/StartScene.js"
import "./2MainScene/SceneControl/MainScene.js"
import "./3WinScene/WinScene.js"
import "./4LoseScene/LoseScene.js"















let startScene = new StartScene()
let mainScene = new MainScene()
let loseScene = new LoseScene()
let winScene = new WinScene()

//All Scenes
window.allScenes = [startScene, mainScene, winScene, loseScene]

//Test Main Scene
//window.allScenes = [mainScene]

//window.allScenes = [startScene,winScene,loseScene]