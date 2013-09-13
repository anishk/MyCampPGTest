/**
 * Created with JetBrains WebStorm.
 * User: Anish Kumar
 * Date: 9/6/13
 * Time: 12:00 PM
 * To change this template use File | Settings | File Templates.
 */
define(["jquery"], function($) {
    function _get(key) {
        return $.jStorage.get(key);
    }

    function _put(key, val) {
        $.jStorage.set(key, val);
    }

    function _delete(key) {
        $.jStorage.deleteKey(key);
    }

    return {
        put : _put,
        get : _get,
        delete : _delete
    }
});
