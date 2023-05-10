import React from 'react';

import { withAuth } from '../../../utils/withAuth';
import { withAuthAdmin } from '../../../utils/withAuthAdmin';

function CategoryChange() {
    return <div />;
}

export default withAuth(withAuthAdmin(CategoryChange));
