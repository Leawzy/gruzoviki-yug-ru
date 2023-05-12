import React from 'react';

import { withAuth } from '../../../utils/withAuth';
import { withAuthAdmin } from '../../../utils/withAuthAdmin';

function NewsAdd() {
    return <div />;
}

export default withAuth(withAuthAdmin(NewsAdd));
