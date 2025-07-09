export const ALLOWED_FILE_TYPES = ["application/pdf"] as const;
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateFile = (file: File): FileValidationResult => {
  // Check file type
  if (
    !ALLOWED_FILE_TYPES.includes(
      file.type as (typeof ALLOWED_FILE_TYPES)[number]
    )
  ) {
    return {
      isValid: false,
      error: "Only PDF files are allowed.",
    };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB.`,
    };
  }

  return { isValid: true };
};

export const validateFiles = (
  cvFile: File | null,
  jdFile: File | null
): FileValidationResult => {
  if (!cvFile || !jdFile) {
    return {
      isValid: false,
      error: "Both CV and JD PDF files are required.",
    };
  }

  const cvValidation = validateFile(cvFile);
  if (!cvValidation.isValid) {
    return {
      isValid: false,
      error: `CV file: ${cvValidation.error}`,
    };
  }

  const jdValidation = validateFile(jdFile);
  if (!jdValidation.isValid) {
    return {
      isValid: false,
      error: `JD file: ${jdValidation.error}`,
    };
  }

  return { isValid: true };
};
