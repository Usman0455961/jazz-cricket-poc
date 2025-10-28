// src/types/global.d.ts
export {};

declare global {
  interface Window {
    JazzAuth: {
      init: (options: {
        clientId: string;
        containerId?: string;
        buttonText?: string;
        buttonColor?: string;
        onLogin: (token: string) => void;
      }) => void;
      login: (options: { clientId: string; onLogin: (token: string) => void }) => void;
    };
  }
}