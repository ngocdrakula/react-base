export const getBase64 = async (file, callback) => {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            const file_data = reader.result.toString().split(';base64,')[1];
            if (typeof callback === "function") callback({ id: "", file_name: file.name, file_data })
            return (resolve({ id: "", file_name: file.name, file_data }))
        };
        reader.onerror = function (error) {
            if (typeof callback === "function") callback()
            return (reject(error))
        };
    })
}
export const getBase46Multi = async (files, callback) => {
    return new Promise(async (resolve, reject) => {
        try {
            const base64s = [];
            for (let file of files) {
                const base64 = await getBase64(file);
                base64s.push(base64);
            }
            if (typeof callback === "function") callback(base64s)
            return (resolve(base64s))
        }
        catch (err) {
            if (typeof callback === "function") callback()
            return (reject(err))
        }
    });
}

export const weekday = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

export const getTime = (timeString) => {
    const now = new Date();
    const nY = now.getFullYear();
    const nM = now.getMonth();
    const nD = now.getDate();
    const nH = now.getHours();
    const nP = now.getMinutes();
    const time = new Date(timeString);
    const tY = time.getFullYear();
    const tM = time.getMonth();
    const tD = time.getDate();
    const tDay = time.getDay();
    const tH = time.getHours();
    const tP = time.getMinutes();
    const tS = time.getSeconds();
    const At = [];
    if (nY > tY) {
        At[0] = `${tD < 10 ? "0" + tD : tD} tháng ${(tM + 1) < 10 ? "0" + (tM + 1) : (tM + 1)} năm ${tY}`;
    }
    else {
        if (nM > tM) {
            At[0] = `${tD < 10 ? "0" + tD : tD} tháng ${(tM + 1) < 10 ? "0" + (tM + 1) : (tM + 1)}`;
        }
        else {
            if (nD > tD + 6) {
                At[0] = `${tD < 10 ? "0" + tD : tD} tháng ${(tM + 1) < 10 ? "0" + (tM + 1) : (tM + 1)} lúc ${tH < 10 ? "0" + tH : tH}:${tP < 10 ? "0" + tP : tP}`;
            }
            else {
                if (nD > tD + 1) {
                    At[0] = `${weekday[tDay]}`;
                }
                else {
                    if (nD > tD) {
                        At[0] = `Hôm qua`;
                    }
                    else {
                        if (nH > tH) {
                            At[0] = `${nH - tH} giờ`;
                        }
                        else {
                            if (nP > tP) {
                                At[0] = `${nP - tP} phút`;
                            }
                            else {
                                At[0] = `Vừa xong`;
                            }
                        }
                    }
                }
            }
        }
    }
    let thickness = (Date.parse(now) - Date.parse(time)) / 1000;
    if (thickness < 60) {
        At[1] = 'Vừa xong';
    }
    else {
        thickness = thickness / 60;
        if (thickness < 60) {
            At[1] = Math.floor(thickness) + ' phút trước';
        }
        else {
            thickness = thickness / 60;
            if (thickness < 24) {
                At[1] = Math.floor(thickness) + ' giờ trước';
            }
            else {
                thickness = thickness / 24;
                if (thickness < 30) {
                    At[1] = Math.floor(thickness) + ' ngày trước';
                }
                else {
                    thickness = thickness / 30;
                    if (thickness < 12) {
                        At[1] = Math.floor(thickness) + ' tháng trước';
                    }
                    else {
                        thickness = thickness * 30 / 365;
                        At[1] = Math.floor(thickness) + ' năm trước';
                    }
                }
            }
        }
    }
    At[2] = `${weekday[tDay]}, ${tD < 10 ? "0" + tD : tD} tháng ${(tM + 1) < 10 ? "0" + (tM + 1) : tM + 1} năm ${tY} lúc ${tH < 10 ? "0" + tH : tH}:${tP < 10 ? "0" + tP : tP}:${tS < 10 ? "0" + tS : tS}`
    At[3] = `${tH < 10 ? "0" + tH : tH}:${tP < 10 ? "0" + tP : tP}${((tD - nD) || (tM - nM) || (tY - nY)) ? ", " + (tD < 10 ? "0" + tD : tD) + "/" + ((tM + 1) < 10 ? "0" + (tM + 1) : (tM + 1)) : ""}${(tY - nY) ? "/" + tY : ""}`;
    At[4] = {
        Year: tY,
        Month: (tM + 1) < 10 ? "0" + (tM + 1) : tM + 1,
        Day: tD < 10 ? "0" + tD : tD,
        Hour: tH < 10 ? "0" + tH : tH,
        Minute: tP < 10 ? "0" + tP : tP,
        Second: tS < 10 ? "0" + tS : tS,
        Week: weekday[tDay]
    }
    return (At);
}
export const formatTime = (timeString, format) => {
    if (timeString) {
        const timeObject = getTime(timeString)[4];
        let newTimeString = format.replace(/YYYY/g, timeObject.Year);
        newTimeString = newTimeString.replace(/YY/g, timeObject.Year % 100);
        newTimeString = newTimeString.replace(/MM/g, timeObject.Month);
        newTimeString = newTimeString.replace(/DD/g, timeObject.Day);
        newTimeString = newTimeString.replace(/HH/g, timeObject.Hour);
        newTimeString = newTimeString.replace(/II/g, timeObject.Minute);
        newTimeString = newTimeString.replace(/SS/g, timeObject.Second);
        newTimeString = newTimeString.replace(/Week/g, timeObject.Week);
        return (newTimeString)
    }
    else {
        return ("");
    }
}

