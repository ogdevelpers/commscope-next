'use client';

import { useRef, useState } from 'react';
import styles from './CommScopeRegistrationForm.module.css';
import { restrictions } from '@/constants/appConstants';
import { useRouter } from 'next/navigation';
import { countries } from '@/constants/countryData';
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
  passportUrl:  string;
}

 
interface UploadResponse {
  success: boolean;
  data?: {
    message: string;
    filename: string;
    originalFilename: string;
    fileType: string;
    fileSize: number;
    publicUrl: string;
    bucketPath: string;
  };
  error?: string;
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
    passportUrl: ''
  });
  const [canSubmit, setCanSubmit] = useState(false);
  const [uploadError, setUploadError] = useState(''); 
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadSuccess, setUploadSuccess]=  useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const router = useRouter();  

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

const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  
  if (!file) return;

  // Clear previous errors
  setUploadError('');

  // Validate file type - using standard MIME types
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (!allowedTypes.includes(file.type)) {
    setUploadError('Please select a valid file type (JPEG, PNG, or PDF)');
    return;
  }

  // Validate file size (10MB limit)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    setUploadError('File size must be less than 10MB');
    return;
  } 
 

  try {
    // Create FormData for file upload
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    setIsUploading(true);

    // Upload file to /api/upload
    const uploadResponse = await fetch('/api/upload', {
      method: 'POST',
      body: uploadFormData,
    });

    // Check if response is ok before parsing JSON
    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      let errorMessage = 'Upload failed';
      
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.error || errorMessage;
      } catch {
        // If not JSON, use status text
        errorMessage = uploadResponse.statusText || errorMessage;
      }
      
      throw new Error(errorMessage);
    }

    const uploadResult: UploadResponse = await uploadResponse.json();

    if (uploadResult.success && uploadResult.data) {
      // Update form data with file and URL
      const updatedFormData = {
        ...formData, 
        passportUrl: uploadResult.data.publicUrl
      };
      
      setFormData(updatedFormData);
      setUploadSuccess(true);
      
      console.log('File uploaded successfully:', {
        filename: uploadResult.data.filename,
        publicUrl: uploadResult.data.publicUrl
      });
 
      
    } else {
      throw new Error('Upload failed - no data returned');
    } 

  } catch (error) {
    console.error('Upload error:', error);
    setUploadError(error instanceof Error ? error.message : 'Upload failed');
    
    // Clear file from form data on error
    setFormData(prev => ({
      ...prev, 
      passportUrl: ''
    }));
    
    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  } finally {  
    setIsUploading(false)
  }
};


  const handleSubmit = async () => {
  console.log('Form submitted:', formData);
  
  // Clear previous errors
  setSubmitError('');

  if(!uploadSuccess){
    setSubmitError('Please upload passport file');
    return;
  }
  
  // Validate required fields
  if (!formData.firstName?.trim() || !formData.lastName?.trim() || !formData.email?.trim()) {
    setSubmitError('Please fill in all required fields');
    return;
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    setSubmitError('Please enter a valid email address');
    return;
  }
  
  // Set loading state
  setIsSubmitting(true);

  try {
    // Prepare data for API submission
    const submissionData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      fullName: formData.fullName.trim(),
      jobTitle: formData.jobTitle.trim(),
      email: formData.email.trim(),
      phone: formData.phone?.trim() || '',
      company: formData.company?.trim() || '',
      nationality: formData.nationality?.trim() || '',
      dietaryRestrictions: formData.dietaryRestrictions , 
      passportUrl: formData.passportUrl || '',
    };

    // Submit to API endpoint
    const submitResponse = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
    });

    // Check if response is ok before parsing JSON
    if (!submitResponse.ok) {
      const errorText = await submitResponse.text();
      let errorMessage = 'Submission failed';
      
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.error || errorMessage;
      } catch {
        // If not JSON, use status text
        errorMessage = submitResponse.statusText || errorMessage;
      }
      
      throw new Error(errorMessage);
    }

    const submitResult = await submitResponse.json();

    if (submitResult.success && submitResult.data) { 
      const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;
      
      console.log('Form submitted successfully:', {
        userId: submitResult.data.user?.id,
        fullName: fullName,
        email: formData.email
      });
 
      // After successful registration, send the thank you email
      try {
        const emailResponse = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
          }),
        });
  
        if (!emailResponse.ok) { 
          console.warn(
            "Registration was successful, but the confirmation email could not be sent."
          );
        } 
      } catch (error) {
        console.log("Failed to send mail")
      }

      // Reset form or redirect user
      setFormData({
        firstName: "",
        lastName: "",
        fullName: "",
        jobTitle: "",
        company: "",
        phone: "",
        email: "",
        city: "",
        country: "",
        nationality: "",
        dietaryRestrictions: [],
        photoConsent: "",
        passportUrl: "",
      });  
 
      router.push(`/submission?name=${encodeURIComponent(fullName)}`);

    } else {
      throw new Error('Submission failed - no data returned');
    }

  } catch (error) {
    console.error('Submission error:', error);
    setSubmitError(error instanceof Error ? error.message : 'Submission failed');

  } finally {
    setIsSubmitting(false);
  }
};

  // Simple upload icon SVG
  const UploadIcon = () => (
    <svg className={styles.uploadIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  );

  return (
    <div className={styles.formContainer}>
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
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(555) 000-0000"
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
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Select City"
                className={styles.input}
              />
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
                {
                  countries.map((country:string,index:number)=>{
                    return (
                      <option value={country} key={index}>{country}</option>
                    )
                  })
                }
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
                {
                  countries.map((country:string,index:number)=>{
                    return (
                      <option value={country} key={index}>{country}</option>
                    )
                  })
                }
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
            <div className={styles.field}>
              <label className={styles.label}>
                Attach your passport copy for Hotel & Ticket Bookings
              </label>
              <div className={styles.uploadArea}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileUpload}
                  className={styles.hiddenInput}
                  id="passport-upload"
                />
                <label htmlFor="passport-upload" className={styles.uploadLabel}>
                  <UploadIcon />
                 {uploadSuccess ? "File successfully uploaded, please click here if you want to retry"  : ( <>
                    <div className={styles.uploadText}>
                      Click here to upload or drop files here
                    </div>
                    <div className={styles.uploadSubtext}>
                      (Jpeg/png/pdf)
                    </div>
                  </>)}
                  {isUploading && "Uploading File, please wait"}
                </label>
 
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
            {submitError && submitError}
          </div>
        </div>
      </div>
    </div>
  );
}

