//console.log('Three object here', THREE)

/* 
Start with creating a Canvas.
Create the scene.
Then create a camera for the scene.
Then create a Renderer, to render scene and camera.
We can have lights shadows and everything. 
Add the 3d models. 
*/

const scene = new THREE.Scene(); //create the scene

/*
Create the Camera.
The camera is not visible, it is just a point of view, a perspective.
2 Parameters: field of view (expressed in degrees and angle), and aspect ratio (width, length, height)
 */
const camera = new THREE.PerspectiveCamera(
    75, //field of view
    window.innerWidth / window.innerHeight, //Aspect Ratio in terms of the browswer window width and height.
    0.1, //near
    1000, //far
)
scene.add(camera)

//Move the camera back 5 units because initially the camera is very close to the canvas and cannot show anything, need to bring it back a little.
camera.position.z = 5 

//Next step: we need a render
//Some people create a Canvas in HTML, add an ID, and then access the canvas from this main.js, or there is the option to create a render.

/*
Create a renderer and then add it to the HTML.
Parameter: 
*/

const renderer = new THREE.WebGLRenderer({antialias: true}) //Antialias is for smooth edges. 
//Set the size of the renderer same as the browser size
renderer.setSize(window.innerWidth, window.innerHeight)

//Background color
renderer.setClearColor(0xffffff, 1) 

//Add the renderer to the html
document.body.appendChild(renderer.domElement)

//Add some lights to light the scene
//First parameter is color, then intensity, and the 3rd (not used here), is the distance and the 4th is the decay.
let ambientLight = new THREE.AmbientLight(0x101010, 1.0)

//the light will follow the camera
ambientLight.position = camera.position 

//Add the light to the scene
scene.add(ambientLight)

// Add a Directional Light
/*
Parameters: color and intensity
*/
let sunLight = new THREE.DirectionalLight(0xddddd, 1.0)

//Set the position of the light Sun (directional)
sunLight.position.y = 15

scene.add(sunLight)

//Now add an object to the scene so you can see it
//Let's add a cube
let geometry = new THREE.BoxGeometry(1, 1, 1) //BoxGeometry is the Shape of the Object, in this case is a cube of size 1w, 1h, 1d
let material = new THREE.MeshBasicMaterial({color: 'blue'}) //The material is a color.

let cube = new THREE.Mesh(geometry, material) //The mesh receives an object and a material and it creates the object.

scene.add(cube) //we will add the mesh (object) to the scene.

//Controls
//Event Listener for when we press the keys
document.addEventListener("keydown", onKeyDown, false)

//Function when a key is pressed, execute this function
function onKeyDown(event) {
    let keycode = event.which

    //right arrow key
    if(keycode === 39) {
        camera.translateX(-0.05)
    } 
    //left arrow key
    else if (keycode === 37){
        camera.translateX(0.05)
    }
    //up arrow key
    else if (keycode === 38){
        camera.translateY(-0.05)
    }
    //down arrow key
    else if (keycode === 40){
        camera.translateY(0.05)
    }
}


//We need a function for the animations
let render = function (){ 


    //We wan to rotate the cube
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    //Render the scene: it is like a screenshot of the scene taken with the camera. Need the camera and the scene to take screenshot
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}

/*
Steps to make the objects move
1.- Move the object with position or rotation
2.- Render again the object.
3.- Repeat

The number of times you render per second, is the number of frames per second. Most monitors today have capacity of rendering 60 framesXsec or fps.
//To do this in Javascript we use Window.RequestAnimationFrame this tells the brownser that you want to perform an animation, look for documentation in google. 
requestAnimationFrame(render)
*/

render()







