const fs = require('fs')
const constants = require('../lib/constants')
const basePath = constants.DOCS_PATH;
const str_functions = require('../lib/string-functions')

exports.generate_md = (req, res, next) => {
    const markdown = req.body.markdown;
    const name = str_functions.convertFromTitleToFolder(req.body.title); // removes special characters
    const path = req.body.path + '/';
    const type = req.body.type;
    let fileName;
    let folderName;
    if (type == '1') // new folder
    {
        folderName = basePath + path + name;
        try {
            fs.mkdir(folderName, function (err) {
                if (err) {
                    console.log(err)
                }
            })
        } catch (err) {
            console.error(err)
        }

        // default file in the folder
        fileName = folderName + "/README.md";
    }
    else // new file in an existing folder
    {
        folderName = basePath + path;
        fileName = folderName + "/" + name + ".md";
    }

    try {
        const data = fs.writeFileSync(fileName, markdown); // generate markup file
        //file written successfully
        res.redirect('/');
    } catch (err) {
        console.error(err)
    }
};