export const cloneObj = (obj: Record<string, any>) => {
    return JSON.parse(JSON.stringify(obj));
};