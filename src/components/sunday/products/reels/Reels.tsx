import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import kolors from '@/constants/kolors';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import cloudUploadIcon from "@/assets/images/cloudUploadIcon.png";
import { convertToBase64 } from '@/util/resources';
import { themeBtnStyle } from '@/util/mui';
import { useReelsHook } from '@/hooks/products/useReelsHook';
import { Typography } from '@mui/material';

interface _Props {
    // performSearch: (searchword: string) => void
};

const numberArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

const ReelsComponent: React.FC<_Props> = ({
    // performSearch
}) => {
    const [captionInput, setCaptionInput] = useState('');
    const [reelVideoInput, setReelVideoInput] = useState<any>();
    const [reelVideoPreview, setReelVideoPreview] = useState('');

    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);

    
    const {
        reels,
        selectedReel, 
        setSelectedReel,
        _setToastNotification,

        // isSubmitting,
        getReelById,
        getAllReels,
        editReel,
        addNewReel,
        deleteReel,
    } = useReelsHook();

    useEffect(() => {
        getAllReels();
    }, []);

    useEffect(() => {
        if (selectedReel) {
            setCaptionInput(selectedReel.caption || '');
            setReelVideoPreview(selectedReel.url || '');
        }
    }, [selectedReel]);

    const [anchorMoreReelEl, setAnchorMoreReelEl] = useState<null | HTMLElement>(null);
    const openMoreReel = Boolean(anchorMoreReelEl);
    const handleClickMoreReel = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorMoreReelEl(event.currentTarget);
    };
    const handleCloseMoreReel = () => {
        setAnchorMoreReelEl(null);
    };


    const handleFileUpload = async (e: any) => {
        const file = e.target.files[0]; 
        setReelVideoInput(file);

        const base64 = await convertToBase64(file);
        // console.log(base64.result);
        setReelVideoPreview(base64.result);
    
        e.target.value = "";
    }

    const handleSubmit = () => {
        if (!captionInput) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "reels caption is required."
            });
            return;
        }

        if (!reelVideoInput) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "reels video is required."
            });

            return;
        }


        if (selectedReel && selectedReel.id) {
            editReel(
                selectedReel.id,
                captionInput,
                reelVideoInput,
                () => {}
            );
        } else {
            addNewReel(
                captionInput,
                reelVideoInput,
                () => {
    
                }
            );
        }

    }


    const togglePlayStop = (index: number) => {
        const video = videoRefs.current[index];

        if (video) {
            if (currentlyPlaying === index) {
                // If the clicked video is already playing, stop it
                video.pause();
                video.currentTime = 0;
                setCurrentlyPlaying(null);
            } else {
                // If another video is playing, stop it first
                if (currentlyPlaying !== null) {
                    const currentlyPlayingVideo = videoRefs.current[currentlyPlaying];
                    if (currentlyPlayingVideo) {
                        currentlyPlayingVideo.pause();
                        currentlyPlayingVideo.currentTime = 0;
                    }
                }
                // Play the new video
                video.play();
                // video.loop = !video.loop;
                // video.muted = !video.muted;
                setCurrentlyPlaying(index);
            }
        }
    };


    
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
            
                                        value={captionInput}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            // console.log(value);
                                            setCaptionInput(value);
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
                                reels ? 
                                    reels.length ?
                                        reels.map((item, index) => (
                                            <Box key={item.id}
                                                sx={{
                                                    width: "100px",
                                                    height: "110px",
                                                    bgcolor: "#D9D9D9",
                                                    position: "relative",
                                                    overflow: "hidden",
                                                    borderRadius: "2px"
                                                }}
                                                onClick={() => { togglePlayStop(index); }}
                                            >
                                                <Box sx={{ position: "absolute", top: 1, right: 1, zIndex: 2 }}>
                                                    <IconButton
                                                        aria-label={`MoreReel-${index}`}
                                                        id={`MoreReel-button-${index}`}
                                                        size='small'
                                                        aria-controls={openMoreReel ? `MoreReel-menu-${index}` : undefined}
                                                        aria-expanded={openMoreReel ? 'true' : undefined}
                                                        // aria-haspopup="true"
                                                        onClick={handleClickMoreReel}
                                                        sx={{
                                                            bgcolor: kolors.tertiary,
                                                            color: "#fff",
                                                            ':hover': {
                                                                bgcolor: kolors.tertiary,
                                                                color: "#fff"
                                                            }
                                                        }}
                                                    >
                                                        <MoreVertIcon />
                                                    </IconButton>

                                                    <Menu
                                                        id={`MoreReel-menu-${index}`}
                                                        MenuListProps={{
                                                            'aria-labelledby': `MoreReel-button-${index}`,
                                                        }}
                                                        anchorEl={anchorMoreReelEl}
                                                        open={openMoreReel}
                                                        onClose={handleCloseMoreReel}
                                                    >
                                                        <MenuItem 
                                                            onClick={() => {
                                                                console.log(item);
                                                                
                                                                setSelectedReel(item);
                                                                handleCloseMoreReel();

                                                                getReelById(item.id);
                                                            }}
                                                        >Edit</MenuItem>

                                                        <MenuItem 
                                                            onClick={() =>{
                                                                deleteReel(
                                                                    item.id,
                                                                    () => {
                                                                        getAllReels();
                                                                        handleCloseMoreReel();
                                                                    }
                                                                );
                                                            }}
                                                        >
                                                            <Box 
                                                                sx={{
                                                                    bgcolor: "#A80D05",
                                                                    py: "10px",
                                                                    px: "20px",
                                                                    borderRadius: "4px",
                                                                }}
                                                            >
                                                                <Typography
                                                                    sx={{
                                                                        fontWeight: "700",
                                                                        fontSize: "13px",
                                                                        color: "16px",
                                                                        textAlign: "center"
                                                                    }}
                                                                >Delete</Typography>
                                                            </Box>
                                                        </MenuItem>
                                                    </Menu>
                                                </Box>

                                                <video loop // loop autoPlay muted
                                                    src={item.url}
                                                    ref={(el) => (videoRefs.current[index] = el)}
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover",
                                                        // position: "absolute",
                                                        top: 0,
                                                        // display: item.url ? "initial" : "none"
                                                    }}
                                                />
                                            </Box>
                                        ))
                                    : 
                                    numberArray.map((_item, index) => (
                                        <Box key={index}
                                            sx={{
                                                width: "100px",
                                                height: "110px",
                                                bgcolor: "#D9D9D9",
                                            }}
                                        > </Box>
                                    ))
                                : 
                                    <Box
                                        sx={{
                                            width: "100px",
                                            height: "110px",
                                            bgcolor: "#D9D9D9",
                                        }}
                                    > </Box>
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


