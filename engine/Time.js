class Time {
    static deltaTime = 1/25

    static time = 0

    static frameCount = 0


    static update(){
        if (!SceneManager.isRunning) {
            return
        }
        Time.time += Time.deltaTime
        Time.frameCount++
    }
}

window.Time = Time
export default Time