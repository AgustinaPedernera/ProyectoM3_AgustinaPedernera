import { describe, expect, test } from 'vitest';

import {
  cleanInputText,
  formatHistoryForGemini
} from '../utils.js';

describe('cleanInputText', () => {
  test('elimina espacios al principio y al final', () => {
    const result = cleanInputText('   Hola Moria   ');

    expect(result).toBe('Hola Moria');
  });

  test('devuelve un string vacío si recibe un valor que no es texto', () => {
    const result = cleanInputText(null);

    expect(result).toBe('');
  });
});

describe('formatHistoryForGemini', () => {
  test('convierte un mensaje del usuario al formato de Gemini', () => {
    const history = [
      {
        sender: 'user',
        text: 'Hola'
      }
    ];

    const result = formatHistoryForGemini(history);

    expect(result).toEqual([
      {
        role: 'user',
        parts: [
          {
            text: 'Hola'
          }
        ]
      }
    ]);
  });

  test('convierte una respuesta del personaje al rol model', () => {
    const history = [
      {
        sender: 'bot',
        text: 'Hola, mi amor'
      }
    ];

    const result = formatHistoryForGemini(history);

    expect(result).toEqual([
      {
        role: 'model',
        parts: [
          {
            text: 'Hola, mi amor'
          }
        ]
      }
    ]);
  });

  test('devuelve un array vacío si el historial no es un array', () => {
    const result = formatHistoryForGemini(null);

    expect(result).toEqual([]);
  });
});