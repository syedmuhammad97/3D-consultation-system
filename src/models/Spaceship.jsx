import {useRef, useEffect} from 'react'
import { useGLTF } from '@react-three/drei'
import spaceshipScene from '../assets/3d/Spaceship.glb';
import { useFrame } from '@react-three/fiber';

const Spaceship = () => {
  const { scene, animations } = useGLTF(spaceshipScene);
  const spaceshipRef = useRef();

  useFrame(({clock, camera}) => {
    spaceshipRef.current.rotation.y = Math.sin(clock.elapsedTime) * 0.2 + 2;

    if(spaceshipRef.current.position.x > camera.position.x + 10){
      spaceshipRef.current.rotation.y = Math.PI;
    }else if (spaceshipRef.current.position.x < camera.position.x -10){
      spaceshipRef.current.rotation.y = 0;
    }

    if(spaceshipRef.current.position.z > 2){
      spaceshipRef.current.position.x -= 0.01;
      spaceshipRef.current.position.z += 0.01;
    }else if(spaceshipRef.current.position.z < 5){
      spaceshipRef.current.position.x += 0.01;
      spaceshipRef.current.position.z -= 0.01;
    }
  })  

  return (
    //position : x-axis, y-axis, zoom
    <mesh position = {[-2, 2, 1]} 
    scale = {[0.3, 0.3, 0.3]}
    ref = {spaceshipRef}>
        <primitive object = {scene} />
    </mesh>
  )
}

export default Spaceship