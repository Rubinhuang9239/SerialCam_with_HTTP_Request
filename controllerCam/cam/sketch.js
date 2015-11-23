var rSlider, gSlider, bSlider;

function setup() {
  // create canvas
  //createCanvas(710, 400);
  noCanvas();
  textSize(15)
  noStroke();

  // create sliders
  xSlider = createSlider(40, 140, 90);
  xSlider.position(130, 530);
  xSlider.id('sliderX');
  ySlider = createSlider(230, 290, 0);
  ySlider.position(130, 615);
  ySlider.id('sliderY');

  //text("test", 130, 400);

}


var xVal;
var yVal;

function draw() {
 xVal = xSlider.value();
 yVal = ySlider.value();

}

