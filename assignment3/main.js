var angle = 0;

function init(){

    
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    gl.clearColor(0,0,0,1);
    gl.enable(gl.DEPTH_TEST);
    
    
    cube = new Cube(gl);

    requestAnimationFrame(render);

}


function render(){

   gl.clear(gl.COLOR_BUFFER_BIT, gl.DEPTH_BUFFER_BIT);
   
   
   angle +=1;

   R = rotate(angle, [1,1,1]);


   cube.mv = R;
   cube.p = R;
   cube.render();


   requestAnimationFrame(render);

}

window.onload = init;