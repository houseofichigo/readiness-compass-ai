// Production-safe logging utility
export class Logger {
  private static isDev = process.env.NODE_ENV === 'development';

  static log(message: string, ...args: any[]) {
    if (this.isDev) {
      console.log(message, ...args);
    }
  }

  static warn(message: string, ...args: any[]) {
    if (this.isDev) {
      console.warn(message, ...args);
    }
  }

  static error(message: string, ...args: any[]) {
    // Always log errors, even in production
    console.error(message, ...args);
  }

  static debug(title: string, data: Record<string, any>) {
    if (this.isDev) {
      console.log(`🔍 ${title}:`);
      Object.entries(data).forEach(([key, value]) => {
        console.log(`- ${key}:`, value);
      });
    }
  }

  static group(label: string, callback: () => void) {
    if (this.isDev) {
      console.group(label);
      callback();
      console.groupEnd();
    }
  }
}