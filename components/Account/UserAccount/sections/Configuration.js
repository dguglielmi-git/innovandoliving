import React from "react";
import { useTranslation } from "react-i18next";
import { IS_OWNER } from "../../../../utils/constants";
import ChangeEmailForm from "../../ChangeEmailForm";
import ChangeNameForm from "../../ChangeNameForm";
import ChangePasswordForm from "../../ChangePasswordForm";
import SystemSettings from "../../SystemSettings/SystemSettings";

export default function Configuration(props) {
    const { user, logout, setReloadUser } = props;
    const { t } = useTranslation();

    return (
        <div className="account__configuration">
            <div className="title">
                { t('accountConfigurationTitle') }
            </div>
            <div className="data">
                <ChangeNameForm
                    user={ user }
                    logout={ logout }
                    setReloadUser={ setReloadUser }
                />
                <ChangeEmailForm
                    user={ user }
                    logout={ logout }
                    setReloadUser={ setReloadUser }
                />
                <ChangePasswordForm
                    user={ user }
                    logout={ logout }
                />
                { user?.isOwner === IS_OWNER &&
                    <SystemSettings
                        logout={ logout }
                        setReloadUser={ setReloadUser }
                    />
                }
            </div>
        </div>
    );
}