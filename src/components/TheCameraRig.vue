<script setup>
  import '../aframe/disable-in-vr';
  import '../aframe/hide-in-vr';
  import '../aframe/simple-navmesh-constraint';
  import '../aframe/blink-controls';
  import { ref, watch } from 'vue';
  import'../components/TheScene.vue';
  import'../aframe/listen-to';
  import'../aframe/emit-when-near';

  const props = defineProps({
    loaded: Boolean,
  }); 

  const loaded2 = ref(false);
  watch(() => props.loaded, (value) => {
    if (!value) return;
    setTimeout(() => {
      loaded2.value = true;
    }, 1000);
  });
  

</script>


<template>
  <a-entity
    id="camera-rig"
    movement-controls="camera: #head; speed:1;"
    adisable-in-vr="component: movement-controls;"
    position="-27 0 0"
  >

      <a-entity
        id="head"
        look-controls="pointerLockEnabled: true"
        simple-navmesh-constraint="navmesh: [data-role='nav-mesh']; height: 1.85; fall: 0.8;"
        camera
        position="0 1.85 0"
        pathfinding="startEvents: move; speed: 0.8;"
        nav-mesh="type: triangle; id: navMesh;"
          
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
        ablink-controls="  
          landingMaxAngle: 90;
          cameraRig: #camera-rig;
          teleportOrigin: #head;
          collisionEntities: [data-role='nav-mesh'];
          snapTurn: false;
          defaultPlaneSize: 1000;"
      ></a-entity>

      <a-entity
        id="hand-right"
        hand-controls="hand: right"
        laser-controls="hand: right"
        position="0.2 1.1 0.1"
        raycaster="far: 2; objects: [clickable]; showLine: true;"
      ></a-entity>

  </a-entity>
</template>