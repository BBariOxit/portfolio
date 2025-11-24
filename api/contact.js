const nodemailer = require('nodemailer');
const querystring = require('querystring');

const {
    GMAIL_USER,
    GMAIL_PASS,
    CONTACT_TO_EMAIL = process.env.GMAIL_USER
} = process.env;

const transporter = GMAIL_USER && GMAIL_PASS
    ? nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: GMAIL_USER,
            pass: GMAIL_PASS
        }
    })
    : null;

function validate(body = {}) {
    const errors = {};

    const fullName = (body.fullName || '').toString().trim();
    const email = (body.email || '').toString().trim();
    const subject = (body.subject || '').toString().trim();
    const message = (body.message || '').toString().trim();

    if (!fullName) {
        errors.fullName = 'Vui lòng nhập họ và tên.';
    }

    if (!email) {
        errors.email = 'Vui lòng nhập email.';
    } else {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            errors.email = 'Email không hợp lệ.';
        }
    }

    if (!subject) {
        errors.subject = 'Vui lòng nhập tiêu đề.';
    }

    if (!message) {
        errors.message = 'Vui lòng nhập nội dung.';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        data: { fullName, email, subject, message },
        errors
    };
}

function coercePayload(payload) {
    if (!payload) return {};
    if (typeof payload === 'object' && !Buffer.isBuffer(payload)) {
        return payload;
    }

    const input = Buffer.isBuffer(payload) ? payload.toString('utf8') : `${payload}`;
    if (!input) return {};

    try {
        return JSON.parse(input);
    } catch (error) {
        return querystring.parse(input);
    }
}

async function parseRequestBody(req) {
    if (req.body) {
        return coercePayload(req.body);
    }

    const raw = await new Promise((resolve, reject) => {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => resolve(data));
        req.on('error', reject);
    });

    return coercePayload(raw);
}

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    let payload;
    try {
        payload = await parseRequestBody(req);
    } catch (error) {
        console.error('Failed to parse request body:', error);
        return res.status(400).json({ error: 'INVALID_PAYLOAD' });
    }

    const { isValid, data, errors } = validate(payload);
    if (!isValid) {
        return res.status(400).json({ error: 'INVALID_PAYLOAD', details: errors });
    }

    if (!transporter || !CONTACT_TO_EMAIL) {
        console.error('Missing email configuration. Please set GMAIL_USER, GMAIL_PASS, CONTACT_TO_EMAIL.');
        return res.status(500).json({ error: 'Email service is not configured.' });
    }

    try {
        await transporter.sendMail({
            from: `"Portfolio Contact" <${GMAIL_USER}>`,
            to: CONTACT_TO_EMAIL,
            replyTo: data.email,
            subject: `[Portfolio] ${data.subject} - ${data.fullName}`,
            text: [
                `Họ và tên: ${data.fullName}`,
                `Email: ${data.email}`,
                `Tiêu đề: ${data.subject}`,
                '---',
                data.message
            ].join('\n'),
            html: `
                <p><strong>Họ và tên:</strong> ${data.fullName}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Tiêu đề:</strong> ${data.subject}</p>
                <hr />
                <p>${data.message.replace(/\n/g, '<br>')}</p>
            `
        });

        return res.status(200).json({ message: 'Tin nhắn đã được gửi thành công.' });
    } catch (error) {
        console.error('Email sending failed:', error);
        return res.status(500).json({ error: 'Không thể gửi tin nhắn, vui lòng thử lại sau.' });
    }
};
