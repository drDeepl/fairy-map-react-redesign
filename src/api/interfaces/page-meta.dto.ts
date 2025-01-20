export interface PageMetaDto {
  /**
   * номер текущей страницы
   */
  page: number;
  /**
   * количество элементов на странице
   */
  take: number;
  /**
   * количество элементов всего
   */
  itemCount: number;
  /**
   * количество страниц
   */
  pageCount: number;
  /**
   * есть предыдущая страница
   */
  hasPreviousPage: boolean;
  /**
   * есть следующая страница
   */
  hasNextPage: boolean;
}
