
export interface Exits {
  error: (response: Record<string, unknown>) => void;
  success: (response: Record<string, unknown>) => void;
}
