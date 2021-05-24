# Website Documentation using VuePress

# About the project

I have created documentation website using [Vuepress](https://vuepress.vuejs.org/) framework. I have used the default theme provided by **VuePress**. To make modifications in the theme I have used the **Theme Inheritance** feature provided **VuePress**. I have also created a library to load contents of sidebar dynamically.

To make easy to add a new markdown file I have created a utility using **Express**. So the admin doesn't have dive into the project structure to add new `.md` files. You can add markup content from there into the docs/ folder of the project. I have integrated [markdown-it](https://github.com/markdown-it/markdown-it) plugin to show the preview of markups.

## Github link for the project
https://github.com/kinjal1993/VuePressDemo/

## Netlify Link
https://practical-kepler-9889c2.netlify.app/

# Quick Start

## 1. Clone the git project
``` bash
git clone https://github.com/kinjal1993/VuePressDemo.git
``` 
## 2. Navigate to the folder
``` bash
cd <folder-name>
``` 

## 3. Install dependencies
``` bash
npm install
```

## 4. To add new markup files
``` bash
npm start
```

## 5. For development
``` bash
cd docs
vuepress dev
```

## 6. For production build
``` bash
cd docs
vuepress build
```