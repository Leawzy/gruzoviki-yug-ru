import React from 'react';

import MultiStepForm from '../components/features/repair/MultiStepForm';
import BaseLayout from '../components/shared/layouts/BaseLayout';

export default function RecordRepaierPage() {
    return (
        <BaseLayout>
            <h1>Запись на ремонт</h1>
            <MultiStepForm />
        </BaseLayout>
    );
}
