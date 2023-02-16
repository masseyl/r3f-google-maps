import { Canvas } from "@react-three/fiber"
import { ReactElement, useCallback, useEffect, useState } from "react"
import { Loader } from '@googlemaps/js-api-loader'
import useZusStore from "./zus"
import DynamicMeshes from "./DynamicMeshes"


const apiOptions = {
  "apiKey": 'AIzaSyC6ialBoIPddSYiVaD9Z748b9QviqHrpuA',
  "libraries": ['places']
}

async function loadMap() {
  // @ts-ignore
  const apiLoader = new Loader(apiOptions)
  return await apiLoader.load()
}

const Container3D: React.FC = (): ReactElement => {
  const { 
    google, 
    meshesArray,
    ADD_MESH, 
    SET_GOOGLE_API ,
    SET_GOOGLE_MAP,
    SET_MAP_CENTER
} = useZusStore(state => state)

  const [map, setMap] = useState<any>(null)
  const mapCenter = {
    lat: 37.34376589426541,
    lng: -121.9308962600858
  }
  
  const getGoogle = useCallback(async () => {
    const google = await loadMap()
    SET_GOOGLE_API(google)
}, [SET_GOOGLE_API])

useEffect(() => {
    getGoogle()
}, [getGoogle])

useEffect(() => {
    if (google) {
        const mapOptions = {
            mapId: 'e4c9658480c5a808',
            center: mapCenter,
            zoom: 19,
            tilt: 65,
        }
        const mapDiv = document.getElementById('map')
        const map = new google.maps.Map(mapDiv, mapOptions)
        SET_GOOGLE_MAP(map)
        SET_MAP_CENTER(mapCenter)
    }
  }, [google, SET_GOOGLE_MAP, SET_MAP_CENTER])



  return (
    <>
        <button style={{width:"200px", height:"50px", margin:"28px"}} onClick={() => ADD_MESH(meshesArray.length) }>Click to add dynamic box</button>
        <div id="map" style={{ height: "50vh", width: "100%" }}>
        </div>
        <Canvas>
            <ambientLight intensity={0.1} />
            <directionalLight color="red" position={[0, 0, 5]} />
            <mesh onClick={()=>alert("Hello from initial render")}>
              <boxGeometry args={[1,1,1]} attach="geometry" />
              <meshStandardMaterial color={"green"} opacity={0.2} attach="material"  />
            </mesh>
                <DynamicMeshes/>
        </Canvas>
    </ >
    )
}
export default Container3D

