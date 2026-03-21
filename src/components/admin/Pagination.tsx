'use client';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    const pages = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    // Always show first page
    pages.push(1);

    // Show ellipsis or pages before current
    if (showEllipsisStart) {
        pages.push(-1); // -1 represents ellipsis
    } else {
        for (let i = 2; i < currentPage; i++) {
            pages.push(i);
        }
    }

    // Show current page and neighbors (if not first or last)
    if (currentPage > 1 && currentPage < totalPages) {
        if (currentPage - 1 > 1) pages.push(currentPage - 1);
        pages.push(currentPage);
        if (currentPage + 1 < totalPages) pages.push(currentPage + 1);
    }

    // Show ellipsis or pages after current
    if (showEllipsisEnd) {
        pages.push(-2); // -2 represents ellipsis
    } else {
        for (let i = currentPage + 1; i < totalPages; i++) {
            pages.push(i);
        }
    }

    // Always show last page
    if (totalPages > 1) pages.push(totalPages);

    // Remove duplicates
    const uniquePages = Array.from(new Set(pages));

    return (
        <div className="flex items-center justify-center gap-2 mt-6">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                Previous
            </button>

            <div className="flex items-center gap-1">
                {uniquePages.map((page, index) => {
                    if (page < 0) {
                        return (
                            <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">
                                ...
                            </span>
                        );
                    }

                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${page === currentPage
                                    ? 'bg-orange-600 text-white'
                                    : 'text-gray-700 hover:bg-gray-50 border border-gray-300'
                                }`}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                Next
            </button>
        </div>
    );
}
