import { useState, useCallback } from "react";
import { fileUploadService } from "../services/fileSubmit";
import type { UploadRequest, UploadError } from "../types/upload";

interface UseFileUploadReturn {
  response: string;
  setResponse: (response: string) => void;
  loading: boolean;
  error: UploadError | null;
  uploadFiles: (files: UploadRequest) => Promise<void>;
  clearResponse: () => void;
  clearError: () => void;
}

export const useFileUpload = (): UseFileUploadReturn => {
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<UploadError | null>(null);

  const uploadFiles = useCallback(async (files: UploadRequest) => {
    setLoading(true);
    setError(null);

    try {
      const result = await fileUploadService.uploadFiles(files);
      setResponse(result);
    } catch (err) {
      const uploadError = err as UploadError;
      setError(uploadError);
      setResponse("");
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResponse = useCallback(() => {
    setResponse("");
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    response,
    setResponse,
    loading,
    error,
    uploadFiles,
    clearResponse,
    clearError,
  };
};
