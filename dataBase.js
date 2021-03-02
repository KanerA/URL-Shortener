const fsPromises = require('fs').promises;
const shortId = require('shortid');
const dir = process.env.NODE_ENV === 'test' ? './test':'./data';

class DB{
    static urls = [];
    
    // add the url given to the database
    
    // redirect with the short url

    // read all data and add new urls
    static readData(){
        try{
            fsPromises.readFile(`${dir}/data.json`, 'utf-8')
            .then((res) => {
                this.urls = res;
            })
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = DB;