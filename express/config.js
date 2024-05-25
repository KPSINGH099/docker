module.exports ={
    MONGO_IP:process.env.MONGO_IP || "mongo",
    MONGO_PORT:process.env.MONGO_PORT || 27017,
    //we can get below env from node-app services as well as from dockerfile
    MONGO_USER:process.env.MONGO_USER || "kishan",
    MONGO_PASSWORD:process.env.MONGO_PASSWORD || "kishan"
}