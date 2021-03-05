const shortid = require("shortid");
const DB = require("./dataBase");

const checkIdValid = (req, res, next) => {
    const { id } = req.params;
    if(!shortid.isValid(id)) return res.status(400).json({message: "Invalid Id provided"})
    next();
}

const checkIdExist = async (req, res, next) => {
    const { id } = req.params;
    try{
        await DB.readData();
        let counter = 0;
        for(url of DB.urls){
            if(id !== url.shortUrlId){
                counter++;
            }
        }
        if(counter === DB.urls.length) return res.status(404).json({message: "id not found"})
        next();
    } catch(e){
        console.log(e);
    }
}

const urlExist = async (req, res, next) => {
    const { url } = req.body;
    try{
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
    } catch(e){
        console.log(e);
    }
}

const checkIfBlank = (req, res, next) => {
    const { url } = req.body;
    if(url === '') return res.json({message: "can't send empty url input"})
    next();
}

module.exports = { checkIdExist, checkIdValid, urlExist, checkIfBlank };