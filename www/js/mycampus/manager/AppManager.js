
define(["jquery","jquerymobile", "metadatamanager", "navmanager", "mustache"],
    function($,$jqm, metadataManager, navManager, mustache) {
        var currentPage;
        var publicApps;
        var initialized = false;
        var privateApps;
        var allApps;

        function setCurrentPage(page) {
            this.currentPage = page;
        }

        function getCurrentPage() {
            return currentPage;
        }

        function openApp(app) {

        }

        function closeApp(app) {

        }

        function getAllPublicApps() {
            return publicApps;
        }

        function getAllPrivateApps() {
            return privateApps;
        }

        function getAllApps() {
            return allApps;
        }

        /*function renderHomeScreen() {
         var html = "";
         html += "<ul id='home-list' data-role='listview'>"
         //home-list-content
         $.each(getAllPublicApps(), function(key, val) {
         html += '<li><a href="#">' +
         '<img src="../../_assets/img/apple.png">' +
         '<h2>iOS 6.1</h2>' +
         '<p>Apple released iOS 6.1</p>' +
         '<p class="ui-li-aside">iOS</p>'+
         '</a></li>';
         });
         html += "</ul>";
         $("#home-list-content").html(html);
         $("#home-list").listview();
         $("#home-list").listview("refresh");

         }*/

        function renderHomeScreen() {
            var html = "";
            $("#home-header-title").html(metadataManager.myMetadata().appName);
            /*
             html += "<ul id='home-list' data-role='listview'>"


             $.each(getAllPublicApps(), function(key, val) {
             html += '<li><a href="#">' +
             '<img src="../../_assets/img/apple.png">' +
             '<h2>' + val.name + '</h2>' +
             '<p>' + val.description + '</p>' +
             '<p class="ui-li-aside">iOS</p>'+
             '</a></li>';
             });
             html += "</ul>";
             */
            $("#home-list-content").append(mustache.to_html(metadataManager.myMetadata().appTemplate2, metadataManager.myMetadata()));
            $.each(metadataManager.myMetadata().apps, function(index, val){
                if(val.pages) {
                    $.each(val.pages, function(index, pagedef) {
                        //alert (pagedef.pageTemplate);
                        $('body').append(pagedef.pageTemplate);
                    });
                }
            });
            $("#home-list").listview();
            $("#home-list").listview("refresh");

        }

        function initialize() {
            if(!initialized) {
                navManager.initialize();
                metadataManager.initialize();
                var myMetadata = metadataManager.myMetadata();
                publicApps = [];
                allApps = [];
                privateApps = []
                $.each(myMetadata.apps, function (index, val) {
                    if(val.accessmode == 'public') {
                        publicApps.push(val);
                    } else  if(val.accessmode == 'private') {
                        privateApps.push(val);
                    }
                    allApps.push(val);
                })
                renderHomeScreen();
            }
        }

        return {
            setCurrentPage : setCurrentPage,
            getCurrentPage : getCurrentPage,
            openApp : openApp,
            closeApp : closeApp,
            getAllPublicApps : getAllPublicApps,
            getAllPrivateApps : getAllPrivateApps,
            getAllApps : getAllApps,
            initialize : initialize
        }

    });

