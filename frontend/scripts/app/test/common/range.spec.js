describe('range', function() {
  var range;
  beforeEach(module('app.common'));
  beforeEach(inject(function(_$filter_) {
    range = _$filter_('range');
  }));
  it('range filter create array correctly', function() {
    expect(range([0,2])).toEqual([0,1,2]);
    expect(range([1,3])).toEqual([1,2,3]);
    expect(range([4,9])).toEqual([4,5,6,7,8,9]);
    expect(range([4])).toEqual([0,1,2,3,4]);
    expect(range([2])).toEqual([0,1,2]);
  });
});
