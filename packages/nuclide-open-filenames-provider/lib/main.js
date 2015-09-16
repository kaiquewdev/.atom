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
    var OpenFileNameProvider = require('./OpenFileNameProvider');
    providerInstance = _extends({}, OpenFileNameProvider);
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
        'nuclide-open-filenames-provider:toggle-provider': function nuclideOpenFilenamesProviderToggleProvider() {
          if (_this._store) {
            _this._store.toggleProvider(getProviderInstance());
          }
        }
      }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvZm9sZGVycy93MS9fMm1jNm0wNTBxbjIzMm5wc2Y5ejNoZnNoNThfamgvVC90bXBpMzV6akdwdWJsaXNoX3BhY2thZ2VzL2FwbS9udWNsaWRlLW9wZW4tZmlsZW5hbWVzLXByb3ZpZGVyL2xpYi9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsV0FBVyxDQUFDOztlQW1CUixPQUFPLENBQUMsTUFBTSxDQUFDOztJQUZqQixtQkFBbUIsWUFBbkIsbUJBQW1CO0lBQ25CLFVBQVUsWUFBVixVQUFVOztBQUdaLElBQUksZ0JBQTJCLENBQUM7QUFDaEMsU0FBUyxtQkFBbUIsR0FBYTtBQUN2QyxNQUFJLGdCQUFnQixJQUFJLElBQUksRUFBRTtBQUM1QixRQUFJLG9CQUFvQixHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQzdELG9CQUFnQixnQkFBTyxvQkFBb0IsQ0FBQyxDQUFDO0dBQzlDO0FBQ0QsU0FBTyxnQkFBZ0IsQ0FBQztDQUN6Qjs7SUFFSyxVQUFVO0FBSUgsV0FKUCxVQUFVLENBSUYsS0FBYyxFQUFFOzBCQUp4QixVQUFVOztBQUtaLFFBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxtQkFBbUIsRUFBRSxDQUFDO0dBQy9DOztlQU5HLFVBQVU7O1dBUU4sb0JBQUc7OztBQUNULFVBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtBQUNsQyx5REFBaUQsRUFBRSxzREFBTTtBQUN2RCxjQUFJLE1BQUssTUFBTSxFQUFFO0FBQ2Ysa0JBQUssTUFBTSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7V0FDbkQ7U0FDRjtPQUNGLENBQUMsQ0FDSCxDQUFDO0tBQ0g7OztXQUVPLGtCQUFDLEtBQVksRUFBUTtBQUMzQixVQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztLQUNyQjs7O1dBRU0sbUJBQUc7QUFDUixVQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztBQUNuQixVQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQzdCOzs7U0EzQkcsVUFBVTs7O0FBOEJoQixJQUFJLFVBQXVCLEdBQUcsSUFBSSxDQUFDO0FBQ25DLFNBQVMsYUFBYSxHQUFHO0FBQ3ZCLE1BQUksVUFBVSxJQUFJLElBQUksRUFBRTtBQUN0QixjQUFVLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztBQUM5QixjQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7R0FDdkI7QUFDRCxTQUFPLFVBQVUsQ0FBQztDQUNuQjs7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHOztBQUVmLGtCQUFnQixFQUFBLDRCQUFhO0FBQzNCLFdBQU8sbUJBQW1CLEVBQUUsQ0FBQztHQUM5Qjs7QUFFRCxlQUFhLEVBQUEsdUJBQUMsS0FBWSxFQUFtQjtBQUMzQyxpQkFBYSxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2hDLFdBQU8sSUFBSSxVQUFVLENBQUM7YUFBTSxhQUFhLEVBQUUsQ0FBQyxPQUFPLEVBQUU7S0FBQSxDQUFDLENBQUM7R0FDeEQ7O0FBRUQsVUFBUSxFQUFBLGtCQUFDLEtBQWMsRUFBRTtBQUN2QixpQkFBYSxFQUFFLENBQUM7R0FDakI7O0FBRUQsWUFBVSxFQUFBLHNCQUFHO0FBQ1gsUUFBSSxVQUFVLEVBQUU7QUFDZCxnQkFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3JCLGdCQUFVLEdBQUcsSUFBSSxDQUFDO0tBQ25CO0dBQ0Y7Q0FDRixDQUFDIiwiZmlsZSI6Ii92YXIvZm9sZGVycy93MS9fMm1jNm0wNTBxbjIzMm5wc2Y5ejNoZnNoNThfamgvVC90bXBpMzV6akdwdWJsaXNoX3BhY2thZ2VzL2FwbS9udWNsaWRlLW9wZW4tZmlsZW5hbWVzLXByb3ZpZGVyL2xpYi9tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG4vKiBAZmxvdyAqL1xuXG4vKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIGxpY2Vuc2UgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpblxuICogdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IHR5cGUge1xuICBQcm92aWRlcixcbiAgU3RvcmUsXG59IGZyb20gJ251Y2xpZGUtcXVpY2stb3Blbi1pbnRlcmZhY2VzJztcblxudmFyIHtcbiAgQ29tcG9zaXRlRGlzcG9zYWJsZSxcbiAgRGlzcG9zYWJsZSxcbn0gPSByZXF1aXJlKCdhdG9tJyk7XG5cbnZhciBwcm92aWRlckluc3RhbmNlOiA/UHJvdmlkZXI7XG5mdW5jdGlvbiBnZXRQcm92aWRlckluc3RhbmNlKCk6IFByb3ZpZGVyIHtcbiAgaWYgKHByb3ZpZGVySW5zdGFuY2UgPT0gbnVsbCkge1xuICAgIHZhciBPcGVuRmlsZU5hbWVQcm92aWRlciA9IHJlcXVpcmUoJy4vT3BlbkZpbGVOYW1lUHJvdmlkZXInKTtcbiAgICBwcm92aWRlckluc3RhbmNlID0gey4uLk9wZW5GaWxlTmFtZVByb3ZpZGVyfTtcbiAgfVxuICByZXR1cm4gcHJvdmlkZXJJbnN0YW5jZTtcbn1cblxuY2xhc3MgQWN0aXZhdGlvbiB7XG4gIF9kaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZTtcbiAgX3N0b3JlOiA/U3RvcmU7XG5cbiAgY29uc3RydWN0b3Ioc3RhdGU6ID9PYmplY3QpIHtcbiAgICB0aGlzLl9kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gIH1cblxuICBhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLl9kaXNwb3NhYmxlcy5hZGQoXG4gICAgICBhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS13b3Jrc3BhY2UnLCB7XG4gICAgICAgICdudWNsaWRlLW9wZW4tZmlsZW5hbWVzLXByb3ZpZGVyOnRvZ2dsZS1wcm92aWRlcic6ICgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5fc3RvcmUpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0b3JlLnRvZ2dsZVByb3ZpZGVyKGdldFByb3ZpZGVySW5zdGFuY2UoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgc2V0U3RvcmUoc3RvcmU6IFN0b3JlKTogdm9pZCB7XG4gICAgdGhpcy5fc3RvcmUgPSBzdG9yZTtcbiAgfVxuXG4gIGRpc3Bvc2UoKSB7XG4gICAgdGhpcy5fc3RvcmUgPSBudWxsO1xuICAgIHRoaXMuX2Rpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcbiAgfVxufVxuXG52YXIgYWN0aXZhdGlvbjogP0FjdGl2YXRpb24gPSBudWxsO1xuZnVuY3Rpb24gZ2V0QWN0aXZhdGlvbigpIHtcbiAgaWYgKGFjdGl2YXRpb24gPT0gbnVsbCkge1xuICAgIGFjdGl2YXRpb24gPSBuZXcgQWN0aXZhdGlvbigpO1xuICAgIGFjdGl2YXRpb24uYWN0aXZhdGUoKTtcbiAgfVxuICByZXR1cm4gYWN0aXZhdGlvbjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgcmVnaXN0ZXJQcm92aWRlcigpOiBQcm92aWRlciB7XG4gICAgcmV0dXJuIGdldFByb3ZpZGVySW5zdGFuY2UoKTtcbiAgfSxcblxuICByZWdpc3RlclN0b3JlKHN0b3JlOiBTdG9yZSk6IGF0b20kRGlzcG9zYWJsZSB7XG4gICAgZ2V0QWN0aXZhdGlvbigpLnNldFN0b3JlKHN0b3JlKTtcbiAgICByZXR1cm4gbmV3IERpc3Bvc2FibGUoKCkgPT4gZ2V0QWN0aXZhdGlvbigpLmRpc3Bvc2UoKSk7XG4gIH0sXG5cbiAgYWN0aXZhdGUoc3RhdGU6ID9PYmplY3QpIHtcbiAgICBnZXRBY3RpdmF0aW9uKCk7XG4gIH0sXG5cbiAgZGVhY3RpdmF0ZSgpIHtcbiAgICBpZiAoYWN0aXZhdGlvbikge1xuICAgICAgYWN0aXZhdGlvbi5kaXNwb3NlKCk7XG4gICAgICBhY3RpdmF0aW9uID0gbnVsbDtcbiAgICB9XG4gIH0sXG59O1xuIl19
