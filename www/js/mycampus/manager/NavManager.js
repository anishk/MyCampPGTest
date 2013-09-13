/**
 * Created with JetBrains WebStorm.
 * User: Anish Kumar
 * Date: 9/5/13
 * Time: 7:59 PM
 * To change this template use File | Settings | File Templates.
 */

define(["feedconnector", "metadatamanager", "mustache"], function(feedconnector, metadatamanager, mustache) {
    var initialized = false;

    function initialize() {

        if(!initialized) {
            var doc = $(document);
            doc.bind("pagechange", onPageChange);
            initialized = true;
        }
    }

    function onPageChange(event, data) {
        //alert (event + ' ' + data);
    }

    function changePage(pageid, transition) {
        $.mobile.loading( 'show', {
            text: "Loading" + pageid,
            textVisible: true,
            theme: "c",
            textonly: false
        });

        var pageDs = metadatamanager.getPageDataSource(pageid);
        var loadPage = function() {
            $.mobile.changePage(pageid, {transition:transition});
            $.mobile.loading( 'hide');
        };
        if(pageDs) {
            //alert ('page DS : ' + pageDs.connector + ' ' + pageDs.url);
            feedconnector.fetchData(pageDs.url, function(results) {
                //alert(JSON.stringify(results));
                //alert ('mustache data : ' + mustache.to_html(pageDs.datatemplate, results.feed) );
                $(pageDs.destination).html('');
                $(pageDs.destination).append(mustache.to_html(pageDs.datatemplate, results.feed));
                setTimeout(function() {
                    loadPage();
                    $(pageDs.destination + ' ul').listview();
                    $(pageDs.destination + ' ul').listview("refresh");

                }, 100);
            });
        }else {
            setTimeout( loadPage, 100);
        }
        //setTimeout( loadPage, 100);

    }

    return {
        initialize : initialize,
        changePage : changePage
    }

});

