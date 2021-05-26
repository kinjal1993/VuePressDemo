const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

const dirTree = require('directory-tree');
const flatten = require('tree-flatten');
const helper_functions = require('../lib/helper-functions');
const constants = require('../lib/constants');
const dirPath = constants.DOCS_PATH;
const docs_folder = constants.DOCS_FOLDER;

// index page
router.get('/', function(req, res) {
    const action = '/generate-md';
    const paths = [];

    // fetch directory structure for docs/sidebar
    const filteredTree = dirTree(dirPath, {
        extensions: /\.(md)$/,
        exclude: /.vuepress/
    });

    const flatArray = flatten(filteredTree, 'children');
    // filter and modify object
    flatArray.filter((item) => {
        if(item.type == 'directory')
        {
            let path;
            if(item.path == dirPath)
            {
                path = '/';
            }
            else
            {
                path = item.path.replace(docs_folder,"")+'/';
            }
            paths.push({
                path : path,
                title : helper_functions.makeFolderTitle(item.name)
            });
        }
    });

    res.render('pages/index', { paths: paths, action: action });
});

// form action
router.post('/generate-md', adminController.generate_md);

module.exports = router;