const fs = require('fs');
const axios = require('axios');
const logger = require("../logger");

module.exports = async (req, res)=>{
    
    const data = {
        "now": Date.now()
    }

    res.render('home', {data: JSON.stringify(data)})
}