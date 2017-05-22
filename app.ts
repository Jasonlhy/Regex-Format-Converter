import * as _ from "lodash";

export class PerlToBasic {
    private characters = {
        '?': '\\?',
        '+': '\\+',
        '{': '\\{',
        '(': '\\(',
        ')': '\\)'
    }

    public convert(perlRegexText: string) {
        var regexStr = '[' + _.reduce(this.characters, (sum, value, key) => sum + key, '') + ']';
        var regex = new RegExp(regexStr, 'g');
        return perlRegexText.replace(regex, (matched) => this.characters[matched]);
    }

    public revert(basicRegexText: string) {
        // reverses the left, right only ...
        var revertChar: {} = _.transform(this.characters
            , (sum: {}, value: string, key: string) => sum[value] = key
            , {});

        let regexStr: string = _.reduce(revertChar
            , (sum: string, value: string, key: string) =>
                (!sum) ? (_.escapeRegExp(key)) : (sum + "|" + _.escapeRegExp(key))
            , '');

        var regObj = new RegExp(regexStr, "g");
        return basicRegexText.replace(regObj, (matched) => revertChar[matched]);
    }
}

// let p = new PerlToBasic();
// console.log("convert: " + p.convert("aaa+?"));
// console.log("revert: " + p.revert("aaa\\+\\?"));