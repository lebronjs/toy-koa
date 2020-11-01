module.exports = {
    get url(){
        return this.request.url
    },
    get method(){
        return this.request.method
    },
    get body(){
        return this.response.body
    },
    set body(val){
        this.response.body = val
    },
    get status(){
        return this.response.status
    },
    set status(val){
        this.response.status = val
    }
}