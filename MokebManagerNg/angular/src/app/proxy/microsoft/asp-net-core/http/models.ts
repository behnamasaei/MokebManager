
export interface IFormFile {
  contentType?: string;
  contentDisposition?: string;
  headers: Record<string, any>;
  length: number;
  name?: string;
  fileName?: string;
}
