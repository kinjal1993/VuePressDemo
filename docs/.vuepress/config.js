// dynamic sidebar from folder structure
const sidebar = require("../../lib/sidebar").sidebar;

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
    sidebar: sidebar
  },
};