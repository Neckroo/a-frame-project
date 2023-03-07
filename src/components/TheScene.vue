<script setup>
import { ref, watch } from "vue";
import { randomHsl } from "../utils/color.js";
import PortalTeleporter from "./PortalTeleporter.vue";
import TheCameraRig from "./TheCameraRig.vue";
import "../aframe/life-like-automaton";
import "../aframe/grabbable";
import "../aframe/clickable";
import TheNavMesh from "./TheNavMesh.vue";
import { place, showOnboarding, diamondGrabbed,goldGrabbed } from "../aframe/store.js";

defineProps({
  scale: Number,
});

const colorBoxLeft = ref(randomHsl());
const colorBoxRight = ref(randomHsl());
const allAssetsLoaded = ref(false);

/* watch(allAssetsLoaded, (value) => {
  if (!value) return;
  document
    .querySelector("#hand-left")
    .components["blink-controls"].queryCollisionEntities();
}); */


function clickOnDropZone ($event){
  console.log("click drop zone");

  const target1 = document.querySelector("#gold");
  const target2 = document.querySelector("#diamond");

  if (diamondGrabbed.value) {
    target2.removeAttribute("grabbable");
    target2.setAttribute("position", "4.2 -598.87 0.7");
  }
  if (goldGrabbed.value) {
    target1.removeAttribute("grabbable");
    target1.setAttribute("position", "4 -598.9 0.5");
  }
}

function chestClicked($event) {
  console.log("chest clicked");
  document
    .querySelector("#gold")
    .setAttribute("grabbable", "target: #hand-right");
  document.querySelector("#gold").emit("click");
  goldGrabbed.value=true;
}

function diamondClicked($event) {
  document
    .querySelector("#diamond")
    .setAttribute("grabbable", "target: #hand-right; auto: true");
  diamondGrabbed.value=true;
}

function tpToMyPlace(newPlace) {
 console.log("place accessed"); 
  place.value = newPlace;
  console.log(place.value);
}

const place1 = "cave";
const place2 = "nature";

console.log(place.value);

</script>

