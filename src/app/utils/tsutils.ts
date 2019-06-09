export class JsonUtils {
    static cloneObj(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    static formatDate(date: Date) {
        // return date.toISOString().split('T')[0];
        return date.toISOString();
    }
}
