<script setup>
import { ref, watch } from "vue";
import { randomHsl } from "../utils/color.js";
import PortalTeleporter from "./PortalTeleporter.vue";
import TheCameraRig from "./TheCameraRig.vue";
import "../aframe/life-like-automaton";
import "../aframe/grabbable";
import "../aframe/a-ocean";
import "../aframe/clickable";
import TheNavMesh from "./TheNavMesh.vue";
import { place, showOnboarding, diamondGrabbed,goldGrabbed } from "../aframe/store.js";
import "../aframe/animation-mixer";


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
    target2.setAttribute("position", "4.2 -598.8 0.7");
    target2.setAttribute("scale", "0.08 0.08 0.08");
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

  document
    .querySelector("#spot-chest")
    .setAttribute("light", "intensity:0");

}

function diamondClicked($event) {
  document
    .querySelector("#diamond")
    .setAttribute("grabbable", "target: #hand-right; auto: true");
  diamondGrabbed.value=true;

  document
    .querySelector("#spot-diamond")
    .setAttribute("light", "intensity:0");
}

function waterTriggered($event) {
      // A-Frame component animation (example with the scale component)      
      AFRAME.ANIME({
        targets: 'body',
        update: function(anim) {
          console.log(anim.progress);
          const intensity= (100-anim.progress)/10
          document.querySelector("#spot-lake").setAttribute("light", `intensity:${intensity}`);
          document.querySelector("#spot-lake2").setAttribute("light", `intensity:${intensity}`);
          document.querySelector("#spot-lake3").setAttribute("light", `intensity:${intensity/2}`);

        }
      });
}

function waterTriggeredFar($event){
  // A-Frame component animation (example with the scale component)      
  AFRAME.ANIME({
        targets: 'body',
        update: function(anim) {
          const intensity= (anim.progress)/10
          document.querySelector("#spot-lake").setAttribute("light", `intensity:${intensity}`);
          document.querySelector("#spot-lake2").setAttribute("light", `intensity:${intensity}`);
          document.querySelector("#spot-lake3").setAttribute("light", `intensity:${intensity/5}`);

        }
      });
}

function testListento(){
  console.log("coucou");
}


function tpToMyPlace(newPlace) {
  place.value = newPlace;
  console.log("place accessed : "+place.value); 
}

const place1 = "cave";
const place2 = "nature";

console.log(place.value);

