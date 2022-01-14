import React from 'react';
import BasicLayout from "../layouts/BasicLayout";
import Queries from "../components/Queries/Queries";

export default function questions() {
    return (
        <BasicLayout className="queries">
            <Queries />
        </BasicLayout>
    )
}
