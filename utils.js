const shortid = require("shortid");
const DB = require("./dataBase");

const checkIdValid = (req, res, next) => {
    const { id } = req.params;
    if(!shortid.isValid(id)) res.status(400).json({message: "Invalid Bin Id provided"})
    next();
}

const checkIdExist = async (req, res, next) => {
    const { id } = req.params;
    await DB.readData();
    let counter = 0;
    for(url of DB.urls){
        if(id !== url.shortUrlId){
            counter++;
        }
    }
    if(counter === DB.urls.length) res.status(404).json({message: "id not found"})
    next();
}

const urlExist = async (req, res, next) => {
    const { url } = req.body;
    console.log(url);
    await DB.readData();
    for(let savedUrl of DB.urls){
        if(url === savedUrl.originalUrl){
            return res.json({
                message: "URL already shortened",
                shortUrl: savedUrl.shortUrlId
            })
        }
    }
    next();
}

module.exports = { checkIdExist, checkIdValid, urlExist };