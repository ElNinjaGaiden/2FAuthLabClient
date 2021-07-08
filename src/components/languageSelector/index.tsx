import React, { FunctionComponent, useState } from 'react';
import { connect } from 'react-redux';
import { RootState, selectors, actions } from '../../store';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import Language from '../../models/language';

const mapStateToProps = (state: RootState) => ({
    currentLanguage: () =>
        selectors.localization.activeLanguage(state.localization),
    availableUnselectedLanguages: () =>
        selectors.localization.availableUnselectedLanguages(state.localization)
});

const mapDispatchToProps = {
    changeLanguage: (languageId: string) =>
        actions.localization.updateLanguage(languageId)
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const LanguageSelector: FunctionComponent<Props> = ({
    currentLanguage,
    changeLanguage,
    availableUnselectedLanguages
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const _currentLanguage = currentLanguage();

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageClick = (language: Language) => {
        changeLanguage(language.id);
        setAnchorEl(null);
    };
    return (
        <div>
            <Button
                color="inherit"
                aria-label="open language selector"
                onClick={handleClick}
                startIcon={<ArrowDropDown />}>
                {(_currentLanguage && _currentLanguage.name)}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {
                    availableUnselectedLanguages().map(language => (
                        <MenuItem onClick={() => handleLanguageClick(language)}>{language.name}</MenuItem>
                    ))
                }
            </Menu>
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(LanguageSelector);

