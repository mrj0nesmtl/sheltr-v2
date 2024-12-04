declare module 'browser-image-compression' {
  interface Options {
    maxSizeMB: number;
    maxWidthOrHeight: number;
    useWebWorker?: boolean;
    maxIteration?: number;
  }

  function imageCompression(
    file: File,
    options: Options
  ): Promise<File>;

  export = imageCompression;
} 