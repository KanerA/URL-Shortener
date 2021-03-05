const fsPromises = require('fs').promises;
const shortId = require('shortid');
const dir = process.env.NODE_ENV === 'test' ? './test':'./data';
const axios = require('axios').default

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
            res.status(200).render('shortUrl', data)
        } catch(e) {
            console.log(e);
        }
    }

    // redirect with the short url
    static async redirectUrl(req, res){
        const { id } = req.params;
        await DB.readData();
        DB.urls.forEach(async (value) => {
            if(id === value.shortUrlId){
                value.redirectCount++;
                res.status(302).redirect(value.originalUrl);
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

    // get the statistics of a specified id
    static async getIdStatistics(req, res){
        const { id } = req.params;
        try{
            await DB.readData();
            DB.urls.forEach(async (value) => {
                if(id === value.shortUrlId){
                    const stats = {
                        creationDate: value.creationDate,
                        redirectCount: value.redirectCount,
                        originalUrl: value.originalUrl,
                        shortURL: `http://localhost:3000/api/${value.shortUrlId}`
                    }
                    res.render('statistics_id', stats)
                }
            })
        } catch(e){
            console.log(e);
        }
    }
}

module.exports = DB;