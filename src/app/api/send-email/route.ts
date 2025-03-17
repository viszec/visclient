import { NextResponse } from 'next/server';

import nodemailer from 'nodemailer';

// Plain text notification template without HTML
const NOTIFICATION_TEMPLATE = `
Name: {{name}}
Email: {{email}}
Budget: {{budget}}

Message:
{{message}}

------------
This message was sent from your website contact form.
`;

// Plain text auto-reply template without HTML - improved to reduce spam likelihood
const AUTO_REPLY_TEMPLATE = `
Dear {{name}},

Thank you for contacting me through my website. I've received your message and will review it shortly.

I typically respond within 1-2 business days. If you have an urgent matter, please let me know.

Looking forward to our potential collaboration!


Best regards,

Mavis Ma
www.mavism.me
`;

export async function POST(request: Request) {
  try {
    const { name, email, message, budget } = await request.json();
    console.log('Form data received:', { name, email, message, budget });

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Convert budget code to readable text
    const getBudgetText = (budgetCode: string) => {
      switch (budgetCode) {
        case 'small':
          return '$1,000 - $5,000';
        case 'medium':
          return '$5,000 - $10,000';
        case 'large':
          return '$10,000+';
        default:
          return 'Not specified';
      }
    };

    const budgetText = getBudgetText(budget);
    console.log('Budget text:', budgetText);

    try {
      // Replace placeholders in templates
      const notificationText = NOTIFICATION_TEMPLATE.replace(/{{name}}/g, name)
        .replace(/{{email}}/g, email)
        .replace(/{{budget}}/g, budgetText)
        .replace(/{{message}}/g, message);

      const autoReplyText = AUTO_REPLY_TEMPLATE.replace(/{{name}}/g, name);

      console.log('Templates prepared with placeholders replaced');

      // Check email configuration
      const emailHost = process.env.EMAIL_HOST || 'smtp.gmail.com';
      const emailPort = Number(process.env.EMAIL_PORT) || 587;
      const emailSecure = process.env.EMAIL_SECURE === 'true';
      const emailUser = process.env.EMAIL_USER || 'imavisma@gmail.com';
      const emailPassword = process.env.EMAIL_PASSWORD;

      console.log('Email configuration:', {
        host: emailHost,
        port: emailPort,
        secure: emailSecure,
        user: emailUser,
        passwordProvided: !!emailPassword,
      });

      if (!emailPassword) {
        console.error('EMAIL_PASSWORD environment variable is not set!');
      }

      // Create a transporter
      const transporter = nodemailer.createTransport({
        host: emailHost,
        port: emailPort,
        secure: emailSecure,
        auth: {
          user: emailUser,
          pass: emailPassword,
        },
        // Add DKIM if available
        ...(process.env.DKIM_PRIVATE_KEY && process.env.DKIM_KEY_SELECTOR
          ? {
              dkim: {
                domainName: emailUser.split('@')[1],
                keySelector: process.env.DKIM_KEY_SELECTOR,
                privateKey: process.env.DKIM_PRIVATE_KEY,
              },
            }
          : {}),
      });

      console.log('Transporter created');

      // Email content for notification to website owner - plain text only
      const notificationMailOptions = {
        from: {
          name: 'Mavis Website',
          address: emailUser,
        },
        to: 'imavisma@gmail.com',
        replyTo: email,
        subject: `✨[New!] Project Inquiry from ${name}`,
        text: notificationText,
        headers: {
          'Content-Type': 'text/plain; charset=UTF-8',
          'X-Mailer': 'Mavis Website Contact Form',
          'List-Unsubscribe': `<mailto:${emailUser}?subject=unsubscribe>`,
        },
      };

      // Auto-reply email content for the sender - plain text only with anti-spam measures
      const autoReplyMailOptions = {
        from: {
          name: 'Mavis Ma',
          address: emailUser,
        },
        to: email,
        subject: `Thank you for your message, ${name}`,
        text: autoReplyText,
        headers: {
          'Content-Type': 'text/plain; charset=UTF-8',
          'X-Mailer': 'Mavis Website Contact Form',
          Precedence: 'bulk',
          'Auto-Submitted': 'auto-replied',
          'X-Auto-Response-Suppress': 'OOF, AutoReply',
          'List-Unsubscribe': `<mailto:${emailUser}?subject=unsubscribe>`,
        },
      };

      console.log('Mail options prepared, sending emails...');

      // Send notification email to website owner
      console.log('Sending notification email to website owner...');
      const notificationResult = await transporter.sendMail(notificationMailOptions);
      console.log('Notification email sent:', notificationResult.response);

      // Send auto-reply to the sender
      console.log('Sending auto-reply email to:', email);
      const autoReplyResult = await transporter.sendMail(autoReplyMailOptions);
      console.log('Auto-reply email sent:', autoReplyResult.response);

      return NextResponse.json({
        message: 'Email sent successfully',
        notification: notificationResult.response,
        autoReply: autoReplyResult.response,
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      throw emailError;
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      {
        message: 'Failed to send email',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
