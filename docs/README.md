# Website Documentation using VuePress

# About the project

This is a documentation website created using [Vuepress](https://vuepress.vuejs.org/) framework and used the default theme provided by **VuePress**. To make modifications in the theme, **Theme Inheritance** feature is used.

To make easy to add a new markdown file there is a utility created using **Express**. So the admin doesn't have to dive into the project structure to add new `.md` files.

## Github link for the project
https://github.com/kinjal1993/VuePressDemo/

## Netlify Link
https://practical-kepler-9889c2.netlify.app/

The project is divided into two folders:

**1. docs**

It contains all the markup files and .vuepress folder. All the contents in sidebar are loaded from `docs/guide/` dynamically so that no need to modify `config.js` each time a new `.md` file is added.

**2. add-markup**

It is a utility built using `express.js` to make easy for the admin to add new markup files to `docs/guide` folder.

Using this utility you can add new `.md` files into `docs/guide/`. [markdown-it](https://github.com/markdown-it/markdown-it) plugin is integrated to show the preview of markups.

> This is just a utility to make the process of adding new markup files easier. One can opt to add `.md` manually as well and documentation will get generated as it is.