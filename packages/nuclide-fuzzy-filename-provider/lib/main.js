var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

'use babel';

var _require = require('atom');

var CompositeDisposable = _require.CompositeDisposable;
var Disposable = _require.Disposable;

var providerInstance;
function getProviderInstance() {
  if (providerInstance == null) {
    var FuzzyFileNameProvider = require('./FuzzyFileNameProvider');
    providerInstance = _extends({}, FuzzyFileNameProvider);
  }
  return providerInstance;
}

var Activation = (function () {
  function Activation(state) {
    _classCallCheck(this, Activation);

    this._disposables = new CompositeDisposable();
  }

  _createClass(Activation, [{
    key: 'activate',
    value: function activate() {
      var _this = this;

      this._disposables.add(atom.commands.add('atom-workspace', {
        'nuclide-fuzzy-filename-provider:toggle-provider': function nuclideFuzzyFilenameProviderToggleProvider() {
          if (_this._store) {
            _this._store.toggleProvider(getProviderInstance());
          }
        }
      }));
      // Do search preprocessing for all existing and future root directories.
      initSearch(atom.project.getPaths());
      this._disposables.add(atom.project.onDidChangePaths(initSearch));
    }
  }, {
    key: 'setStore',
    value: function setStore(store) {
      this._store = store;
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      this._store = null;
      this._disposables.dispose();
    }
  }]);

  return Activation;
})();

var activation = null;
function getActivation() {
  if (activation == null) {
    activation = new Activation();
    activation.activate();
  }
  return activation;
}
var projectRoots = new Set();

/**
 * @param projectPaths All the root directories in the Atom workspace.
 */
function initSearch(projectPaths) {
  var _require2 = require('nuclide-client');

  var getClient = _require2.getClient;

  var newProjectRoots = new Set();
  projectPaths.forEach(function (projectPath) {
    newProjectRoots.add(projectPath);
    if (projectRoots.has(projectPath)) {
      return;
    }
    var client = getClient(projectPath);
    if (client) {
      // It doesn't matter what the search term is. Empirically, doing an initial
      // search speeds up the next search much more than simply doing the setup
      // kicked off by 'fileSearchForDirectory'.
      client.searchDirectory(projectPath, 'a');
    }
  });
  projectRoots = newProjectRoots;
}

