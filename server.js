const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

const port = process.env.PORT || 5000;

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


