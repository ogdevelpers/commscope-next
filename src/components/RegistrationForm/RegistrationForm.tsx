"use client";

import { useRef, useState } from "react";
import styles from "./CommScopeRegistrationForm.module.css";
import { restrictions } from "@/constants/appConstants";

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
export type CountryCode = "US" | "UK" | "IN" | "CA";

/**
 * Available dietary restrictions
 */
export type DietaryRestriction =
  | "Vegetarian"
  | "Halal"
  | "Gluten-Free"
  | "Vegan"
  | "Nuts Free"
  | "Eggs Free";

/**
 * Photo consent options
 */
export type PhotoConsent = "yes" | "no" | "";

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
  type: "text" | "email" | "tel" | "select" | "file" | "radio" | "checkbox";
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
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
    passportFile: null,
  });
  const [canSubmit, setCanSubmit] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [countryCode, setCountryCode] = useState("US");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    "success" | "error" | null
  >(null);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDietaryChange = (restriction: string) => {
    setFormData((prev) => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(restriction)
        ? prev.dietaryRestrictions.filter((r) => r !== restriction)
        : [...prev.dietaryRestrictions, restriction],
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Clear previous errors
    setUploadError("");

    // Validate file type - using standard MIME types
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      setUploadError("Please select a valid file type (JPEG, PNG, or PDF)");
      return;
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadError("File size must be less than 10MB");
      return;
    }

    try {
      // Create FormData for file upload
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      // Upload file to /api/upload
      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      // Check if response is ok before parsing JSON
      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        let errorMessage = "Upload failed";

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
          passportUrl: uploadResult.data.publicUrl,
        };

        setFormData(updatedFormData);
        setUploadSuccess(true);

        console.log("File uploaded successfully:", {
          filename: uploadResult.data.filename,
          publicUrl: uploadResult.data.publicUrl,
        });
      } else {
        throw new Error("Upload failed - no data returned");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError(error instanceof Error ? error.message : "Upload failed");

      // Clear file from form data on error
      setFormData((prev) => ({
        ...prev,
        passportFile: null,
        passportUrl: undefined,
      }));

      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } finally {
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmissionStatus(null);
    setSubmissionMessage("");

    try {
      // First, handle the registration data submission
      const registrationResponse = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!registrationResponse.ok) {
        const errorData = await registrationResponse.json();
        throw new Error(errorData.error || "Registration failed");
      }

      // After successful registration, send the thank you email
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.firstName,
          email: formData.email,
        }),
      });

      if (!emailResponse.ok) {
        // Even if email fails, registration was successful
        console.warn(
          "Registration was successful, but the confirmation email could not be sent."
        );
      }

      setSubmissionStatus("success");
      setSubmissionMessage(
        "Thank you for registering! A confirmation email has been sent."
      );
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
        passportFile: null,
      });
    } catch (error) {
      setSubmissionStatus("error");
      setSubmissionMessage(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Simple upload icon SVG
  const UploadIcon = () => (
    <svg
      className={styles.uploadIcon}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
      />
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
                <label className={styles.label}>First Name</label>
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
                <label className={styles.label}>Last Name</label>
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
              <label className={styles.label}>Full Name as per Passport</label>
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
              <label className={styles.label}>Job Title</label>
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
              <label className={styles.label}>Company/Organization Name</label>
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
              <label className={styles.label}>Phone number</label>
              <div className={styles.phoneGroup}>
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className={styles.countrySelect}
                  aria-label="Country Code"
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
              <label className={styles.label}>Business Email</label>
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
              <label className={styles.label}>City</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={styles.select}
                aria-label="City"
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
              <label className={styles.label}>Country of Residence</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className={styles.select}
                aria-label="Country of Residence"
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
              <label className={styles.label}>Nationality</label>
              <select
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                className={styles.select}
                aria-label="Nationality"
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
                {restrictions.map((restriction: string) => (
                  <label key={restriction} className={styles.checkboxItem}>
                    <input
                      type="checkbox"
                      checked={formData?.dietaryRestrictions?.includes(
                        restriction
                      )}
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
                    checked={formData.photoConsent === "yes"}
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
                    checked={formData.photoConsent === "no"}
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
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileUpload}
                  className={styles.hiddenInput}
                  id="passport-upload"
                />
                <label htmlFor="passport-upload" className={styles.uploadLabel}>
                  <UploadIcon />
                  {uploadSuccess ? (
                    "File successfully uploaded, please click here if you want to retry"
                  ) : (
                    <>
                      <div className={styles.uploadText}>
                        Click here to upload or drop files here
                      </div>
                      <div className={styles.uploadSubtext}>(Jpeg/png/pdf)</div>
                    </>
                  )}
                </label>
                {formData.passportFile && (
                  <div className={styles.fileSelected}>
                    Selected: {formData.passportFile.name}
                  </div>
                )}
                {uploadError && (
                  <p className={styles.errorMessage}>{uploadError}</p>
                )}
              </div>
            </div>

            {/* Submission Status */}
            {submissionStatus && (
              <div
                className={
                  submissionStatus === "success"
                    ? styles.successMessage
                    : styles.errorMessage
                }
              >
                {submissionMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "SUBMIT"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
