import React from 'react';

import MultiStepForm from '../components/features/repair/MultiStepForm';
import BaseLayout from '../components/shared/layouts/BaseLayout';

export default function RecordRepaier() {
    return (
        <BaseLayout>
            <h1>My Page</h1>
            <MultiStepForm />
        </BaseLayout>
    );
}
