var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
    var user = req.body;
    console.log(user);
    //add user
    res.send();
});
router.post('/:id', function(req, res, next) {
    var user = req.body;
    console.log(req.params.id);
    //update user
    res.send();
});
router.delete('/:id', function(req, res, next) {
    //delete user
    res.send();
});
router.get('/', function(req, res, next) {
    var users = [{
        id: 1,
        status: 'active',
        username: 'idan',
        country: 'Israel',
        created_at: (new Date()).getTime()
    }, {
        id: 2,
        status: 'disactive',
        username: 'gozlan',
        country: 'Israel',
        created_at: (new Date()).getTime()
    }];
    res.send(users);
});

module.exports = router;
