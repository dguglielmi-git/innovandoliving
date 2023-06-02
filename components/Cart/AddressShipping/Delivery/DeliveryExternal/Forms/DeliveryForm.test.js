import React from "react";
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import DeliveryForm from "./DeliveryForm";
import { initialValues } from "../../../Delivery/DeliveryExternal/functions/formikSchema"

beforeEach(() => {
    const formik = {
        values: initialValues(),
        errors: initialValues(),
    }

    render(<DeliveryForm formik={ formik } />)
})
describe('Check structure of DeliveryForm', () => {

    it('check required fields for transport: name, address, city, state, zipcode, comments', () => {
        const nameElem = screen.getByRole('textbox', { name: 'transport_name' })
        const addressElem = screen.getByRole('textbox', { name: 'transport_address' })
        const cityElem = screen.getByRole('textbox', { name: 'transport_city' })
        const stateElem = screen.getByRole('textbox', { name: 'transport_state' })
        const zipCodeElem = screen.getByRole('textbox', { name: 'transport_zipCode' })
        const commentsElem = screen.getByRole('textbox', { name: 'transport_comments' })


        expect(nameElem).toBeInTheDocument();
        expect(addressElem).toBeInTheDocument();
        expect(cityElem).toBeInTheDocument();
        expect(stateElem).toBeInTheDocument();
        expect(zipCodeElem).toBeInTheDocument();
        expect(commentsElem).toBeInTheDocument();
    })
})

