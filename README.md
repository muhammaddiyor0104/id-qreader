# id-qreader
id-qreader is a library designed to read and parse QR codes from Uzbekistan's ID cards.

## Installation
Ensure you have the necessary dependencies installed:

```cli
  npm install id-qreader
```

## Usage

Here's a basic example of how to use id-qreader to read QR codes from various input types (file, URL, base64) within a React component.

## Example React Component

```js
import React, { useRef, useState } from 'react';
import { onReadQRFrom } from 'id-qreader';

const QRReaderComponent = () => {
    const [result, setResult] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        onReadQRFrom('file', e.target.files[0], true)
            .then(data => setResult(data))
            .catch(err => console.error(err));
    };

    const handleURLRead = () => {
        const qrUrl = 'https://i.ibb.co/djkR0rs/image-2024-06-13-13-06-54.png';
        onReadQRFrom('url', qrUrl, true)
            .then(data => setResult(data))
            .catch(err => console.error(err));
    };

    const handleBase64Read = () => {
        const base64String = 'data:image/jpeg;base64,...';
        onReadQRFrom('base64', base64String, true)
            .then(data => setResult(data))
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h1>QR Reader</h1>

            <div>
                <h2>Read from File</h2>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} />
            </div>

            <div>
                <h2>Read from URL</h2>
                <button onClick={handleURLRead}>Read QR from URL</button>
            </div>

            <div>
                <h2>Read from Base64</h2>
                <button onClick={handleBase64Read}>Read QR from Base64</button>
            </div>

            {result && (
                <div>
                    <h2>Result</h2>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default QRReaderComponent;
```

## API
onReadQRFrom(valueType, value, isOutputParsed)
Reads a QR code from the specified input type and returns the data, either parsed or raw.

### Parameters

`valueType` (string): The type of input. Can be 'file', 'url', or 'base64'.

`value` (object or string): The value to read from. For 'file', it should be an object containing a reference to the file input element. For 'url' and 'base64', it should be a string.

`isOutputParsed` (boolean): A boolean indicating whether to return parsed data (true) or raw data (false).
