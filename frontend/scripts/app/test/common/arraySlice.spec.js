describe('arraySlice', function() {

  var arraySlice;

  beforeEach(module('app.common'));

  beforeEach(inject(function(_$filter_) {
    arraySlice = _$filter_('arraySlice');
  }));

  it('arraySlice works properly', function() {
    var array = [1,2,3,4,5,6];
    expect(arraySlice(array,0,3)).toEqual([1,2,3]);
    expect(arraySlice(array,2,2)).toEqual([3,4]);
    expect(arraySlice(array,2,99)).toEqual([3,4,5,6]);
    expect(arraySlice(array,99,1)).toEqual([]);
  });
});
