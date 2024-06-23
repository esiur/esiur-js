
export default class Global
{
    static generateBytes(length){
        var rt = new Uint8Array(length);
        for (var i = 0; i < length; i++)
            rt[i] = Math.random() * 255;

        return rt;
    }

    static generateCode(length = 16) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let rt = "";

        for (var i = 0; i < length; i++)
            rt += chars[Math.round(Math.random() * chars.length)];

        return rt;
    }

}