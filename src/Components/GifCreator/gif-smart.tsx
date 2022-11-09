import { useEffect, useState } from 'react';
// @ts-ignore
import { IGifFileRes } from '../../Models/GifRes';
import { IPaginationDTO, PaginationDTO } from '../../Models/Pagination';
import FileService from '../../Services/Api/FileService';
import { SqlDate } from '../../Models/Date';

const useGif = () => {
    const [paginationCount, setPaginationCount] = useState<number>(0);
    const [paginationRes, setPaginationRes] = useState<null | IPaginationDTO<IGifFileRes>>(new PaginationDTO({}));
    const [rowCount, setRowCount] = useState<number>();
    const [previewUrl, setPreviewUrl] = useState<string>();
    useEffect(() => {}, []);

    const deleteGifById = async (gifId: number | undefined) => {
        if (!gifId) return;

        return await new FileService().DeleteGifById(gifId);
    };

    const getGifsPagination = async (
        payloadParam?: IPaginationDTO<IGifFileRes> | null,
        count?: number,
        rowCount?: number
    ) => {
        const payload =
            payloadParam ??
            new PaginationDTO<IGifFileRes>({
                rowCount: count || rowCount || 10,
                lastId: null,
                lastDate: null,
            });

        return await new FileService().GetGifsPagination(payload);
    };

    const addToPlaylist = (index: number, payload: IGifFileRes) => {};
    const preview = (index: number, payload: IGifFileRes) => {};

    const fetchPagination = (isNext: boolean) => {
        const currentPaginationRes = paginationRes;
        const lastEl = currentPaginationRes?.records?.length
            ? currentPaginationRes?.records[currentPaginationRes?.records?.length - 1]
            : null;
        const payload = new PaginationDTO<IGifFileRes>({
            rowCount: rowCount || 10,
            lastId: currentPaginationRes?.lastId || null,
            lastDate: currentPaginationRes?.lastDate
                ? new SqlDate({
                      Time: lastEl?.created_at?.Time ?? null,
                      Valid: lastEl?.created_at?.Valid ?? null,
                  })
                : null,
            next: isNext,
        });

        getGifsPagination(payload).then((res) => {
            res.json().then((data) => {
                if (data) {
                    setPaginationRes(data);
                }
            });
        });
    };

    const getSignedUrl = (url: string) => {
        const signedUrl = completeGetSignedUrl(url).catch(alert);
        signedUrl.then((res) => setPreviewUrl(res?.authenticatedUrl && res.authenticatedUrl));
    };

    const completeGetSignedUrl = async (url: string): Promise<{ authenticatedUrl: string }> => {
        const res = await new FileService().GetSignedUrl(url);
        if (res.status === 200) {
            const parsed: { authenticatedUrl: string } = await res.json();

            return parsed;
        }
        throw new Error(res.statusText);
    };

    const paginationNext = () => {
        fetchPagination(true);
        setPaginationCount(paginationCount + 1);
    };

    const paginationPrev = () => {
        fetchPagination(false);
        setPaginationCount(paginationCount - 1);
    };
    return {
        completeGetSignedUrl,
        getSignedUrl,
        previewUrl,
        setPreviewUrl,
        rowCount,
        setRowCount,
        paginationCount,
        paginationRes,
        setPaginationRes,
        deleteGifById,
        getGifsPagination,
        paginationPrev,
        paginationNext,
    };
};

export default useGif;
