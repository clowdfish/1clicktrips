function ItineraryHelper() {

}

ItineraryHelper.prototype.getActiveSegmentFromItinerary = function getActiveSegmentFromItinerary(itinerary, selection) {
  var segments = [];
  for (var containerIndex = 0; containerIndex < itinerary.segmentsContainer.length; containerIndex++) {
    var container = itinerary.segmentsContainer[containerIndex];
    segments = segments.concat(this.getSegmentsFromContainer(containerIndex, container, selection));
  }
  return segments;
}

ItineraryHelper.prototype.getSegmentsFromContainer = function getSegmentsFromContainer(containerIndex, container, selection) {
  for (var alternativeIndex = 0; alternativeIndex < container.alternatives.length; alternativeIndex++) {
    if (this._segmentInSelection(containerIndex, alternativeIndex, selection)) {
      return container.alternatives[alternativeIndex];
    }
  }
  return container.alternatives[0];
}

ItineraryHelper.prototype._segmentInSelection = function _segmentInSelection(containerIndex, segmentIndex, selection) {
  var key = '0-' + containerIndex + '-' + segmentIndex;
  return selection.hasOwnProperty(key);
}

module.exports = ItineraryHelper;