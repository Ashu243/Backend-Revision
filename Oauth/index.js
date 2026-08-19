const express = require("express");
require("dotenv").config();
const app = express()


app.get('/', (req, res)=>{
    res.send('welcome to Oauth')
})

app.get('/auth/google', (req, res)=>{
    try {
        // open google authentication page and receives a temporary code at redirect url
        const GoogleAuthURL = "https://accounts.google.com/o/oauth2/v2/auth?" +
            new URLSearchParams({
                client_id: process.env.GOOGLE_CLIENT_ID,
                redirect_uri: process.env.GOOGLE_REDIRECT_URI,
                response_type: "code",
                scope: "openid email profile"
            });
        console.log(GoogleAuthURL)

        // redirect to the google authentication page
        res.redirect(GoogleAuthURL)
    } catch (error) {
        return res.json({error})
    }

})
app.get('/auth/google/callback', async(req, res)=>{
try {
        const {code} = req.query
        // we send a code received from the google and client secret
    
        const response = await fetch(
            "https://oauth2.googleapis.com/token",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    code: code,
                    client_id: process.env.GOOGLE_CLIENT_ID,
                    client_secret: process.env.GOOGLE_SECRET,
                    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
                    grant_type: "authorization_code"
                })
                })
        const data = await response.json()
        console.log(data)
        res.send(data)
} catch (error) {
    res.send(error)
}
})

app.listen(8000, ()=>{
    console.log('Server is listening on port - http://localhost:8000')
})