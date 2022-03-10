function createCookie(nombre, valor = "", días = 30) {
    valor = escape(valor)
    var ahora = new Date();
    let ms = ahora.getTime() + días * 24 * 3600 * 1000;
    ahora.setTime(ms);
    let creación = nombre + "=" + valor + "; ";
    let expiración = "expires=" + ahora.toUTCString();
    document.cookie = creación + expiración + ";" + "path=/";
    return unescape(valor)
}

function cookie(nombre) {
    let cookies = document.cookie
    let cookieArr = cookies.split("; ")
    for (let i in cookieArr) {
        elemento = cookieArr[i].split("=")
        if (elemento[0] == nombre) {
            let v = elemento[1]
            switch (v) {
                case "null":
                    return null
                case "undefined":
                    return undefined
                case "true":
                    return true
                case "false":
                    return false
            }
            n = Number(v)
            if (!isNaN(n)) {
                return n
            }
            v = unescape(v)
            return v
        }
    }
    return null
}