// dynamic sidebar from folder structure
const PATH = require('path');
const dirTree = require('directory-tree');
const dirPath = './guide/';

// begin generate dynamic sidebar
// sidebar is getting generated dynamically by picking up .md files from /docs/guide folder
const sidebar = () => {
  // fetch directory structure for the given path
  const filteredTree = dirTree(dirPath, {
    extensions: /\.(md)$/,
    exclude: /.vuepress/
  });
  
  const response = getSideBarObject(filteredTree);
  return ["/",...sanitize(response)['children']];
}
// end generate dynamic sidebar

// helper functions side bar

// modifying the dir tree response according to the vuepress sidebar parameters
const getSideBarObject = (obj) => {
  const keyValues = Object.keys(obj).map(key => {
      if (key == 'name' || key == 'children' || key == 'path' || key == 'type') {
          let newKey = null
          // renaming key from name to title
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
  newObj['path'] = '/'+newObj['path'];

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
  }
  newObj['title'] = makeFolderTitle(newObj['title']);

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

const makeFolderTitle = (str) => {
  return str.replace(/-/g, " ").replace(".md", "").replace(/\b[a-z]/g, function () {
      return arguments[0].toUpperCase();
  });
}

// to sanitise the object remove empty / null objects from the array
const sanitize = (object) => {
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


module.exports = {
  title: 'VuePressDemo',
  themeConfig: {
    nav: [
      {
        text: 'More on VuePress',
        ariaLabel: 'More on VuePress',
        items: [
          { text: 'VuePress Official Docs', link: 'https://vuepress.vuejs.org/theme/' },
          { text: 'Creating Blogs', link: 'https://vuepress.vuejs.org/theme/blog-theme.html' }
        ]
      },
      {
        text: 'About the developer',
        link: '/about.html'
      }
    ],
    logo: '/assets/img/logo.png',
    smoothScroll: true,
    sidebar: sidebar()
  },
};

