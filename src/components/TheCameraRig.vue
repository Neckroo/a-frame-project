<script setup>
  import '../aframe/disable-in-vr';
  import '../aframe/hide-in-vr';
  import '../aframe/simple-navmesh-constraint';
  import '../aframe/blink-controls';
  import { ref } from 'vue';
  import'../components/TheScene.vue';
  import'../aframe/listen-to';
  import'../aframe/emit-when-near';

 

</script>


/* @teleport-cave-back="$event=>position = '-27 0 0'"
    @teleport-apartment="$event=>position = '0 -600 6'"
    @teleport-apartment-back="$event=>position = '-27 0 0'" */

<template>
  <a-entity
    id="camera-rig"
    movement-controls="camera: #head; speed:1;"
    disable-in-vr="component: movement-controls;"
    position="-27 0 0"
  >

      <a-entity
        id="head"
        look-controls="pointerLockEnabled: true"
        simple-navmesh-constraint="navmesh: [data-role='nav-mesh']; height: 1.80;fall: 0.5;"
        camera
        position="0 1.80 0"
      >
      
        <a-entity
          geometry="primitive: circle; radius: 0.0003;"
          material="shader: flat; color: white;"
          cursor
          raycaster="far: 2; objects: [clickable]; showLine: false;"
          position="0 0 -0.1"
          disable-in-vr="component: raycaster; disableInAR: false;"
          hide-in-vr="hideInAR: false"
        ></a-entity>
      </a-entity>

      <a-entity
        id="hand-left"
        hand-controls="hand: left"
        blink-controls="
          cameraRig: #camera-rig;
          teleportOrigin: #head;
          collisionEntities: [data-role='nav-mesh'];
          snapTurn: false;
        "
      ></a-entity>

      <a-entity
        id="hand-right"
        hand-controls="hand: right"
        laser-controls="hand: right"
        raycaster="far: 2; objects: [clickable]; showLine: true;"
      ></a-entity>

  </a-entity>
</template>