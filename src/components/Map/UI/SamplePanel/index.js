import React from 'react';


//カード類
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

//タイポブラフィ
import Typography from '@mui/material/Typography';

export default (props) => {
    const { onClick } = props;
    
    return (
        <Card
        onClick={ onClick}
        variant="outlined"
            sx={{
                width: 300,
                height: 200,
                marginBottom: 1,
            }}
        >
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                   Panel Sample
                </Typography>
            </CardContent>
        </Card>
    )
}
