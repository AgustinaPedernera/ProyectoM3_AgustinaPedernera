import { GoogleGenAI } from '@google/genai';
import {
  CHARACTERS,
  formatHistoryForGemini
} from '../src/utils.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Método no permitido'
    });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error('ERROR: No se encontró GEMINI_API_KEY.');

      return res.status(500).json({
        error: 'Falta configurar GEMINI_API_KEY en la app.'
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const body =
      typeof req.body === 'string'
        ? JSON.parse(req.body)
        : req.body;

    const {
      message,
      character,
      history = []
    } = body || {};

    if (!message) {
      return res.status(400).json({
        error: 'El mensaje es requerido.'
      });
    }

    const charConfig =
      CHARACTERS?.[character] ||
      CHARACTERS?.sandro;

    const systemPrompt =
      charConfig?.systemPrompt ||
      'Responde amablemente en español.';

    // Convertir el historial al formato que espera Gemini
    const formattedHistory =
      formatHistoryForGemini(history);

    let response;

    const maxAttempts = 3;

    for (
      let attempt = 1;
      attempt <= maxAttempts;
      attempt++
    ) {
      try {
        response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',

          // Ahora Gemini recibe toda la conversación
          contents: formattedHistory,

          config: {
            systemInstruction: systemPrompt,
            temperature: 0.8,
          },
        });

        break;
      } catch (error) {
        const isTemporaryError =
          error?.status === 503 ||
          error?.status === 429 ||
          error?.status >= 500;

        if (
          !isTemporaryError ||
          attempt === maxAttempts
        ) {
          throw error;
        }

        const delay =
          1000 * Math.pow(2, attempt - 1);

        await new Promise((resolve) =>
          setTimeout(resolve, delay)
        );
      }
    }

    return res.status(200).json({
      reply: response.text
    });

  } catch (error) {
    console.error(
      'Error interno en api/chat:',
      error
    );

    const status =
      error?.status === 503 ? 503 : 500;

    return res.status(status).json({
      error:
        status === 503
          ? 'La IA está temporalmente ocupada. Intentá nuevamente en unos segundos.'
          : 'Ocurrió un error al procesar tu solicitud.'
    });
  }
}