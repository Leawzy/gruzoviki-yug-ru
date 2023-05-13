import React from 'react';
// @ts-ignore
import ReCAPTCHA from 'react-google-recaptcha';

interface RecaptchaProps {
    onChange: (token: string | null) => void;
}

function RecaptchaComponent({ onChange }: RecaptchaProps) {
    const handleRecaptchaChange = (token: string | null) => {
        onChange(token);
    };

    return (
        <ReCAPTCHA
            sitekey="6LfhmAgmAAAAAHlUgjb-UoaQu50AnuJOfy099O9a"
            onChange={handleRecaptchaChange}
        />
    );
}

export default RecaptchaComponent;
