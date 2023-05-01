
 class GUITextCentered extends Component {
    name = "GUIText"
  
    fillStyle

    string
  
    font

    constructor(string, fillStyle = "white", font="10px Helvettica") {
      super();
      this.fillStyle = fillStyle
      this.string = string;
      this.font = font;
    }
  
    
    staticDraw(ctx) {
      //Set the fill style
      ctx.fillStyle = this.fillStyle
      ctx.font = this.font
      let measurements = ctx.measureText(this.string);
      
      ctx.fillText(this.string, this.transform.x-measurements.width/2, this.transform.y+measurements.actualBoundingBoxAscent/2);
    }
  }
  
  //Add text to the global window object.
  window.GUITextCentered = GUITextCentered;