<script setup>
  import { ref, watch} from 'vue';
  import { randomHsl } from '../utils/color.js';
  import PortalTeleporter from './PortalTeleporter.vue';
  import TheCameraRig from './TheCameraRig.vue';
  import '../aframe/life-like-automaton';
  import '../aframe/grabbable';
  import '../aframe/clickable';
  import TheNavMesh from './TheNavMesh.vue';

  defineProps({
    scale: Number,
  });

  const colorBoxLeft = ref(randomHsl());
  const colorBoxRight = ref(randomHsl());
  const allAssetsLoaded = ref(false);

  watch(allAssetsLoaded, (value) => {
    if (!value) return;
    document.querySelector('#hand-left').components['blink-controls'].queryCollisionEntities();
  });



  function chestClicked($event){
  console.log("chest clicked")
  document.querySelector('#gold').setAttribute('grabbable',"target: #hand-right");
  document.querySelector('#gold').emit('click')
}
  
</script>

<template>
  <a-scene
    background="color: black;"
    renderer="colorManagement: true;"
  >

    <a-assets @loaded="allAssetsLoaded = true">
      <!--
        Title: VR Gallery
        Model source: https://sketchfab.com/3d-models/vr-gallery-1ac32ed62fdf424498acc146fad31f7e
        Model author: https://sketchfab.com/mvrc.art (Maxim Mavrichev)
        Model license: CC BY 4.0 ( https://creativecommons.org/licenses/by/4.0/ )
      -->
      <!-- <a-asset-item  id="room" src="assets/vr_gallery.glb"></a-asset-item> -->
      <a-asset-item  id="room" src="assets/low_poly_nature2.glb"></a-asset-item>
      <a-asset-item  id="cave" src="assets/the_queen_of_the_caverns.glb"></a-asset-item>
      <a-asset-item  id="apartment" src="assets/apartment3.glb"></a-asset-item>
     <!--  <a-asset-item  id="navmesh" src="assets/navmesh.glb"></a-asset-item> -->
      <a-asset-item id="diamond" src="assets/pure_diamond.glb"></a-asset-item>
      <a-asset-item id="chest" src="assets/treasure_chest.glb"></a-asset-item>
    <!--   <a-asset-item  id="navmesh-apartment" src="assets/navmesh-apartment.glb"></a-asset-item>
      <a-asset-item  id="navmesh-cave" src="assets/navmesh-cave.glb"></a-asset-item> -->
      <a-asset-item  id="gold-bar" src="assets/gold_bar_low_poly.glb"></a-asset-item>
<!--       <a-assets-item><img id="sky" src="assets/sky.jpg"></a-assets-item>
 -->    </a-assets>


 


<template v-if="allAssetsLoaded">
 


  <a-entity id="diamond" 
  gltf-model="#diamond" 
  position="-26.6 1 0"
  scale="0.1 0.1 0.1"
  grabbable="target: #hand-right"
  clickable
  @triggerdown="grabbable='target: #hand-right'"
  @triggerup="grabbable='target: null'"
  ></a-entity>

  <a-entity id="chest" 
  gltf-model="#chest" 
  position="-27 0.5 -30"
  scale="2 2 2"
  clickable
  @click=chestClicked($event)>
  ></a-entity>

  <a-entity id="gold" 
  gltf-model="#gold-bar" 
  position="-26.6 2 0"
  scale="0.1 0.1 0.1"
  clickable
  
  ></a-entity>

 <!--    <a-entity
    id="nav-mesh"
      data-role="nav-mesh"
      gltf-model="#navmesh" 
      rotation="0 90 0"
      position="-68.16 -123 -5"
      scale="5.2 5.2 5.2 "
      nav-mesh visible="false"
    ></a-entity>
    
    <a-entity
    id="nav-mesh-apartment"
  
      data-role="nav-mesh"
      gltf-model="#navmesh-apartment" 
      rotation="0 90 0"
      position="0 -600 0"
      scale="1 1 1  "
      nav-mesh visible="false"
    ></a-entity>
    <a-entity
    id="nav-mesh-cave"
  
      data-role="nav-mesh"
      gltf-model="#navmesh-cave" 
      rotation="0 90 0"
      position="0 -9999 -5"
      scale="0.9 0.9 0.9  "
      nav-mesh visible="false"
    ></a-entity> -->
    <a-entity
     
      gltf-model="#room"
      renderer="color-management: true"
      rotation="0 90 0"
      position="0 -122.3 -5"
      scale="5.2 5.2 5.2"
    >
  </a-entity>
  <!-- <a-sky src="#sky"></a-sky> -->
    

    <a-entity
    
      gltf-model="#cave"
      rotation="0 90 0"
      position="0 -9999.8 -5"
      scale="1 1 1"
      >
    </a-entity>
    <a-entity
      gltf-model="#apartment"
      rotation="0 90 0"
      position="0 -600 0"
      scale="1.2   1.2 1.2"
      >
    </a-entity>
    


    <PortalTeleporter
      label="Enter the Cave"
      position="-72 1 -25"
      rotation="70 -0 0 " 
      :x="28"
      :y="-9999"
      :z="-5"
    />
    <PortalTeleporter
      label="Back to"
      position="0 -9998 -8"
      rotation="70 -0 0 " 
      :x="-27"
      :y="0.2"
      
    />



    <PortalTeleporter
      label="Enter the apartment"
      position="-29.2 2 9"
      rotation="0 0 0 " 
      :y="-600"
      :z="6"
    />
    <PortalTeleporter
      label="Backt to from apartment"
      position="6 -599 3.8"
      rotation="70 -0 0 " 
      :x="-27"
      :y="0.2"
    />

    
    <TheNavMesh />
    
     
</template>

    <TheCameraRig />

  </a-scene>
</template>