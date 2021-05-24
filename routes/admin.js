const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const directories = require("../lib/traversedir");

// index page
router.get('/', function(req, res) {
    const action = '/admin/generate-md';
    const paths = directories.directories;
    res.render('pages/index', { paths: paths, action: action });
});

// form action
router.post('/generate-md', adminController.generate_md);

module.exports = router;