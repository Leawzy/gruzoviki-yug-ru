import { Box, Grid, Skeleton } from '@mui/material';
import React from 'react';

function NewsSkeleton() {
    return (
        <Grid container wrap="nowrap">
            {Array.from(new Array(3)).map((item, index) => (
                <Box key={index} sx={{ width: 560, marginRight: 0.5 }}>
                    <Box sx={{ p: 2 }}>
                        <Skeleton variant="rectangular" width={342} height={180} />
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
