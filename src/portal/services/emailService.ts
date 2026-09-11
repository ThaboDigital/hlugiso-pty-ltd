export interface SendEmailPayload {
  to: string;
  subject: string;
  bodyText: string;
  fromName?: string;
  replyTo?: string;
}

export interface SendEmailResult {
  success: boolean;
  id?: string;
  error?: string;
}

export const formatEmailAsHtml = (text: string, subject: string): string => {
  // Convert newlines to paragraphs / breaks and highlight key markers
  const formattedBody = text
    .split('\n\n')
    .map(para => {
      const trimmed = para.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('PROPOSED GOODS & SERVICES:') || 
          trimmed.startsWith('ATTACHED SUPPORTING COMPLIANCE DOCUMENTS:') ||
          trimmed.startsWith('KEY SERVICE LEVEL COMMITMENTS') ||
          trimmed.startsWith('COMMERCIAL BENEFIT') ||
          trimmed.startsWith('STATUTORY REGULARITY') ||
          trimmed.startsWith('QUOTATION SUMMARY:') ||
          trimmed.startsWith('CONFIRMATION & PAYMENT TERMS:') ||
          trimmed.startsWith('OFFICIAL BANKING DETAILS') ||
          trimmed.startsWith('OUR OPERATIONAL CIVIL') ||
          trimmed.startsWith('EMERGENCY DISPATCH FLEET')) {
        return `<div style="background-color: #F0FDF4; border-left: 4px solid #064E3B; padding: 14px 18px; margin: 18px 0; border-radius: 0 8px 8px 0;">
          <strong style="color: #064E3B; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">${trimmed.split('\n')[0]}</strong>
          <div style="margin-top: 8px; color: #374151; font-size: 13px; line-height: 1.6;">
            ${trimmed.split('\n').slice(1).map(l => `<div>${l}</div>`).join('')}
          </div>
        </div>`;
      }
      return `<p style="margin: 0 0 14px 0; color: #374151; font-size: 13.5px; line-height: 1.65;">${trimmed.replace(/\n/g, '<br/>')}</p>`;
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${subject}</title>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #F3F4F6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 660px; margin: 0 auto; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #E5E7EB;">
    <!-- Header -->
    <tr>
      <td style="background-color: #064E3B; padding: 28px 32px; text-align: left;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td>
              <div style="color: #FFFFFF; font-size: 20px; font-weight: 900; letter-spacing: -0.5px;">HLUGISO (PTY) LTD</div>
              <div style="color: #A7F3D0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px;">Tender-Ready &bull; Funeral &bull; Civils &bull; Fleet Hire</div>
            </td>
            <td align="right" style="vertical-align: middle;">
              <span style="background-color: rgba(255,255,255,0.15); color: #FFFFFF; font-size: 10px; font-weight: 800; padding: 5px 10px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.5px; border: 1px solid rgba(255,255,255,0.2);">
                Level 1 B-BBEE
              </span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 32px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        ${formattedBody}
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #111827; padding: 24px 32px; text-align: center; border-top: 3px solid #064E3B;">
        <div style="color: #E5E7EB; font-size: 11px; font-weight: 700; letter-spacing: 0.5px;">
          HLUGISO (PTY) LTD &bull; Reg No: 2019/412705/07 &bull; CSD: MAAA0818606
        </div>
        <div style="color: #9CA3AF; font-size: 10px; margin-top: 4px;">
          CIDB Grade 1CE (CRS: 11116631) &bull; SARS Tax PIN: 9250830230 &bull; 100% Black Owned EME
        </div>
        <div style="color: #6B7280; font-size: 10px; margin-top: 8px;">
          Stand No 01, Tickyline Village, Lenyenye, Tzaneen, Limpopo, 0850 &bull; <a href="https://www.hlugiso.co.za" style="color: #34D399; text-decoration: none;">www.hlugiso.co.za</a>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

export async function sendEmailViaResend(payload: SendEmailPayload): Promise<SendEmailResult> {
  const { to, subject, bodyText, fromName, replyTo } = payload;

  if (!to || !to.includes('@')) {
    return { success: false, error: 'Please enter a valid recipient email address.' };
  }

  const html = formatEmailAsHtml(bodyText, subject);

  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        subject,
        html,
        text: bodyText,
        fromName: fromName || 'HLUGISO (Pty) Ltd',
        replyTo: replyTo || 'info@hlugiso.co.za'
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || data.message || `Failed with status ${response.status}`
      };
    }

    return {
      success: true,
      id: data.id
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Network error communicating with email server'
    };
  }
}
