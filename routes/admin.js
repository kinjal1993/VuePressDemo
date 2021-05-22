const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const directories = require("../lib/traversedir");

// index page
router.get('/', function(req, res) {
    const dirName = './docs/';
    paths = directories.directories;
    res.render('pages/index', { paths: paths});
});

router.post('/generate-md', adminController.generate_md);

module.exports = router;