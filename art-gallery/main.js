//console.log('Three object here', THREE)
import * as THREE from 'three'
import {PointerLockControls} from 'three-stdlib'
import {displayPaintingInfo, hidePaintingInfo} from './paintingInfo'

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
const ambientLight = new THREE.AmbientLight(0xffffff, 1.0)

//the light will follow the camera
//ambientLight.position = camera.position 

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

//Create the floor plane.
/*
BoxGeometry is the shape of the object, parameters are width and height. You can see the documentation of Three.js in https://threejs.org/ 
*/

/**
 * The textures are images that are applied to the geometries or shapes. 
 * Alpha texture, transparency. 
 * More complex textures: hight texture: move vertices to create some releave.
 * Normal textures: it has small details in the textures, it won't move the vertices. 
 * Metal texture: gives the look of metallic.
 * Loveness texture: waithe and black, the parts move. 
 * You can search more textures in the documentation. 
 * PVR is now everywhere in the most advanced softwares, this is becoming standard for more realistic renders.
 * UnitEngine (favorite), Imagine, Blender and many others, they are using PVR for realistic textures. 
 */

/**
 * To add a texture first you have to load it with the TextureLoader function
 */
//Texture for the floor
const floorTexture = new THREE.TextureLoader().load('src/public/img/Floor.jpg') //this code worked for me but not for the trainer, he changed it to use ImageUtils instead
//let floorTexture = new THREE.ImageUtils.loadTexture('img/Floor.jpg')//When I tried the ImageUtils it didn't worked for me only for the trainer, I went back to TextureLoader.

floorTexture.wrapS = THREE.RepeatWrapping  //repeat on the horizontal direction.
floorTexture.wrapT = THREE.RepeatWrapping  //repeat on the vertical direction.
floorTexture.repeat.set(20,20)

const planeGeometry =  new THREE.PlaneGeometry(50, 50)
const planeMaterial =  new THREE.MeshBasicMaterial({
    //color: 'green', //this will give the color green to the shape. If you are using Textures instead, then do not use color and use map parameter instead as shown below.
    map: floorTexture, // to add a texture, use map parameter here and remove the color parameter.
    side: THREE.DoubleSide, //this will render both sides of the plane.
})

const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial)

 floorPlane.rotation.x = Math.PI / 2 //This is 90 degrees rotation.
 floorPlane.position.y = -Math.PI //This is 180 degrees position.

scene.add(floorPlane)

// Add Textures for the walls:
const wallTexture = new THREE.TextureLoader().load('src/public/img/white-texture.jpg') //this code worked for me but not for the trainer, he changed it to use 

wallTexture.wrapS = THREE.RepeatWrapping  //repeat on the horizontal direction.
wallTexture.wrapT = THREE.RepeatWrapping  //repeat on the vertical direction.
wallTexture.repeat.set(1,1)

//Create the walls
/**
 * Because we need several walls, we can create a group of objects in THREE JS.
 *  
 */
const wallGroup = new THREE.Group()
scene.add(wallGroup)

//Create the front wall
const frontWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 20, 0.001), //This receives 3 parameters, width, height and dept. For wall we need depth to be thin so it is a wall and not a box, so dept is 0.001.
    new THREE.MeshBasicMaterial({map: wallTexture}),
)

frontWall.position.z = -20 //Move the front wall back to is not to close to the camara and to give more space in the room. 

//Create the front wall
const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 20, 0.001), //This receives 3 parameters, width, height and dept. For wall we need depth to be thin so it is a wall and not a box, so dept is 0.001.
    new THREE.MeshBasicMaterial({map: wallTexture}),
)

backWall.position.z = 20  //Move the front wall back to is not to close to the camara and to give more space in the room. 

//Create the left wall
const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 20, 0.001),
    new THREE.MeshBasicMaterial({map: wallTexture}),
)

//Move the left wall 90 degrees to rotate it to the left
leftWall.rotation.y = Math.PI / 2 //this is 90 degrees rotation
leftWall.position.x = -20

//Right Wall
const rightWall = new THREE.Mesh(
    new THREE.BoxGeometry (50, 20, 0.001),
    new THREE.MeshBasicMaterial({map: wallTexture}),
)

//Move the right wall 90 degrees to rotate it to the left
rightWall.rotation.y = Math.PI / 2 //this is 90 degrees rotation
rightWall.position.x = 20

//Create the ceiling
const ceilingGeometry = new THREE.PlaneGeometry(50, 50) //BoxGeometry is the shape of the object
const ceilingMaterial =  new THREE.MeshLambertMaterial({map: wallTexture})

