const fsPromises = require('fs').promises;
const shortId = require('shortid');
const dir = process.env.NODE_ENV === 'test' ? './test':'./data';

class DB {
    static urls = [];
    
    // add the url given to the database
    static async addURL(req, res){
        const data = {
            creationDate: Date.now(),
            redirectCount: 0,
            originalUrl: req.body.url,
            shortUrlId: shortId.generate()
        }
        try{
            await DB.readData();
            DB.urls.push(data);
            await fsPromises.writeFile(`${dir}/data.json`, JSON.stringify(DB.urls, null, 4));
        } catch(e) {
            console.log(e);
        }
    }

    // redirect with the short url
    static async redirectUrl(req, res){
        const id = req.params.id;
        await DB.readData();
        DB.urls.forEach(async (value) => {
            if(id === value.shortUrlId){
                value.redirectCount++;
                res.redirect(value.originalUrl);
            }
        })
        await fsPromises.writeFile(`${dir}/data.json`, JSON.stringify(DB.urls, null, 4));
    }

    // read all data and add new urls
    static async readData(){
        try{
            await fsPromises.readFile(`${dir}/data.json`, 'utf-8')
            .then((res) => {
                const parsed = JSON.parse(res);
                this.urls = parsed;
            })
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = DB;