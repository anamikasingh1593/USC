/**
 *
 */
export interface Identifiable {
  IntCode: number;
}

/**
 *
 */
export interface Item extends Identifiable {
  Length: string;
  TapeLabel: string;
  GrantStatement: string;
  ExperienceGroup: string;
  LanguageLabel: string;
  OrganizationName: string;
  ImageURL: string;
}

/**
 *
 */
export interface Items {
  Items: Partial<Item>[];
  ResultCount: number;
  TotalCount: number;
}
