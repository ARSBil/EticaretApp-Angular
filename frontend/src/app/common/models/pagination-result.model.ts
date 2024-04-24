export class PaginationResultModel<T> {
    datas: T;
    pageNumber: number = 1;
    pageSize: number = 10;
    isFirstPage: boolean = true;
    isLastPage: boolean = false;
    totalPageCount: number = 0;
}