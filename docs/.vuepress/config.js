const sidebar = require("../../lib/sidebar").sidebar;

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