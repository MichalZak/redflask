module.exports = {

  apps : [

    // First application
    {
      name      : "Redflask",
      script    : "system.js",
      env: {
        NODE_ENV: "production"
      },
      env_production : {
        NODE_ENV: "production"
      }
    },
  ],

}


