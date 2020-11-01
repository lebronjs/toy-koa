module.exports = {
    get body(){
        return this._body
    },
    set body(val){
        this._body = val
    },
    get status(){
        return this.res.status
    },
    set status(val){
        return this.res.status = val
    }
}