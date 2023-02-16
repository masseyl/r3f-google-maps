import React,{ ReactElement, useEffect } from "react"
import { ThreeJSOverlayView } from "@googlemaps/three";
import * as THREE from "three"
import useZusStore from "./zus"
import { useThree } from "@react-three/fiber"

const Test3D: React.FC = (): ReactElement => {
const {google, map, meshesArray, mapCenter} = useZusStore(state => state)
const {scene} =useThree()

  useEffect(() => {
    if ( google?.maps && map && scene) {
      const overlay =    new ThreeJSOverlayView({ scene, map, anchor:mapCenter, THREE});
      overlay.setMap(map)
    }
  }, [google, map, scene])
  
  return (
    <>
    {meshesArray.map((_: any, index: number) => {
      const xPos = (index+1) * 2
      return (<mesh position={[xPos, 0, 0]} onClick={() =>alert(`Hello from dynamic box: ${index}`)} key={`r3f-${index}`}
      >
          <boxGeometry args={[1,1,1]} attach="geometry" />
          <meshStandardMaterial color={"purple"} transparent={true}opacity={0.2} attach="material"  />
        </mesh> )
    })}  
    </>
      )
}

export default Test3D

