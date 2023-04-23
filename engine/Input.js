class Input{
    static mouseX = 0
    static mouseY = 0

    static lastMouseX = 0
    static lastMouseY = 0
    static mouseDown = false
    static finishFrame() {
        Input.lastMouseX = Input.mouseX
        Input.lastMouseY = Input.mouseY
        Input.tick = 0
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
        Input.mouseDown = false;
      })
      document.addEventListener("keyup", (e) => { })
      document.addEventListener("keydown", (e) => { })
      document.addEventListener("keypress", (e) => { })
}
}
window.Input = Input
export default Input