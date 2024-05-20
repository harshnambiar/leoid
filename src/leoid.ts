import { Leoid } from './types'; 


// generates Leo friendly unique IDs
// 
export function getLeoId(from: string, to: string, count: number): string {
    if ((from.length != 63) || (to.length != 63)){
        return 'improper sender or receiver';
    }
    if ((from.substring(0, 4) != 'aleo') || (to.substring(0, 4) != 'aleo')){
        return 'improper sender or receiver';
    }
    if ((count < 0) || (Math.floor(count) != count)){
        return 'improper count';
    }
    var now = Date.now().toString();
    while (now.length < 15){
        now = '0'.concat(now);
    }
    var count_str = count.toString();
    while (count_str.length < 6){
        count_str = '0'.concat(count_str);
    }
    const rand = getRandomInt(100, 999);

    var res = "";
    var i = 0;
    while (i < 17){
        var cd1 = from.charCodeAt(9 + i);
        var cd2 = to.charCodeAt(29 + i);
        var cd3 = from.charCodeAt(39 + i);
        var cd4 = to.charCodeAt(44 + i);
        var c = '';
        var c1 = 0;
        var c2 = 0;
        if ((cd1 + cd2) % 2 == 0){
            c1 = (cd1 + cd2)/2;
        }
        else {
            var toss = getRandomInt(0, 2);
            if (toss == 1){
                c1 = (cd1 + cd2 + 1)/2;
            }
            else {
                c1 = (cd1 + cd2 - 1)/2;
            }
        }
        if ((cd3 + cd4) % 2 == 0){
            c2 = (cd3 + cd4)/2;
        }
        else {
            var toss = getRandomInt(0, 2);
            if (toss == 1){
                c2 = (cd3 + cd4 + 1)/2;
            }
            else {
                c2 = (cd3 + cd4 - 1)/2;
            }
        }
        
        if ((c1 + c2) % 2 == 0){
            c = ((c1 + c2)/2).toString();
        }
        else {
            var toss = getRandomInt(0, 2);
            if (toss == 0){
                c = ((c1 + c2 - 1)/2).toString();
            }
            else {
                c = ((c1 + c2 + 1)/2).toString();
            }
        }
        while (c.length < 3){
            c = '0'.concat(c);
        }
        
        res = res.concat(c);
        i += 1;
    }
    res = res.concat(count_str);

    

    res = res.concat(now).concat(rand.toString());

    return res.concat('field');
}


function getRandomInt(min:number, max: number){
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
}