/* watch (allAssetsLoaded, (value) => {
  if (!value) return;
  document.querySelector("#hand-left").components["blink-controls"].queryCollisionEntities();

});
 */

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
      <a-asset-item id="diamond-3d" src="assets/pure-diamond.glb"></a-asset-item>
      <a-asset-item id="chest-3d" src="assets/treasure_chest.glb"></a-asset-item>
      <!--   <a-asset-item  id="navmesh-apartment" src="assets/navmesh-apartment.glb"></a-asset-item>
      <a-asset-item  id="navmesh-cave" src="assets/navmesh-cave.glb"></a-asset-item> -->
      <a-asset-item id="gold-bar" src="assets/gold_bar_low_poly.glb"></a-asset-item>
      <a-assets-item><img id="sky" src="/assets/sky3.png"></a-assets-item>
      <a-asset-item id="teleporter" src="assets/sm_teleporter.glb"></a-asset-item>
      <a-asset-item id="arrow-3d" src="assets/arrow.glb"></a-asset-item>
      <a-asset-item id="nav-mesh-room" src="assets/navmesh.glb"></a-asset-item>
      <a-asset-item id="nav-mesh-cave" src="assets/navmesh-cave.glb"></a-asset-item>
      <a-asset-item id="nav-mesh-apartment" src="assets/navmesh-apartment.glb"></a-asset-item>


      <a-asset-item id="sound-forest" response-type="arraybuffer" src="assets/forest.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="sound-cave" response-type="arraybuffer" src="assets/cave.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="sound-apartment" response-type="arraybuffer" src="assets/apartment.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="sound-spider" response-type="arraybuffer" src="assets/spider.mp3" preload="auto"></a-asset-item>
      <a-asset-item id="sound-town" response-type="arraybuffer" src="assets/town.mp3" preload="auto"></a-asset-item>

    </a-assets>

    <template v-if="allAssetsLoaded">

     

      <a-entity light="type: ambient; color: #BBB; intensity: 0.2" position="0 0.4 9"></a-entity>
      <a-entity v-if="place=='cave'" light="type: ambient; color: #fc1100; intensity: 0.1" 
      position="-1 -9999 -3"
      animation="property: light.intensity; to: 0.1; loop: true; dur: 700; dir: alternate;"
      ></a-entity>



      <a-entity v-if="place!=='cave'" light="type: directional; color: #FFF; intensity: 0.1" position="-2000 0 5000"
      animation="property: light.intensity; to: 0.4; loop: true; dur: 8000; dir: alternate;"
      animation__2="property: light.color; to: #57a8d4; loop: true; dur: 16000; dir: alternate;"
      >
      </a-entity>

      <a-entity v-if="place!=='cave'" light="type: directional; color: #FFF; intensity: 0.1" position="-2000 0 -5000" 
      animation="property: light.intensity; to: 0.4; loop: true; dur: 4000; dir: alternate;"
      animation__2="property: light.color; to: #57a8d4; loop: true; dur: 8000; dir: alternate;"
      >
      </a-entity>


      <a-entity light="type: directional; color: #FFF; intensity: 0.2" position="-0 0 -5000"></a-entity>

      <a-entity light="type: spot; angle: 90; color: #00e5ff; intensity: 4; decay: 200; distance :500;" position="4.5 -596 0.6">
      </a-entity>

      <a-entity light="type: spot; angle: 180; color: #FFF; intensity: 30; decay: 1000; distance :500;" position="-1 -9997 -3"
      animation="property: light.intensity; to: 20; loop: true; dur: 10000; dir: alternate;">
      </a-entity>
      
      <a-entity id="spot-diamond" light="type: spot; angle: 60; color:#ffa18c; intensity:1; target:#diamond; decay:500;" 
      position="-1 -9997.9 -3"
      animation="property: position; to: -1 -9997.7 -3; loop: true; dur: 1000; dir: alternate;"
      ></a-entity>


      <a-entity id="spot-chest" light="type: spot; angle: 70; color:#ffa18c; intensity:10; target:#chest; decay:500;" 
      position="-7 -9997.9 1"
      animation="property: position; to: -7 -9997.7 1; loop: true; dur: 1000; dir: alternate;"
      ></a-entity>



      <a-entity v-if="place!=='cave'" id="spot-lake" light="type: spot; angle: 70; color:#288abf; intensity:10; target:#lake; decay:500;" 
        position="-35 -1 -45"
        animation="property: position; to: -35 -2 -45.45; loop: true; dur: 3000; dir: alternate;"
        >
        </a-entity>

      <a-entity v-if="place!=='cave'" id="spot-lake2" light="type: spot; angle: 70; color:#288abf; intensity:10; target:#lake; decay:500;" 
      position="-35 -1 -45"
      animation__2="property: position; to: -35.5 -2 -45; loop: true; dur: 3000; dir: alternate;"
      ></a-entity>

      <a-entity  v-if="place!=='cave'" id="spot-lake3" light="type: spot; angle: 180; color:#288abf; intensity:2; decay:5000;" 
      position="-35 -1 -45"
      animation="property: position; to: -35.5 -1 -45; loop: true; dur: 3000; dir: alternate;"
      ></a-entity>

      


      <a-entity light="type: point; intensity: 7; distance: 4; decay: 5" position="-29.7 0.4 8"></a-entity>
      <a-entity light="type: point; intensity: 7; distance: 4; decay: 5" position="-69 0.6 -25"></a-entity>


      <a-entity id="lantern1" light="type: point; intensity: 4; distance: 1; decay: 4; color: #ffbc05;" position="25.5 -9999.3 -6"
      animation="property: light.intensity; to: 11; loop: true; dur: 2000; dir: alternate;"
      animation__2="property: light.color; to: #ffdd80; loop: true; dur: 1800; dir: alternate;">
      </a-entity>

      <a-entity id="lantern2" light="type: point; intensity: 4; distance: 1; decay: 4; color: #ffbc05;" 
      position="12 -9998.6 -3.6" 
      animation="property: light.intensity; to: 5; loop: true; dur: 900; dir: alternate;"
      animation__2="property: light.color; to: #ffdd80; loop: true; dur: 800; dir: alternate;">
      </a-entity>

      <a-entity id="light-fond" light="type: point; intensity: 4; distance: 6; decay: 2; color: #ffbc05;" position="-1 -9999 -3"
      animation="property: light.intensity; to: 6; loop: true; dur: 1800; dir: alternate;">
      </a-entity>

      <a-ocean id ="lake" color="#288abf" width="50" depth="35" density="10" speed="2" opacity="1" position="-35 -3.7 -45"></a-ocean>
      <a-ocean color="#288abf" width="50" depth="35" density="10" speed="3" opacity="0.5" position="-35 -3.7 -45"></a-ocean>

      <a-box
        material="color: #542e23  ;side: double;"
        clickable
        @click="$event=>clickOnDropZone()"
        visible="false"
        position="4 -599 0.5"
        >
       </a-box>


      <a-box
      id="hitbox-water"
      material="color: #542e23  ;side: double;"
      position="-35 0 -45"
      scale="14 6 6"
      clickable
      @waterTriggered="$event=>waterTriggered()"
      @waterTriggeredFar ="$event=>waterTriggeredFar()"
      emit-when-near="target: #head; distance : 18; event : waterTriggered; eventFar: waterTriggeredFar"
      visible="false"
      >
    </a-box>

      <a-entity
        position="-27 1.5 -3"
        animation__position="property: position; from: -27 1.5 -3; to: -27 1.8 -3; dur: 4000; easing: linear; loop: true; dir: alternate;"
        material="color: #FFF; side: double;"
        >
        <a-text value="Trouve la caverne et recupere l'or et le diamant que l'araignee a vole !" color="#FFF" align="center"></a-text>
        </a-entity>


        <a-entity
        id="arrow"
        gltf-model="#arrow-3d"
        position="4.5 -598 0.6"
        animation__position="property: position; from: 4.5 -598 0.6; to: 4.5 -597.8 0.6; dur: 1000; easing: linear; loop: true; dir: alternate; "
        scale="0.2 0.2 0.2"
        rotation="180 0 0"
      ></a-entity>


      <a-entity
        id="diamond"
        gltf-model="#diamond-3d"
        position="-1 -9998 -3"
        scale="0.2 0.2 0.2"
        clickable
        @click="diamondClicked($event)"
      ></a-entity>

      <a-entity
        id="teleporter-appart"
        gltf-model="#teleporter"
        position="-29.7 0.3 8"
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
        position="-69 0.6 -25"
        scale="0.1 0.1 0.1"
        clickable
        @tpToPlace="tpToMyPlace('cave')"
        emit-when-near="target: #head; distance : 2.5; event : tpToPlace;"
      ></a-entity>

      <a-entity
        id="chest"
        gltf-model="#chest-3d"
        position="-7 -9998 1"
        rotation="0 140 0"
        scale="3 3 3"
        clickable
        sound="src:#sound-spider; autoplay: false ; maxDistance: 300; loop: true; volume: 3; on: click"

        @click="chestClicked($event)"
      >
      </a-entity>

      <a-entity
        id="gold"
        gltf-model="#gold-bar"
        position="-26.6 -20 0"
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
        position="-69 1 -25"
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
        position="-29.7 1 8"
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
      <!-- <TheNavMesh /> -->
    </template>
 

    <TheCameraRig :loaded="allAssetsLoaded"/>
    

  </a-scene>
</template>