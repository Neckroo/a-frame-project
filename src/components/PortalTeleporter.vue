<script setup>
  import '../aframe/teleport-camera-rig.js';
  import    '../aframe/emit-when-near.js';
  const p= defineProps({
    x: {type: Number, default: 0},
    y: {type: Number, default: 0},
    z: {type: Number, default: 0},
    label: {type: String, default: ''},
    rot: {type: [Number, Boolean], default: false},
  });
  console.log(p);
</script>

<template>
  <a-box
    material="color: #542e23  ;side: double;"
    clickable
    :teleport-camera-rig="`
      x: ${x};
      y: ${y};
      z: ${z};
      handleRotation: ${rot === false ? 'false' : 'true'};
      rot: ${rot === false ? 'false' : rot};
    `"
    emit-when-near="target: #head; distance : 2; event : teleport;"
  >
  </a-box>
</template>