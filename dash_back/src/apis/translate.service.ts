import translation from '@iamtraction/google-translate';
import { Injectable } from '@nestjs/common';

export const available_languages = [
  'Automatic',
  'Afrikaans',
  'Albanian',
  'Amharic',
  'Arabic',
  'Armenian',
  'Azerbaijani',
  'Basque',
  'Belarusian',
  'Bengali',
  'Bosnian',
  'Bulgarian',
  'Catalan',
  'Cebuano',
  'Chichewa',
  'Chinese Simplified',
  'Chinese Traditional',
  'Corsican',
  'Croatian',
  'Czech',
  'Danish',
  'Dutch',
  'English',
  'Esperanto',
  'Estonian',
  'Filipino',
  'Finnish',
  'French',
  'Frisian',
  'Galician',
  'Georgian',
  'German',
  'Greek',
  'Gujarati',
  'Haitian Creole',
  'Hausa',
  'Hawaiian',
  'Hebrew',
  'Hindi',
  'Hmong',
  'Hungarian',
  'Icelandic',
  'Igbo',
  'Indonesian',
  'Irish',
  'Italian',
  'Japanese',
  'Javanese',
  'Kannada',
  'Kazakh',
  'Khmer',
  'Korean',
  'Kurdish (Kurmanji)',
  'Kyrgyz',
  'Lao',
  'Latin',
  'Latvian',
  'Lithuanian',
  'Luxembourgish',
  'Macedonian',
  'Malagasy',
  'Malay',
  'Malayalam',
  'Maltese',
  'Maori',
  'Marathi',
  'Mongolian',
  'Myanmar (Burmese)',
  'Nepali',
  'Norwegian',
  'Pashto',
  'Persian',
  'Polish',
  'Portuguese',
  'Punjabi',
  'Romanian',
  'Russian',
  'Samoan',
  'Scots Gaelic',
  'Serbian',
  'Sesotho',
  'Shona',
  'Sindhi',
  'Sinhala',
  'Slovak',
  'Slovenian',
  'Somali',
  'Spanish',
  'Sundanese',
  'Swahili',
  'Swedish',
  'Tajik',
  'Tamil',
  'Telugu',
  'Thai',
  'Turkish',
  'Ukrainian',
  'Urdu',
  'Uzbek',
  'Vietnamese',
  'Welsh',
  'Xhosa',
  'Yiddish',
  'Yoruba',
  'Zulu',
];

export type Translated = {
  text: string;
};

@Injectable()
export class TranslateService {
  get_language_code = (language: string) => {
    const languages = {
      auto: 'Automatic',
      af: 'Afrikaans',
      sq: 'Albanian',
      am: 'Amharic',
      ar: 'Arabic',
      hy: 'Armenian',
      az: 'Azerbaijani',
      eu: 'Basque',
      be: 'Belarusian',
      bn: 'Bengali',
      bs: 'Bosnian',
      bg: 'Bulgarian',
      ca: 'Catalan',
      ceb: 'Cebuano',
      ny: 'Chichewa',
      'zh-cn': 'Chinese Simplified',
      'zh-tw': 'Chinese Traditional',
      co: 'Corsican',
      hr: 'Croatian',
      cs: 'Czech',
      da: 'Danish',
      nl: 'Dutch',
      en: 'English',
      eo: 'Esperanto',
      et: 'Estonian',
      tl: 'Filipino',
      fi: 'Finnish',
      fr: 'French',
      fy: 'Frisian',
      gl: 'Galician',
      ka: 'Georgian',
      de: 'German',
      el: 'Greek',
      gu: 'Gujarati',
      ht: 'Haitian Creole',
      ha: 'Hausa',
      haw: 'Hawaiian',
      iw: 'Hebrew',
      hi: 'Hindi',
      hmn: 'Hmong',
      hu: 'Hungarian',
      is: 'Icelandic',
      ig: 'Igbo',
      id: 'Indonesian',
      ga: 'Irish',
      it: 'Italian',
      ja: 'Japanese',
      jw: 'Javanese',
      kn: 'Kannada',
      kk: 'Kazakh',
      km: 'Khmer',
      ko: 'Korean',
      ku: 'Kurdish (Kurmanji)',
      ky: 'Kyrgyz',
      lo: 'Lao',
      la: 'Latin',
      lv: 'Latvian',
      lt: 'Lithuanian',
      lb: 'Luxembourgish',
      mk: 'Macedonian',
      mg: 'Malagasy',
      ms: 'Malay',
      ml: 'Malayalam',
      mt: 'Maltese',
      mi: 'Maori',
      mr: 'Marathi',
      mn: 'Mongolian',
      my: 'Myanmar (Burmese)',
      ne: 'Nepali',
      no: 'Norwegian',
      ps: 'Pashto',
      fa: 'Persian',
      pl: 'Polish',
      pt: 'Portuguese',
      pa: 'Punjabi',
      ro: 'Romanian',
      ru: 'Russian',
      sm: 'Samoan',
      gd: 'Scots Gaelic',
      sr: 'Serbian',
      st: 'Sesotho',
      sn: 'Shona',
      sd: 'Sindhi',
      si: 'Sinhala',
      sk: 'Slovak',
      sl: 'Slovenian',
      so: 'Somali',
      es: 'Spanish',
      su: 'Sundanese',
      sw: 'Swahili',
      sv: 'Swedish',
      tg: 'Tajik',
      ta: 'Tamil',
      te: 'Telugu',
      th: 'Thai',
      tr: 'Turkish',
      uk: 'Ukrainian',
      ur: 'Urdu',
      uz: 'Uzbek',
      vi: 'Vietnamese',
      cy: 'Welsh',
      xh: 'Xhosa',
      yi: 'Yiddish',
      yo: 'Yoruba',
      zu: 'Zulu',
    };

    language = language.toLowerCase();
    const keys = Object.keys(languages).filter((key): boolean | string => {
      if (typeof languages[key] !== 'string') {
        return false;
      }
      return languages[key].toLowerCase() === language;
    });
    return keys[0] || null;
  };

  translate = async (
    text: string,
    from: string,
    to: string,
  ): Promise<Translated> => {
    return await translation(text, { from, to })
      .then((response) => {
        return {
          text: response.text,
        };
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
}
