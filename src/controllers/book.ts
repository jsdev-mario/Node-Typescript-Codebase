import StatusCodes from 'http-status-codes';
import axios, { AxiosInstance } from 'axios';
import { Request, Response, NextFunction } from 'express';
import constants from '@utils/constants';

const { OK, BAD_REQUEST } = StatusCodes;

// We will use many google book apis and so set Authorization to common header of Axios instance
const axiosInstance: AxiosInstance = axios.create({
    baseURL: constants.GOOGLE_BOOKS_API_URL,
});
axiosInstance.defaults.headers.common = {
    'Content-Type': 'application/json',
    Authorization: process.env.GOOGLE_BOOK_APIKEY as string,
};

/**
 * Find books
 * @param req
 * @param res
 * @param next
 * @returns
 */

const find = async (req: Request, res: Response, next: NextFunction) => {
    const { keyword, filter, skip, limit } = req.query;
    if (!keyword) return res.status(BAD_REQUEST).json({ message: '"keyword" is required.' });

    try {
        const response = await axiosInstance.get('/volumes', {
            params: {
                q: keyword,
                filter,
                startIndex: skip,
                maxResults: limit,
                // eslint-disable-next-line max-len
                fields: 'totalItems,items(id,selfLink,volumeInfo(title,authors,publisher,publishedDate,description,pageCount,mainCategory,categories,averageRating,imageLinks/smallThumbnail))',
            },
        });
        const { items, totalItems } = response.data;
        const data = items.map((item: any) => {
            return {
                id: item.id,
                selfLink: item.selfLink,
                title: item.volumeInfo?.title,
                authors: item.volumeInfo?.authors,
                publisher: item.volumeInfo?.publisher,
                publishedDate: item.volumeInfo?.publishedDate,
                description: item.volumeInfo?.description,
                pageCount: item.volumeInfo?.pageCount,
                mainCategory: item.volumeInfo?.mainCategory,
                categories: item.volumeInfo?.categories,
                averageRating: item.volumeInfo?.averageRating,
                smallThumbnail: item.volumeInfo?.imageLinks?.smallThumbnail,
            };
        });

        return res.status(OK).json({ data, totalCount: totalItems });
    } catch (error: unknown) {
        next(error);
    }
};

export default {
    find,
} as const;
