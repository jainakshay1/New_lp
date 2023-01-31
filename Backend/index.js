const express = require('express');
const cors =require('cors')

const app = express();
app.use(express.json());
app.use(cors())

app.use(express.urlencoded({extended: true}));
app.post('/submit', (req, res) => {
    console.log(req.body);
    // use req.body to access the resource details submitted in the form
    // Perform your further operation on server
    const fs = require("fs");
const namesval =req.body.resourceDetails.name;
console.log(namesval)


    // Read the terraform.tfvars file
    
    fs.readFile("terraform.tfvars", "utf8", (err, content) => {
        if (err) {
            console.log(err);
            return;
        }
        const new_resource_name = "hello"
        // Search for the current value of "rgname"
        let rgname_value = content.match(/resource_name = "(.*?)"/);
        if (rgname_value) {
            console.log("Current value of resource_name:", rgname_value[1]);
            
            content = content.replace(/resource_name = "(.*?)"/, `resource_name = "${namesval}"`);
            console.log(content+"check")
            // Write the updated content back to the file
            fs.writeFile("terraform.tfvars", content, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("File updated successfully.");
                }
            });
        } else {
            console.log("rgname not found in the file.");
        }
    });
    var axios = require('axios');
//var fs = require('fs');
var base64 = require('base-64');

let token = "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"
let file = fs.readFileSync("terraform.tfvars").toString();
console.log(file);
var content = base64.encode(file);
console.log(content);
uploadFileApi(token, content)

async function uploadFileApi(token, content) {

  var config = {
    method: 'get',
    url: 'https://api.github.com/repos/jainakshay1/terraform1/contents/terraform.tfvars',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  };

  try {
    const response = await axios(config);
    var sha = response.data.sha;
  } catch (error) {
    console.log(error);
    return;
  }

  var data = JSON.stringify({
    "message": "txt file",
    "content": `${content}`,
    "sha": sha
  });

  config = {
    method: 'put',
    url: 'https://api.github.com/repos/jainakshay1/terraform1/contents/terraform.tfvars',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    data: data
  };


  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}


                          
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
