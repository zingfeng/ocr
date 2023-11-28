export interface LooseObject {
  [key: string]: any;
}

export type KeyEvent = KeyboardEvent & { target: HTMLInputElement };
export type PasteEvent = ClipboardEvent & { target: HTMLInputElement };

export enum ResponseStatusCode {
  SUCCESS = 1000,
  ERROR = 1001,
}

export interface ResponseDto {
  status: ResponseStatusCode;
  data?: unknown;
  message?: string;
  metadata?: {
    limit?: number;
    total_page?: number;
    current_page?: number;
    sort?: Record<string, string>;
    count: number;
    total_item?: number;
    [key: string]: any;
  };
}
