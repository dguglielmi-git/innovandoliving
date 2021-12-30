import React from 'react';
import BasicLayout from "../layouts/BasicLayout";
import Wishlist from '../components/Wishlist';

export default function wishlist() {
    return (
        <BasicLayout className="wishlist">
            <Wishlist />
        </BasicLayout>
    )
}
