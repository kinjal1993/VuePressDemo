const PATH = require('path');
const dirTree = require('directory-tree');
const constants = require('./constants');
const dirPath = constants.DOCS_VUE_RELATIVE_PATH;
const basePath = constants.BASE_FOLDER;
const str_functions = require('./string-functions');

function getSideBarObject(obj) { // modifying the dir tree response according to the vuepress sidebar parameters
    const keyValues = Object.keys(obj).map(key => {
        if (key == 'name' || key == 'children' || key == 'path' || key == 'type') {
            let newKey = null
            if (key === 'name') {
                newKey = 'title'
            } else {
                newKey = key
            }
            if (key === 'children') {
                obj[key] = obj[key].map(obj => getSideBarObject(obj));
            }
            return {
                [newKey]: obj[key]
            };
        }
    });
    const newObj = Object.assign({}, ...keyValues);
    newObj['path'] = newObj['path'].replace(basePath, "");

    if (newObj['type'] == 'directory' && newObj['path'] != '/') // append "/" to every path if not root path
    {
        newObj['path'] += "/";
    }

    // make title from folder name or file name
    if (newObj['type'] != 'directory') {
        if (newObj['title'].toLowerCase() == 'readme.md') // if file is read me
        {
            return {};
        }
        else {
            newObj['title'] = str_functions.convertFromFolderToTitle(newObj['title']);
        }
    }
    else {
        newObj['title'] = str_functions.convertFromFolderToTitle(newObj['title']);
    }
    newObj['title'] = str_functions.convertFromFolderToTitle(newObj['title']);

    // if no children then return index array else object
    if ("children" in obj) {
        return {
            title: newObj['title'],
            path: newObj['path'],
            collapsable: true,
            children: newObj['children']
        };
    }
    else {
        return [newObj['path'], newObj['title']];
    }
}

// fetch directory structure for the given path
const filteredTree = dirTree(dirPath, {
    extensions: /\.(md)$/,
    exclude: /.vuepress/
});

const response = getSideBarObject(filteredTree);
// to sanitise the object remove empty / null objects from the array
const sanitize = function (object) {
    Object
        .entries(object)
        .forEach(([k, v]) => {
            if (v && typeof v === 'object')
                sanitize(v);
            if (v &&
                typeof v === 'object' &&
                !Object.keys(v).length ||
                v === null ||
                v === undefined ||
                v.length === 0
            ) {
                if (Array.isArray(object))
                    object.splice(k, 1);
                else if (!(v instanceof Date))
                    delete object[k];
            }
        });
    return object;
}
const sidebar = ["/",...sanitize(response)['children']];
module.exports = {
    sidebar: sidebar
}

