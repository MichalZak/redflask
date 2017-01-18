

module.exports =  {
    createCouchViews(db){
        db.exists(function(err, exists){
            if(err)
                console.log("Redflask Setup, Error: "+err);
            else if(exists){
                
            }
            else {
                console.log('Redflask Setup, database does not exist.');
            }


            


            
        })

    },//end of createcouchViews
}