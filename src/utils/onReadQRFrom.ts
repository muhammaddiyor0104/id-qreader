import { onRead } from "./qrCodeReader";
import { urlToFile } from "./urlToFile";
import { base64ToFile } from "./base64toFile";

export const onReadQRFrom = (valueType: string, value: any, isOutputParsed: boolean): Promise<any> => {
    return new Promise((resolve, reject) => {
        switch (valueType) {
            case 'file':
                if (value && value.current) {
                    value.current.addEventListener("change", (event: Event) => {
                        onRead((event.target as HTMLInputElement).files![0], isOutputParsed)
                            .then(res => {
                                resolve(res);
                            })
                            .catch(err => {
                                reject(err);
                            });
                    });
                } else {
                    reject(new Error('No file input element provided'));
                }
                break;
            case 'url':
                if (value) {
                    urlToFile(value, "test", 'image/jpeg')
                        .then(res => {
                            return onRead(res, isOutputParsed);
                        })
                        .then(result => {
                            resolve(result);
                        })
                        .catch(err => {
                            reject(err);
                        });
                } else {
                    reject(new Error('No URL provided'));
                }
                break;
            case 'base64':
                if (value) {
                    const file = base64ToFile(value);
                    onRead(file, isOutputParsed)
                        .then(result => {
                            resolve(result);
                        })
                        .catch(err => {
                            reject(err);
                        });
                } else {
                    reject(new Error('No base64 string provided'));
                }
                break;
            default:
                reject(new Error('Invalid valueType'));
        }
    });
};
