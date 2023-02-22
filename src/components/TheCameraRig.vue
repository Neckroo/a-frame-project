<script setup>
  import '../aframe/disable-in-vr';
  import '../aframe/hide-in-vr';
  import '../aframe/simple-navmesh-constraint';
  import '../aframe/blink-controls';
  import { ref } from 'vue';
  import'../components/TheScene.vue';
  import'../aframe/listen-to';
  import'../aframe/emit-when-near';

  const position = ref('-27 0 0');

</script>

<template>
  <a-entity
    id="camera-rig"

    @teleport-cave="$event=>position = '30 1000 -3.5'"
    @teleport-cave-back="$event=>position = '-27 0 0'"
    @teleport-apartment="$event=>position = '0 -600 6'"
    @teleport-apartment-back="$event=>position = '-27 0 0'"


    movement-controls="camera: #head; speed:1;"
    disable-in-vr="component: movement-controls;"
    :position="position"
  >

      <a-entity
        id="head"
        look-controls="pointerLockEnabled: true"
        asimple-navmesh-constraint="navmesh: [data-role='nav-mesh']; height: 1.65;"
        adisable-in-vr="component: simple-navmesh-constraint;"
        camera
        position="0 1.65 0"
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