import React from 'react';

import ImageConverter from '../../utils/ converterFiles';
import { withAuth } from '../../utils/withAuth';
import { withAuthAdmin } from '../../utils/withAuthAdmin';

function Convertor() {
    return <ImageConverter />;
}

export default withAuth(withAuthAdmin(Convertor));
