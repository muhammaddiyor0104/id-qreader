export async function urlToFile(url: string, filename: string = 'my-file', mimeType: string = 'image/jpeg'): Promise<File> {
    // Fetch the image data from the URL
    const response = await fetch(url);
    // Convert the response into a Blob
    const blob = await response.blob();
    // Create a File from the Blob
    return new File([blob], filename, { type: mimeType });
}
