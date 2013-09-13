/**
 * Created with JetBrains WebStorm.
 * User: Anish Kumar
 * Date: 9/9/13
 * Time: 12:15 AM
 * To change this template use File | Settings | File Templates.
 */

require.config({
    baseUrl : "js",
    paths : {
        "jquery" : 'vendor/jquery',
        "jquerymobile" : 'vendor/jquerymobile',
        "appmanager" : 'mycampus/manager/AppManager',
        "metadatamanager" : 'mycampus/manager/MetadataManager',
        "storagemanager" : 'mycampus/manager/StorageManager',
        "navmanager" : 'mycampus/manager/NavManager',
        "feedconnector" : 'mycampus/connectors/RSSFeedConnector',
        "jstorage" : 'vendor/jstorage',
        "iscroll" : 'vendor/iscroll-min',
        "mustache" : 'vendor/mustache',
        "async" : 'vendor/require-js-plugins/async',
        "propertyParser" : 'vendor/require-js-plugins/propertyParser',
        "goog" : 'vendor/require-js-plugins/goog'
    },

    shim : {
        "metadatamanager" : {
            "deps" : ["storagemanager"]

        },
        "storagemanager" : {
            "deps" : ["jstorage"]

        },
        "appmanager" : {
            "deps" : ["metadatamanager"],
            "exports" : "appmanager"

        },
        "jstorage" : {

        }
    }
});


require(["jquery", "jquerymobile", "appmanager", "storagemanager", "jstorage", "metadatamanager", "navmanager", "mustache",
"goog!feeds,1", "feedconnector"],
    function($, $jqm, appManager, storageManager, jstorage, metadatamanager, navmanager, mustache, goog, feedconnector) {
        window.MyCampusMobile = {
            appManager : appManager,
            storageManager : storageManager,
            navManager : navmanager,
            metadataManager : metadatamanager
        };
        appManager.initialize();

        function launchApp() {

            //var pubApps = appManager.getAllPublicApps();
            appManager.initialize();
            alert ("Launched");
        }


        function initialize() {
            alert("MyCampus Mobile initialize");
            //setTimeout(launchApp, 1000);
        }

        return {
            initialize : initialize
        }

    });

