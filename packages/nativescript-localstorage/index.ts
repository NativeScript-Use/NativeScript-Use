import { ApplicationSettings } from '@nativescript/core';

export class LocalStorage<K extends string> {
  protected prefix = '';

  getItem<T>(key: K): T {
    try {
      return ApplicationSettings.getString(this.getKey(key)) as T;
    } catch (error) {
      console.log('[LOCAL_STORAGE] getItem ERROR ' + error);
    }
    return null;
  }

  setItem(key: K, data: any): void {
    try {
      ApplicationSettings.setString(this.getKey(key), isString(data) ? data : JSON.stringify(data));
    } catch (error) {
      console.log('[LOCAL_STORAGE] setItem ERROR ' + error);
    }
  }

  has(key: K): boolean {
    return ApplicationSettings.hasKey(this.getKey(key));
  }

  removeItem(key: K): void {
    ApplicationSettings.remove(this.getKey(key));
  }

  length(): number {
    return ApplicationSettings.getAllKeys().length;
  }

  clear(): void {
    ApplicationSettings.clear();
  }

  private getKey(key: K) {
    return this.prefix + key;
  }
}

const localStorage = new LocalStorage();
export default localStorage;

const isString = (val: unknown): val is string => typeof val === 'string';
