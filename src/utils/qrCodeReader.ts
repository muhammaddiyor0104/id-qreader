import { Html5Qrcode } from "html5-qrcode";
import {machineReadeableToHumanReadeable, ParsedDataTypes} from "./machineReadeableToHUmanReadeable";
import {getErrorMessage} from "./getErrorMessage";

interface OnReadResult {
    status: string;
    img: string | ArrayBuffer | null;
    data: any;
}

export function onRead(file: File, isOutputParsed:boolean): Promise<OnReadResult> {
    return new Promise((resolve, reject) => {
        if (file) {
            const reader = new FileReader();
            const qrReaderDiv = document.createElement('div');
            qrReaderDiv.id = 'qr-reader'; // Set an id for proper initialization
            qrReaderDiv.classList.add('qr-reader');
            document.body.appendChild(qrReaderDiv);

            reader.readAsDataURL(file);

            reader.onload = async () => {
                try {
                    const qrCodeScanner = new Html5Qrcode('qr-reader');
                    const imageData = new Image();
                    imageData.onload = async () => {
                        try {
                            const qrCodeMessage = await qrCodeScanner.scanFile(file);
                            if (qrCodeMessage) {
                                const parsed = machineReadeableToHumanReadeable(qrCodeMessage);
                                if (!parsed.error) {
                                    resolve({
                                        status: 'ok',
                                        img: reader.result,
                                        data: isOutputParsed ? {
                                            parsed: parsed.data as ParsedDataTypes,
                                            machineReadeable: qrCodeMessage
                                        } : qrCodeMessage
                                    });
                                } else {
                                    reject(new Error(parsed.error));
                                }
                            } else {
                                reject(new Error('QR code not found'));
                            }
                        } catch (err) {
                            reject(new Error(`QR code scan error: ${getErrorMessage(err)}`));
                        } finally {
                            qrReaderDiv.remove();
                        }
                    };
                    imageData.src = reader.result as string;
                } catch (err) {
                    reject(new Error(`QR code scanner error: ${getErrorMessage(err)}`));
                    qrReaderDiv.remove();
                }
            };

            reader.onerror = () => {
                reject(new Error('File reading error'));
                qrReaderDiv.remove();
            };
        } else {
            reject(new Error('No file provided'));
        }
    });
}
