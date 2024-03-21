import { Suspense, useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'
import Vancouver from '../models/Vancouver';
import Spaceship from '../models/Spaceship'
import Starfighter from '../models/Starfighter';
import HomePopup from '../components/HomePopup';
import shipmusic from '../assets/space_battle_sound.mp3'
import volume from '../assets/icons/volume.png'
import mute from '../assets/icons/mute.png'


const Home = () => {
    const audioRef = useRef(new Audio(shipmusic));
    //modify volume of background noise
    audioRef.current.volume = 0.4;
    //loop the background noise
    audioRef.current.loop = true;
    const [currentStage, setCurrentStage] = useState(1);
    const [isRotating, setIsRotating] = useState(false);
    const [isPlayingMusic, setIsPlayingMusic] = useState(false);

    useEffect(() => {
        if(isPlayingMusic){
            audioRef.current.play();
        }
        return () => {
            audioRef.current.pause();
        }
    }, [isPlayingMusic])

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
         <div className='absolute top-28 left-0 right-0 z-10 flex
        items-center justify-center'>
            {currentStage && <HomePopup currentStage={currentStage} />}
        </div> 

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
                    setCurrentStage={setCurrentStage}
                    setIsRotating = {setIsRotating}
                />  

            </Suspense>
        </Canvas>

        <div className='absolute bottom-2 left-2'>
            <img src={!isPlayingMusic ? mute : volume} 
            alt = "sound"
            className='w-10 h-10 cursor-pointer object-contain'
            onClick={() => setIsPlayingMusic(!isPlayingMusic)}
            />
        </div>
    </section>
  )
}

export default Home