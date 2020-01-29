function unionList(a,b){
    var D = {};
    var resultList = [];
    for (var i = 0; i < a.length; i++) {
        D[a[i]]= true;
    }
    for (var i = 0; i < b.length; i++) {
        if(!D[b[i]]){
            D[b[i]] = true;
        }
    }
    var index = 0;
    for (var i = index; i < a.length; i++) {
        if(D[a[i]]){
            resultList.push(a[i]);
        }
    }
    for (var i = index; i < (a.length+b.length); i++) {
        if(D[b[i-a.length]]){
            resultList.push(b[i-a.length]);
        }
    }
    return resultList;
}

function intersectList(a,b){
    var D = {};
    var resultList = [];
    for (var i = 0; i < a.length; i++) {
        D[a[i]]= true;
    }
    for (var i = 0; i < b.length; i++) {
        if(D[b[i]]){
            resultList.push(b[i]);
        }
    }
    return resultList;
}

function substractListBFromA(a,b){
    var D = {};
    var resultList = [];
    for (var i = 0; i < a.length; i++) {
        D[a[i]]= true;
    }
    for (var i = 0; i < b.length; i++) {
        D[b[i]] = false;
    }
    for (var i = 0; i < a.length; i++) {
        if(D[a[i]]){
            resultList.push(a[i]);
        }
    }
    return resultList;
}


