export function idGen(){
    return Math.random().toString(32).slice(2);
}

export function formatDate(date){
    return date? date.slice(0,10):'';
}

export function upperCase(str) {
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}
