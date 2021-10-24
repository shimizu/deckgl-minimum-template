import React from 'react';


//カード類
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

//スタック
import Stack from '@mui/material/Stack';

//ボタン
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

//アイコン
import VerticalAlignBottom from '@mui/icons-material/VerticalAlignBottom';
import ViewColumn from '@mui/icons-material/ViewColumn';

export default (props) => {

    return (
        <>
            <Card
                variant="outlined"
                sx={{
                    marginBottom:1,
                }}
            >
                <Stack direction="row" spacing={1}>
                    <IconButton aria-label="delete">
                        <ViewColumn />
                    </IconButton>
                </Stack>
            </Card>
            <Card
                variant="outlined"
            >
                <Stack direction="row" spacing={1}>
                    <IconButton aria-label="delete">
                        <VerticalAlignBottom />
                    </IconButton>
                </Stack>
            </Card>
        </>
    )
}

