import React from "react";
import OrderAdmin from "./OrderAdmin";
import { render, screen, within, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';

beforeEach(() => render(<OrderAdmin />));

describe('Checking structure of the page My Order as an Owner', () => {

    it('Tab actions available must be Active Orders and Closed Order', async () => {
        const tabs = await screen.findByRole('tablist');

        expect(within(tabs).getByText(/active orders/i)).toBeInTheDocument();
        expect(within(tabs).getByText(/closed orders/i)).toBeInTheDocument();
    });

    it('It must exist a Table for listing Orders', () => {
        expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it(`Headers's table  must be: Date, Order, Total Order, Status, Unread Msgs`, () => {
        const table = screen.getByRole('table');

        expect(within(table).getByText(/date/i)).toBeInTheDocument();
        expect(within(table).getByText(/order #/i)).toBeInTheDocument();
        expect(within(table).getByText(/total order/i)).toBeInTheDocument();
        expect(within(table).getByText(/status/i)).toBeInTheDocument();
        expect(within(table).getByText(/unread msgs/i)).toBeInTheDocument();
    });
})

describe('Verifying actions on Page', () => {

    it('When user selects Active Orders, table headers must be: Date, Order, Total Order, Status, Unread Msgs, Actions', async () => {
        window.HTMLElement.prototype.scrollIntoView = function () { };
        const tabs = await screen.findByRole('tablist');

        fireEvent.click(within(tabs).getByText(/active orders/i))

        const table = screen.getByRole('table');

        expect(within(table).getByText(/date/i)).toBeInTheDocument();
        expect(within(table).getByText(/order #/i)).toBeInTheDocument();
        expect(within(table).getByText(/total order/i)).toBeInTheDocument();
        expect(within(table).getByText(/status/i)).toBeInTheDocument();
        expect(within(table).getByText(/unread msgs/i)).toBeInTheDocument();
    });

    it('When user selects Closed Orders, table headers must be: Date, Order, Total Order', async () => {
        window.HTMLElement.prototype.scrollIntoView = function () { };
        const tabs = await screen.findByRole('tablist');

        fireEvent.click(await within(tabs).findByText(/closed orders/i))

        const table = screen.getByRole('table');

        expect(within(table).getByText(/date/i)).toBeInTheDocument();
        expect(within(table).getByText(/order #/i)).toBeInTheDocument();
        expect(within(table).getByText(/total order/i)).toBeInTheDocument();
        expect(within(table).queryByText(/status/i)).not.toBeInTheDocument();
        expect(within(table).queryByText(/unread msgs/i)).not.toBeInTheDocument();
    });

    it('When user clicks on Details Button must access to Details Page', async () => {

    });

})