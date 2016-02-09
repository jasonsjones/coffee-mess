module.exports =  function (router) {

    // Initial dummy route for testing
    // http://localhost:3000/api
    router.get('/', function (req, res) {
        res.json({message: 'You are running dangerously low on coffee'});
    });

};
