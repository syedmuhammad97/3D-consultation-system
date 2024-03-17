import React from 'react'
import starfighterScene from '../assets/3d/T-65 X-Wing Starfighter.glb'
import { useGLTF } from '@react-three/drei'

const Starfighter = ({ isRotating, ...props}) => {
    const { scene, animations } = useGLTF(starfighterScene)
  return (
    <mesh {...props}>
        <primitive object={scene} />
    </mesh>
  )
}

export default Starfighter

