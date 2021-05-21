const directories = require("./nested-directories");
sidebar = directories.nested_directories;

module.exports = {
  title: 'Hello, VueNYC!',
  themeConfig: {
    nav: [
      {
        text: 'Link 1',
        link: '/projects/hello.html'
      }
    ],
    sidebar: sidebar
  },
};
