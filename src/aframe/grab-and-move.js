AFRAME.registerComponent('grab-move', {
    init: function() {
      this.grabbing = false;
      this.grabbedObj = null;
      this.grabbedObjInitParent = null;
      this.grabbedObjInitPosition = null;
      this.el.addEventListener('gripdown', this.startGrab.bind(this));
      this.el.addEventListener('gripup', this.endGrab.bind(this));
    },
    
    startGrab: function(event) {
      if (!this.grabbing) {
        const intersection = event.detail.intersection;
        const grabbedEl = intersection && intersection.object.el;
        if (grabbedEl) {
          this.grabbing = true;
          this.grabbedObj = grabbedEl;
          this.grabbedObjInitParent = grabbedEl.parentElement;
          this.grabbedObjInitPosition = grabbedEl.getAttribute('position');
          grabbedEl.setAttribute('position', '0 0 0');
          this.el.object3D.add(grabbedEl.object3D);
        }
      }
    },
    
    endGrab: function(event) {
      if (this.grabbing) {
        this.grabbing = false;
        if (this.grabbedObj) {
          const releasePosition = this.el.object3D.getWorldPosition(new THREE.Vector3());
          this.grabbedObj.setAttribute('position', releasePosition);
          this.grabbedObjInitParent.appendChild(this.grabbedObj);
          this.grabbedObj = null;
          this.grabbedObjInitParent = null;
          this.grabbedObjInitPosition = null;
        }
      }
    }
  });
  
  
  
  