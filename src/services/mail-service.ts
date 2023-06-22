import 'dotenv/config';
import nodemailer from 'nodemailer';

class MailService {
	private transporter: nodemailer.Transporter;

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT as unknown as number,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		});
	}
	async sendActivationMail(to: string, link: string) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to: to,
			subject: 'Account activation ' + process.env.API_URL,
			text: '',
			html: `
				<div>
					<h1>Click on the link to activate your account</h1>
					<a href='${link}'>${link}</a>
				</div>
			`,
		});
	}
}

export default new MailService();
