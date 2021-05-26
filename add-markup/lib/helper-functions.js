const makeFolderTitle = (str) => {
    return str.replace(/-/g, " ").replace(".md", "").replace(/\b[a-z]/g, function () {
        return arguments[0].toUpperCase();
    });
}

const makeFolderName = (Text) =>
{
    return Text
        .toLowerCase()
        .replace(/^[a-zA-Z0-9.]*$/,'')
        .replace(/ +/g,'-')
        ;
}

module.exports = {
    'makeFolderTitle': makeFolderTitle,
    'makeFolderName': makeFolderName
}