/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2018-10-08 20:09:40
 * @modify date 2018-10-08 20:09:40
 * @desc [description] 一个webpack loader，用于将代码中的动态import替换为静态import
*/
module.exports = function(source) {
    // 首先匹配///写法，import要写在///之后
    const regTripleDiagonal = /[\r\n\s]*\/{3}.+[\r\n\s]*/g;
    let insertIndex = 0;
    let res;
    while(res = regTripleDiagonal.exec(source))
    {
        if(res.index !== insertIndex) break;
        insertIndex = regTripleDiagonal.lastIndex;
    }
    // 匹配动态import
    const regDynamicImport = /await import\(([^\)]+)\)/g;
    const nameDict = {};
    let lastIndex = insertIndex;
    let curCount = 0;
    let dist = source.substring(0, insertIndex);
    let result;
    while(result = regDynamicImport.exec(source))
    {
        // 取缓存的名字
        let modName = nameDict[result[1]];
        if(!modName)
        {
            // 如果没有缓存则声明新的变量名
            nameDict[result[1]] = modName = `__DYNAMIC_2_STATIC_MODULE_${curCount ++}__`;
            // 在头部添加静态import
            dist = `${dist.substring(0, insertIndex)}import * as ${modName} from ${result[1]};\n${dist.substr(insertIndex)}`;
        }
        // 追加位置前的内容
        dist += source.substring(lastIndex, result.index);
        // 将import替换成变量名
        dist += modName;
        // 记录最后位置
        lastIndex = result.index + result[0].length;
    }
    // 追加剩余字符串
    dist += source.substr(lastIndex);
    // 返回结果字符串
    return dist;
};