const ceilingPlane= new THREE.Mesh(ceilingGeometry, ceilingMaterial)

ceilingPlane.rotation.x =  Math.PI / 2 //Rotate 90 degrees to move the ceiling to the top.
ceilingPlane.position.y = 12

scene.add(ceilingPlane)

wallGroup.add(frontWall, backWall, leftWall, rightWall)

// Loop through each wall and create the bounding box for each wall
for (let i = 0; i < wallGroup.children.length; i++) {
    wallGroup.children[i].BoundingBox = new THREE.Box3()
    wallGroup.children[i].BoundingBox.setFromObject(wallGroup.children[i])
}

function checkCollision(){
    const playerBoundingBox = new THREE.Box3() //create a bounding box for the player
    const cameraWorldPosition = new THREE.Vector3() //create a vector to hold the camera position

    camera.getWorldPosition(cameraWorldPosition)// get teh camera position and store it in the vector. Note: the camera represents the player's position in our case
    playerBoundingBox.setFromCenterAndSize(
        // setFromCenterAndSize is a method that takes the center and size of the box. We set the player's bounding box size and center it on the camera's world position.
        cameraWorldPosition,
        new THREE.Vector3 (1,1,1)
    )
    
    // loop through each wall
    for (let i = 0; i < wallGroup.children.length; i++) {
        const wall = wallGroup.children[i] //get the wall
        if(playerBoundingBox.intersectsBox(wall.BoundingBox)){
            //check if the player's bounding box intersects with any of the wall bounding boxes
            return true // If it does, return true
        }
    }
    return false // If it doesn't, return false
}

function createPainting(imageUrl, width, height, position){
    const textureLoader = new THREE.TextureLoader()
    const paintingTexture = textureLoader.load(imageUrl)
    const paintingMaterial = new THREE.MeshBasicMaterial({
        map: paintingTexture,
    })
    const paintingGeometry = new THREE.PlaneGeometry(width, height)
    const painting = new THREE.Mesh(paintingGeometry, paintingMaterial)
    painting.position.set(position.x, position.y, position.z)
    return painting
}

const painting1 = createPainting(
    './src/public/img/1656037107636.jpg',
    10,
    5,
    new THREE.Vector3(-10, 5, -19.99)
    )

const painting2 = createPainting(
        './src/public/img/Fireworks.jpg',
        10,
        5,
        new THREE.Vector3(10, 5, -19.99)
        )
// Paiting on the left wall
const painting3 = createPainting(
            './src/public/img/Fireworks.jpg',
            10,
            5,
            new THREE.Vector3(-19.99, 5, -10)
            )

painting3.rotation.y = Math.PI / 2 // 90 degrees. If we don't rotate this, it will show up in teh front of us instead of lying on the left wall.

//Paiting on the right wall (near the front wall)
const painting4 = createPainting(
    './src/public/img/Fireworks.jpg',
    10,
    5,
    new THREE.Vector3(19.99, 5, -10)
    )

painting4.rotation.y = -Math.PI / 2 // -90 degrees. If we don't rotate this, it will show up in teh front of us instead of lying on the left wall.

// Painting on the left wall (near the back wall)
const painting5 = createPainting(
    './src/public/img/Fireworks.jpg',
    10,
    5,
    new THREE.Vector3(-19.5, 5, 10)
    )

painting5.rotation.y = Math.PI / 2 // 90 degrees. If we don't rotate this, it will show up in teh front of us instead of lying on the left wall.

const painting6 = createPainting(
    './src/public/img/Fireworks.jpg',
    10,
    5,
    new THREE.Vector3(-19.5, 5, 10)
    )

painting6.rotation.y = Math.PI / 2 // 90 degrees. If we don't rotate this, it will show up in teh front of us instead of lying on the left wall.

// Painting on the back wall at the left
const painting7 = createPainting(
    './src/public/img/Fireworks.jpg',
    10,
    5,
    new THREE.Vector3(-10, 5, 19.5)
    )

painting7.rotation.y = Math.PI // 180 degrees. If we don't rotate this, it will show up in teh front of us instead of lying on the left wall.

// Painting on the back wall at the left
const painting8 = createPainting(
    './src/public/img/Fireworks.jpg',
    10,
    5,
    new THREE.Vector3(10, 5, 19.5)
    )

painting8.rotation.y = Math.PI // 180 degrees. If we don't rotate this, it will show up in teh front of us instead of lying on the left wall.

