import Language from '../../models/language';

export interface LocalizationState {
  languageId: string;
  language?: any | null | undefined,
  languages: Language[]
}