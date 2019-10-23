function fn() {
    try{
        // console.log(a);
        if(1===1)
            throw  "123"
    }
    catch (err){
        console.log(err);
    }
    finally {
        console.log(2222222)
    }
    console.log(111111111)
}
fn();