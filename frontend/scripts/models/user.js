/**
 * Created by sascha on 24.08.14.
 */
define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    return Backbone.Model.extend({
        urlRoot: '/api/users',

        defaults: {
            firstname: '',
            lastname: '',
            username: '',
            email: ''
        }
    });
});
