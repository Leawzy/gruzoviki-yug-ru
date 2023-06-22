import React from 'react';

import MultiStepForm from '../components/features/repair/MultiStepForm';
import BaseLayout from '../components/shared/layouts/BaseLayout';
import { withAuth } from '../utils/withAuth';

function RecordRepaierPage() {
    return (
        <BaseLayout>
            <MultiStepForm />
        </BaseLayout>
    );
}

export default withAuth(RecordRepaierPage);
