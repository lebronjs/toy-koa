function compose(middlewares){
    const dispatch = (i)=>{
        let fn = middlewares[i]
        if(!fn){
            return Promise.resolve()
        }else{
            return Promise.resolve(
                fn(function next(){
                    return dispatch(i+1)
                })
            )
        }
    }
    return function(){
        return dispatch(0)
    }
}

async function fn1(next){
    console.log("fn1");
    await next()
    console.log("end fn1");
}
async function fn2(next){
    console.log("fn2");
    await new Promise((resolve, reject)=>{
        setTimeout(() => {
            console.log("after 5 seconds");
            resolve()
        }, 5000);
    })
    await next()
    console.log("end fn2");
}
async function fn3(next){
    console.log("fn3");
    await next()
    console.log("end fn3");
}
const finalFn = compose([fn1, fn2, fn3])
console.log(finalFn)
finalFn()
