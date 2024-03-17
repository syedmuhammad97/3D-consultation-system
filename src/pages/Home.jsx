import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'
import Vancouver from '../models/Vancouver';
import Spaceship from '../models/Spaceship'
import Starfighter from '../models/Starfighter';

const Home = () => {
    const [isRotating, setIsRotating] = useState(false);

    const adjustVancouverForScreenSize = () => {
        let screenScale = null
        //screen position = [x-axis, y-axis, zoom]
        let screenPosition = [-0.2,-0.1, 2.3];
        let rotation = [0.1, 4.0, -0.09];

        if(window.innerWidth < 768) {
            screenScale = [0.9, 0.9, 0.9];
        }else {
            screenScale = [1,1,1];
        }
        return [screenScale, screenPosition, rotation]
    }

    const adjustStarfighterForScreenSize = () => {
        let screenScale = null
        //screen position = [x-axis, y-axis, zoom]
        let screenPosition = [-0.2, -0.1, 4];
        let rotation = [0.1, 4.0, -0.09];

        if(window.innerWidth < 768) {
            screenScale = [0.3, 0.3, 0.3];
        }else {
            screenScale = [0.3,0.3,0.3];
        }
        return [screenScale, screenPosition, rotation]
    }

    const [vancouverScale, vancouverPosition, 
        vancouverRotation] = adjustVancouverForScreenSize();
    
    const [starfighterScale, starfighterPosition] = adjustStarfighterForScreenSize();

  return (
    <section className='w-full h-screen relative'>
        {/* <div className='absolute top-28 left-0 right-0 z-10 flex
        items-center justify-center'>
            POPUP
        </div> */}

        <Canvas className= {`w-full h-screen bg-transparent ${isRotating ?
        'cursor-grabbing' : 'cursor-grab'}`}

        camera={{ near: 0.1, far: 1000}}>
            <Suspense fallback={<Loader />}>
                <directionalLight position={[10,1,1]} intensity={2} />
                <ambientLight intensity={0.5} />
                <hemisphereLight skyColor="#b1e1ff" groundColor="#000000"
                intensity={1} />

                <Spaceship /> 

                <Starfighter 
                    isRotating = {isRotating}
                    scale = {starfighterScale}
                    position = {starfighterPosition}
                    rotation = {[0, 15.5, 0]}
                />
                
                  <Vancouver 
                    position = {vancouverPosition}
                    scale = {vancouverScale}
                    rotation = {vancouverRotation}
                    isRotating = {isRotating}
                    setIsRotating = {setIsRotating}
                />  

            </Suspense>
        </Canvas>
    </section>
  )
}

export default Home