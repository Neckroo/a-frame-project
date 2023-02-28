
<template>

 <a-entity
    id="nav-mesh"
      data-role="nav-mesh"
      gltf-model="url(assets/navmesh.glb)" 
      rotation="0 90 0"
      position="-68.16 -122.5 -5"
      scale="5.2 5.2 5.2"
      nav-mesh visible="false"
    ></a-entity>
    

    <a-entity
    id="nav-mesh-apartment"
      data-role="nav-mesh"
      gltf-model="url(assets/navmesh-apartment.glb)" 
      rotation="0 90 0"
      position="0 -600 0"
      scale="1 1 1"
      nav-mesh visible="false"
    ></a-entity>


    <a-entity
    id="nav-mesh-cave"
      data-role="nav-mesh"
      gltf-model="url(assets/navmesh-cave.glb)" 
      rotation="0 90 0"
      position="0 -9999 -5"
      scale="0.9 0.9 0.9"
      nav-mesh visible="false"
    ></a-entity>


</template>