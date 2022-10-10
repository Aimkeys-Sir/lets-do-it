import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as Dat from 'dat.gui'

const renderer = new THREE.WebGL1Renderer()

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

const orbit= new OrbitControls(camera,renderer.domElement)
orbit.update()

const directionalLight=new THREE.DirectionalLight(0xffffff,0.8)
scene.add(directionalLight)


const axesHelper = new THREE.AxesHelper(5)

scene.add(axesHelper)
camera.position.set(-10, 30, 30)
/* creating an object
 An object  needs: 
 a) geometry/mesh
 b) Material
*/
const boxGeometry = new THREE.BoxGeometry()
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xffa600 })
const box = new THREE.Mesh(boxGeometry, boxMaterial)
scene.add(box)

const planeGeometry= new THREE.PlaneGeometry(30,30)
const planeMaterial= new THREE.MeshStandardMaterial({ color: 0xffffff,side: THREE.DoubleSide})
const plane= new THREE.Mesh(planeGeometry,planeMaterial)
plane.rotation.x=-0.5*Math.PI
scene.add(plane)

const ambientLight=new THREE.AmbientLight(0xdedede)
scene.add(ambientLight)
const gui=new Dat.GUI

const options={
    sphereColor: "#ffea00",
    wireframe:false,
    speed: 0.01,
    radius: 1

}

const sphereGeometry=new THREE.SphereGeometry(5,50,50)
const sphereMaterial= new THREE.MeshLambertMaterial({color: 0xff00a6, wireframe:false})
const sphere=new THREE.Mesh(sphereGeometry,sphereMaterial)
scene.add(sphere)

sphere.position.set(0,5,0)


gui.add(options, "radius",0.5,1.5)

gui.addColor(options,"sphereColor").onChange(e=>{
    sphere.material.color.set(e)
})

gui.add(options,'wireframe').onChange(e=>{
    sphere.material.wireframe=e
})

gui.add(options,"speed",0,0.1)

const grid= new THREE.GridHelper(30)
scene.add(grid)

let step=0



function animate(time) {
    box.rotation.x = time/1000
    box.rotation.y = time/1000

    step +=options.speed
    sphere.position.y=5+5* Math.abs(Math.sin(step))
    let a=options.radius
    sphere.geometry.scale(a,a,a)
    // sphere.radius=options.radius
    renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)
