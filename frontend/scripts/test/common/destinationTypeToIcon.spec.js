describe("destinationTypeToIcon", function() {
  var destinationTypeToIcon,
      SUGGESTION_TYPES;

  beforeEach(module('app.common'));
  beforeEach(module('app.search'));

  beforeEach(inject(function(_$filter_, _SUGGESTION_TYPES_) {
    destinationTypeToIcon = _$filter_('destinationTypeToIcon');
    SUGGESTION_TYPES = _SUGGESTION_TYPES_;
  }));

  it('should work with valid parameter', function() {
    expect(destinationTypeToIcon(SUGGESTION_TYPES.address)).toEqual('fa-map-marker');
    expect(destinationTypeToIcon(SUGGESTION_TYPES.events)).toEqual('fa-rocket');
    expect(destinationTypeToIcon(SUGGESTION_TYPES.meetingSpace)).toEqual('fa-group');
  });

  it('should return default data when give invalid parameter', function() {
    expect(destinationTypeToIcon('some things')).toEqual('fa-map-marker');
  });
});