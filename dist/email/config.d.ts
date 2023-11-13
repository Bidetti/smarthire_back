interface EmailOptions {
    to: string;
    subject: string;
    template: string;
    context: any;
}
export declare const sendEmail: (options: EmailOptions) => Promise<false | undefined>;
export {};
