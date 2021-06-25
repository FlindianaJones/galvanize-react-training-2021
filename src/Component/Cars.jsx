import CarListItem from "./CarListItem";
import {useCart} from "../Context/CartContext"
import Button from "react-bootstrap/Button";
import {FixedSizeList} from "react-window";
import {useCallback, useEffect, useRef} from "react";
import useWindowDimensions from "../Utility/WindowDimensions";
import * as THREE from 'three'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

const Cars = ({cars, selectedCar, onSelect, close}) => {
    const {cart, addItem} = useCart();
    const handleBuy = () => addItem(selectedCar)
    const {height, width} = useWindowDimensions()
    const sceneMount = useRef(null)

    useEffect(() => {
        if (selectedCar) {
            const scene = new THREE.Scene()
            const camera = new THREE.PerspectiveCamera(75, 640 / 480, 0.1, 1000)
            const renderer = new THREE.WebGLRenderer({alpha: true})
            renderer.setClearColor(0x000000, 0)
            // const loader = new THREE.TextureLoader()
            const gltfLoader = new GLTFLoader()
            renderer.setSize(640, 480)
            sceneMount?.current?.appendChild(renderer.domElement)
            const light = new THREE.AmbientLight(0xFFFFFF, 1);
            scene.add(light);

            const ground = new THREE.PlaneGeometry(15, 15, 1, 1)
            const groundMaterial = new THREE.MeshBasicMaterial({color: 'gray', side: THREE.DoubleSide})
            const floor = new THREE.Mesh(ground, groundMaterial)
            floor.rotation.x = Math.PI / 2
            scene.add(floor)

            gltfLoader.load('./media/sportcar.017.glb', (loadedObj) => {
                loadedObj.scene.scale.set(0.025, 0.025, 0.025)
                scene.add(loadedObj.scene)
            }, () => {
            }, (e) => {
                console.error(e)
            })

            camera.position.set(0, 10, 16);
            camera.lookAt(scene.position);
            const animate = function () {
                requestAnimationFrame(animate)
                renderer.render(scene, camera)
            }
            animate()
        }
    }, [selectedCar])

    const Row = useCallback(({index, style}) => {
        return (<CarListItem key={index} {...cars[index]} onClick={onSelect} style={style}/>)
    }, [cars, onSelect])

    if (!selectedCar) {
        return (
            <FixedSizeList height={height - 420} width={width * 0.9} itemSize={100} itemCount={cars.length}
                           className='no-scrollbars'>
                {Row}
            </FixedSizeList>
        )
    } else {
        return (
            <div className='car-detail-container'>
                <nav>
                    <Button variant='danger' title='Close' onClick={close}>X</Button>
                    {!cart.find(item => item.id === selectedCar.id) ?
                        <Button variant='success' title="Buy" onClick={handleBuy}>Buy</Button> :
                        <span className='right-element'>In Cart!</span>}
                </nav>
                <div className='car-detail'>
                    <img src={selectedCar.image} alt={selectedCar.color}/>
                    <div>
                        <p>Year: {selectedCar.year}</p>
                        <p>Make: {selectedCar.make}</p>
                        <p>Model: {selectedCar.model}</p>
                        <p>Color: {selectedCar.color}</p>
                        <p>Price: ${selectedCar.price}</p>
                    </div>
                    <div id='preview-render' ref={sceneMount}/>
                </div>
            </div>
        )
    }
}

export default Cars