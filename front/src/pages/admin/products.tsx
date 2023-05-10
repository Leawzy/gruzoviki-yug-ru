import React from 'react';

import { withAuth } from '../../utils/withAuth';
import { withAuthAdmin } from '../../utils/withAuthAdmin';

function Products() {
    return <div />;
}

export default withAuth(withAuthAdmin(Products));