module.exports = {

  registerProvider: function registerProvider() {
    return getProviderInstance();
  },

  registerStore: function registerStore(store) {
    getActivation().setStore(store);
    return new Disposable(function () {
      return getActivation().dispose();
    });
  },

  activate: function activate(state) {
    getActivation();
  },

  deactivate: function deactivate() {
    if (activation) {
      activation.dispose();
      activation = null;
    }
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvZm9sZGVycy93MS9fMm1jNm0wNTBxbjIzMm5wc2Y5ejNoZnNoNThfamgvVC90bXBpMzV6akdwdWJsaXNoX3BhY2thZ2VzL2FwbS9udWNsaWRlLWZ1enp5LWZpbGVuYW1lLXByb3ZpZGVyL2xpYi9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsV0FBVyxDQUFDOztlQW1CUixPQUFPLENBQUMsTUFBTSxDQUFDOztJQUZqQixtQkFBbUIsWUFBbkIsbUJBQW1CO0lBQ25CLFVBQVUsWUFBVixVQUFVOztBQUdaLElBQUksZ0JBQTJCLENBQUM7QUFDaEMsU0FBUyxtQkFBbUIsR0FBYTtBQUN2QyxNQUFJLGdCQUFnQixJQUFJLElBQUksRUFBRTtBQUM1QixRQUFJLHFCQUFxQixHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBQy9ELG9CQUFnQixnQkFBTyxxQkFBcUIsQ0FBQyxDQUFDO0dBQy9DO0FBQ0QsU0FBTyxnQkFBZ0IsQ0FBQztDQUN6Qjs7SUFFSyxVQUFVO0FBSUgsV0FKUCxVQUFVLENBSUYsS0FBYyxFQUFFOzBCQUp4QixVQUFVOztBQUtaLFFBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxtQkFBbUIsRUFBRSxDQUFDO0dBQy9DOztlQU5HLFVBQVU7O1dBUU4sb0JBQUc7OztBQUNULFVBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtBQUNsQyx5REFBaUQsRUFBRSxzREFBTTtBQUN2RCxjQUFJLE1BQUssTUFBTSxFQUFFO0FBQ2Ysa0JBQUssTUFBTSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7V0FDbkQ7U0FDRjtPQUNGLENBQUMsQ0FDSCxDQUFDOztBQUVGLGdCQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQ3BDLFVBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztLQUNsRTs7O1dBRU8sa0JBQUMsS0FBWSxFQUFRO0FBQzNCLFVBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0tBQ3JCOzs7V0FFTSxtQkFBRztBQUNSLFVBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ25CLFVBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDN0I7OztTQTlCRyxVQUFVOzs7QUFpQ2hCLElBQUksVUFBdUIsR0FBRyxJQUFJLENBQUM7QUFDbkMsU0FBUyxhQUFhLEdBQUc7QUFDdkIsTUFBSSxVQUFVLElBQUksSUFBSSxFQUFFO0FBQ3RCLGNBQVUsR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO0FBQzlCLGNBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztHQUN2QjtBQUNELFNBQU8sVUFBVSxDQUFDO0NBQ25CO0FBQ0QsSUFBSSxZQUF5QixHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7Ozs7O0FBSzFDLFNBQVMsVUFBVSxDQUFDLFlBQTJCLEVBQVE7a0JBQ25DLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQzs7TUFBdEMsU0FBUyxhQUFULFNBQVM7O0FBQ2QsTUFBSSxlQUFlLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNoQyxjQUFZLENBQUMsT0FBTyxDQUFDLFVBQUMsV0FBVyxFQUFLO0FBQ3BDLG1CQUFlLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2pDLFFBQUksWUFBWSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRTtBQUNqQyxhQUFPO0tBQ1I7QUFDRCxRQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDcEMsUUFBSSxNQUFNLEVBQUU7Ozs7QUFJVixZQUFNLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQztLQUMxQztHQUNGLENBQUMsQ0FBQztBQUNILGNBQVksR0FBRyxlQUFlLENBQUM7Q0FDaEM7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRzs7QUFFZixrQkFBZ0IsRUFBQSw0QkFBYTtBQUMzQixXQUFPLG1CQUFtQixFQUFFLENBQUM7R0FDOUI7O0FBRUQsZUFBYSxFQUFBLHVCQUFDLEtBQVksRUFBbUI7QUFDM0MsaUJBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoQyxXQUFPLElBQUksVUFBVSxDQUFDO2FBQU0sYUFBYSxFQUFFLENBQUMsT0FBTyxFQUFFO0tBQUEsQ0FBQyxDQUFDO0dBQ3hEOztBQUVELFVBQVEsRUFBQSxrQkFBQyxLQUFjLEVBQUU7QUFDdkIsaUJBQWEsRUFBRSxDQUFDO0dBQ2pCOztBQUVELFlBQVUsRUFBQSxzQkFBRztBQUNYLFFBQUksVUFBVSxFQUFFO0FBQ2QsZ0JBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNyQixnQkFBVSxHQUFHLElBQUksQ0FBQztLQUNuQjtHQUNGO0NBQ0YsQ0FBQyIsImZpbGUiOiIvdmFyL2ZvbGRlcnMvdzEvXzJtYzZtMDUwcW4yMzJucHNmOXozaGZzaDU4X2poL1QvdG1waTM1empHcHVibGlzaF9wYWNrYWdlcy9hcG0vbnVjbGlkZS1mdXp6eS1maWxlbmFtZS1wcm92aWRlci9saWIvbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuLyogQGZsb3cgKi9cblxuLypcbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBsaWNlbnNlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW5cbiAqIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCB0eXBlIHtcbiAgUHJvdmlkZXIsXG4gIFN0b3JlLFxufSBmcm9tICdudWNsaWRlLXF1aWNrLW9wZW4taW50ZXJmYWNlcyc7XG5cbnZhciB7XG4gIENvbXBvc2l0ZURpc3Bvc2FibGUsXG4gIERpc3Bvc2FibGUsXG59ID0gcmVxdWlyZSgnYXRvbScpO1xuXG52YXIgcHJvdmlkZXJJbnN0YW5jZTogP1Byb3ZpZGVyO1xuZnVuY3Rpb24gZ2V0UHJvdmlkZXJJbnN0YW5jZSgpOiBQcm92aWRlciB7XG4gIGlmIChwcm92aWRlckluc3RhbmNlID09IG51bGwpIHtcbiAgICB2YXIgRnV6enlGaWxlTmFtZVByb3ZpZGVyID0gcmVxdWlyZSgnLi9GdXp6eUZpbGVOYW1lUHJvdmlkZXInKTtcbiAgICBwcm92aWRlckluc3RhbmNlID0gey4uLkZ1enp5RmlsZU5hbWVQcm92aWRlcn07XG4gIH1cbiAgcmV0dXJuIHByb3ZpZGVySW5zdGFuY2U7XG59XG5cbmNsYXNzIEFjdGl2YXRpb24ge1xuICBfZGlzcG9zYWJsZXM6IENvbXBvc2l0ZURpc3Bvc2FibGU7XG4gIF9zdG9yZTogP1N0b3JlO1xuXG4gIGNvbnN0cnVjdG9yKHN0YXRlOiA/T2JqZWN0KSB7XG4gICAgdGhpcy5fZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICB9XG5cbiAgYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5fZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20td29ya3NwYWNlJywge1xuICAgICAgICAnbnVjbGlkZS1mdXp6eS1maWxlbmFtZS1wcm92aWRlcjp0b2dnbGUtcHJvdmlkZXInOiAoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuX3N0b3JlKSB7XG4gICAgICAgICAgICB0aGlzLl9zdG9yZS50b2dnbGVQcm92aWRlcihnZXRQcm92aWRlckluc3RhbmNlKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgKTtcbiAgICAvLyBEbyBzZWFyY2ggcHJlcHJvY2Vzc2luZyBmb3IgYWxsIGV4aXN0aW5nIGFuZCBmdXR1cmUgcm9vdCBkaXJlY3Rvcmllcy5cbiAgICBpbml0U2VhcmNoKGF0b20ucHJvamVjdC5nZXRQYXRocygpKTtcbiAgICB0aGlzLl9kaXNwb3NhYmxlcy5hZGQoYXRvbS5wcm9qZWN0Lm9uRGlkQ2hhbmdlUGF0aHMoaW5pdFNlYXJjaCkpO1xuICB9XG5cbiAgc2V0U3RvcmUoc3RvcmU6IFN0b3JlKTogdm9pZCB7XG4gICAgdGhpcy5fc3RvcmUgPSBzdG9yZTtcbiAgfVxuXG4gIGRpc3Bvc2UoKSB7XG4gICAgdGhpcy5fc3RvcmUgPSBudWxsO1xuICAgIHRoaXMuX2Rpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcbiAgfVxufVxuXG52YXIgYWN0aXZhdGlvbjogP0FjdGl2YXRpb24gPSBudWxsO1xuZnVuY3Rpb24gZ2V0QWN0aXZhdGlvbigpIHtcbiAgaWYgKGFjdGl2YXRpb24gPT0gbnVsbCkge1xuICAgIGFjdGl2YXRpb24gPSBuZXcgQWN0aXZhdGlvbigpO1xuICAgIGFjdGl2YXRpb24uYWN0aXZhdGUoKTtcbiAgfVxuICByZXR1cm4gYWN0aXZhdGlvbjtcbn1cbnZhciBwcm9qZWN0Um9vdHM6IFNldDxzdHJpbmc+ID0gbmV3IFNldCgpO1xuXG4vKipcbiAqIEBwYXJhbSBwcm9qZWN0UGF0aHMgQWxsIHRoZSByb290IGRpcmVjdG9yaWVzIGluIHRoZSBBdG9tIHdvcmtzcGFjZS5cbiAqL1xuZnVuY3Rpb24gaW5pdFNlYXJjaChwcm9qZWN0UGF0aHM6IEFycmF5PHN0cmluZz4pOiB2b2lkIHtcbiAgdmFyIHtnZXRDbGllbnR9ID0gcmVxdWlyZSgnbnVjbGlkZS1jbGllbnQnKTtcbiAgdmFyIG5ld1Byb2plY3RSb290cyA9IG5ldyBTZXQoKTtcbiAgcHJvamVjdFBhdGhzLmZvckVhY2goKHByb2plY3RQYXRoKSA9PiB7XG4gICAgbmV3UHJvamVjdFJvb3RzLmFkZChwcm9qZWN0UGF0aCk7XG4gICAgaWYgKHByb2plY3RSb290cy5oYXMocHJvamVjdFBhdGgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBjbGllbnQgPSBnZXRDbGllbnQocHJvamVjdFBhdGgpO1xuICAgIGlmIChjbGllbnQpIHtcbiAgICAgIC8vIEl0IGRvZXNuJ3QgbWF0dGVyIHdoYXQgdGhlIHNlYXJjaCB0ZXJtIGlzLiBFbXBpcmljYWxseSwgZG9pbmcgYW4gaW5pdGlhbFxuICAgICAgLy8gc2VhcmNoIHNwZWVkcyB1cCB0aGUgbmV4dCBzZWFyY2ggbXVjaCBtb3JlIHRoYW4gc2ltcGx5IGRvaW5nIHRoZSBzZXR1cFxuICAgICAgLy8ga2lja2VkIG9mZiBieSAnZmlsZVNlYXJjaEZvckRpcmVjdG9yeScuXG4gICAgICBjbGllbnQuc2VhcmNoRGlyZWN0b3J5KHByb2plY3RQYXRoLCAnYScpO1xuICAgIH1cbiAgfSk7XG4gIHByb2plY3RSb290cyA9IG5ld1Byb2plY3RSb290cztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgcmVnaXN0ZXJQcm92aWRlcigpOiBQcm92aWRlciB7XG4gICAgcmV0dXJuIGdldFByb3ZpZGVySW5zdGFuY2UoKTtcbiAgfSxcblxuICByZWdpc3RlclN0b3JlKHN0b3JlOiBTdG9yZSk6IGF0b20kRGlzcG9zYWJsZSB7XG4gICAgZ2V0QWN0aXZhdGlvbigpLnNldFN0b3JlKHN0b3JlKTtcbiAgICByZXR1cm4gbmV3IERpc3Bvc2FibGUoKCkgPT4gZ2V0QWN0aXZhdGlvbigpLmRpc3Bvc2UoKSk7XG4gIH0sXG5cbiAgYWN0aXZhdGUoc3RhdGU6ID9PYmplY3QpIHtcbiAgICBnZXRBY3RpdmF0aW9uKCk7XG4gIH0sXG5cbiAgZGVhY3RpdmF0ZSgpIHtcbiAgICBpZiAoYWN0aXZhdGlvbikge1xuICAgICAgYWN0aXZhdGlvbi5kaXNwb3NlKCk7XG4gICAgICBhY3RpdmF0aW9uID0gbnVsbDtcbiAgICB9XG4gIH0sXG59O1xuIl19
