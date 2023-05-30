import { Box, Grid, Skeleton } from '@mui/material';
import React from 'react';

import cn from '../style.module.scss';

function NewsSkeleton() {
    return (
        <Grid container wrap="nowrap" className={cn.skeletonWrap}>
            {Array.from(new Array(3)).map((item, index) => (
                <Box
                    key={index}
                    className={cn.skeletonContent}
                    sx={{ width: 560, marginRight: 0.5 }}
                >
                    <Box sx={{ p: 2 }}>
                        <Skeleton
                            className={cn.skeletonContentImg}
                            variant="rectangular"
                            width={342}
                            height={180}
                        />
                        <Skeleton sx={{ mt: 0.5 }} width="78%" />
                        <Skeleton sx={{ mt: 2 }} width="78%" />
                        <Skeleton width="78%" />
                        <Skeleton width="78%" />
                    </Box>
                </Box>
            ))}
        </Grid>
    );
}

export default NewsSkeleton;
