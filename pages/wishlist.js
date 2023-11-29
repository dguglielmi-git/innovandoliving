import React from 'react';
import BasicLayout from "../layouts/BasicLayout";
import WishlistComponent from '../components/Wishlist';

export default function Wishlist() {
    return (
        <BasicLayout className="wishlist">
            <WishlistComponent />
        </BasicLayout>
    )
}
