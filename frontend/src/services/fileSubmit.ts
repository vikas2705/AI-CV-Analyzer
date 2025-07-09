import axios, { AxiosError } from "axios";
import { API_ROUTES } from "../constants/api";
import { getApiUrl } from "../config/environment";
import type {
  UploadRequest,
  UploadResponse,
  UploadError,
} from "../types/upload";

class FileUploadService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = getApiUrl(API_ROUTES.UPLOAD);
  }

  /**
   * Upload CV and JD files for analysis
   * @param files - Object containing CV and JD files
   * @returns Promise with analysis result
   * @throws UploadError if upload fails
   */
  async uploadFiles(files: UploadRequest): Promise<string> {
    try {
      const formData = new FormData();
      formData.append("cv", files.cv);
      formData.append("jd", files.jd);

      const response = await axios.post<UploadResponse>(
        this.baseUrl,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 30000, // 30 second timeout
        }
      );

      return response.data.result.result;
    } catch (error) {
      const uploadError = this.handleError(error);
      throw uploadError;
    }
  }

  /**
   * Handle different types of errors and return a standardized error object
   */
  private handleError(error: unknown): UploadError {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.code === "ECONNABORTED") {
        return {
          message: "Request timed out. Please try again.",
          status: 408,
        };
      }

      if (axiosError.response) {
        const status = axiosError.response.status;
        let message = "Upload failed";

        switch (status) {
          case 400:
            message =
              "Invalid file format. Please ensure both files are valid PDFs.";
            break;
          case 413:
            message = "File size too large. Please use smaller files.";
            break;
          case 500:
            message = "Server error. Please try again later.";
            break;
          default:
            message = `Upload failed with status ${status}`;
        }

        return { message, status };
      }

      if (axiosError.request) {
        return {
          message: "Network error. Please check your connection and try again.",
        };
      }
    }

    // Fallback for unknown errors
    return {
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

// Export singleton instance
export const fileUploadService = new FileUploadService();
