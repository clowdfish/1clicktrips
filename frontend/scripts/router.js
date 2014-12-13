(function($, _, Backbone, App) {

    var Router = Backbone.Router.extend({
        routes: {
            '' : 'home',
            'search' : 'home',
            'result' : 'result',
            'about' : 'about',
            'signup?*queryString' : 'signup',
            'signup' : 'signup',
            'signin' : 'signin',
            'settings' : 'settings',
            'contact' : 'contact',
            'contact?*queryString' : 'contact',
            'privacy' : 'privacy',
            'legal' : 'legal',
            'error' : 'error'
        }
    });

    var router = null;

    var initialize = function() {
        // 0: Other, 1: Search, 2: About, 3: Sign up, 4: Settings
        var navBar = new App.NavView();
        //var footerLinks = new App.FooterLinks();
        var searchController = new App.SearchController();
        var searchView = new App.SearchView();
        //var aboutView = new App.AboutView();
        var signupController = new App.SignupController();
        var sessionController = new App.SessionController();
        var signupView = new App.SignupView();
        var signinView = new App.SigninView();

        /*var settingsView = new App.SettingsView();
        var contactView = new App.ContactView();
        var legalView = new App.LegalView();
        var privacyView = new App.PrivacyView();
        var confirmView = new App.ConfirmView();*/

        router = new Router();

        router.on('route:home', function() {
            /*navBar.render(1);
            searchView.render();
            footerLinks.render();*/
        });
        router.on('route:result', function() {
            navBar.render(1);
            console.log('We have loaded the result page!');
            footerLinks.render();
        });
        router.on('route:about', function() {
            navBar.render(2);
            aboutView.render();
            footerLinks.render();
        });
        router.on('route:signup', function(param) {
            if(param) {
                if ("confirm" === param.substr(0, 7)) {
                    // token was sent from server
                    Utils.setAccessToken(param.substr(8));
                    confirmView.render( { type: "success", message: "signup.confirm.message", link: { name: "navbar.home", url: "/" }} );
                }
            }
            else {
                navBar.render(3);
                signupView.render();
                footerLinks.render();
            }
        });
        router.on('route:signin', function() {
            navBar.render(3);
            signinView.render();
            footerLinks.render();
        });
        router.on('route:settings', function() {
            if(Utils.isUserLoggedIn()) {
                navBar.render(4);
                settingsView.render();
                footerLinks.render();
            }
            else
                Utils.doRedirect('/#/');
        });
        router.on('route:contact', function(param) {
            navBar.render(0);
            if(param) {
                if("confirm=1" === param.substr(0, 9)) {
                    confirmView.render( { type: "success", message: "contact.confirm.message", link: { name: "navbar.home", url: "/" }} );
                }
                else {
                    confirmView.render( { type: "error", message: "contact.error.message", link: { name: "navbar.home", url: "/" }} );
                }
            }
            else {
                contactView.render();
            }
            footerLinks.render();
        });
        router.on('route:privacy', function() {
            navBar.render(0);
            privacyView.render();
            footerLinks.render();
        });
        router.on('route:legal', function() {
            navBar.render(0);
            legalView.render();
            footerLinks.render();
        });
        router.on('route:error', function() {
            navBar.render(1);
            console.log('We have loaded the error page!');
            footerLinks.render();
        });

    // adding {pushState: true} as argument to make use of history API
    // causes problem when bookmarking the website
    // TODO: See http://backbonejs.org/#History for solution
    Backbone.history.start();
    };

    var triggerRoute = function(pathname) {
        console.log('Triggering route: ' + pathname);
        console.log('Route: ' + Utils.getCustomPathName());
        if(Utils.getCustomPathName() == pathname) router.navigate('temp', {trigger: true, replace: true});

        router.navigate(pathname, {trigger: true});
    };

    var getRouter = function() {
        return router;
    };

    App.Router = {
        initialize: initialize,
        trigger: triggerRoute,
        get: getRouter
    };
})($, _, Backbone, App);
