const convertFromFolderToTitle = (str) => {
    return str.replace(/-/g, " ").replace(".md", "").replace(/\b[a-z]/g, function () {
        return arguments[0].toUpperCase();
    });
}

const convertFromTitleToFolder = (Text) =>
{
    return Text
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-')
        ;
}

module.exports = {
    'convertFromTitleToFolder': convertFromTitleToFolder,
    'convertFromFolderToTitle': convertFromFolderToTitle
}