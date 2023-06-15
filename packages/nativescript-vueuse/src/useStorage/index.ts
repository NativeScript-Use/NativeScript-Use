import { ApplicationSettings } from "@nativescript/core";

 const storage = {
    getObject: <T = any>(key: string, defaultValue?: T): T => {
        const value = storage.getString(key);
        return value ? JSON.parse(value) : defaultValue;
    },
    setObject: (key: string, value: any) => {
        storage.setString(key, JSON.stringify(value));
    },
    getString: (key: string, defaultValue?: string): string => {
        return ApplicationSettings.getString(key, defaultValue);
    },
    setString: (key: string, value: string) => {
        ApplicationSettings.setString(key, value);
    },
    getNumber: (key: string, defaultValue?: number) => {
        return ApplicationSettings.getNumber(key, defaultValue);
    },
    setNumber: (key: string, value: number) => {
        ApplicationSettings.setNumber(key, value);
    },
    getBoolean: (key: string, defaultValue?: boolean) => {
        return ApplicationSettings.getBoolean(key, defaultValue);
    },
    setBoolean: (key: string, value: boolean) => {
        ApplicationSettings.setBoolean(key, value);
    },
    remove: (key: string) => {
        ApplicationSettings.remove(key);
    },
    clear: () => {
        ApplicationSettings.clear();
    },
};

export const useStorage = () => storage