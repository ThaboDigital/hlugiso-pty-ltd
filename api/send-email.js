export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return res.status(500).json({ error: 'RESEND_API_KEY is not configured on the server environment.' });
  }

  const defaultFrom = 'HLUGISO (Pty) Ltd <info@thabosystems.co.za>';
  const defaultReplyTo = 'info@hlugiso.co.za';

  try {
    const { to, subject, html, text, fromName, replyTo } = req.body || {};

    if (!to || !subject) {
      return res.status(400).json({ error: 'Missing required fields: to, subject.' });
    }

    const recipients = Array.isArray(to) ? to : [to];
    const fromAddress = fromName 
      ? `${fromName} <info@thabosystems.co.za>` 
      : defaultFrom;

    // Call Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromAddress,
        to: recipients,
        reply_to: replyTo || defaultReplyTo,
        subject: subject,
        html: html || undefined,
        text: text || undefined
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.message || data.error || 'Failed to send email via Resend',
        details: data
      });
    }

    return res.status(200).json({
      success: true,
      id: data.id,
      recipient: recipients[0],
      provider: 'resend',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Internal server error dispatching email'
    });
  }
}
