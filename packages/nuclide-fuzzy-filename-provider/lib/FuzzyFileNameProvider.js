function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, 'next'); var callThrow = step.bind(null, 'throw'); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

'use babel';

var _require = require('nuclide-client');

var getClient = _require.getClient;

var FuzzyFileNameProvider = {

  getName: function getName() {
    return 'FuzzyFileNameProvider';
  },

  getProviderType: function getProviderType() {
    return 'DIRECTORY';
  },

  getDebounceDelay: function getDebounceDelay() {
    return 0;
  },

  getAction: function getAction() {
    return 'nuclide-fuzzy-filename-provider:toggle-provider';
  },

  getPromptText: function getPromptText() {
    return 'Fuzzy File Name Search';
  },

  getTabTitle: function getTabTitle() {
    return 'Filenames';
  },

  isEligibleForDirectory: function isEligibleForDirectory(directory) {
    return true;
  },

  executeQuery: _asyncToGenerator(function* (query, directory) {
    if (query.length === 0) {
      return [];
    }
    var directoryPath = directory.getPath();
    var client = getClient(directoryPath);
    if (client == null) {
      return [];
    }
    return client.searchDirectory(directoryPath, query);
  })
};

module.exports = FuzzyFileNameProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvZm9sZGVycy93MS9fMm1jNm0wNTBxbjIzMm5wc2Y5ejNoZnNoNThfamgvVC90bXBpMzV6akdwdWJsaXNoX3BhY2thZ2VzL2FwbS9udWNsaWRlLWZ1enp5LWZpbGVuYW1lLXByb3ZpZGVyL2xpYi9GdXp6eUZpbGVOYW1lUHJvdmlkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLFdBQVcsQ0FBQzs7ZUFpQk0sT0FBTyxDQUFDLGdCQUFnQixDQUFDOztJQUF0QyxTQUFTLFlBQVQsU0FBUzs7QUFFZCxJQUFJLHFCQUErQixHQUFHOztBQUVwQyxTQUFPLEVBQUEsbUJBQVc7QUFDaEIsV0FBTyx1QkFBdUIsQ0FBQztHQUNoQzs7QUFFRCxpQkFBZSxFQUFBLDJCQUFpQjtBQUM5QixXQUFPLFdBQVcsQ0FBQztHQUNwQjs7QUFFRCxrQkFBZ0IsRUFBQSw0QkFBVztBQUN6QixXQUFPLENBQUMsQ0FBQztHQUNWOztBQUVELFdBQVMsRUFBQSxxQkFBVztBQUNsQixXQUFPLGlEQUFpRCxDQUFDO0dBQzFEOztBQUVELGVBQWEsRUFBQSx5QkFBVztBQUN0QixXQUFPLHdCQUF3QixDQUFDO0dBQ2pDOztBQUVELGFBQVcsRUFBQSx1QkFBVztBQUNwQixXQUFPLFdBQVcsQ0FBQztHQUNwQjs7QUFFRCx3QkFBc0IsRUFBQSxnQ0FBQyxTQUF5QixFQUFXO0FBQ3pELFdBQU8sSUFBSSxDQUFDO0dBQ2I7O0FBRUQsQUFBTSxjQUFZLG9CQUFBLFdBQUMsS0FBYSxFQUFFLFNBQXlCLEVBQThCO0FBQ3ZGLFFBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDdEIsYUFBTyxFQUFFLENBQUM7S0FDWDtBQUNELFFBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN4QyxRQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDdEMsUUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO0FBQ2xCLGFBQU8sRUFBRSxDQUFDO0tBQ1g7QUFDRCxXQUFPLE1BQU0sQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO0dBQ3JELENBQUE7Q0FDRixDQUFDOztBQUVGLE1BQU0sQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUMiLCJmaWxlIjoiL3Zhci9mb2xkZXJzL3cxL18ybWM2bTA1MHFuMjMybnBzZjl6M2hmc2g1OF9qaC9UL3RtcGkzNXpqR3B1Ymxpc2hfcGFja2FnZXMvYXBtL251Y2xpZGUtZnV6enktZmlsZW5hbWUtcHJvdmlkZXIvbGliL0Z1enp5RmlsZU5hbWVQcm92aWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuLyogQGZsb3cgKi9cblxuLypcbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBsaWNlbnNlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW5cbiAqIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCB0eXBlIHtcbiAgRmlsZVJlc3VsdCxcbiAgUHJvdmlkZXIsXG4gIFByb3ZpZGVyVHlwZSxcbn0gZnJvbSAnbnVjbGlkZS1xdWljay1vcGVuLWludGVyZmFjZXMnO1xuXG52YXIge2dldENsaWVudH0gPSByZXF1aXJlKCdudWNsaWRlLWNsaWVudCcpO1xuXG52YXIgRnV6enlGaWxlTmFtZVByb3ZpZGVyOiBQcm92aWRlciA9IHtcblxuICBnZXROYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdGdXp6eUZpbGVOYW1lUHJvdmlkZXInO1xuICB9LFxuXG4gIGdldFByb3ZpZGVyVHlwZSgpOiBQcm92aWRlclR5cGUge1xuICAgIHJldHVybiAnRElSRUNUT1JZJztcbiAgfSxcblxuICBnZXREZWJvdW5jZURlbGF5KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIDA7XG4gIH0sXG5cbiAgZ2V0QWN0aW9uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdudWNsaWRlLWZ1enp5LWZpbGVuYW1lLXByb3ZpZGVyOnRvZ2dsZS1wcm92aWRlcic7XG4gIH0sXG5cbiAgZ2V0UHJvbXB0VGV4dCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnRnV6enkgRmlsZSBOYW1lIFNlYXJjaCc7XG4gIH0sXG5cbiAgZ2V0VGFiVGl0bGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ0ZpbGVuYW1lcyc7XG4gIH0sXG5cbiAgaXNFbGlnaWJsZUZvckRpcmVjdG9yeShkaXJlY3Rvcnk6IGF0b20kRGlyZWN0b3J5KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG5cbiAgYXN5bmMgZXhlY3V0ZVF1ZXJ5KHF1ZXJ5OiBzdHJpbmcsIGRpcmVjdG9yeTogYXRvbSREaXJlY3RvcnkpOiBQcm9taXNlPEFycmF5PEZpbGVSZXN1bHQ+PiB7XG4gICAgaWYgKHF1ZXJ5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICB2YXIgZGlyZWN0b3J5UGF0aCA9IGRpcmVjdG9yeS5nZXRQYXRoKCk7XG4gICAgdmFyIGNsaWVudCA9IGdldENsaWVudChkaXJlY3RvcnlQYXRoKTtcbiAgICBpZiAoY2xpZW50ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgcmV0dXJuIGNsaWVudC5zZWFyY2hEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgcXVlcnkpO1xuICB9LFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBGdXp6eUZpbGVOYW1lUHJvdmlkZXI7XG4iXX0=
