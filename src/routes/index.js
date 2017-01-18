var express = require('express');
var router = express.Router();
var cradle = require('cradle');

//auth superlogin
if (process.env.NODE_ENV == 'production')
    var config = require('../config.production');
else
    var config = require('../config');

/*
var nano = require('nano')('http://mike:pass@localhost:3001');

var redflask = nano.use('redflask@test');

redflask.info(function(err,body){
    if(!err)
        console.log('Database info: ', body);
    else
        console.log('Database nano err: ', err);
    
})
*/

const db = new(cradle.Connection)(config.redflask.host, {
    cache: false,
    raw: true,
    auth: { username: 'mike', password: 'pass' }

}).database('redflask$test');


//run our setup
const setup = require('../setup/redflask_setup');

setup.createCouchViews(db);


//show our index
router.get('/', (req, res, next)=>{
    console.log("Loading index view");
    db.view('posts/indexView', (err, posts) => {
        if(err)
        {
            console.log('error loading posts: ', err);
            next();
        }
         
        console.log("Index Posts: ", posts.rows.map(row=>row.value));
        console.log("Index Posts: ", posts);


        res.render('index.njk', {
                title:  "MZLabs",
                posts: posts.rows.map(row=>row.value),
                count: posts.total_rows,
                offset: posts.offset 
        });  
        
    }) 
});//end of index

//show post
router.get('/post/*', (req,res)=>{
    console.log("req: ", req.url.substring(6)); //get url, trim '/post/'
    db.view('posts/indexView',{key:req.url.substring(6)}, (err, post) =>{
        if(err)
        {
            console.log('error loading posts: ', err);
            next();
        }
        console.log("POST: ", post.rows[0].value)
        var p = post.rows[0]['value'];
        res.render('post.njk', {
            title: p.title,
            post: p,
        })
        
        //res.send(post);
    })//end of db view
});//end of post

 


//setup our design docs

module.exports = router;