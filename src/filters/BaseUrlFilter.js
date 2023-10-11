main.filter('baseUrl', function() {
    return function(input) {
        return (TEMPLATES_DIR || '') + input;
    };
});