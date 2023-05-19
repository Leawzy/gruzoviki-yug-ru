import React, { useState } from 'react';

import { apiFetch, setAuthToken } from '../../../../axios/global';
import cn from './style.module.scss';

type FormData = {
    step1: {
        type: string;
        brand: string;
    };
    step2: {
        model: string;
        description: string;
    };
    step3: {
        date: string;
    };
};

function MultiStepForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        step1: { type: '', brand: '' },
        step2: { model: '', description: '' },
        step3: { date: '' },
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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setAuthToken();
        try {
            const res = await apiFetch('api/repair/create', {
                method: 'post',
                data: {
                    type: formData.step1.type,
                    brand: formData.step1.brand,
                    model: formData.step2.model,
                    description: formData.step2.description,
                    date: formData.step3.date,
                    status: 'Открыт',
                },
            });
            if (res.status === 200) {
                setFormData({
                    step1: { type: '', brand: '' },
                    step2: { model: '', description: '' },
                    step3: { date: '' },
                });
                setStep(1);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className={cn.formRepair}>
                        <h2>Шаг 1</h2>
                        <input
                            type="text"
                            name="type"
                            value={formData.step1.type}
                            onChange={event => handleInputChange(event, 'step1', 'type')}
                            placeholder="Укажите тип поломки"
                        />
                        <input
                            type="email"
                            name="brand"
                            value={formData.step1.brand}
                            onChange={event => handleInputChange(event, 'step1', 'brand')}
                            placeholder="Укажите марку автомобиля"
                        />
                        <button className={cn.formRepairNext} onClick={handleNextStep}>
                            Дальше
                        </button>
                    </div>
                );
            case 2:
                return (
                    <div className={cn.formRepair}>
                        <h2>Шаг 2</h2>
                        <input
                            type="text"
                            name="model"
                            value={formData.step2.model}
                            onChange={event => handleInputChange(event, 'step2', 'model')}
                            placeholder="Укажите свою модель автомобиля"
                        />
                        <input
                            type="text"
                            name="description"
                            value={formData.step2.description}
                            onChange={event => handleInputChange(event, 'step2', 'description')}
                            placeholder="Опишите свою проблему"
                        />
                        <div className={cn.formRepairButtons}>
                            <button onClick={handlePreviousStep}>Назад</button>
                            <button onClick={handleNextStep}>Дальше</button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className={cn.formRepair}>
                        <h2>Шаг 3</h2>
                        <input
                            type="date"
                            name="date"
                            value={formData.step3.date}
                            onChange={event => handleInputChange(event, 'step3', 'date')}
                        />
                        <div className={cn.formRepairButtons}>
                            <button onClick={handlePreviousStep}>Назад</button>
                            <button onClick={handleNextStep}>Дальше</button>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className={cn.formRepairTotal}>
                        <h2>Потвердите вписанные поля</h2>
                        <p>
                            ФИО:
                            {formData.step1.type === ''
                                ? ' Поле не заполнено'
                                : formData.step1.type}
                        </p>
                        <p>
                            E-mail:
                            {formData.step1.brand === ''
                                ? ' Поле не заполнено'
                                : formData.step1.brand}
                        </p>
                        <p>
                            Input 3:
                            {formData.step2.model === ''
                                ? ' Поле не заполнено'
                                : formData.step2.model}
                        </p>
                        <p>
                            Input 4:
                            {formData.step2.description === ''
                                ? ' Поле не заполнено'
                                : formData.step2.description}
                        </p>
                        <p>
                            Input 5:
                            {formData.step3.date === ''
                                ? ' Поле не заполнено'
                                : formData.step3.date}
                        </p>
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
