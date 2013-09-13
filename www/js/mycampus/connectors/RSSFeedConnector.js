/**
 * Created with JetBrains WebStorm.
 * User: Anish Kumar
 * Date: 9/10/13
 * Time: 2:47 PM
 * To change this template use File | Settings | File Templates.
 */

define([], function() {

    function fetchData(url, callback) {
        var feed = new google.feeds.Feed(url);
        var data;
        feed.load(callback);
    }

    return {
        fetchData : fetchData
    }

});