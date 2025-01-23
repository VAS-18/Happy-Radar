declare module 'kursor' {
  interface KursorOptions {
    type?: number;
    removeDefaultCursor?: boolean;
    color?: string;
  }

  export default class Kursor {
    constructor(options?: KursorOptions);
  }
} 