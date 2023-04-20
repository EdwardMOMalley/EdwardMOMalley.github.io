class Line extends Component {

    name = "Line"
  

    strokeStyle
  

    lineWidth
  
    constructor(strokeStyle = "transparent", lineWidth = 1){
      super()
      this.strokeStyle = strokeStyle
      this.lineWidth = lineWidth
    }
  

    draw(ctx) {

      ctx.strokeStyle = this.strokeStyle
      ctx.lineWidth = this.lineWidth
  
  
      let startX = -Math.cos(this.transform.r)*this.transform.sx+this.transform.x
      let startY = -Math.sin(this.transform.r)*this.transform.sx+this.transform.y
  
      let endX = Math.cos(this.transform.r)*this.transform.sx+this.transform.x
      let endY = Math.sin(this.transform.r)*this.transform.sx+this.transform.y
      
      // Draw the line
      ctx.beginPath()
      ctx.moveTo(endX, endY);
      ctx.lineTo(startX, startY);
      ctx.stroke()
    }
  
  }
  

  window.Line = Line;