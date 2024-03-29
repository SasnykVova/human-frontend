import React from 'react';
import s from './ShortMenu.module.scss';
import { NavLink } from 'react-router-dom';
import './ShortMenu.scss';
import { ReactComponent as Dashboard } from '../../../assets/icon/navbarIcon/dashboard.svg';
import { ReactComponent as Message } from '../../../assets/icon/navbarIcon/messageText.svg';
import { ReactComponent as Jobs } from '../../../assets/icon/navbarIcon/job.svg';
import { ReactComponent as DashboardRec } from '../../../assets/icon/navbarIcon/dashboardRec.svg';
import { ReactComponent as Employee } from '../../../assets/icon/navbarIcon/employee.svg';
import { useTranslation } from 'react-i18next';

const ShortMenu = () => {

    const { t } = useTranslation();

    return (
        <div className={s.navbar}>
            <div className={s.wrapper}>
            <div className={s.menu}></div>
            <nav id="sidebar-shortMenu" className='shortMenu__nav navshortMenu'>
                <ul className='shortMenu__list listShortMenu'>
                    <NavLink to={'/'} className='shortMenu__itemLink itemLinkShortMenu'>
                        <div className='toolTip'>{t("navBar.dashboard")}</div>
                        <Dashboard className='shortMenu__icon icon' width="24" height="24" />
                    </NavLink>
                    <NavLink to={'/profile/details'} className='shortMenu__itemLink itemLinkShortMenu'>
                         <div className='toolTip'>{t("navBar.profile")}</div>
                        <Message className='shortMenu__icon icon' width="24" height="24" />
                    </NavLink>
                </ul>
            </nav>
            <div className={s.recruitment}></div>
            <nav id="sidebar-shortMenuRecruitment" className='shortMenuRecruitment__nav navshortMenu'>
                <ul className='shortMenuRecruitment__list listShortMenu'>
                    <NavLink to={'/jobs/all'} className='shortMenuRecruitment__itemLink itemLinkShortMenu'>
                        <div className='toolTip'>{t("navBar.vacancies")}</div>
                        <Jobs className='shortMenu__icon icon' width="24" height="24" />
                    </NavLink>
                    <NavLink to={'/candidates'} className='shortMenuRecruitment__itemLink itemLinkShortMenu'>
                        <div className='toolTip'>{t("navBar.candidates")}</div>
                        <DashboardRec className='shortMenu__icon icon' width="24" height="24" />
                    </NavLink>
                </ul>
            </nav>
            <div className={s.organization}></div>
            <nav id="sidebar-shortMenuOrganization" className='shortMenuOrganization__nav navshortMenu'>
                <ul className='shortMenuOrganization__list listShortMenu'>
                    <NavLink to={'/employees'} className='shortMenuOrganization__itemLink itemLinkShortMenu'>
                        <div className='toolTip'>{t("navBar.employees")}</div>
                        <Employee className='shortMenu__icon icon' width="24" height="24" />
                    </NavLink>
                </ul>
            </nav>
            </div>
        </div>
    );
}

export default ShortMenu;
