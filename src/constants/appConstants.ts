export const restrictions = ['Vegetarian', 'Halal', 'Gluten-Free', 'Vegan', 'Nuts Free', 'Eggs Free'];

export interface FormData {
  /** User's first name */
  firstName: string;
  
  /** User's last name */
  lastName: string;
  
  /** Full name as it appears on passport */
  fullName: string;
  
  /** User's job title */
  jobTitle: string;
  
  /** Company or organization name */
  company: string;
  
  /** Phone number */
  phone: string;
  
  /** Business email address */
  email: string;
  
  /** City of residence */
  city: string;
  
  /** Country of residence */
  country: string;
  
  /** User's nationality */
  nationality: string;
  
  /** Array of dietary restrictions */
  dietaryRestrictions: string[];
  
  /** Consent for photography/video recording ('yes' | 'no' | '') */
  photoConsent: string;
  
  /** Uploaded passport file or null */
  passportFile: File | null;
}
