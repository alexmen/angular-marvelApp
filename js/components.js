angular.module('components', [])

    .directive('tabs', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: function ($scope, $element) {
                var panels = $scope.panels = [];

                $scope.select = function (panel) {
                    angular.forEach(panels, function (panel) {
                        panel.selected = false;
                        panel.classSelected='';
                    });
                    panel.selected = true;
                    panel.classSelected='is-active';
                };

                this.addPanel = function (panel) {
                    if (panels.length === 0) $scope.select(panel);
                    panels.push(panel);
                };
            },
            template:
                '<div>' +
                '<ul class="tabs" id="tabs">' +
                '<li class="tabs-title {{panel.classSelected}}" id="panel{{panel.id}}" ng-repeat="panel in panels">' +
                '<a href="" aria-selected="{{panel.selected}}" ng-click="select(panel)">{{panel.title}}</a>' +
                '</li>' +
                '</ul>' +
                '<div class="tabs-content" ng-transclude></div>' +
                '</div>',

            replace: true
        };
    })

    .directive('panel', function () {
        return {
            require: '^tabs',
            restrict: 'E',
            transclude: true,
            scope: { title: '@' },
            link: function (scope, element, attrs, tabsController) {
                tabsController.addPanel(scope);
            },
            template:
                '<div class="tabs-panel {{classSelected}}" aria-hidden="{{!selected}}" id="panel{{$id}}" ng-transclude>' +
                '</div>',

            replace: true
        };
    });