//Loop through each wall and create the bounding box
//The bounding box is for creating a colider so the person walking in the room colide with the walls and cannot pass thru the walls.
// for (let i = 0; i < wallGroup.children.length; i++) {
//     wallGroup.children[i].BBox = new THREE.Box3()
//     wallGroup.children[i].BBox.setFromObject(wallGroup.children[i])
// }

scene.add(painting1, painting2, painting3, painting4, painting5, painting6, painting7, painting8)

//Controls for hiding the Virtual Museum Menu
/**
 * The PointerLockControl is attached to the camera and the document.body of the HTML.
 */
const controls = new PointerLockControls(camera, document.body)

//Lock the pointer (controls are activated) and hide the menu when the experience starts
function startExperience(){
    //Lock the pointer
    controls.lock()
    //Hide the menu
    hideMenu()
}

const playButton = document.getElementById("play_button")
playButton.addEventListener("click", startExperience)

//Hide menu function
function hideMenu()
{
    const menu = document.getElementById("menu")
    menu.style.display = 'none'
}

//Show menu function
function showMenu()
{
    const menu = document.getElementById("menu")
    menu.style.display = 'block'
}

controls.addEventListener('unlock', showMenu)

// //Function when a key is pressed, execute this function
// function onKeyDown(event) {
//     let keycode = event.which

//     //right arrow key or keboard D
//     if(keycode === 39 || keycode === 68) {
//         controls.moveRight(0.08)
//     } 
//     //left arrow key, or keyboard A
//     else if (keycode === 37 || keycode === 65){
//         controls.moveRight(-0.08)
//     }
//     //up arrow key, or keyboard W 
//     else if (keycode === 38 || keycode === 87){
//         controls.moveForward(0.08)
//     }
//     //down arrow key, or keyboard S
//     else if (keycode === 40 || keycode === 83){
//         controls.moveForward(-0.08)
//     }
// }

//Object to hold the keys pressed
const keysPressed = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    w: false,
    a: false,
    s: false,
    d: false
}

// Event listener for when we press the keys.
// The event is triggered only once when the user pressed. To keep the movement going we have to separate the keydown from keyup.
document.addEventListener(
    'keydown', //`keydown` is an event that fires when a key is pressed
    (event) => {
        if(event.key in keysPressed){
            //check if the key pressed is in the keysPressed object
            keysPressed[event.key] = true //if it is, set the value to true
        }
    }, 
    false
    )
// Event listener for when we release the keys
document.addEventListener(
    'keyup', //`keyup` is an event that fires when a key is released
    (event) => {
        if(event.key in keysPressed){
            //check if the key pressed is in the keysPressed object
            keysPressed[event.key] = false //if it is, set the value to false
        }
    }, 
    false
    )


const clock = new THREE.Clock()

function udpateMovement(delta){
    const moveSpeed = 5 * delta //moveSpeed is the distance the camera will move in one second. We multiply by delta to make the movement framerate independent. This means that the movement will be the same regardless of the framerate. This is important because if the framerate is low, the movement will be slow and if the frame rate is high, the movement will be fast. This is not what we want. We want the movement to be the same regardless of the framerate. 

    const previousPosition =  camera.position.clone() //clone the camera position before the movement

    if(keysPressed.ArrowRight || keysPressed.d) {
        controls.moveRight(moveSpeed)
    }
    if(keysPressed.ArrowLeft || keysPressed.a){
        controls.moveRight(-moveSpeed)
    }
    if(keysPressed.ArrowUp || keysPressed.w){
        controls.moveForward(moveSpeed)
    }
    if(keysPressed.ArrowDown || keysPressed.s){
        controls.moveForward(-moveSpeed)
    }

    //After the movement is applied, we check for collisions by calling the checkCollision function. If a collision is detected, we revert the camera's position to its previous position, effectively preventing the player from moving through walls.
    // if(checkCollision()){
    //     camera.position.copy(previousPosition) //reset the camera position to the previous position. The `previousPosition` variable is a clone of the camera position before the movement. 
    // }
}

//We need a function for the animations
let render = function (){ 
    const delta = clock.getDelta() //get the time between frames
    udpateMovement(delta) //update the movement with the time between frames

    const distanceThreshold = 8 //set a distance threashold (8 units)

    let paintingToShow // variable responsible to store the value where we want to how or not show the painting.
    // //We wan to rotate the cube
    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01
    // //Render the scene: it is like a screenshot of the scene taken with the camera. Need the camera and the scene to take screenshot
    renderer.render(scene, camera) //render the scene
    requestAnimationFrame(render) //requestAnimationFrame is a method that calls teh render function before the next repaint. This is used to render teh scene at 60 frames per second and is more efficient than using setInterval because it only renders when the browser is ready to repaint. 
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







