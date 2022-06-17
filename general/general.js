var cuid = require('cuid')

function getId(){
    var id = cuid.slug()
    return id
}

module.exports= {
    getId
}