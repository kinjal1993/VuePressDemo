const PATH = require('path');
const dirTree = require('directory-tree');
const constants = require('./constants');
const dirPath = constants.DOCS_PATH;
const docs_folder = constants.DOCS_FOLDER;
const str_functions = require('./string-functions');
const flatten = require('tree-flatten');

const filteredTree = dirTree(dirPath, {
    extensions: /\.(md)$/,
    exclude: /.vuepress/
});

const flatArray = flatten(filteredTree, 'children');
const response = [];
// filter and modify object
flatArray.filter((item) => {
    if(item.type == 'directory' && item.name != docs_folder)
    {
        response.push({
            path : item.path.replace(docs_folder,"")+'/',
            title : str_functions.convertFromFolderToTitle(item.name)
        });
    }
});

module.exports = {
    directories: response
}

