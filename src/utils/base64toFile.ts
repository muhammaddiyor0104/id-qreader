export function base64ToFile(base64: string, filename: string = 'my-file'): File {
    // Extract the content type and base64 data
    const [metadata, data] = base64.split(',');
    const mimeMatch = metadata.match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : '';

    // Decode the base64 string to binary data
    const byteString = atob(data);

    // Create an array buffer
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    // Write the binary data to the array buffer
    for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
    }

    // Create a new Blob with the array buffer and the MIME type
    const blob = new Blob([arrayBuffer], { type: mime });

    // Create a File instance from the Blob
    return new File([blob], filename, { type: mime });
}
