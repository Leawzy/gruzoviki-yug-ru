import React from 'react';

import AdminLayout from '../components/shared/layouts/AdminLayout';
import { withAuth } from '../utils/withAuth';
import { withAuthAdmin } from '../utils/withAuthAdmin';

function ControlPanel() {
    return <AdminLayout />;
}

export default withAuth(withAuthAdmin(ControlPanel));
