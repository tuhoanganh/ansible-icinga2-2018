System.register(["lodash", "app/core/utils/kbn"], function (_export, _context) {
  "use strict";

  var _, kbn;

  return {
    setters: [function (_lodash) {
      _ = _lodash.default;
    }, function (_appCoreUtilsKbn) {
      kbn = _appCoreUtilsKbn.default;
    }],
    execute: function () {
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
      }

      let ColumnOptionsCtrl = function () {
        /** @ngInject */
        function ColumnOptionsCtrl($scope) {
          _classCallCheck(this, ColumnOptionsCtrl);

          Object.defineProperty(this, "panel", {
            configurable: true,
            enumerable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "panelCtrl", {
            configurable: true,
            enumerable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "colorModes", {
            configurable: true,
            enumerable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "columnStyles", {
            configurable: true,
            enumerable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "columnTypes", {
            configurable: true,
            enumerable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "fontSizes", {
            configurable: true,
            enumerable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "dateFormats", {
            configurable: true,
            enumerable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "addColumnSegment", {
            configurable: true,
            enumerable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "unitFormats", {
            configurable: true,
            enumerable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "getColumnNames", {
            configurable: true,
            enumerable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "activeStyleIndex", {
            configurable: true,
            enumerable: true,
            writable: true,
            value: void 0
          });
          $scope.editor = this;
          this.activeStyleIndex = 0;
          this.panelCtrl = $scope.ctrl;
          this.panel = this.panelCtrl.panel;
          this.unitFormats = kbn.getUnitFormats();
          this.colorModes = [{
            text: 'Disabled',
            value: null
          }, {
            text: 'Cell',
            value: 'cell'
          }, {
            text: 'Value',
            value: 'value'
          }, {
            text: 'Row',
            value: 'row'
          }];
          this.columnTypes = [{
            text: 'Number',
            value: 'number'
          }, {
            text: 'String',
            value: 'string'
          }, {
            text: 'Date',
            value: 'date'
          }, {
            text: 'Hidden',
            value: 'hidden'
          }];
          this.fontSizes = ['80%', '90%', '100%', '110%', '120%', '130%', '150%', '160%', '180%', '200%', '220%', '250%'];
          this.dateFormats = [{
            text: 'YYYY-MM-DD HH:mm:ss',
            value: 'YYYY-MM-DD HH:mm:ss'
          }, {
            text: 'YYYY-MM-DD HH:mm:ss.SSS',
            value: 'YYYY-MM-DD HH:mm:ss.SSS'
          }, {
            text: 'MM/DD/YY h:mm:ss a',
            value: 'MM/DD/YY h:mm:ss a'
          }, {
            text: 'MMMM D, YYYY LT',
            value: 'MMMM D, YYYY LT'
          }];

          this.getColumnNames = () => {
            if (!this.panelCtrl.table) {
              return [];
            }

            return _.map(this.panelCtrl.table.columns, function (col) {
              return col.text;
            });
          };

          this.onColorChange = this.onColorChange.bind(this);
        }

        _createClass(ColumnOptionsCtrl, [{
          key: "render",
          value: function render() {
            this.panelCtrl.render();
          }
        }, {
          key: "setUnitFormat",
          value: function setUnitFormat(column, subItem) {
            column.unit = subItem.value;
            this.panelCtrl.render();
          }
        }, {
          key: "addColumnStyle",
          value: function addColumnStyle() {
            var newStyleRule = {
              unit: 'short',
              type: 'number',
              alias: '',
              decimals: 2,
              colors: ['rgba(245, 54, 54, 0.9)', 'rgba(237, 129, 40, 0.89)', 'rgba(50, 172, 45, 0.97)'],
              colorMode: null,
              pattern: '',
              dateFormat: 'YYYY-MM-DD HH:mm:ss',
              thresholds: []
            };
            var styles = this.panel.styles;
            var stylesCount = styles.length;
            var indexToInsert = stylesCount; // check if last is a catch all rule, then add it before that one

            if (stylesCount > 0) {
              var last = styles[stylesCount - 1];

              if (last.pattern === '/.*/') {
                indexToInsert = stylesCount - 1;
              }
            }

            styles.splice(indexToInsert, 0, newStyleRule);
            this.activeStyleIndex = indexToInsert;
          }
        }, {
          key: "removeColumnStyle",
          value: function removeColumnStyle(style) {
            this.panel.styles = _.without(this.panel.styles, style);
          }
        }, {
          key: "invertColorOrder",
          value: function invertColorOrder(index) {
            var ref = this.panel.styles[index].colors;
            var copy = ref[0];
            ref[0] = ref[2];
            ref[2] = copy;
            this.panelCtrl.render();
          }
        }, {
          key: "onColorChange",
          value: function onColorChange(styleIndex, colorIndex) {
            return newColor => {
              this.panel.styles[styleIndex].colors[colorIndex] = newColor;
              this.render();
            };
          }
        }]);

        return ColumnOptionsCtrl;
      }();

      _export("ColumnOptionsCtrl", ColumnOptionsCtrl);

      /** @ngInject */
      function columnOptionsTab($q, uiSegmentSrv) {
        'use strict';

        return {
          restrict: 'E',
          scope: true,
          templateUrl: 'public/app/plugins/panel/table/column_options.html',
          controller: ColumnOptionsCtrl
        };
      }

      _export("columnOptionsTab", columnOptionsTab);
    }
  };
});
//# sourceMappingURL=column_options.js.map
