const fs = require('fs');
const path = require('path');
const dirName = './';
const directories = [];
let parent_directories = [];

function makeTitle(str) {
    return str.replace(/-/g, " ").replace(/\b[a-z]/g, function () {
        return arguments[0].toUpperCase();
    });
}

function traverseDir(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (let i = 0; i < files.length; i++) {
        if (files[i].isDirectory()) {
            if (files[i].name != '.vuepress') {
                const dir_name = path.join(dir, files[i].name);
                const folders = dir_name.replace(dirName, "").split('/');
                const id = folders.join('/'); // full folder path
                const folder_name = folders.pop(); // pop out the last element to get parent folder name
                const parent_folder = folders.join("/");
                parent_directories.push(parent_folder);
                const dirObject = {
                    "path": id + '/',
                    "parentId": parent_folder + '/',
                    "collapsable": true,
                    "title": makeTitle(folder_name)
                }
                directories.push(dirObject);
                traverseDir(dir_name);
            }
        }
    }
}

traverseDir(dirName);

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

parent_directories = parent_directories.filter(onlyUnique);

function list_to_tree(list) {
    var map = {}, node, roots = [], i;

    for (i = 0; i < list.length; i += 1) {
        map[list[i].path] = i; // initialize the map
        list[i].children = []; // initialize the children
    }

    for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.parentId !== "/") {

            if (parent_directories.includes(node.path)) // check if node is a leaf node
            {
                // if you have dangling branches check that map[node.parentId] exists
                list[map[node.parentId]].children.push(node);
            }
            else {
                list[map[node.parentId]].children.push([node.path, node.title]);
            }

        } else {
            roots.push(node);
        }
    }

    return roots;
}

const nested_directories = list_to_tree(directories);

module.exports = {
    'nested_directories': nested_directories
}
