/**
 * Created with JetBrains WebStorm.
 * User: Anish Kumar
 * Date: 9/6/13
 * Time: 12:07 AM
 * To change this template use File | Settings | File Templates.
 */

define(["storagemanager"], function(storageManager) {

    var METADATA_LOCALSTORAGE_KEY = "LS_METADATA";
    var currentversion;
    var initialized = false;
    var metadata;
    var pageDataSources;

    var defaultMetaData = {
        version : '1',
        tenantid : '',
        appName : 'MyJCC',
        appTemplate : '<ul id="home-list" data-role="listview">{{#apps}}<li style="float:left;border:none;"><div><a data-transition="pop" href="#{{id}}"><img style="width:4em;height:4em;cursor:pointer" src="{{url}}"/></a></div><div style="font-size: 9px;padding-left: 5px;">{{name}}</div></li>{{/apps}}</ul>',
        appTemplate2: '<ul id="home-list" data-role="listview">{{#apps}}<li><a href="#" onClick = \'MyCampusMobile.navManager.changePage(\"#{{name}}\", "slide");\' data-transition="slide"><img src="./images/{{logo}}.png"><h2>{{name}}</h2><p>{{description}}</p></a></li>{{/apps}}</ul>',
        apps : [{ id : 1,
            name : 'News',
            logo : 'news',
            logourl : '',
            description : 'News App',
            accessmode : 'public',
            roles : '',
            apptemplate : '',
            pages : [
                {
                    pageid : "News",
                    datasource : {
                        connector : "feedconnector",
                        url : "http://www.fairfield.edu/rss/press_release.lasso?from=hp_iconset",
                        datatemplate : '<ul id="news_Articles_List"  data-role="listview" data-theme="d">{{#entries}}<li data-theme="d"><a href="#home"><h2>{{title}}</h2><p>Posted On:{{publishedDate}}</p></a></li>{{/entries}}</ul>',
                        destination : '#news-data'
                    },
                    /*datasource : {
                        connector : "feedconnector",
                        url : "http://api.flickr.com/services/feeds/photos_public.gne?id=44545530@N04&lang=en-us&format=rss_200",
                        datatemplate : '{{#entries}}{{#mediaGroups}}{{#contents}}{{#thumbnails}}<div style="margin:20px 0px 0px 20px;float:left"><img class="flickrPhoto" src="{{url}}"/></div>{{/thumbnails}}{{/contents}}{{/mediaGroups}}{{/entries}}',
                        destination : '#news-data'
                    },*/
                    pageTemplate : '<div id="News" data-role="page" data-position="fixed" data-theme="b"><div data-role="header"><a href="#home">Back</a><h1>My News</h1></div>' +
                        '<div data-role="content"><div id="news-data"></div></div>'
                },
                {
                    pageid : "News-Details",
                    pageTemplate : '<div id="News-Details" data-role="page" data-position="fixed" data-theme="b"><div data-role="header"><a href="#home">Back</a><h1>News Details</h1></div>' +
                        '<div data-role="content">' +
                        '<ul><li>Data 1</li><li>Data 2</li></ul>' +
                        '<a href="#" onClick=\'MyCampusMobile.navManager.changePage(\"#home\", \"flow\");\'>Home Screen</a></div></div>'
                }
            ]
        },
            { id : 2,
                name : 'Events',
                logo : 'Holds',
                logourl : '',
                description : 'Events App',
                accessmode : 'public',
                roles : '',
                apptemplate : '',
                pages : [
                    {
                        pageid : "Events",
                        datasource : {
                            connector : "feedconnector",
                            url : "http://www.fairfield.edu/rss/press_release.lasso?from=hp_iconset",
                            datatemplate : '<ul id="news_Articles_List"  data-role="listview" data-theme="d">{{#entries}}<li data-theme="d"><a href="#home"><h2>{{title}}</h2><p>Posted On:{{publishedDate}}</p></a></li>{{/entries}}</ul>',
                            destination : '#Events-content'
                        },
                        pageTemplate : '<div id="Events" data-role="page" data-position="fixed" data-theme="b"><div data-role="header"><a href="#home">Back</a><h1>My Events</h1></div>' +
                            '<div data-role="content"><div id="Events-content"></div></div></div>'
                    },

                    {
                        pageid : "Event-Details",
                        pageTemplate : '<div id="Event-Details" data-role="page" data-position="fixed" data-theme="b"><div data-role="header"><a href="#home">Back</a><h1>Event Details</h1></div>' +
                            '<div data-role="content">' +
                            '<ul><li>Data 1</li><li>Data 2</li></ul>' +
                            '<a href="#" onClick=\'MyCampusMobile.navManager.changePage(\"#home\", \"slidedown\");\'>Home Screen</a></div></div>'

                    }

                ]
            },

            { id : 3,
                name : 'Athletics',
                logo : 'athletics',
                logourl : '',
                description : 'Athletics App',
                accessmode : 'public',
                roles : '',
                apptemplate : '',
                pages : [
                    {
                        pageid : "Athletics",
                        /*datasource : {
                            connector : "feedconnector",
                            url : "http://www.fairfieldstags.com/rss.aspx?path=baseball",
                            datatemplate : '<ul id="athletics-data_List"  data-role="listview" data-theme="d">{{#entries}}<li data-theme="d"><a href="#home"><h2>{{title}}</h2><p>Posted On:{{publishedDate}}</p></a></li>{{/entries}}</ul>',
                            destination : '#athletics-data'
                        },*/
                        pageTemplate : '<div id="Athletics" data-role="page" data-position="fixed" data-theme="b"><div data-role="header"><a href="#home">Back</a><h1>My Events</h1></div>' +
                            '<div data-role="content"><div id="athletics-data"><ul data-role="listview">' +
                            '<li><a onClick=\'MyCampusMobile.navManager.changePage(\"#Athletics-baseball\", \"slidedown\");\'><h2>Base Ball</h2></a></li>' +
                            '<li><a onClick=\'MyCampusMobile.navManager.changePage(\"#Athletics-baseball\", \"slidedown\");\'><h2>Field Hockey</h2></a></li>' +
                            '<li><a onClick=\'MyCampusMobile.navManager.changePage(\"#Athletics-baseball\", \"slidedown\");\'><h2>Mens Basket ball</h2></a></li>' +
                            '<li><a onClick=\'MyCampusMobile.navManager.changePage(\"#Athletics-baseball\", \"slidedown\");\'><h2>Mens Cross Country</h2></a></li>' +
                            '<li><a onClick=\'MyCampusMobile.navManager.changePage(\"#Athletics-baseball\", \"slidedown\");\'><h2>Mens Soccer</h2></a></li>' +
                            '<li><a onClick=\'MyCampusMobile.navManager.changePage(\"#Athletics-baseball\", \"slidedown\");\'><h2>Mens Tennis</h2></a></li>' +
                            '<li><a onClick=\'MyCampusMobile.navManager.changePage(\"#Athletics-baseball\", \"slidedown\");\'><h2>Womens Basketball</h2></a></li>' +
                            '<li><a onClick=\'MyCampusMobile.navManager.changePage(\"#Athletics-baseball\", \"slidedown\");\'><h2>Womens Tennis</h2></a></li>' +
                            '<li><a onClick=\'MyCampusMobile.navManager.changePage(\"#Athletics-baseball\", \"slidedown\");\'><h2>Womens football</h2></a></li>' +
                            '<li><a onClick=\'MyCampusMobile.navManager.changePage(\"#Athletics-baseball\", \"slidedown\");\'><h2>Womens Soccer</h2></a></li>' +
                            '</ul></div></div></div>'
                    },

                    {
                        pageid : "Athletics-baseball",
                        datasource : {
                            connector : "feedconnector",
                            url : "http://www.fairfieldstags.com/rss.aspx?path=baseball",
                            datatemplate : '<ul id="athletics-data_List"  data-role="listview" data-theme="d">{{#entries}}<li data-theme="d"><a href="#home"><h2>{{title}}</h2><p>Posted On:{{publishedDate}}</p></a></li>{{/entries}}</ul>',
                            destination : '#athletics-baseball-data'
                        },
                        pageTemplate : '<div id="Athletics-baseball" data-role="page" data-position="fixed" data-theme="b"><div data-role="header"><a href="#home">Back</a><h1>My Events</h1></div>' +
                            '<div data-role="content"><div id="athletics-baseball-data"></div></div></div>'
                    },
                    {
                        pageid : "Athletics-Details",
                        pageTemplate : '<div id="Athletics-Details" data-role="page" data-position="fixed" data-theme="b"><div data-role="header"><a href="#home">Back</a><h1>Event Details</h1></div>' +
                            '<div data-role="content">' +
                            '<ul><li>Data 1</li><li>Data 2</li></ul>' +
                            '<a href="#" onClick=\'MyCampusMobile.navManager.changePage(\"#home\", \"fade\");\'>Home Screen</a></div></div>'
                    }

                ]
            },

            { id : 1,
                name : 'Courses',
                logo : 'courses',
                logourl : '',
                description : 'Courses App',
                accessmode : 'public',
                roles : '',
                apptemplate : '',
                pages : [
                    {
                        pageid : "Courses",
                        pageTemplate : '<div id="Courses" data-role="page" data-position="fixed" data-theme="b"><div data-role="header"><a href="#Courses-sidebar">Back</a><h1>My Events</h1></div>' +
                            '<div data-role="content"><a href="#" onClick=\'MyCampusMobile.navManager.changePage(\"#Courses-Details\", \"pop\");\'>Show Event Details</a></div>' +
                            '<div data-role="panel" id="Courses-sidebar" data-theme="c"><ul><li>test 1</li><li>test 2</li></ul></div>' +
                            '</div>'
                    },

                    {
                        pageid : "Courses-Details",
                        pageTemplate : '<div id="Courses-Details" data-role="page" data-position="fixed" data-theme="b"><div data-role="header"><a href="#home">Back</a><h1>Event Details</h1></div>' +
                            '<div data-role="content">' +
                            '<ul><li>Data 1</li><li>Data 2</li></ul>' +
                            '<a href="#" onClick=\'MyCampusMobile.navManager.changePage(\"#home\", \"slideup\");\'>Home Screen</a></div></div>'

                    },
                    {
                        pageid : "Courses-sidebar1",
                        pageTemplate : '<div id="Courses-sidebar1" data-role="panel" data-display="overlay" data-theme="b">' +
                            '<div data-role="content">' +
                            '<ul><li>Data 1</li><li>Data 2</li></ul>' +
                            '<a href="#" onClick=\'MyCampusMobile.navManager.changePage(\"#home\", \"slideup\");\'>Home Screen</a></div></div>'

                    }

                ]
            }
        ]
        /*publicApps : {

         },
         protectedApps : {

         },
         appDisplayOrder : ''*/




    };

    function getMetadataVersion(metadata) {

        return metadata.version;
    }

    function loadFromLocalStorage() {
        var storedMetadata = storageManager.get(METADATA_LOCALSTORAGE_KEY);
        if(storedMetadata != null) {
            metadata = storedMetadata;
            currentversion = getMetadataVersion(metadata);
        }else {
            metadata = defaultMetaData;
            storageManager.put(METADATA_LOCALSTORAGE_KEY, metadata);
        }
    }

    function populatePageDataSources() {
        pageDataSources = [];
        $.each(metadata.apps, function(index, val) {
            $.each(val.pages, function(ind, v) {

                if(v.datasource != undefined) {
                    //alert (v.pageid + ' ' + v.datasource);
                    pageDataSources.push(v);
                }
            });
            //alert ('Page DaaNews : ' + pageDataSources);
        });

    }

    function getPageDataSource(pageid) {
        var pageDs;
        for( i=0; i<pageDataSources.length; i++ ) {
            //alert ('page id : ' + pageDataSources[i].pageid);
            if('#' + pageDataSources[i].pageid == pageid) {
                //alert ('page id : ' + pageDataSources[i].pageid);
                pageDs = pageDataSources[i].datasource;
            }
        }
        return pageDs;
    }

    function myMetadata() {
        return metadata;
    }

    function initialize() {
        if(!initialized) {
            loadFromLocalStorage();
            populatePageDataSources();
            initialized = true;
        }
    }


    return {
        version : currentversion,
        myMetadata : myMetadata,
        initialize : initialize,
        getPageDataSource : getPageDataSource

    }
});
