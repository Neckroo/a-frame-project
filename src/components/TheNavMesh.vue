
<template>

 <a-entity
    id="nav-mesh"
      data-role="nav-mesh"
      gltf-model="#nav-mesh-room" 
      rotation="0 90 0"
      position="-68.16 -122.5 -5"
      scale="5.2 5.2 5.2"
      nav-mesh visible="false"
    ></a-entity>
    

    <a-entity
    id="nav-mesh-apartment"
      data-role="nav-mesh"
      gltf-model="#nav-mesh-apartment" 
      rotation="0 90 0"
      position="0 -600 0"
      scale="1 1 1"
      nav-mesh visible="false"
    ></a-entity>


    <a-entity
    id="nav-mesh-cave"
      data-role="nav-mesh"
      gltf-model="#nav-mesh-cave" 
      rotation="0 90 0"
      position="0 -9999 -5"
      scale="0.9 0.9 0.9"
      nav-mesh visible="false"
    ></a-entity>


</template>