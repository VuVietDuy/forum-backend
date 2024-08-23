class Response {
    constructor(status, message, data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    static success(message, data) {
        return new Response(200, message, data);
    }

    static error(message, data) {
        return new Response(500, message, data);
    }
}