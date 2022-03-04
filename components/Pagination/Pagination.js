import React from 'react';
import queryString from "query-string";
import { useRouter } from "next/router";
import { Pagination as PaginationSU } from "semantic-ui-react";

export default function Pagination(props) {
    const { totalProductos, page, limitPerPage } = props;
    const totalPages = Math.ceil(totalProductos / limitPerPage);
    const router = useRouter();
    const urlParse = queryString.parseUrl(router.asPath);

    const goToPage = (newPage) => {
        urlParse.query.page = newPage;
        const url = queryString.stringifyUrl(urlParse);
        router.push(url);
    }

    return (
        <div className="pagination">
            <PaginationSU
                size="mini"
                lastItem={ null }
                firstItem={ null }
                siblingRange={ 1 }
                boundaryRange={ 0 }
                ellipsisItem={ null }
                defaultActivePage={ page }
                totalPages={ totalPages }
                onPageChange={ (_, data) => goToPage(data.activePage) }
            />
        </div>
    )
}
