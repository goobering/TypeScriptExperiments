class EmailProvider {
    public host: string;
    public port: Number;
    public secure: boolean;
    public auth: {
        user: string,
        pass: string
    }

    constructor(host: string, port: Number, secure: boolean, auth: any) {
        this.host = host;
        this.port = port;
        this.secure = secure;
        this.auth = auth;
    }
}

export default EmailProvider;