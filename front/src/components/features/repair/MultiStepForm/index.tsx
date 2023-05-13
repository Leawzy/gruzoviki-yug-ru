import React, { useState } from 'react';

type FormData = {
    step1: {
        input1: string;
        input2: string;
    };
    step2: {
        input3: string;
        input4: string;
    };
    step3: {
        input5: string;
        input6: string;
    };
};

function MultiStepForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        step1: { input1: '', input2: '' },
        step2: { input3: '', input4: '' },
        step3: { input5: '', input6: '' },
    });

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        stepKey: keyof FormData,
        inputKey: string
    ) => {
        const { value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [stepKey]: {
                ...prevData[stepKey],
                [inputKey]: value,
            },
        }));
    };

    const handleNextStep = () => {
        setStep(prevStep => prevStep + 1);
    };

    const handlePreviousStep = () => {
        setStep(prevStep => prevStep - 1);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <h2>Step 1</h2>
                        <input
                            type="text"
                            name="input1"
                            value={formData.step1.input1}
                            onChange={event => handleInputChange(event, 'step1', 'input1')}
                        />
                        <input
                            type="text"
                            name="input2"
                            value={formData.step1.input2}
                            onChange={event => handleInputChange(event, 'step1', 'input2')}
                        />
                        <button onClick={handleNextStep}>Next</button>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h2>Step 2</h2>
                        <input
                            type="text"
                            name="input3"
                            value={formData.step2.input3}
                            onChange={event => handleInputChange(event, 'step2', 'input3')}
                        />
                        <input
                            type="text"
                            name="input4"
                            value={formData.step2.input4}
                            onChange={event => handleInputChange(event, 'step2', 'input4')}
                        />
                        <button onClick={handlePreviousStep}>Previous</button>
                        <button onClick={handleNextStep}>Next</button>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h2>Step 3</h2>
                        <input
                            type="text"
                            name="input5"
                            value={formData.step3.input5}
                            onChange={event => handleInputChange(event, 'step3', 'input5')}
                        />
                        <input
                            type="text"
                            name="input6"
                            value={formData.step3.input6}
                            onChange={event => handleInputChange(event, 'step3', 'input6')}
                        />
                        <button onClick={handlePreviousStep}>Previous</button>
                        <button onClick={handleNextStep}>Next</button>
                    </div>
                );
            case 4:
                return (
                    <div>
                        <h2>Confirmation</h2>
                        <p>Input 1: {formData.step1.input1}</p>
                        <p>Input 2: {formData.step1.input2}</p>
                        <p>Input 3: {formData.step2.input3}</p>
                        <p>Input 4: {formData.step2.input4}</p>
                        <p>Input 5: {formData.step3.input5}</p>
                        <p>Input 6: {formData.step3.input6}</p>
                        <button onClick={handlePreviousStep}>Previous</button>
                        <button type="submit">Submit</button>
                    </div>
                );
            default:
                return null;
        }
    };

    return <form onSubmit={handleSubmit}>{renderStep()}</form>;
}

export default MultiStepForm;
