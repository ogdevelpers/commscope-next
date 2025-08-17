'use client';

import { useState } from 'react';
import styles from './CommScopeRegistrationForm.module.css';
import { restrictions } from '@/constants/appConstants';
/**
 * Form data interface for CommScope Technology Forum 2025 registration
 */
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

/**
 * Custom change event interface for form inputs
 */
export interface ChangeEvent {
  target: {
    name: string;
    value: string;
    files?: FileList;
  };
}

/**
 * Country code options for phone number selector
 */
export type CountryCode = 'US' | 'UK' | 'IN' | 'CA';

/**
 * Available dietary restrictions
 */
export type DietaryRestriction = 
  | 'Vegetarian' 
  | 'Halal' 
  | 'Gluten-Free' 
  | 'Vegan' 
  | 'Nuts Free' 
  | 'Eggs Free';

/**
 * Photo consent options
 */
export type PhotoConsent = 'yes' | 'no' | '';

/**
 * Form validation errors interface
 */
export interface FormErrors {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  jobTitle?: string;
  company?: string;
  phone?: string;
  email?: string;
  city?: string;
  country?: string;
  nationality?: string;
  photoConsent?: string;
  passportFile?: string;
}

/**
 * Form field configuration interface
 */
export interface FormFieldConfig {
  name: keyof FormData;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'file' | 'radio' | 'checkbox';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string; }[];
}

/**
 * Component props interface (if needed for parent components)
 */
export interface CommScopeRegistrationFormProps {
  onSubmit?: (formData: FormData) => void;
  initialData?: Partial<FormData>;
  disabled?: boolean;
}

export default function CommScopeRegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    fullName: '',
    jobTitle: '',
    company: '',
    phone: '',
    email: '',
    city: '',
    country: '',
    nationality: '',
    dietaryRestrictions: [],
    photoConsent: '',
    passportFile: null
  });

  const [countryCode, setCountryCode] = useState('US');

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDietaryChange = (restriction:any) => {
    setFormData(prev => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(restriction)
        ? prev.dietaryRestrictions.filter(r => r !== restriction)
        : [...prev.dietaryRestrictions, restriction]
    }));
  }; 

  const handleFileUpload = (e:any) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      passportFile: file
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Registration form submitted successfully!');
  };

  // Simple upload icon SVG
  const UploadIcon = () => (
    <svg className={styles.uploadIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  );

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.formCard}>
          <h1 className={styles.title}>
            Register Now for CommScope Technology Forum 2025
          </h1>
          
          <div className={styles.formContent}>
            <div className={`${styles.fieldGroup} ${styles.fieldGroupTwo}`}>
              <div className={styles.field}>
                <label className={styles.label}>
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="E.g. John"
                  className={styles.input}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="E.g. Doe"
                  className={styles.input}
                />
              </div>
            </div>

            {/* Full Name */}
            <div className={styles.field}>
              <label className={styles.label}>
                Full Name as per Passport
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="E.g. John Doe"
                className={styles.input}
              />
            </div>

            {/* Job Title */}
            <div className={styles.field}>
              <label className={styles.label}>
                Job Title
              </label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                placeholder="E.g. Marketing Manager"
                className={styles.input}
              />
            </div>

            {/* Company */}
            <div className={styles.field}>
              <label className={styles.label}>
                Company/Organization Name
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="E.g. ABC Corp LLC"
                className={styles.input}
              />
            </div>

            {/* Phone */}
            <div className={styles.field}>
              <label className={styles.label}>
                Phone number
              </label>
              <div className={styles.phoneGroup}>
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className={styles.countrySelect}
                >
                  <option value="US">US</option>
                  <option value="UK">UK</option>
                  <option value="IN">IN</option>
                  <option value="CA">CA</option>
                </select>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                  className={styles.phoneInput}
                />
              </div>
            </div>

            {/* Email */}
            <div className={styles.field}>
              <label className={styles.label}>
                Business Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="E.g. john@abccorp.com"
                className={styles.input}
              />
            </div>

            {/* City */}
            <div className={styles.field}>
              <label className={styles.label}>
                City
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={styles.select}
              >
                <option value="">Select City</option>
                <option value="new-york">New York</option>
                <option value="london">London</option>
                <option value="tokyo">Tokyo</option>
                <option value="sydney">Sydney</option>
              </select>
            </div>

            {/* Country */}
            <div className={styles.field}>
              <label className={styles.label}>
                Country of Residence
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className={styles.select}
              >
                <option value="">Select Country of Residence</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="ca">Canada</option>
                <option value="au">Australia</option>
                <option value="in">India</option>
              </select>
            </div>

            {/* Nationality */}
            <div className={styles.field}>
              <label className={styles.label}>
                Nationality
              </label>
              <select
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                className={styles.select}
              >
                <option value="">Select Nationality</option>
                <option value="american">American</option>
                <option value="british">British</option>
                <option value="canadian">Canadian</option>
                <option value="australian">Australian</option>
                <option value="indian">Indian</option>
              </select>
              <p className={styles.helpText}>
                This will help especially for F&B & Language purpose
              </p>
            </div>

            {/* Dietary Restrictions */}
            <div className={styles.field}>
              <label className={styles.label}>
                Do you have any dietary restrictions?
              </label>
              <div className={styles.checkboxGroup}>
                {restrictions.map((restriction:string) => (
                  <label key={restriction} className={styles.checkboxItem}>
                    <input
                      type="checkbox"
                      checked={formData?.dietaryRestrictions?.includes(restriction)}
                      onChange={() => handleDietaryChange(restriction)}
                      className={styles.checkbox}
                    />
                    <span className={styles.checkboxLabel}>{restriction}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Photo Consent */}
            <div className={styles.field}>
              <label className={styles.label}>
                Consent to Photograph & Video Recording during the event
              </label>
              <div className={styles.radioGroup}>
                <label className={styles.radioItem}>
                  <input
                    type="radio"
                    name="photoConsent"
                    value="yes"
                    checked={formData.photoConsent === 'yes'}
                    onChange={handleInputChange}
                    className={styles.radio}
                  />
                  <span className={styles.radioLabel}>Yes</span>
                </label>
                <label className={styles.radioItem}>
                  <input
                    type="radio"
                    name="photoConsent"
                    value="no"
                    checked={formData.photoConsent === 'no'}
                    onChange={handleInputChange}
                    className={styles.radio}
                  />
                  <span className={styles.radioLabel}>No</span>
                </label>
              </div>
            </div>

            {/* File Upload */}
            <div className={styles.field}>
              <label className={styles.label}>
                Attach your passport copy for Hotel & Ticket Bookings
              </label>
              <div className={styles.uploadArea}>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileUpload}
                  className={styles.hiddenInput}
                  id="passport-upload"
                />
                <label htmlFor="passport-upload" className={styles.uploadLabel}>
                  <UploadIcon />
                  <div className={styles.uploadText}>
                    Click here to upload or drop files here
                  </div>
                  <div className={styles.uploadSubtext}>
                    (Jpeg/png/pdf)
                  </div>
                </label>
                {formData.passportFile && (
                  <div className={styles.fileSelected}>
                    Selected: {formData.passportFile.name}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className={styles.submitButton}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

