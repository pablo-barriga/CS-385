
//"use strict";

//var sun = undefined;
//var moon = undefined;
//var earth = undefined;
var t = 0.0;
var tm = 0.0;




var gl;

function init() {
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    var width = canvas.clientWidth; 
    var height = canvas.clientHeight; 
    gl.viewport(0, 0, width, height); 
    aspect = width/height;





    // Add your sphere creation and configuration code here
    var P = perspective(37, aspect, 3, 5.7);

    sun = new Sphere(200, 200);
    earth = new Sphere(200, 200);
    moon = new Sphere(200, 200);
    sun.radius = .2;
    earth.radius = 0.1;
    earth.distance = 1.0;
    moon.radius = 0.05;
    moon.distance = 0.3;
    
    
     
    sun.color = vec4(1.0, 1.0, 0.0, 1.0);
    earth.color = vec4(0.0, 0.0, 1.0, 1.0);
    moon.color = vec4(0.5, 0.5, 0.5, 1.0);
    earth.P = P;
    sun.P = P;
    moon.P = P;


    requestAnimationFrame(render);
}

function render() {

    // Update your motion variables here

    gl.clear(gl.COLOR_BUFFER_BIT, gl.DEPTH_BUFFER_BIT);
    var near = 3;
    var far = 5.7;

    const HoursPerDay = 24;
    const HoursPerYear = 365.25;
    var year = t / HoursPerYear * 360; 
    var day = t % HoursPerDay; 
    
    t += 1;
    tm += 0.5;
    var axis = (t, [0, 0, 1]);
    var maxis = (tm, [0, 0, 1]);
    // Add your rendering sequence here
    ms = new MatrixStack();
    

    var V = translate(0.0, 0.0, -0.5*(near + far));
    ms.load(V);
    ms.push();
    ms.scale(sun.radius); 
    sun.MV = ms.current(); 
    sun.render(); 
    ms.pop(); 

    ms.push(); 
    ms.rotate(year, axis); 
    ms.translate(earth.distance, 0, 0); 
    ms.push();
    ms.rotate(day, axis); 
    ms.scale(earth.radius); 
    earth.MV = ms.current(); 
    earth.render(); 
    ms.pop();
    

    ms.rotate(year, maxis);
    ms.translate(moon.distance, 0, 0);
    ms.scale(moon.radius);
    moon.MV = ms.current();
    moon.render();
    ms.pop();


    
    requestAnimationFrame(render);
}
window.onload = init;
