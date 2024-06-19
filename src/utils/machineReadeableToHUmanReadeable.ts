function pad(num: number): string {
    return num.toString().padStart(2, '0');
}

function parseDate(yyMMdd: string): string {
    let year = parseInt(yyMMdd.substring(0, 2));
    let month = parseInt(yyMMdd.substring(2, 4));
    let day = parseInt(yyMMdd.substring(4, 6));

    // Adjust year for 20th or 21st century
    if (year >= 0 && year <= 35) {
        year += 2000; // 00-29 corresponds to 2000-2029
    } else if (year >= 36 && year <= 99) {
        year += 1900; // 30-99 corresponds to 1930-1999
    }

    // Format date as DD.MM.YYYY
    let formattedDate = `${pad(day)}.${pad(month)}.${year}`;

    return formattedDate;
}

export const machineReadeableToHumanReadeable = (str: string): { parsedData: any, error: string | null } => {
    let lines = str.trim().split('\n');
    let parsedData: any = {};
    let error: string | null = null;

    try {
        let firstLine = lines[0].trim();
        parsedData.documentType = firstLine.substring(0, 2); // Document type (e.g., 'IU')
        parsedData.countryCode = firstLine.substring(2, 5); // Country code (e.g., 'UZB')
        parsedData.documentNumber = firstLine.substring(5, 14); // Document number (e.g., 'AD0028554')
        parsedData.personalNumber = firstLine.substring(15, 29); // Document number (e.g., 'AD0028554')

        // Parse second line
        let secondLine = lines[1].trim();
        parsedData.birthDate = parseDate(secondLine.substring(0, 6)); // Expiration date in YYMMDD format
        parsedData.expireDate = parseDate(secondLine.substring(8, 17)); // Expiration date in YYMMDD format
        parsedData.sex = secondLine[7]; // Sex (e.g., 'M' for male)

        // More fields can be parsed from the second line as needed

        let thirdLine = lines[2];
        let parts = thirdLine.split('<<');
        parsedData.lastName = parts[0]; // Surname
        // Remove special characters and trim extra spaces from given names
        let givenNames = parts[1].replace(/</g, ' ').trim();
        parsedData.firstName = givenNames; // Given names
    } catch (err) {
        error = 'Invalid document media';
    }

    return {
        parsedData,
        error
    };
};
