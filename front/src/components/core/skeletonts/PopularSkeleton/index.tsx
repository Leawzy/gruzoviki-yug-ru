import { Box, Grid, Skeleton } from '@mui/material';
import React from 'react';

import cn from '../style.module.scss';

function PopularSkeleton() {
    return (
        <Grid container wrap="nowrap" className={cn.skeletonWrap}>
            {Array.from(new Array(4)).map((item, index) => (
                <Box
                    className={cn.skeletonContentImg}
                    key={index}
                    sx={{ width: 360, marginRight: 0.5 }}
                >
                    <Box sx={{ p: 2 }}>
                        <Skeleton variant="rectangular" width={242} height={180} />
                        <Skeleton sx={{ mt: 0.5 }} width="60%" />
                        <Skeleton sx={{ mt: 2 }} width="70%" />
                        <Skeleton width="60%" />
                        <Skeleton sx={{ mt: 2 }} variant="rectangular" width={242} height={60} />
                    </Box>
                </Box>
            ))}
        </Grid>
    );
}

export default PopularSkeleton;
