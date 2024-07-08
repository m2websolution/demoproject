export class PagerService {
  getPager(
    totalItems: number,
    currentPage: number = 1,
    googlePager: boolean = false,
    pageSize: number = 20
  ) {
    let totalPages = Math.ceil(totalItems / pageSize);
    let startPage: number;
    let endPage: number;
    let pages: any[] = [];

    // google-like paging
    if (totalPages <= 1 || !googlePager) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = Math.min(totalPages, 6); // Display up to 6 pages
      } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(1, totalPages - 5); // Display last 6 pages
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 3;
      }
    }

    // Add ellipses at the beginning if necessary
    if (startPage > 1) {
      pages.push('...');
    }

    // set number of pages, up to a maximum of 6 pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipses at the end if necessary
    if (endPage < totalPages) {
      pages.push('...');
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  }
}