<template>
  <a-scene background="color: black;" renderer="colorManagement: true; " light="defaultLightsEnabled: false">
    <a-assets @loaded="allAssetsLoaded = true">
      <!--
        Title: VR Gallery
        Model source: https://sketchfab.com/3d-models/vr-gallery-1ac32ed62fdf424498acc146fad31f7e
        Model author: https://sketchfab.com/mvrc.art (Maxim Mavrichev)
        Model license: CC BY 4.0 ( https://creativecommons.org/licenses/by/4.0/ )
      -->
      <!-- <a-asset-item  id="room" src="assets/vr_gallery.glb"></a-asset-item> -->
      <a-asset-item id="room" src="assets/low_poly_nature2.glb"></a-asset-item>
      <a-asset-item id="cave" src="assets/the_queen_of_the_caverns.glb"></a-asset-item>
      <a-asset-item id="apartment" src="assets/apartment3.glb"></a-asset-item>
      <!--  <a-asset-item  id="navmesh" src="assets/navmesh.glb"></a-asset-item> -->
      <a-asset-item id="diamond-3d" src="assets/pure_diamond.glb"></a-asset-item>
      <a-asset-item id="chest" src="assets/treasure_chest.glb"></a-asset-item>
      <!--   <a-asset-item  id="navmesh-apartment" src="assets/navmesh-apartment.glb"></a-asset-item>
      <a-asset-item  id="navmesh-cave" src="assets/navmesh-cave.glb"></a-asset-item> -->
      <a-asset-item id="gold-bar" src="assets/gold_bar_low_poly.glb"></a-asset-item>
      <!-- <a-assets-item><img id="sky" src="assets/sky3.png"></a-assets-item> -->
      <a-asset-item id="teleporter" src="assets/sm_teleporter.glb"></a-asset-item>
      <a-asset-item id="arrow-3d" src="assets/arrow.glb"></a-asset-item>



      <a-asset-item id="sound-forest" response-type="arraybuffer" src="assets/forest.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="sound-cave" response-type="arraybuffer" src="assets/cave.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="sound-apartment" response-type="arraybuffer" src="assets/apartment.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="sound-spider" response-type="arraybuffer" src="assets/spider.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="sound-town" response-type="arraybuffer" src="assets/town.mp3" preload="auto"></a-asset-item>


    </a-assets>

    <template v-if="allAssetsLoaded">


      <a-entity light="type: ambient; color: #BBB; intensity: 0.1"
      position="0 0.4 9"></a-entity>

     

      <a-entity v-if="place=='cave'" light="type: ambient; color: #eb4034; intensity: 0.2"
      position="-1 -9999 -3"></a-entity>



      <a-entity light="type: directional; color: #FFF; intensity: 0.2" position="-2000 0 5000"></a-entity>
      <a-entity light="type: directional; color: #FFF; intensity: 0.2" position="-2000 0 -5000"></a-entity>
      <a-entity light="type: directional; color: #FFF; intensity: 0.2" position="-0 0 -5000"></a-entity>

      <a-entity light="type: spot; angle: 90; color: #00e5ff; intensity: 4; decay: 200; distance :500;" position="4.5 -596 0.6"></a-entity>

      <a-entity light="type: point; intensity: 7; distance: 4; decay: 5"
        position="-29.2 0.4 9"></a-entity>
      <a-entity light="type: point; intensity: 7; distance: 4; decay: 5"
        position="-72 0.6 -25"></a-entity>
      <a-entity light="type: point; intensity: 4; distance: 1; decay: 4; color: #ffbc05;"
      position="25.5 -9999.3 -6"></a-entity>
      <a-entity light="type: point; intensity: 4; distance: 1; decay: 4; color: #ffbc05;"
      position="12 -9998.6 -3.6"></a-entity>
      <a-entity light="type: point; intensity: 4; distance: 6; decay: 2; color: #ffbc05;"
      position="-1 -9999 -3"></a-entity>
      



      <a-box
        material="color: #542e23  ;side: double;"
        clickable
        @click="$event=>clickOnDropZone()"
        visible="false"
        position="4 -599 0.5"
        >
       </a-box>


      <a-entity
        position="-27 1.5 -3"
        animation__position="property: position; from: -27 1.5 -3; to: -27 1.8 -3; dur: 4000; easing: linear; loop: true; dir: alternate; side: double;"
        material="color: #FFF; side: double;"
        >
        <a-text value="Trouve la caverne et recupere l'or et le diamant que l'araignee a vole !" color="#FFF" align="center"></a-text>
        </a-entity>


        <a-entity
        id="arrow"
        gltf-model="#arrow-3d"
        position="4.5 -598 0.6"
        animation__position="property: position; from: 4.5 -598 0.6; to: 4.5 -597.8 0.6; dur: 1000; easing: linear; loop: true; dir: alternate; side: double;"
        scale="0.2 0.2 0.2"
        rotation="180 0 0"
      ></a-entity>


      <a-entity
        id="diamond"
        gltf-model="#diamond-3d"
        position="-26.6 1 0"
        scale="0.1 0.1 0.1"
        clickable
        @click="diamondClicked($event)"
      ></a-entity>

      <a-entity
        id="teleporter-appart"
        gltf-model="#teleporter"
        position="-29.2 0.4 9"
        scale="0.1 0.1 0.1"
      ></a-entity>


      <a-entity
        id="teleporter-appart-back"
        gltf-model="#teleporter"
        position="8 -600 3.5"
        scale="0.1 0.1 0.1"
      ></a-entity>

      <a-entity
        id="teleporter-cave-back"
        gltf-model="#teleporter"
        position="0 -9998.9 -8"
        scale="0.1 0.1 0.1"
        clickable
        @tpToPlace="tpToMyPlace('foret')"
        emit-when-near="target: #head; distance : 2.5; event : tpToPlace;"
      ></a-entity>

      <a-entity
        id="teleporter-cave"
        gltf-model="#teleporter"
        position="-72 0.6 -25"
        scale="0.1 0.1 0.1"
        clickable
        @tpToPlace="tpToMyPlace('cave')"
        emit-when-near="target: #head; distance : 2.5; event : tpToPlace;"
      ></a-entity>

      <a-entity
        id="chest"
        gltf-model="#chest"
        position="-27 0.5 -30"
        scale="2 2 2"
        clickable
        sound="src:#sound-spider; autoplay: false ; maxDistance: 300; loop: true; volume: 3; on: click"

        @click="chestClicked($event)"
      >
        ></a-entity
      >

      <a-entity
        id="gold"
        gltf-model="#gold-bar"
        position="-26.6 2 0"
        scale="0.1 0.1 0.1"
        clickable
      ></a-entity>

      <a-entity 
        gltf-model="#room"
        renderer="color-management: true"
        rotation="0 90 0"
        position="0 -122.3 -5"
        scale="5.2 5.2 5.2"
      >
      </a-entity>

      <a-entity v-if="!showOnboarding"
      sound="src:#sound-forest; autoplay: true ; maxDistance: 300; loop: true; volume: 18;"
      position="0 -122.3 -5"
      ></a-entity>

      <a-sky src="#sky"></a-sky>

      <a-entity
        gltf-model="#cave"
        rotation="0 90 0"
        position="0 -9999.8 -5"
        scale="1 1 1"
        sound="src:#sound-cave; autoplay: true ; maxDistance: 300; loop: true; volume: 1;"
      

      >
      </a-entity>
      <a-entity
        gltf-model="#apartment"
        rotation="0 90 0"
        position="0 -600 0"
        scale="1.2   1.2 1.2"
        sound="src:#sound-town; autoplay: true ; maxDistance: 300; loop: true; volume: 1;"

      >
      </a-entity>

      <PortalTeleporter
        label="Enter the Cave"
        position="-72 1 -25"
        rotation="70 -0 0 "
        :x="28"
        :y="-10000"
        :z="-5"
        
      />
      <PortalTeleporter
        label="Back from cave"
        position="0 -9998 -8"
        rotation="70 -0 0 "
        :x="-72"
        :y="0"
        :z="-28"
       
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
        position="8 -599 3.8"
        rotation="70 -0 0 "
        :x="-27"
        :y="0.2"
      />
    </template>
 

    <TheNavMesh />

    <TheCameraRig :loaded="allAssetsLoaded"/>

  </a-scene>
</template>