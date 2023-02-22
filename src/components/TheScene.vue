<script setup>
  import { ref } from 'vue';
  import { randomHsl } from '../utils/color.js';

  import BoxColorChanging from './BoxColorChanging.vue';
  import TheCameraRig from './TheCameraRig.vue';
  import TheNavMesh from './TheNavMesh.vue';

  import '../aframe/life-like-automaton';

  defineProps({
    scale: Number,
    overlaySelector: String,
  });

  const colorBoxLeft = ref(randomHsl());
  const colorBoxRight = ref(randomHsl());
  const allAssetsLoaded = ref(false);
</script>

<template>
  <a-scene
    background="color: black;"
    renderer="colorManagement: true;"
    :webxr="`
      requiredFeatures: local-floor;
      referenceSpaceType: local-floor;
      optionalFeatures: dom-overlay;
      overlayElement: ${overlaySelector};
    `"
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
      <a-asset-item  id="apartment" src="assets/apartment2.glb"></a-asset-item>
    </a-assets>

    <a-entity
      v-if="allAssetsLoaded"
      gltf-model="#room"
      rotation="0 90 0"
      position="0 -122.3 -5"
      scale="5.2 5.2 5.2"
    >

<!--     <a-assets-item>
    <img id="sky" src="assets/sky.jpg">
  </a-assets-item>
  <a-sky src="#sky"></a-sky> -->
 

    </a-entity>

    <a-entity
      v-if="allAssetsLoaded"
      gltf-model="#cave"
      rotation="0 90 0"
      position="0 999.8 -5"
      scale="1 1 1"
      >
    </a-entity>
    <a-entity
      v-if="allAssetsLoaded"
      gltf-model="#apartment"
      rotation="0 90 0"
      position="0 -600 0"
      scale="1.3   1.3 1.3"
      >
    </a-entity>
    

    <a-box
        id ="teleport-cave"
        rotation="70 -0 0 "  
        position="-72 1 -25 "
        material="color: #542e23  ;side: double;"
        clickable
        emit-when-near="target: #camera-rig; distance : 2; event : teleport-cave;"
      ></a-box>

      <a-box
        id ="teleport-cave-back"
        position="-3 1001.5 -9"
        material="color: #542e23  ;side: double;"
        clickable
        emit-when-near="target: #camera-rig; distance : 2; event : teleport-cave-back;"
      ></a-box>

      <a-box
        id ="teleport-apartment"
        rotation="0 0 0 "  
        position="-29.2 1.3 9 "
        material="color: #542e23  ;side: double;"
        clickable
        emit-when-near="target: #camera-rig; distance : 2; event : teleport-apartment;"
      ></a-box>

      <a-box
        id ="teleport-apartment-back"
        rotation="0 0 0 "  
        position="8 -600 3.8"
        material="color: #542e23  ;side: double;"
        clickable
        emit-when-near="target: #camera-rig; distance : 1.1; event : teleport-apartment-back;"
      ></a-box>

      

    <TheNavMesh />

    <TheCameraRig />

  </a-scene>
</template>