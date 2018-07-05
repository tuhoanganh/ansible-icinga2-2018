System.register(["./css/query-editor.css!", "lodash", "./plugins/simple-json-datasource/module"], function (_export, _context) {
  "use strict";

  var _, BaseDatasource, BaseQueryCtrl, BaseConfigCtrl, BaseQueryOptionsCtrl, BaseAnnotationsQueryCtrl;

  return {
    setters: [function (_cssQueryEditorCss) {}, function (_lodash) {
      _ = _lodash.default;
    }, function (_pluginsSimpleJsonDatasourceModule) {
      BaseDatasource = _pluginsSimpleJsonDatasourceModule.Datasource;
      BaseQueryCtrl = _pluginsSimpleJsonDatasourceModule.QueryCtrl;
      BaseConfigCtrl = _pluginsSimpleJsonDatasourceModule.ConfigCtrl;
      BaseQueryOptionsCtrl = _pluginsSimpleJsonDatasourceModule.QueryOptionsCtrl;
      BaseAnnotationsQueryCtrl = _pluginsSimpleJsonDatasourceModule.AnnotationsQueryCtrl;
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

      function _possibleConstructorReturn(self, call) {
        if (call && (typeof call === "object" || typeof call === "function")) {
          return call;
        }

        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      let Icinga2ReportQueryCtrl = function (_BaseQueryCtrl) {
        _inherits(Icinga2ReportQueryCtrl, _BaseQueryCtrl);

        function Icinga2ReportQueryCtrl($scope, $injector, uiSegmentSrv) {
          var _this;

          _classCallCheck(this, Icinga2ReportQueryCtrl);

          _this = _possibleConstructorReturn(this, (Icinga2ReportQueryCtrl.__proto__ || Object.getPrototypeOf(Icinga2ReportQueryCtrl)).call(this, $scope, $injector));
          _this.uiSegmentSrv = uiSegmentSrv;
          _this.segments = _.map(_this.target.segments, s => _this.uiSegmentSrv.newSegment(s));

          _this.segments.push(_this.uiSegmentSrv.newSegment('*'));

          _this.columns = [];
          return _this;
        }

        _createClass(Icinga2ReportQueryCtrl, [{
          key: "getSegments",
          value: function getSegments(index = 0) {
            // console.log('get_segments', index)
            return this.datasource.doRequest({
              url: this.datasource.url + '/segments',
              data: {
                source: this.target.target,
                segments: _.map(this.segments, 'value'),
                index: index
              },
              method: 'POST'
            }).then(result => {
              this.columns[index] = result.data.values;

              if (this.segments.length <= index) {
                this.segments.push(this.uiSegmentSrv.newSegment(this.columns[index][0]));
                this.target.segments = _.map(this.segments, 'value');
                this.segments.push(this.uiSegmentSrv.newSegment('*')); // this.segmentValueChanged(null, index)
              }

              return _.map(result.data.values, s => this.uiSegmentSrv.newSegment(s));
            });
          }
        }, {
          key: "segmentValueChanged",
          value: function segmentValueChanged(segment, $index) {
            // console.log('segment_value_changed', segment.value, $index)
            this.segments.splice($index + 1);

            if (_.includes(['=', '!=', '~', '!~'], segment.value)) {
              this.segments.push(this.uiSegmentSrv.newSegment(' '));
            } else if (_.includes(['OR'], segment.value)) {
              this.getSegments($index + 1);
            } else if (segment.value !== '*') {
              this.getSegments($index + 1);
            }

            this.target.segments = _.map(this.segments, 'value');
          }
        }, {
          key: "getAltSegments",
          value: function getAltSegments(index) {
            if (this.columns[index]) {
              return Promise.resolve(_.map(this.columns[index], s => this.uiSegmentSrv.newSegment(s)));
            }

            return this.getSegments(index);
          }
        }, {
          key: "handleSourceChanged",
          value: function handleSourceChanged() {
            this.segments.splice(0);
            this.getSegments();
          }
        }, {
          key: "isSpecialSegment",
          value: function isSpecialSegment(segment) {
            return segment.value == 'WHERE' || segment.value == 'GROUP BY';
          }
        }]);

        return Icinga2ReportQueryCtrl;
      }(BaseQueryCtrl);

      let Icinga2ReportDatasource = function (_BaseDatasource) {
        _inherits(Icinga2ReportDatasource, _BaseDatasource);

        function Icinga2ReportDatasource(instanceSettings, $q, backendSrv, templateSrv) {
          _classCallCheck(this, Icinga2ReportDatasource);

          return _possibleConstructorReturn(this, (Icinga2ReportDatasource.__proto__ || Object.getPrototypeOf(Icinga2ReportDatasource)).call(this, instanceSettings, $q, backendSrv, templateSrv));
        }

        _createClass(Icinga2ReportDatasource, [{
          key: "mapToTextValue",
          value: function mapToTextValue(result) {
            return result.data;
          }
        }, {
          key: "buildQueryParameters",
          value: function buildQueryParameters(options) {
            // console.log(this, options)
            //remove placeholder targets
            options.targets = _.filter(options.targets, target => {
              return target.target !== 'select metric';
            });

            var targets = _.map(options.targets, target => {
              return {
                target: target.target,
                refId: target.refId,
                hide: target.hide,
                segments: target.segments
              };
            });

            options.targets = targets;
            return options;
          }
        }, {
          key: "getTasks",
          value: function getTasks(editor) {
            return this.doRequest({
              url: this.url + '/tasks'
            }).then(result => {
              return _.map(result.data.tasks, t => ({
                'text': t.name,
                'value': t.name
              }));
            });
          }
        }, {
          key: "updateExport",
          value: function updateExport(data) {
            console.log(data);
            return this.doRequest({
              url: this.url + '/tasks',
              method: 'POST',
              data: data
            });
          }
        }, {
          key: "getExportUrl",
          value: function getExportUrl(panel) {
            this.doRequest({
              method: 'POST',
              url: `${this.url}/query`,
              data: {
                dashboard: panel.dashboard.meta.slug,
                panel: panel.panel.id,
                targets: panel.panel.targets,
                timerange: panel.range.raw
              }
            });
            return `${this.url}/export?dashboard=${panel.dashboard.meta.slug}&panel=${panel.panel.id}`;
          }
        }]);

        return Icinga2ReportDatasource;
      }(BaseDatasource);

      _export("Datasource", Icinga2ReportDatasource);

      _export("QueryCtrl", Icinga2ReportQueryCtrl);

      _export("ConfigCtrl", BaseConfigCtrl);

      _export("QueryOptionsCtrl", BaseQueryOptionsCtrl);

      _export("AnnotationsQueryCtrl", BaseAnnotationsQueryCtrl);
    }
  };
});
//# sourceMappingURL=module.js.map
