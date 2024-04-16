const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;

app.get("/fetch-secret", async (req, res) => {
  axios
    .get("http://backend.railway.internal:3000/secret")
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      if (error.response) {
        console.log("Data:", error.response.data);
        console.log("Status:", error.response.status);
        console.log("Headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log("Request:", error.request);
        res.status(500).send("Error fetching secret!");
      } else {
        // Something happened in setting up the request that triggered an Error
        res.status(500).send("Error fetching secret!!!!");
        console.log("Error:", error.message);
      }
    });
});

app.get("/", async (req, res) => {
  res.send(`
        <h1>Secret Rotation Demo 2</h1>
        <button onclick="fetchSecret()">Get Secret</button>
        <div id="secretDisplay"></div>
        <script>
            async function fetchSecret() {
                try {
                    const response = await fetch('/fetch-secret');
                    console.log(response)
                    const data = await response.json();
                    document.getElementById('secretDisplay').textContent = data.secret;
                } catch (error) {
                    console.error('Error fetching secret:', error);
                }
            }
        </script>
    `);
});

app.listen(port, () => {
  console.log(`Railway public domain: ${process.env.RAILWAY_PUBLIC_DOMAIN}`);
  console.log(`Wassap`);
  console.log(`Commit from main`);
  console.log(`hiya`);
  console.log(`test again`);
  console.log(`Frontend server started on ::${port}`);
});

console.log("some change!");