export const converFormatTime = (originString, originFormat, newFormat) => {
    if (originString) {
        const date = new Date();
        if (originFormat.search("YYYY") + 1) date.setFullYear(originString.slice(originFormat.search("YYYY"), originFormat.search("YY") + 4));
        else if (originFormat.search("YY") + 1) date.setFullYear(date.getFullYear().toString().slice(2, 2) + originString.slice(originFormat.search("YY"), originFormat.search("YY") + 2));
        if (originFormat.search("MM") + 1) date.setMonth(Number(originString.slice(originFormat.search("MM"), originFormat.search("MM") + 2)) - 1);
        if (originFormat.search("DD") + 1) date.setDate(Number(originString.slice(originFormat.search("DD"), originFormat.search("DD") + 2)));
        if (originFormat.search("HH") + 1) date.setHours(Number(originString.slice(originFormat.search("HH"), originFormat.search("HH") + 2)));
        if (originFormat.search("II") + 1) date.setMinutes(Number(originString.slice(originFormat.search("II"), originFormat.search("II") + 2)));
        if (originFormat.search("SS") + 1) date.setMinutes(Number(originString.slice(originFormat.search("SS"), originFormat.search("SS") + 2)));
        return (formatTime(date.toString(), newFormat));
    }
    else {
        return ("");
    }
}
export const formatPrice = (string, checkLastDot) => {
    if (!string) return string;
    string = string.toString();
    const strings = string.split('.');
    const strings2 = [];
    if (strings[0]) {
        strings[0] = strings[0].split('').filter(s => (s >= 0 && s !== " "));
        strings[0] = (Number(strings[0].join('')).toString().split(''));
        const length = strings[0].length;
        strings2.push(strings[0].map((s, i) => s + (((length - 1 - i) && (length - 1 - i) % 3 === 0) ? " " : "")).join(''));
    }
    if (strings[1] !== undefined) {
        strings2.push(strings[1].split('').filter(s => (s >= 0 && s !== " ")).join(''));
    }
    if (checkLastDot) {
        if (strings2[1]) return (strings2[0] + "." + strings2[1]);
        return (strings2[0]);
    };
    return (strings2.join('.'))
}
export const formatBankNumber = (string) => {
    if (!string) return string;
    string = string.toString();
    const strings = string.split('').filter(s => (s >= 0 && s !== " "));
    const length = strings.length;
    return (strings.map((s, i) => s + (((length - 1 - i) && (length - 1 - i) % 3 === 0) ? "  " : "")).join(''));
}
export const getNumber = (string) => {
    if (!string) return string;
    string = string.toString();
    const strings = string.split('.');
    const strings2 = [];
    if (strings[0]) {
        strings2.push(strings[0].split('').filter(s => (s >= 0 && s !== " ")).join(''));
    }
    if (strings[1] !== undefined) {
        strings2.push(strings[1].split('').filter(s => (s >= 0 && s !== " ")).join(''));
    }
    return (Number(strings2.join('.')))
}
export const regex = {
    phoneNumber: /^0[0-9]{8,10}$/,
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}
export const getFileOrigin = (filename) => {
    if (!filename) return filename;
    const arr = filename.split('.');
    return (arr[arr.length - 1]?.toLowerCase());
}

export const nonAccentVietnamese = (str) => {
    if (!str) return (str);
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
    str = str.replace(/\u02C6|\u0306|\u031B/g, "");
    return str;
}