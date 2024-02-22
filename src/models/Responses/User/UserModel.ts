export interface UserModel {
    response: {
        content: [
            {
                id: number;
                name: string;
                surname: string;
                email: string;
                userImageEntityUrl: string;
                authority: string;
                status: string;
                deleted: boolean
            }
        ],
        pageable: {
            pageNumber: number,
            pageSize: number,
            sort: {
                empty: boolean,
                sorted: boolean,
                unsorted: boolean
            },
            offset: number,
            paged: boolean,
            unpaged: boolean
        },
        last: boolean,
        totalPages: number,
        totalElements: number,
        size: number,
        number: number,
        sort: {
            empty: boolean,
            sorted: boolean,
            unsorted: boolean
        },
        first: boolean,
        numberOfElements: number,
        empty: boolean
    }
}
