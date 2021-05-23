const sidebar = require("../../lib/sidebar").sidebar;

module.exports = {
  title: 'VuePressDemo',
  themeConfig: {
    nav: [
      {
        text: 'Learn More',
        ariaLabel: 'Learn More',
        items: [
          { text: 'VuePress Official Docs', link: 'https://vuepress.vuejs.org/theme/' },
          { text: 'Creating Blogs', link: 'https://vuepress.vuejs.org/theme/blog-theme.html' }
        ]
      },
      {
        text: 'About',
        link: '/about.html'
      }
    ],
    logo: '/assets/img/logo.png',
    smoothScroll: true,
    sidebar: sidebar
  },
};