/// <reference path="../../_all.ts" />

function CustomMarker(map, latlng, args) {
  this.setMap(map);
  this.latlng = latlng;
  this.args = args;
}

CustomMarker.prototype = new google.maps.OverlayView();

CustomMarker.prototype.draw = function() {

  var self = this;

  var div: HTMLElement = this.div;

  if (!div) {

    div = this.div = document.createElement('div');
    div.className = 'custom-marker';

    div.style.position = 'absolute';
    div.style.cursor = 'pointer';
    div.style.webkitTransform = 'translateZ(0px)';

    if (typeof(self.args.htmlContent) !== 'undefined') {
      div.innerHTML = self.args.htmlContent;
    }

    google.maps.event.addDomListener(div, "click", function(event) {
      google.maps.event.trigger(self, "click");
    });

    var panes = this.getPanes();
    panes.overlayImage.appendChild(div);
  }

  var point = this.getProjection().fromLatLngToDivPixel(this.latlng);
  var $div = $(div);
  console.log(point);
  if (point) {
    div.style.left = (point.x - 37) + 'px';
    div.style.top = (point.y / 2 - 4) + 'px';
  }
};

CustomMarker.prototype.remove = function() {
  if (this.div) {
    this.div.parentNode.removeChild(this.div);
    this.div = null;
  }
};