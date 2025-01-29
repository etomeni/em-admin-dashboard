import { useState } from 'react';
import Box from '@mui/material/Box';
import kolors from '@/constants/kolors';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import cloudUploadIcon from "@/assets/images/cloudUploadIcon.png";
import { convertToBase64 } from '@/util/resources';
import { themeBtnStyle } from '@/util/mui';

interface _Props {
    // performSearch: (searchword: string) => void
};

const numberArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

const ReelsComponent: React.FC<_Props> = ({
    // performSearch
}) => {
    const [reelVideoInput, setReelVideoInput] = useState('');
    const [reelVideoPreview, setReelVideoPreview] = useState('');

    const handleFileUpload = async (e: any) => {
        const file = e.target.files[0]; 
        setReelVideoInput(file);

        const base64 = await convertToBase64(file);
        // console.log(base64.result);
        setReelVideoPreview(base64.result);
    
        e.target.value = "";
    }

    const handleSubmit = () => {
        if (!reelVideoInput) {
            return "reels video is required."
        }


    }


    
    return (
        <Box
            sx={{
                border: `1px solid ${kolors.border}`,
                // bgcolor: "#fff",
                borderRadius: 2,
                p: 1.5,
                my: 3
            }}
        >
            <Grid container spacing="20px">
                <Grid size={{ xs: 12, sm: 4, md: 4 }}
                    sx={{
                        border: `1px solid ${kolors.border}`,
                        borderRadius: "4px",
                        overflow: "hidden"
                    }}
                >
                    <Box sx={{position: "relative"}}>
                        <Stack height="470px" alignItems="center" justifyContent="center">
                            <Box mt="auto">
                                <Box sx={{ position: "relative", zIndex: 1 }}>
                                    <img 
                                        alt='upload icon'
                                        src={cloudUploadIcon}
                                        onClick={() => {
                                            document.getElementById("reelVideo")?.click();
                                        }}
                                        style={{
                                            width: "100px",
                                            objectFit: "contain",
                                            textAlign: "center",
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box mt="auto" width="100%">
                                <Box p={2}>
                                    <TextField variant="outlined" 
                                        fullWidth
                                        type='text'
                                        placeholder='Write a caption for this post...'
                                        // label="Caption"
                                        // size='small'
                                        multiline
                                        rows={5}
                                        sx={{
                                            // ...authMuiTextFieldStyle,
                                            // maxHeight: "160px"
                                            zIndex: 1,
                                            color: kolors.primary,

                                            '& .MuiInputBase-input': { // Target input text
                                                color: reelVideoPreview ? "#fff" : kolors.dark,
                                            },

                                            '& .MuiOutlinedInput-root': {
                                                bgcolor: reelVideoPreview ? "#00000080" : "#ffffff80",
                                                // color: "#fff"
                                            }

                                        }}
            
                                        // value={messageInput}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            console.log(value);
                                            // setMessageInput(value);
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Stack>

                        <video loop autoPlay
                            src={reelVideoPreview}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                position: "absolute",
                                top: 0,
                                display: reelVideoPreview ? "initial" : "none"
                            }}
                        />

                        <Box
                            sx={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                display: reelVideoPreview ? "initial" : "none"
                            }}
                        >
                            <Button variant="contained" size='small'
                                type="button"
                                onClick={() => { handleSubmit() }}
                                
                                sx={{
                                    ...themeBtnStyle,
                                    fontSize: "15px",
                                    fontWeight: "400",
                                    // lineHeight: 14.52px;
                                }}
                            > Upload </Button>
                        </Box>

                    </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 8, md: 8 }}>
                    <Box>
                        <Stack direction="row" gap="10px" flexWrap="wrap"
                            alignItems="center"
                        >
                            {
                                numberArray.map((_item, index) => (
                                    <Box key={index}
                                        sx={{
                                            width: "100px",
                                            height: "110px",
                                            bgcolor: "#D9D9D9",
                                        }}
                                    >

                                    </Box>
                                ))
                            }
                        </Stack>

                    </Box>
                </Grid>
            </Grid>

                       
            <input 
                type="file" 
                id='reelVideo' 
                name="reelVideo" 
                accept='video/*' 
                onChange={handleFileUpload}
                style={{display: "none"}}
            />
        </Box>
    )
}

export default ReelsComponent;


