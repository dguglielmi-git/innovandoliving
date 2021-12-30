import React, { useState, useEffect } from "react";
import { Grid, Input } from "semantic-ui-react";
import { useRouter } from "next/router";

export default function SearchTopBar() {
    const [searchStr, setSearchStr] = useState("");
    const [load, setLoad] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (load) {
            router.push(`/search?query=${searchStr}`);
        }
        setLoad(true);
    }, [searchStr]);

    return (
        <Grid.Column width={ 4 } className="top-bar__right">
            <Input
                id="search-producto"
                icon={ { name: "search" } }
                value={ router.query.query }
                onChange={ (_, data) => setSearchStr(data.value) }
            />
        </Grid.Column>
    )
}