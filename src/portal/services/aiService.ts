import { COMPANY_DETAILS } from '../../data/companyData';

const OPENAI_STORAGE_KEY = 'hlugiso_openai_api_key';

export const getStoredOpenAIKey = (): string => {
  return localStorage.getItem(OPENAI_STORAGE_KEY) || '';
};

export const setStoredOpenAIKey = (key: string): void => {
  if (!key.trim()) {
    localStorage.removeItem(OPENAI_STORAGE_KEY);
  } else {
    localStorage.setItem(OPENAI_STORAGE_KEY, key.trim());
  }
};

const HLUGISO_SYSTEM_PROMPT = `
You are the Executive Procurement & Proposal AI Assistant for HLUGISO (PTY) LTD, a leading South African infrastructure, event logistics, and civil contracting firm based in Tzaneen, Limpopo.

COMPANY PROFILE & STATUTORY CREDENTIALS:
- Official Name: HLUGISO (PTY) LTD
- Registration Number: 2019 / 412705 / 07
- Central Supplier Database (CSD): MAAA0818606 (Tax Compliant)
- CIDB Contractor Grading: Grade 1CE (Civil Engineering, CRS: 11116631)
- SARS Tax Compliance PIN: Active (9250830230)
- B-BBEE Status: Level 1 Contributor (135% Procurement Recognition, 100% Black Owned EME)
- Managing Director: Thabo Makola
- Contact / WhatsApp: +27 83 597 6462 | Email: info@hlugiso.co.za
- Physical Operating Depot: Stand No 01, Tickyline Village, Lenyenye, Tzaneen, Limpopo, 0850
- Official Website: www.hlugiso.co.za

CORE SERVICE DIVISIONS:
1. Funeral & Memorial Infrastructure: Turnkey marquees, executive draping, VIP family seating, carpets, podiums.
2. Executive VIP Mobile Sanitation: Luxury flush restroom trailers with porcelain bowls, running water basins, mirrors, and solar lighting.
3. Mobile Cold-Chain: Temperature-controlled cold room trailers (-2°C to +4°C) with dual-power 220V grid and silent backup generators.
4. Audio-Visual & Sound Reinforcement: High-output PA systems, roving wireless microphones, and silent diesel backup generators.
5. Ceremonial & Cultural Livestock Supply: Pasture-reared cattle, goats, and sheep sourced directly from Limpopo farms with veterinary clearance and humane transit trailers.
6. Civil Engineering & Contracting (CIDB 1CE): Earthworks, trenching, stormwater, bush clearing, road maintenance, and 30% local subcontractor participation.

TONE AND STYLE:
- Authoritative, professional, respectful, and compliant with South African commercial and public procurement standards (PPPFA, SBD forms, Municipal SCM).
- Always maintain statutory accuracy (never invent different CSD or registration numbers).
- Use clear bullet points and clean structure.
`;

export async function callOpenAI(
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  apiKey?: string
): Promise<string> {
  const key = apiKey || getStoredOpenAIKey();
  if (!key) {
    throw new Error('OpenAI API Key is required. Please set your API key in Director Settings or the AI Assistant tab.');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7,
      max_tokens: 1500
    })
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const message = errData?.error?.message || `OpenAI API responded with status ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content;
  if (!reply) {
    throw new Error('No response returned from OpenAI.');
  }

  return reply.trim();
}

export async function polishTemplateWithAI(
  currentText: string,
  userInstruction: string,
  apiKey?: string
): Promise<string> {
  return callOpenAI([
    { role: 'system', content: HLUGISO_SYSTEM_PROMPT },
    {
      role: 'user',
      content: `Here is the current draft of an email / proposal for HLUGISO (Pty) Ltd:

--- DRAFT START ---
${currentText}
--- DRAFT END ---

USER INSTRUCTION FOR CUSTOMIZATION:
"${userInstruction}"

Please rewrite or polish this text according to the user's instructions while preserving HLUGISO's statutory credentials, executive tone, and complete accuracy. Return ONLY the refined email / letter text.`
    }
  ], apiKey);
}

export async function generateCustomProposalWithAI(
  tenderPrompt: string,
  apiKey?: string
): Promise<string> {
  return callOpenAI([
    { role: 'system', content: HLUGISO_SYSTEM_PROMPT },
    {
      role: 'user',
      content: `Please draft a complete, compelling commercial proposal or tender cover letter for HLUGISO (Pty) Ltd based on the following specific requirements or tender notice:

SPECIFICATION / REQUEST:
"${tenderPrompt}"

Include all applicable statutory details (CSD MAAA0818606, CIDB Grade 1CE, SARS PIN 9250830230, Level 1 B-BBEE), localized Tzaneen advantages, equipment fleet specifications, and executive signature by Managing Director Thabo Makola. Format clearly with Subject line, Dear Sir/Madam, structured sections, and closing.`
    }
  ], apiKey);
}
