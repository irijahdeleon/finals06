makeImagesDraggable(document.querySelectorAll('.draggable'));

  function makeImagesDraggable(elements) {
    elements.forEach(function (elmnt) {
      let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      let isDragging = false;
      let currentZIndex = 1;

      elmnt.onmousedown = dragMouseDown;

      function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        isDragging = true;
        currentZIndex += 1;
        elmnt.style.zIndex = currentZIndex;
        // Store the original image width
        elmnt.originalWidth = parseFloat(getComputedStyle(elmnt.querySelector("img")).width);
        elmnt.querySelector("img").style.boxShadow = "10px 10px 20px rgba(0, 0, 0, 0.7)";
      }

      function elementDrag(e) {
        e.preventDefault();
        if (isDragging) {
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
          elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
          // Maintain the original image width
          elmnt.querySelector("img").style.width = elmnt.originalWidth + "px";
        }
      }

      function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        isDragging = false;
        elmnt.querySelector("img").style.boxShadow = "none";
      }
    });
  }