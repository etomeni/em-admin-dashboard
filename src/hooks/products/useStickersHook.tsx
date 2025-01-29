import { useCallback, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/state/userStore";
import { apiEndpoint } from "@/util/resources";
import { useSettingStore } from "@/state/settingStore";
import { stickerInterface } from "@/typeInterfaces/stickers.interface";


export function useStickersHook() {
    const accessToken = useUserStore((state) => state.accessToken);
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    const [limitNo, setLimitNo] = useState(25);
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [stickers, setStickers] = useState<stickerInterface[]>();
    const [selectedSticker, setSelectedSticker] = useState<stickerInterface>();
    

    const getAllSticker = useCallback(async (
        pageNo: number = currentPageNo, limit: number = limitNo
    ) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/sticker/all`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    page: pageNo,
                    limit: limit,
                }
            })).data;
            // console.log(response);

            if (response.statusCode == 200) {
                setStickers(response.data);

                // setTotalRecords(response.count);
                setIsSubmitting(false);
            }

            _setToastNotification({
                display: true,
                status: "info",
                message: response.message
            });
    
        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            console.log(err);
            // setUsers([]);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.length ? err[0].message : err.message || fixedErrorMsg
            });

            setApiResponse({
                display: true,
                status: false,
                message: err.errors && err.length ? err[0].message : err.message || fixedErrorMsg
            });

            setIsSubmitting(false);
        }
    }, []);

    const addNewSticker = useCallback(async (
        name: string, price: number, sticker_image: any,
        exFunc = () => {}
    ) => {
        setIsSubmitting(true);

        console.log(name);
        console.log(price);
        console.log(sticker_image);


        try {
            const response = (await axios.post(`${apiEndpoint}/admin/sticker/new`, 
                { name, price, sticker_image },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
        )).data;
            console.log(response);

            if (response.statusCode == 200) {
                // setStickers(response.data);

                // setTotalRecords(response.count);
                setIsSubmitting(false);
                exFunc()
            }

            _setToastNotification({
                display: true,
                status: "info",
                message: response.message
            });

            setApiResponse({
                display: true,
                status: true,
                message: response.message
            });
    
        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            console.log(err);
            // setUsers([]);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.length ? err[0].message : err.message || fixedErrorMsg
            });

            setApiResponse({
                display: true,
                status: false,
                message: err.errors && err.length ? err[0].message : err.message || fixedErrorMsg
            });

            setIsSubmitting(false);
        }
    }, []);

    const editSticker = useCallback(async (
        id: string, name: string, price: number, sticker_image: any,
        exFunc = () => {}
    ) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.patch(`${apiEndpoint}/admin/sticker/edit`, 
                { id, name, price, sticker_image },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
        )).data;
            console.log(response);

            if (response.statusCode == 200) {
                // setStickers(response.data);

                // setTotalRecords(response.count);
                setIsSubmitting(false);
                exFunc()
            }

            _setToastNotification({
                display: true,
                status: "info",
                message: response.message
            });
    
        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            console.log(err);
            // setUsers([]);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.length ? err[0].message : err.message || fixedErrorMsg
            });

            setApiResponse({
                display: true,
                status: false,
                message: err.errors && err.length ? err[0].message : err.message || fixedErrorMsg
            });

            setIsSubmitting(false);
        }
    }, []);

    const deleteSticker = useCallback(async (
        id: string, exFunc = () => {}
    ) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.delete(`${apiEndpoint}/admin/sticker/delete/${id}`, 
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
        )).data;
            console.log(response);

            if (response.statusCode == 200) {
                // setStickers(response.data);

                // setTotalRecords(response.count);
                setIsSubmitting(false);
                exFunc()
            }

            _setToastNotification({
                display: true,
                status: "info",
                message: response.message
            });
    
        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            console.log(err);
            // setUsers([]);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.length ? err[0].message : err.message || fixedErrorMsg
            });

            setApiResponse({
                display: true,
                status: false,
                message: err.errors && err.length ? err[0].message : err.message || fixedErrorMsg
            });

            setIsSubmitting(false);
        }
    }, []);

    const getStickerById = useCallback(async (id: string) => {
        setIsSubmitting(true);

        try {
            const response = (await axios.get(`${apiEndpoint}/admin/sticker/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            // console.log(response);

            if (response.statusCode == 200) {
                setSelectedSticker(response.data);
            }
    
            _setToastNotification({
                display: true,
                status: "info",
                message: response.message
            });
    
            setIsSubmitting(false);
        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            // console.log(err);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.length ? err[0].message : err.message || fixedErrorMsg
            });

            setIsSubmitting(false);
        }
    }, []);



    return {
        apiResponse, setApiResponse,

        limitNo, setLimitNo,
        currentPageNo, setCurrentPageNo,
        totalRecords, setTotalRecords,
        totalPages, setTotalPages,

        isSubmitting,

        stickers,
        selectedSticker, setSelectedSticker,

        getAllSticker,
        getStickerById,
        addNewSticker,
        editSticker,
        deleteSticker,
    }
}
