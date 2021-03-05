export function ext(...arg) {
    const _this = arg[0];
    if (_this instanceof Date) {
        return {
            format(fmt) {
                const o = {
                    'M+': _this.getMonth() + 1,
                    'd+': _this.getDate(),
                    'h+': _this.getHours(),
                    'm+': _this.getMinutes(),
                    's+': _this.getSeconds(),
                    'q+': Math.floor((_this.getMonth() + 3) / 3),
                    'S': _this.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (_this.getFullYear() + '').substr(4 - RegExp.$1.length));
                }
                for (const k in o) {
                    if (new RegExp('(' + k + ')').test(fmt)) {
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1)
                            ? (o[k])
                            : (('00' + o[k]).substr(('' + o[k]).length)));
                    }
                }
                return fmt;
            },
            getNextDate(nDays = 1) {
                return new Date(_this.getTime() + 24 * 60 * 60 * 1000 * nDays);
            },
            getMonth() {
                return _this.getMonth() + 1;
            },
        };
    }
    if (typeof _this === 'string') {
        return {
            contain(strArr) {
                for (let i = 0; i < strArr.length; i++) {
                    if (_this === strArr[i]) {
                        return true;
                    }
                }
                return false;
            },
            trimAll() {
                return _this.replace(new RegExp(' ', 'gm'), '');
            },
            replaceAll(searchValue, replaceValue) {
                return _this.replace(new RegExp(searchValue, 'gm'), replaceValue);
            },
        };
    }
    if (typeof _this === 'number') {
        return {
            divide: val => Math.floor(_this / val),
            floor: () => Math.floor(_this),
            ceil: () => Math.ceil(_this),
            abs: () => Math.abs(_this),
            round(count) {
                let n = 1;
                if (count > 0) {
                    n = count * 10;
                }
                else if (count < 0) {
                    n = 0.1 ** ext(count).abs();
                }
                return Math.round(_this * n) / n;
            },
            toDateFormat: fmt => ext(new Date(_this)).format(fmt),
            toCashString: () => String(_this).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            toChineseString() {
                const AA = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
                const BB = ['', '十', '百', '千', '万', '亿', '点', ''];
                const a = ('' + _this).replace(/(^0*)/g, '').split('.');
                let k = 0, re = '';
                for (let i = a[0].length - 1; i >= 0; i--) {
                    switch (k) {
                        case 0:
                            re = BB[7] + re;
                            break;
                        case 4:
                            if (!new RegExp('0{4}\\d{' + (a[0].length - i - 1) + '}$').test(a[0])) {
                                re = BB[4] + re;
                            }
                            break;
                        case 8:
                            re = BB[5] + re;
                            BB[7] = BB[5];
                            k = 0;
                            break;
                        default:
                            break;
                    }
                    if (k % 4 === 2 && a[0].charAt(i + 2) !== '0' && a[0].charAt(i + 1) === '0') {
                        re = AA[0] + re;
                    }
                    if (a[0].charAt(i) !== '0') {
                        re = AA[a[0].charAt(i)] + BB[k % 4] + re;
                    }
                    k++;
                }
                if (a.length > 1) { //加上小数部分(如果有小数部分)
                    re += BB[6];
                    for (let i = 0; i < a[1].length; i++) {
                        re += AA[a[1].charAt(i)];
                    }
                }
                return re;
            }
        };
    }
    if (Array.isArray(_this)) {
        return {
            insert(index, value) {
                _this.splice(index, 0, value);
            },
            removeIndex(index) {
                _this.splice(index, 1);
            },
            clear() {
                _this.splice(0, _this.length);
            },
            reset(...items) {
                _this.splice(0, _this.length, ...items);
            },
            removeValue(value, removeMany = false) {
                if (removeMany) {
                    for (let i = 0; i < _this.length; i++) {
                        if (_this[i] === value) {
                            _this.splice(i--, 1);
                        }
                    }
                }
                else {
                    for (let i = 0; i < _this.length; i++) {
                        if (_this[i] === value) {
                            _this.splice(i--, 1);
                            break;
                        }
                    }
                }
            },
            unique() {
                ext(_this).reset(...new Set(_this));
            },
            getUnique() {
                return [...new Set(_this)];
            },
            equal(array) {
                if (_this.length !== array.length) {
                    return false;
                }
                for (let i = 0; i < _this.length; i++) {
                    if (_this[i] !== array[i]) {
                        return false;
                    }
                }
                return true;
            },
            findItem(propName, propValue) {
                for (let i = 0; i < _this.length; i++) {
                    const item = _this[i];
                    if (item[propName] === propValue) {
                        return item;
                    }
                }
                return null;
            },
            findItems(propName, propValue) {
                const result = [];
                for (let i = 0; i < _this.length; i++) {
                    const item = _this[i];
                    if (item[propName] === propValue) {
                        result.push(item);
                    }
                }
                return result;
            },
            propToArr: propName => _this.map(item => item[propName]),
            last: () => (_this)[_this.length - 1],
        };
    }
}
