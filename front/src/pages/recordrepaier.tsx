import React from 'react';

import MultiStepForm from '../components/features/repair/MultiStepForm';
import BaseLayout from '../components/shared/layouts/BaseLayout';

export default function RecordRepaier() {
    return (
        <BaseLayout>
            <h1>Запись на ремонт</h1>
            <MultiStepForm />
        </BaseLayout>
    );
}
