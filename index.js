const express=require('express');
const passport = require('passport');
const session = require('express-session');
require('./auth');

const app = express();
app.use(session({
    secret: 'a2d41234a2d4',
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/',(req,res)=>{
    res.send('<a href="/auth/google">Authenticate with google</a>')
})

app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));
app.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: '/admin',
    failureRedirect: '/'
}));

app.get('/admin', (req, res) => {
    if (req.user) {
        res.status(200).send(`Hello Admin, ${req.user.displayName}`);
    } else {
        res.status(401).send('Unauthorized');
    }
});

const PORT=5000;
app.listen(PORT,()=>{
    console.log("PORT ",PORT);
})
