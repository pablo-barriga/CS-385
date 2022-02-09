

function init(){

    
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    gl.clearColor(1.0, 0.0, 0.0, 0.5);

    cone = new Cone(gl, 1000);

    render();

}

function render(){

   gl.clear(gl.COLOR_BUFFER_BIT);
   
   cone.render();

}

window.onload = init;