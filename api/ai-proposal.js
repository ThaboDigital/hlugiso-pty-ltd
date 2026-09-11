const HLUGISO_SYSTEM_PROMPT = `
You are the Executive Procurement & Proposal AI Assistant for HLUGISO (PTY) LTD, an established South African infrastructure, event logistics, and civil contracting company headquartered in Tzaneen, Limpopo.

COMPANY STATUTORY CREDENTIALS:
- Official Name: HLUGISO (PTY) LTD
- CIPC Registration: 2019 / 412705 / 07
- National Treasury CSD Supplier No: MAAA0818606 (Verified & Tax Compliant)
- CIDB Contractor Grading: Grade 1CE (Civil Engineering, CRS: 11116631)
- SARS Tax Compliance PIN: Active (9250830230)
- B-BBEE Rating: Level 1 Contributor (135% Procurement Recognition, 100% Black Owned EME)
- Managing Director: Thabo Makola
- Direct Contact / WhatsApp: +27 83 597 6462 | Email: info@hlugiso.co.za
- Physical Operating Base: Stand No 01, Tickyline Village, Lenyenye, Tzaneen, Limpopo, 0850
- Official Website: www.hlugiso.co.za

CORE OPERATIONAL CAPABILITIES:
1. Funeral & Memorial Infrastructure: Turnkey marquees, stretch tents, executive draping, VIP family seating, ceremonial walkways.
2. Executive VIP Mobile Sanitation: Luxury flush restroom trailers with porcelain bowls, running water basins, mirrors, and solar illumination.
3. Mobile Cold-Chain: Temperature-controlled cold room trailers (-2°C to +4°C) with dual-power 220V grid and silent backup diesel generators.
4. Audio-Visual & Sound Reinforcement: High-output PA systems, roving wireless microphones, and silent backup power generators.
5. Ceremonial Livestock Supply: Pasture-reared cattle, goats, and sheep sourced directly from Limpopo farms with veterinary clearance and humane transit trailers.
6. Civil Engineering & Contracting (CIDB 1CE): Earthworks, trenching, stormwater, bush clearing, road maintenance, and 30% local subcontractor participation.

TONE AND STANDARDS:
- Authoritative, professional, respectful, and compliant with South African commercial and municipal procurement standards (PPPFA 2022 specific goals, SBD forms, SCM regulations).
- Maintain statutory accuracy (never alter or invent CSD, CIDB, or Tax PIN numbers).
`;

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

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OPENAI_API_KEY is not configured on the server environment.' });
  }

  try {
    const { mode, prompt, currentText } = req.body || {};

    if (!prompt) {
      return res.status(400).json({ error: 'Missing required prompt or instruction.' });
    }

    let userMessageContent = '';
    if (mode === 'polish') {
      userMessageContent = `Here is the current draft of an email / proposal for HLUGISO (Pty) Ltd:

--- CURRENT DRAFT START ---
${currentText || ''}
--- CURRENT DRAFT END ---

USER CUSTOMIZATION INSTRUCTION:
"${prompt}"

Please rewrite or polish this text according to the user's instructions while preserving HLUGISO's statutory credentials, executive tone, and complete accuracy. Return ONLY the refined email / letter text.`;
    } else {
      userMessageContent = `Please draft a complete, compelling commercial proposal or tender cover letter for HLUGISO (Pty) Ltd based on the following specific requirements or tender notice:

SPECIFICATION / REQUEST:
"${prompt}"

Include all applicable statutory details (CSD MAAA0818606, CIDB Grade 1CE, SARS PIN 9250830230, Level 1 B-BBEE), localized Tzaneen advantages, equipment fleet specifications, and executive signature by Managing Director Thabo Makola. Format clearly with Subject line, Dear Sir/Madam, structured sections, and closing.`;
    }

    const openAiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: HLUGISO_SYSTEM_PROMPT },
          { role: 'user', content: userMessageContent }
        ],
        temperature: 0.7,
        max_tokens: 1500
      })
    });

    const data = await openAiResponse.json();

    if (!openAiResponse.ok) {
      return res.status(openAiResponse.status).json({
        error: data.error?.message || 'OpenAI API request failed'
      });
    }

    const result = data.choices?.[0]?.message?.content?.trim();

    return res.status(200).json({
      success: true,
      result,
      model: 'gpt-4o-mini'
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Internal server error processing AI proposal'
    });
  }
}
