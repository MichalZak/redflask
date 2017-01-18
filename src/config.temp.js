module.exports = {
    security: {
        loginOnRegistration:true,
        sessionLife: 60*60*24*30, //30 days
    },
  

    dbServer: {
        protocol: 'http://',
        host: 'curl http://127.0.0.1:5984',
        user: 'mike',
        password: 'pass',
        userDB: 'sl-users',
        couchAuthDB: '_users'
    },

    redflask: {
        host: 'http://localhost:3001',
        db: 'redflask$test',
    },

    userDBs: {
        defaultDBs: {
            private: ['redflask']
        }
    },

    mailer: {
        fromEmail: 'gmail.user@gmail.com',
        options: {
            service: 'Gmail',
            auth: {
                user: 'gmail.user@gmail.com',
                pass: 'userpass'
            }
        }
    },

  
};