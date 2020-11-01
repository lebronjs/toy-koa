module.exports = {
    get body(){
        return this._body
    },
    set body(val){
        this._body = val
    },
    get status(){
        return this.res.statusCode
    },
    set status(val){
        return this.res.statusCode = val
    }
}