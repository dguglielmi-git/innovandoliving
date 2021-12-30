import React from "react";
import { Dropdown } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

export default function ComboStatus(props) {
    const { handleChange, options, statusValue } = props;
    const { t } = useTranslation();

    return (
        <div className="order-combo-status">
            <Dropdown
                onChange={ handleChange }
                options={ options }
                placeholder={ t('comboStatusPlaceholder') }
                selection
                value={ statusValue }
            />
        </div>
    )
}