const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config()

const app = express();

app.use(cors());

const port = process.env.PORT || 5000;

const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/fetch_ips', (req, res) => {
    try {
        axios
            .get('http://api.cybercure.ai/feed/get_ips')
            .then(response => {


                let ip_address_data = [];
                ip_address_data = response.data.data.ip;

                res.send(ip_address_data)

            })
            .catch(err => {
                console.log(err);
            })
    }
    catch{
        console.log("error")
    }

});


app.get('/fetch_data_by_ip/:ip', (req, res) => {
    //console.log("API KEY = " + IPSTACK_API_KEY)

    try {
        let request_string = "http://api.ipstack.com/" + req.params.ip + "?access_key=" + IPSTACK_API_KEY + "&fields=ip,location,city,region_name,latitude,longitude&output=json"
        //console.log(request_string)
        //console.log("")

        // API CALL FOR LOCATION
        axios
            .get(request_string)
            .then(response => {
                let temp_location_data = {
                    ip: response.data.ip,
                    city: response.data.city,
                    region_name: response.data.region_name,
                    latitude: response.data.latitude,
                    longitude: response.data.longitude,
                    //country_flag_emoji_unicode: response.data.location.country_flag_emoji_unicode
                }

                res.send(temp_location_data)

            })
            .catch(err => {
                console.log(err)
            })

    }
    catch{
        console.log("error")
    }

});


// IPSTACK_API_KEY = process.env.IPSTACK_API_KEY
// API CALL FOR LOCATION = "http://api.ipstack.com/" + ip + "?access_key=" + IPSTACK_API_KEY + "&fields=ip,location,city,region_name,latitude,longitude&output=json"


// Will want to take IP addresses (which already have above)
// and use another API to get lat/long/city/country/etc for each IP
// Do that in backend
// Then send objects containing all that data to frontend for display in map and table, etc

