(function () {

'use strict';

angular.module('OpenSlidesApp.openslides_export.site', ['OpenSlidesApp.openslides_export'])

.config([
    'mainMenuProvider',
    'gettext',
    function (mainMenuProvider, gettext) {
        mainMenuProvider.register({
            'ui_sref': 'export',
            'img_class': 'download',
            'title': gettext('Export'),
            'weight': 1100,
            'perm': 'openslides_export.can_export',
        });
    }
])

.config([
    '$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('export', {
                url: '/export',
                templateUrl: 'static/templates/openslides_export/export-list.html',
                controller: 'ExportCtrl',
                resolve: {
                    motions: function(Motion) {
                        return Motion.findAll().catch(
                            function () {
                                return null;
                            }
                        );
                    },
                    items: function(Agenda) {
                        return Agenda.findAll().catch(
                            function () {
                                return null;
                            }
                        );
                    },
                    users: function(User) {
                        return User.findAll().catch(
                            function () {
                                return null;
                            }
                        );
                    },
                }
            })
    }
])

.controller('ExportCtrl', [
    '$filter',
    '$scope',
    '$window',
    'Motion',
    'Agenda',
    'User',
    function($filter, $scope, $window, Motion, Agenda, User) {
        Motion.bindAll({}, $scope, 'motions');
        Agenda.bindAll({}, $scope, 'items');
        User.bindAll({}, $scope, 'users');

//        $scope.speakers = $filter('orderBy')(item.speakers, 'weight');

        // export motion
        $scope.exportMotion = function (format) {
            if (format == 'html') {
                var htmlPreview = new Blob([document.getElementById('motionPreview').innerHTML], {
                    type: "text/html;charset=utf-8"
                });
                var filename = "motions-export.html";
                saveAs(htmlPreview, filename);
            } else if (format == 'docx') {
                var htmlExport = "<!DOCTYPE html> <html><head></head><body>" +
                    document.getElementById('motionPreview').innerHTML +
                    "</body></html>";
                var converted = htmlDocx.asBlob(htmlExport);
                saveAs(converted, 'motions.docx');
            }
        }

        // export agenda
        $scope.exportAgenda = function (format) {
            if (format == 'html') {
                var htmlPreview = new Blob([document.getElementById('agendaPreview').innerHTML], {
                    type: "text/html;charset=utf-8"
                });
                var filename = "agenda-export.html";
                saveAs(htmlPreview, filename);
            } else if (format == 'csv') {
                //TODO
            }
        }
    }
])


// Mark strings for translation in JavaScript.
.config([
    'gettext',
    function (gettext) {
        // permission string
        gettext('Can export data');
    }
])

}());
