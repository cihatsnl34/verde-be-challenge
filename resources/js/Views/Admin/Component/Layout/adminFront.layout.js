import axios from "axios";
import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const Layout = (props) => {
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    props.AuthStore.getToken();
    const history = useHistory();
    useEffect(() => {
        const token = (props.AuthStore.appState != null) ? props.AuthStore.appState.user.access_token : null;
        axios.post(`/api/authenticate`, {}, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            
            if (!res.data.isLoggedIn || !res.data.isAdmin) {
                swal('Page Not Found!', '' , 'warning');
                history.push('/login');
            }
            setUser(res.data.user);
            setIsLoggedIn(res.data.isLoggedIn);
        })
            .catch(e => {
                history.push('/login');
            });
    }, [])

    const logout = () => {

        axios.post(`/api/logout`, {}, {
            headers: {
                Authorization: 'Bearer ' + props.AuthStore.appState.user.access_token
            }
        }).then(res => console.log(res)).catch(e => console.log(e));
        props.AuthStore.removeToken();
        history.push('/login');
    }
    return (
        <>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
            />
            <title>OneUI - Bootstrap 4 Admin Template &amp; UI Framework</title>
            <meta
                name="description"
                content="OneUI - Bootstrap 4 Admin Template & UI Framework created by pixelcave and published on Themeforest"
            />
            <meta name="author" content="pixelcave" />
            <meta name="robots" content="noindex, nofollow" />
            {/* Open Graph Meta */}
            <meta
                property="og:title"
                content="OneUI - Bootstrap 4 Admin Template & UI Framework"
            />
            <meta property="og:site_name" content="OneUI" />
            <meta
                property="og:description"
                content="OneUI - Bootstrap 4 Admin Template & UI Framework created by pixelcave and published on Themeforest"
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="" />
            <meta property="og:image" content="" />
            {/* Icons */}
            {/* The following icons can be replaced with your own, they are used by desktop and mobile browsers */}
            <link rel="shortcut icon" href="assets/media/favicons/favicon.png" />
            <link
                rel="icon"
                type="image/png"
                sizes="192x192"
                href="assets/media/favicons/favicon-192x192.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="assets/media/favicons/apple-touch-icon-180x180.png"
            />
            {/* END Icons */}
            {/* Stylesheets */}
            {/* Fonts and OneUI framework */}
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400italic,600,700%7COpen+Sans:300,400,400italic,600,700"
            />
            <link rel="stylesheet" id="css-main" href="assets/css/oneui.min.css" />
            {/* You can include a specific file from css/themes/ folder to alter the default color theme of the template. eg: */}
            {/* <link rel="stylesheet" id="css-theme" href="assets/css/themes/amethyst.min.css"> */}
            {/* END Stylesheets */}
            {/* Page Container */}
            {/*
      Available classes for #page-container:

  GENERIC

      'enable-cookies'                            Remembers active color theme between pages (when set through color theme helper Template._uiHandleTheme())

  SIDEBAR & SIDE OVERLAY

      'sidebar-r'                                 Right Sidebar and left Side Overlay (default is left Sidebar and right Side Overlay)
      'sidebar-mini'                              Mini hoverable Sidebar (screen width > 991px)
      'sidebar-o'                                 Visible Sidebar by default (screen width > 991px)
      'sidebar-o-xs'                              Visible Sidebar by default (screen width < 992px)
      'sidebar-dark'                              Dark themed sidebar

      'side-overlay-hover'                        Hoverable Side Overlay (screen width > 991px)
      'side-overlay-o'                            Visible Side Overlay by default

      'enable-page-overlay'                       Enables a visible clickable Page Overlay (closes Side Overlay on click) when Side Overlay opens

      'side-scroll'                               Enables custom scrolling on Sidebar and Side Overlay instead of native scrolling (screen width > 991px)

  HEADER

      ''                                          Static Header if no class is added
      'page-header-fixed'                         Fixed Header

  HEADER STYLE

      ''                                          Light themed Header
      'page-header-dark'                          Dark themed Header

  MAIN CONTENT LAYOUT

      ''                                          Full width Main Content if no class is added
      'main-content-boxed'                        Full width Main Content with a specific maximum width (screen width > 1200px)
      'main-content-narrow'                       Full width Main Content with a percentage width (screen width > 1200px)
  */}
            <div
                id="page-container"
                className="sidebar-o sidebar-dark enable-page-overlay side-scroll page-header-fixed"
            >
                {/* Side Overlay*/}
                <aside id="side-overlay" className="font-size-sm">
                    {/* Side Header */}
                    <div className="content-header border-bottom">
                        {/* User Avatar */}
                        <a className="img-link mr-1" href="javascript:void(0)">
                            <img
                                className="img-avatar img-avatar32"
                                src="assets/media/avatars/avatar10.jpg"
                                alt=""
                            />
                        </a>
                        {/* END User Avatar */}
                        {/* User Info */}
                        <div className="ml-2">
                            <a className="link-fx text-dark font-w600" href="javascript:void(0)">
                                Adam McCoy
                            </a>
                        </div>
                        {/* END User Info */}
                        {/* Close Side Overlay */}
                        {/* Layout API, functionality initialized in Template._uiApiLayout() */}
                        <a
                            className="ml-auto btn btn-sm btn-dual"
                            href="javascript:void(0)"
                            data-toggle="layout"
                            data-action="side_overlay_close"
                        >
                            <i className="fa fa-fw fa-times text-danger" />
                        </a>
                        {/* END Close Side Overlay */}
                    </div>
                    {/* END Side Header */}
                    {/* Side Content */}
                    <div className="content-side">
                        {/* Side Overlay Tabs */}
                        <div className="block block-transparent pull-x pull-t">
                            <ul
                                className="nav nav-tabs nav-tabs-alt nav-justified"
                                data-toggle="tabs"
                                role="tablist"
                            >
                                <li className="nav-item">
                                    <a className="nav-link active" href="#so-overview">
                                        <i className="fa fa-fw fa-coffee text-gray mr-1" /> Overview
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#so-sales">
                                        <i className="fa fa-fw fa-chart-line text-gray mr-1" /> Sales
                                    </a>
                                </li>
                            </ul>
                            <div className="block-content tab-content overflow-hidden">
                                {/* Overview Tab */}
                                <div
                                    className="tab-pane pull-x fade fade-left show active"
                                    id="so-overview"
                                    role="tabpanel"
                                >
                                    {/* Activity */}
                                    <div className="block">
                                        <div className="block-header block-header-default">
                                            <h3 className="block-title">Recent Activity</h3>
                                            <div className="block-options">
                                                <button
                                                    type="button"
                                                    className="btn-block-option"
                                                    data-toggle="block-option"
                                                    data-action="state_toggle"
                                                    data-action-mode="demo"
                                                >
                                                    <i className="si si-refresh" />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn-block-option"
                                                    data-toggle="block-option"
                                                    data-action="content_toggle"
                                                />
                                            </div>
                                        </div>
                                        <div className="block-content">
                                            {/* Activity List */}
                                            <ul className="nav-items mb-0">
                                                <li>
                                                    <a
                                                        className="text-dark media py-2"
                                                        href="javascript:void(0)"
                                                    >
                                                        <div className="mr-3 ml-2">
                                                            <i className="si si-wallet text-success" />
                                                        </div>
                                                        <div className="media-body">
                                                            <div className="font-w600">New sale ($15)</div>
                                                            <div className="text-success">Admin Template</div>
                                                            <small className="text-muted">3 min ago</small>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        className="text-dark media py-2"
                                                        href="javascript:void(0)"
                                                    >
                                                        <div className="mr-3 ml-2">
                                                            <i className="si si-pencil text-info" />
                                                        </div>
                                                        <div className="media-body">
                                                            <div className="font-w600">You edited the file</div>
                                                            <div className="text-info">
                                                                <i className="fa fa-file-text" /> Documentation.doc
                                                            </div>
                                                            <small className="text-muted">15 min ago</small>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        className="text-dark media py-2"
                                                        href="javascript:void(0)"
                                                    >
                                                        <div className="mr-3 ml-2">
                                                            <i className="si si-close text-danger" />
                                                        </div>
                                                        <div className="media-body">
                                                            <div className="font-w600">Project deleted</div>
                                                            <div className="text-danger">Line Icon Set</div>
                                                            <small className="text-muted">4 hours ago</small>
                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>
                                            {/* END Activity List */}
                                        </div>
                                    </div>
                                    {/* END Activity */}
                                    {/* Online Friends */}
                                    <div className="block">
                                        <div className="block-header block-header-default">
                                            <h3 className="block-title">Online Friends</h3>
                                            <div className="block-options">
                                                <button
                                                    type="button"
                                                    className="btn-block-option"
                                                    data-toggle="block-option"
                                                    data-action="state_toggle"
                                                    data-action-mode="demo"
                                                >
                                                    <i className="si si-refresh" />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn-block-option"
                                                    data-toggle="block-option"
                                                    data-action="content_toggle"
                                                />
                                            </div>
                                        </div>
                                        <div className="block-content">
                                            {/* Users Navigation */}
                                            <ul className="nav-items mb-0">
                                                <li>
                                                    <a className="media py-2" href="javascript:void(0)">
                                                        <div className="mr-3 ml-2 overlay-container overlay-bottom">
                                                            <img
                                                                className="img-avatar img-avatar48"
                                                                src="assets/media/avatars/avatar3.jpg"
                                                                alt=""
                                                            />
                                                            <span className="overlay-item item item-tiny item-circle border border-2x border-white bg-success" />
                                                        </div>
                                                        <div className="media-body">
                                                            <div className="font-w600">Helen Jacobs</div>
                                                            <div className="font-w400 text-muted">Copywriter</div>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="media py-2" href="javascript:void(0)">
                                                        <div className="mr-3 ml-2 overlay-container overlay-bottom">
                                                            <img
                                                                className="img-avatar img-avatar48"
                                                                src="assets/media/avatars/avatar10.jpg"
                                                                alt=""
                                                            />
                                                            <span className="overlay-item item item-tiny item-circle border border-2x border-white bg-success" />
                                                        </div>
                                                        <div className="media-body">
                                                            <div className="font-w600">Ryan Flores</div>
                                                            <div className="font-w400 text-muted">
                                                                Web Developer
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="media py-2" href="javascript:void(0)">
                                                        <div className="mr-3 ml-2 overlay-container overlay-bottom">
                                                            <img
                                                                className="img-avatar img-avatar48"
                                                                src="assets/media/avatars/avatar8.jpg"
                                                                alt=""
                                                            />
                                                            <span className="overlay-item item item-tiny item-circle border border-2x border-white bg-success" />
                                                        </div>
                                                        <div className="media-body">
                                                            <div className="font-w600">Susan Day</div>
                                                            <div className="font-w400 text-muted">
                                                                Web Designer
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="media py-2" href="javascript:void(0)">
                                                        <div className="mr-3 ml-2 overlay-container overlay-bottom">
                                                            <img
                                                                className="img-avatar img-avatar48"
                                                                src="assets/media/avatars/avatar3.jpg"
                                                                alt=""
                                                            />
                                                            <span className="overlay-item item item-tiny item-circle border border-2x border-white bg-warning" />
                                                        </div>
                                                        <div className="media-body">
                                                            <div className="font-w600">Sara Fields</div>
                                                            <div className="font-w400 text-muted">
                                                                Photographer
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="media py-2" href="javascript:void(0)">
                                                        <div className="mr-3 ml-2 overlay-container overlay-bottom">
                                                            <img
                                                                className="img-avatar img-avatar48"
                                                                src="assets/media/avatars/avatar15.jpg"
                                                                alt=""
                                                            />
                                                            <span className="overlay-item item item-tiny item-circle border border-2x border-white bg-warning" />
                                                        </div>
                                                        <div className="media-body">
                                                            <div className="font-w600">Adam McCoy</div>
                                                            <div className="font-w400 text-muted">
                                                                Graphic Designer
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>
                                            {/* END Users Navigation */}
                                        </div>
                                    </div>
                                    {/* END Online Friends */}
                                    {/* Quick Settings */}
                                    <div className="block mb-0">
                                        <div className="block-header block-header-default">
                                            <h3 className="block-title">Quick Settings</h3>
                                            <div className="block-options">
                                                <button
                                                    type="button"
                                                    className="btn-block-option"
                                                    data-toggle="block-option"
                                                    data-action="content_toggle"
                                                />
                                            </div>
                                        </div>
                                        <div className="block-content">
                                            {/* Quick Settings Form */}
                                            <form
                                                action="be_pages_dashboard.html"
                                                method="POST"
                                                onSubmit="return false;"
                                            >
                                                <div className="form-group">
                                                    <p className="font-w600 mb-2">Online Status</p>
                                                    <div className="custom-control custom-switch mb-1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="so-settings-check1"
                                                            name="so-settings-check1"
                                                            defaultChecked=""
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="so-settings-check1"
                                                        >
                                                            Show your status to all
                                                        </label>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="form-group">
                                                    <p className="font-w600 mb-2">Auto Updates</p>
                                                    <div className="custom-control custom-switch mb-1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="so-settings-check2"
                                                            name="so-settings-check2"
                                                            defaultChecked=""
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="so-settings-check2"
                                                        >
                                                            Keep up to date
                                                        </label>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="form-group">
                                                    <p className="font-w600 mb-1">Application Alerts</p>
                                                    <div className="custom-control custom-switch mb-1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="so-settings-check3"
                                                            name="so-settings-check3"
                                                            defaultChecked=""
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="so-settings-check3"
                                                        >
                                                            Email Notifications
                                                        </label>
                                                    </div>
                                                    <div className="custom-control custom-switch mb-1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="so-settings-check4"
                                                            name="so-settings-check4"
                                                            defaultChecked=""
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="so-settings-check4"
                                                        >
                                                            SMS Notifications
                                                        </label>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="form-group">
                                                    <p className="font-w600 mb-1">API</p>
                                                    <div className="custom-control custom-switch mb-1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="so-settings-check5"
                                                            name="so-settings-check5"
                                                            defaultChecked=""
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="so-settings-check5"
                                                        >
                                                            Enable access
                                                        </label>
                                                    </div>
                                                </div>
                                            </form>
                                            {/* END Quick Settings Form */}
                                        </div>
                                    </div>
                                    {/* END Quick Settings */}
                                </div>
                                {/* END Overview Tab */}
                                {/* Sales Tab */}
                                <div
                                    className="tab-pane pull-x fade fade-right"
                                    id="so-sales"
                                    role="tabpanel"
                                >
                                    <div className="block mb-0">
                                        {/* Stats */}
                                        <div className="block-content">
                                            <div className="row items-push pull-t">
                                                <div className="col-6">
                                                    <div className="font-w700 text-uppercase">Sales</div>
                                                    <a
                                                        className="link-fx font-size-h3 font-w300"
                                                        href="javascript:void(0)"
                                                    >
                                                        22.030
                                                    </a>
                                                </div>
                                                <div className="col-6">
                                                    <div className="font-w700 text-uppercase">Balance</div>
                                                    <a
                                                        className="link-fx font-size-h3 font-w300"
                                                        href="javascript:void(0)"
                                                    >
                                                        $4.589,00
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        {/* END Stats */}
                                        {/* Today */}
                                        <div className="block-content block-content-full block-content-sm bg-body-light">
                                            <div className="row">
                                                <div className="col-6">
                                                    <span className="font-w600 text-uppercase">Today</span>
                                                </div>
                                                <div className="col-6 text-right">
                                                    <span className="ext-muted">$996</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="block-content">
                                            <ul className="nav-items push">
                                                <li>
                                                    <a
                                                        className="text-dark media py-2"
                                                        href="javascript:void(0)"
                                                    >
                                                        <div className="mr-3 ml-2">
                                                            <i className="fa fa-fw fa-circle text-success" />
                                                        </div>
                                                        <div className="media-body">
                                                            <div className="font-w600">New sale! + $249</div>
                                                            <small className="text-muted">3 min ago</small>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        className="text-dark media py-2"
                                                        href="javascript:void(0)"
                                                    >
                                                        <div className="mr-3 ml-2">
                                                            <i className="fa fa-fw fa-circle text-success" />
                                                        </div>
                                                        <div className="media-body">
                                                            <div className="font-w600">New sale! + $129</div>
                                                            <small className="text-muted">50 min ago</small>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        className="text-dark media py-2"
                                                        href="javascript:void(0)"
                                                    >
                                                        <div className="mr-3 ml-2">
                                                            <i className="fa fa-fw fa-circle text-success" />
                                                        </div>
                                                        <div className="media-body">
                                                            <div className="font-w600">New sale! + $119</div>
                                                            <small className="text-muted">2 hours ago</small>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        className="text-dark media py-2"
                                                        href="javascript:void(0)"
                                                    >
                                                        <div className="mr-3 ml-2">
                                                            <i className="fa fa-fw fa-circle text-success" />
                                                        </div>
                                                        <div className="media-body">
                                                            <div className="font-w600">New sale! + $499</div>
                                                            <small className="text-muted">3 hours ago</small>
                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        {/* END Today */}
                                        {/* Yesterday */}
                                        <div className="block-content block-content-full block-content-sm bg-body-light">
                                            <div className="row">
                                                <div className="col-6">
                                                    <span className="font-w600 text-uppercase">
                                                        Yesterday
                                                    </span>
                                                </div>
                                                <div className="col-6 text-right">
                                                    <span className="text-muted">$765</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="block-content">
                                            <ul className="nav-items push">
                                                <li>
                                                    <a
                                                        className="text-dark media py-2"
                                                        href="javascript:void(0)"
                                                    >
                                                        <div className="mr-3 ml-2">
                                                            <i className="fa fa-fw fa-circle text-success" />
                                                        </div>
                                                        <div className="media-body">
                                                            <div className="font-w600">New sale! + $249</div>
                                                            <small className="text-muted">26 hours ago</small>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        className="text-dark media py-2"
                                                        href="javascript:void(0)"
                                                    >
                                                        <div className="mr-3 ml-2">
                                                            <i className="fa fa-fw fa-circle text-danger" />
                                                        </div>
                                                        <div className="media-body">
                                                            <div className="font-w600">
                                                                Product Purchase - $50
                                                            </div>
                                                            <small className="text-muted">28 hours ago</small>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        className="text-dark media py-2"
                                                        href="javascript:void(0)"
                                                    >
                                                        <div className="mr-3 ml-2">
                                                            <i className="fa fa-fw fa-circle text-success" />
                                                        </div>
                                                        <div className="media-body">
                                                            <div className="font-w600">New sale! + $119</div>
                                                            <small className="text-muted">29 hours ago</small>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        className="text-dark media py-2"
                                                        href="javascript:void(0)"
                                                    >
                                                        <div className="mr-3 ml-2">
                                                            <i className="fa fa-fw fa-circle text-danger" />
                                                        </div>
                                                        <div className="media-body">
                                                            <div className="font-w600">
                                                                Paypal Withdrawal - $300
                                                            </div>
                                                            <small className="text-muted">37 hours ago</small>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        className="text-dark media py-2"
                                                        href="javascript:void(0)"
                                                    >
                                                        <div className="mr-3 ml-2">
                                                            <i className="fa fa-fw fa-circle text-success" />
                                                        </div>
                                                        <div className="media-body">
                                                            <div className="font-w600">New sale! + $129</div>
                                                            <small className="text-muted">39 hours ago</small>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        className="text-dark media py-2"
                                                        href="javascript:void(0)"
                                                    >
                                                        <div className="mr-3 ml-2">
                                                            <i className="fa fa-fw fa-circle text-success" />
                                                        </div>
                                                        <div className="media-body">
                                                            <div className="font-w600">New sale! + $119</div>
                                                            <small className="text-muted">45 hours ago</small>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        className="text-dark media py-2"
                                                        href="javascript:void(0)"
                                                    >
                                                        <div className="mr-3 ml-2">
                                                            <i className="fa fa-fw fa-circle text-success" />
                                                        </div>
                                                        <div className="media-body">
                                                            <div className="font-w600">New sale! + $499</div>
                                                            <small className="text-muted">46 hours ago</small>
                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>
                                            {/* More */}
                                            <div className="text-center">
                                                <a
                                                    className="btn btn-sm btn-light"
                                                    href="javascript:void(0)"
                                                >
                                                    <i className="fa fa-arrow-down mr-1" /> Load More..
                                                </a>
                                            </div>
                                            {/* END More */}
                                        </div>
                                        {/* END Yesterday */}
                                    </div>
                                </div>
                                {/* END Sales Tab */}
                            </div>
                        </div>
                        {/* END Side Overlay Tabs */}
                    </div>
                    {/* END Side Content */}
                </aside>
                {/* END Side Overlay */}
                {/* Sidebar */}
                {/*
          Sidebar Mini Mode - Display Helper classes

          Adding 'smini-hide' class to an element will make it invisible (opacity: 0) when the sidebar is in mini mode
          Adding 'smini-show' class to an element will make it visible (opacity: 1) when the sidebar is in mini mode
              If you would like to disable the transition animation, make sure to also add the 'no-transition' class to your element

          Adding 'smini-hidden' to an element will hide it when the sidebar is in mini mode
          Adding 'smini-visible' to an element will show it (display: inline-block) only when the sidebar is in mini mode
          Adding 'smini-visible-block' to an element will show it (display: block) only when the sidebar is in mini mode
      */}
                <nav id="sidebar" aria-label="Main Navigation">
                    {/* Side Header */}
                    <div className="content-header bg-white-5">
                        {/* Logo */}
                        <a className="font-w600 text-dual" href="index.html">
                            <i className="fa fa-circle-notch text-primary" />
                            <span className="smini-hide">
                                <span className="font-w700 font-size-h5">ne</span>{" "}
                                <span className="font-w400">4.0</span>
                            </span>
                        </a>
                        {/* END Logo */}
                        {/* Options */}
                        <div>
                            {/* Color Variations */}
                            <div className="dropdown d-inline-block ml-3">
                                <a
                                    className="text-dual font-size-sm"
                                    id="sidebar-themes-dropdown"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    href="#"
                                >
                                    <i className="si si-drop" />
                                </a>
                                <div
                                    className="dropdown-menu dropdown-menu-right font-size-sm smini-hide border-0"
                                    aria-labelledby="sidebar-themes-dropdown"
                                >
                                    {/* Color Themes */}
                                    {/* Layout API, functionality initialized in Template._uiHandleTheme() */}
                                    <a
                                        className="dropdown-item d-flex align-items-center justify-content-between"
                                        data-toggle="theme"
                                        data-theme="default"
                                        href="#"
                                    >
                                        <span>Default</span>
                                        <i className="fa fa-circle text-default" />
                                    </a>
                                    <a
                                        className="dropdown-item d-flex align-items-center justify-content-between"
                                        data-toggle="theme"
                                        data-theme="assets/css/themes/amethyst.min.css"
                                        href="#"
                                    >
                                        <span>Amethyst</span>
                                        <i className="fa fa-circle text-amethyst" />
                                    </a>
                                    <a
                                        className="dropdown-item d-flex align-items-center justify-content-between"
                                        data-toggle="theme"
                                        data-theme="assets/css/themes/city.min.css"
                                        href="#"
                                    >
                                        <span>City</span>
                                        <i className="fa fa-circle text-city" />
                                    </a>
                                    <a
                                        className="dropdown-item d-flex align-items-center justify-content-between"
                                        data-toggle="theme"
                                        data-theme="assets/css/themes/flat.min.css"
                                        href="#"
                                    >
                                        <span>Flat</span>
                                        <i className="fa fa-circle text-flat" />
                                    </a>
                                    <a
                                        className="dropdown-item d-flex align-items-center justify-content-between"
                                        data-toggle="theme"
                                        data-theme="assets/css/themes/modern.min.css"
                                        href="#"
                                    >
                                        <span>Modern</span>
                                        <i className="fa fa-circle text-modern" />
                                    </a>
                                    <a
                                        className="dropdown-item d-flex align-items-center justify-content-between"
                                        data-toggle="theme"
                                        data-theme="assets/css/themes/smooth.min.css"
                                        href="#"
                                    >
                                        <span>Smooth</span>
                                        <i className="fa fa-circle text-smooth" />
                                    </a>
                                    {/* END Color Themes */}
                                    <div className="dropdown-divider" />
                                    {/* Sidebar Styles */}
                                    {/* Layout API, functionality initialized in Template._uiApiLayout() */}
                                    <a
                                        className="dropdown-item"
                                        data-toggle="layout"
                                        data-action="sidebar_style_light"
                                        href="#"
                                    >
                                        <span>Sidebar Light</span>
                                    </a>
                                    <a
                                        className="dropdown-item"
                                        data-toggle="layout"
                                        data-action="sidebar_style_dark"
                                        href="#"
                                    >
                                        <span>Sidebar Dark</span>
                                    </a>
                                    {/* Sidebar Styles */}
                                    <div className="dropdown-divider" />
                                    {/* Header Styles */}
                                    {/* Layout API, functionality initialized in Template._uiApiLayout() */}
                                    <a
                                        className="dropdown-item"
                                        data-toggle="layout"
                                        data-action="header_style_light"
                                        href="#"
                                    >
                                        <span>Header Light</span>
                                    </a>
                                    <a
                                        className="dropdown-item"
                                        data-toggle="layout"
                                        data-action="header_style_dark"
                                        href="#"
                                    >
                                        <span>Header Dark</span>
                                    </a>
                                    {/* Header Styles */}
                                </div>
                            </div>
                            {/* END Themes */}
                            {/* Close Sidebar, Visible only on mobile screens */}
                            {/* Layout API, functionality initialized in Template._uiApiLayout() */}
                            <a
                                className="d-lg-none text-dual ml-3"
                                data-toggle="layout"
                                data-action="sidebar_close"
                                href="javascript:void(0)"
                            >
                                <i className="fa fa-times" />
                            </a>
                            {/* END Close Sidebar */}
                        </div>
                        {/* END Options */}
                    </div>
                    {/* END Side Header */}
                    {/* Side Navigation */}
                    <div className="content-side content-side-full">
                        <ul className="nav-main">
                            <li className="nav-main-item">
                                <a className="nav-main-link active" href="/">
                                    <i className="nav-main-link-icon si si-speedometer" />
                                    <span className="nav-main-link-name">Dashboard</span>
                                </a>
                            </li>
                            <li className="nav-main-heading">User Interface</li>
                            <li className="nav-main-item">
                                <a
                                    className="nav-main-link nav-main-link-submenu"
                                    data-toggle="submenu"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    href="#"
                                >
                                    <i className="nav-main-link-icon si si-energy" />
                                    <span className="nav-main-link-name">Production</span>
                                </a>
                                <ul className="nav-main-submenu">
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="/product">
                                            <span className="nav-main-link-name">Product</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="/product/create">
                                            <span className="nav-main-link-name">Product Create</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-main-item">
                                <a
                                    className="nav-main-link nav-main-link-submenu"
                                    data-toggle="submenu"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    href="#"
                                >
                                    <i className="nav-main-link-icon si si-badge" />
                                    <span className="nav-main-link-name">Category</span>
                                </a>
                                <ul className="nav-main-submenu">
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="/category">
                                            <span className="nav-main-link-name">Category</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="/category/create">
                                            <span className="nav-main-link-name">Category Create</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_ui_icons.html">
                                            <span className="nav-main-link-name">Icons</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_ui_buttons.html">
                                            <span className="nav-main-link-name">Buttons</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_ui_buttons_groups.html">
                                            <span className="nav-main-link-name">Button Groups</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_ui_dropdowns.html">
                                            <span className="nav-main-link-name">Dropdowns</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_ui_tabs.html">
                                            <span className="nav-main-link-name">Tabs</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_ui_navigation.html">
                                            <span className="nav-main-link-name">Navigation</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_ui_progress.html">
                                            <span className="nav-main-link-name">Progress</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_ui_alerts.html">
                                            <span className="nav-main-link-name">Alerts</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_ui_tooltips.html">
                                            <span className="nav-main-link-name">Tooltips</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_ui_popovers.html">
                                            <span className="nav-main-link-name">Popovers</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_ui_modals.html">
                                            <span className="nav-main-link-name">Modals</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_ui_images.html">
                                            <span className="nav-main-link-name">Images Overlay</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_ui_timeline.html">
                                            <span className="nav-main-link-name">Timeline</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_ui_animations.html">
                                            <span className="nav-main-link-name">Animations</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_ui_color_themes.html">
                                            <span className="nav-main-link-name">Color Themes</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-main-item">
                                <a
                                    className="nav-main-link nav-main-link-submenu"
                                    data-toggle="submenu"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    href="#"
                                >
                                    <i className="nav-main-link-icon si si-grid" />
                                    <span className="nav-main-link-name">Tables</span>
                                </a>
                                <ul className="nav-main-submenu">
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_tables_styles.html">
                                            <span className="nav-main-link-name">Styles</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_tables_responsive.html">
                                            <span className="nav-main-link-name">Responsive</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_tables_helpers.html">
                                            <span className="nav-main-link-name">Helpers</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_tables_pricing.html">
                                            <span className="nav-main-link-name">Pricing</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_tables_datatables.html">
                                            <span className="nav-main-link-name">DataTables</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-main-item">
                                <a
                                    className="nav-main-link nav-main-link-submenu"
                                    data-toggle="submenu"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    href="#"
                                >
                                    <i className="nav-main-link-icon si si-note" />
                                    <span className="nav-main-link-name">Forms</span>
                                </a>
                                <ul className="nav-main-submenu">
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_forms_elements.html">
                                            <span className="nav-main-link-name">Elements</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a
                                            className="nav-main-link"
                                            href="be_forms_custom_controls.html"
                                        >
                                            <span className="nav-main-link-name">Custom Controls</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_forms_layouts.html">
                                            <span className="nav-main-link-name">Layouts</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_forms_input_groups.html">
                                            <span className="nav-main-link-name">Input Groups</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_forms_plugins.html">
                                            <span className="nav-main-link-name">Plugins</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_forms_editors.html">
                                            <span className="nav-main-link-name">Editors</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_forms_validation.html">
                                            <span className="nav-main-link-name">Validation</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_forms_wizard.html">
                                            <span className="nav-main-link-name">Wizard</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-main-heading">Develop</li>
                            <li className="nav-main-item">
                                <a
                                    className="nav-main-link nav-main-link-submenu"
                                    data-toggle="submenu"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    href="#"
                                >
                                    <i className="nav-main-link-icon si si-wrench" />
                                    <span className="nav-main-link-name">Components</span>
                                </a>
                                <ul className="nav-main-submenu">
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_comp_loaders.html">
                                            <span className="nav-main-link-name">Loaders</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_comp_image_cropper.html">
                                            <span className="nav-main-link-name">Image Cropper</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_comp_appear.html">
                                            <span className="nav-main-link-name">Appear</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_comp_charts.html">
                                            <span className="nav-main-link-name">Charts</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_comp_calendar.html">
                                            <span className="nav-main-link-name">Calendar</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_comp_sliders.html">
                                            <span className="nav-main-link-name">Sliders</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a
                                            className="nav-main-link"
                                            href="be_comp_syntax_highlighting.html"
                                        >
                                            <span className="nav-main-link-name">
                                                Syntax Highlighting
                                            </span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_comp_rating.html">
                                            <span className="nav-main-link-name">Rating</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_comp_maps_google.html">
                                            <span className="nav-main-link-name">Google Maps</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_comp_maps_vector.html">
                                            <span className="nav-main-link-name">Vector Maps</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_comp_dialogs.html">
                                            <span className="nav-main-link-name">Dialogs</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_comp_notifications.html">
                                            <span className="nav-main-link-name">Notifications</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_comp_gallery.html">
                                            <span className="nav-main-link-name">Gallery</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-main-item">
                                <a
                                    className="nav-main-link nav-main-link-submenu"
                                    data-toggle="submenu"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    href="#"
                                >
                                    <i className="nav-main-link-icon si si-magic-wand" />
                                    <span className="nav-main-link-name">Layout</span>
                                </a>
                                <ul className="nav-main-submenu">
                                    <li className="nav-main-item">
                                        <a
                                            className="nav-main-link nav-main-link-submenu"
                                            data-toggle="submenu"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            href="#"
                                        >
                                            <span className="nav-main-link-name">Page</span>
                                        </a>
                                        <ul className="nav-main-submenu">
                                            <li className="nav-main-item">
                                                <a
                                                    className="nav-main-link"
                                                    href="be_layout_page_default.html"
                                                >
                                                    <span className="nav-main-link-name">Default</span>
                                                </a>
                                            </li>
                                            <li className="nav-main-item">
                                                <a
                                                    className="nav-main-link"
                                                    href="be_layout_page_flipped.html"
                                                >
                                                    <span className="nav-main-link-name">Flipped</span>
                                                </a>
                                            </li>
                                            <li className="nav-main-item">
                                                <a
                                                    className="nav-main-link"
                                                    href="be_layout_page_native_scrolling.html"
                                                >
                                                    <span className="nav-main-link-name">
                                                        Native Scrolling
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-main-item">
                                        <a
                                            className="nav-main-link nav-main-link-submenu"
                                            data-toggle="submenu"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            href="#"
                                        >
                                            <span className="nav-main-link-name">Main Content</span>
                                        </a>
                                        <ul className="nav-main-submenu">
                                            <li className="nav-main-item">
                                                <a
                                                    className="nav-main-link"
                                                    href="be_layout_content_main_full_width.html"
                                                >
                                                    <span className="nav-main-link-name">Full Width</span>
                                                </a>
                                            </li>
                                            <li className="nav-main-item">
                                                <a
                                                    className="nav-main-link"
                                                    href="be_layout_content_main_narrow.html"
                                                >
                                                    <span className="nav-main-link-name">Narrow</span>
                                                </a>
                                            </li>
                                            <li className="nav-main-item">
                                                <a
                                                    className="nav-main-link"
                                                    href="be_layout_content_main_boxed.html"
                                                >
                                                    <span className="nav-main-link-name">Boxed</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-main-item">
                                        <a
                                            className="nav-main-link nav-main-link-submenu"
                                            data-toggle="submenu"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            href="#"
                                        >
                                            <span className="nav-main-link-name">Header</span>
                                        </a>
                                        <ul className="nav-main-submenu">
                                            <li className="nav-main-heading">Fixed</li>
                                            <li className="nav-main-item">
                                                <a
                                                    className="nav-main-link"
                                                    href="be_layout_header_fixed_light.html"
                                                >
                                                    <span className="nav-main-link-name">Light</span>
                                                </a>
                                            </li>
                                            <li className="nav-main-item">
                                                <a
                                                    className="nav-main-link"
                                                    href="be_layout_header_fixed_dark.html"
                                                >
                                                    <span className="nav-main-link-name">Dark</span>
                                                </a>
                                            </li>
                                            <li className="nav-main-heading">Static</li>
                                            <li className="nav-main-item">
                                                <a
                                                    className="nav-main-link"
                                                    href="be_layout_header_static_light.html"
                                                >
                                                    <span className="nav-main-link-name">Light</span>
                                                </a>
                                            </li>
                                            <li className="nav-main-item">
                                                <a
                                                    className="nav-main-link"
                                                    href="be_layout_header_static_dark.html"
                                                >
                                                    <span className="nav-main-link-name">Dark</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-main-item">
                                        <a
                                            className="nav-main-link nav-main-link-submenu"
                                            data-toggle="submenu"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            href="#"
                                        >
                                            <span className="nav-main-link-name">Sidebar</span>
                                        </a>
                                        <ul className="nav-main-submenu">
                                            <li className="nav-main-item">
                                                <a
                                                    className="nav-main-link"
                                                    href="be_layout_sidebar_mini.html"
                                                >
                                                    <span className="nav-main-link-name">Mini</span>
                                                </a>
                                            </li>
                                            <li className="nav-main-item">
                                                <a
                                                    className="nav-main-link"
                                                    href="be_layout_sidebar_light.html"
                                                >
                                                    <span className="nav-main-link-name">Light</span>
                                                </a>
                                            </li>
                                            <li className="nav-main-item">
                                                <a
                                                    className="nav-main-link"
                                                    href="be_layout_sidebar_dark.html"
                                                >
                                                    <span className="nav-main-link-name">Dark</span>
                                                </a>
                                            </li>
                                            <li className="nav-main-item">
                                                <a
                                                    className="nav-main-link"
                                                    href="be_layout_sidebar_hidden.html"
                                                >
                                                    <span className="nav-main-link-name">Hidden</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-main-item">
                                        <a
                                            className="nav-main-link nav-main-link-submenu"
                                            data-toggle="submenu"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            href="#"
                                        >
                                            <span className="nav-main-link-name">Side Overlay</span>
                                        </a>
                                        <ul className="nav-main-submenu">
                                            <li className="nav-main-item">
                                                <a
                                                    className="nav-main-link"
                                                    href="be_layout_side_overlay_visible.html"
                                                >
                                                    <span className="nav-main-link-name">Visible</span>
                                                </a>
                                            </li>
                                            <li className="nav-main-item">
                                                <a
                                                    className="nav-main-link"
                                                    href="be_layout_side_overlay_mode_hover.html"
                                                >
                                                    <span className="nav-main-link-name">Hover Mode</span>
                                                </a>
                                            </li>
                                            <li className="nav-main-item">
                                                <a
                                                    className="nav-main-link"
                                                    href="be_layout_side_overlay_no_page_overlay.html"
                                                >
                                                    <span className="nav-main-link-name">
                                                        No Page Overlay
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_layout_api.html">
                                            <span className="nav-main-link-name">API</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-main-item">
                                <a
                                    className="nav-main-link nav-main-link-submenu"
                                    data-toggle="submenu"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    href="#"
                                >
                                    <i className="nav-main-link-icon si si-puzzle" />
                                    <span className="nav-main-link-name">Multi Level Menu</span>
                                </a>
                                <ul className="nav-main-submenu">
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="#">
                                            <span className="nav-main-link-name">Link 1-1</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="#">
                                            <span className="nav-main-link-name">Link 1-2</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a
                                            className="nav-main-link nav-main-link-submenu"
                                            data-toggle="submenu"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            href="#"
                                        >
                                            <span className="nav-main-link-name">Sub Level 2</span>
                                        </a>
                                        <ul className="nav-main-submenu">
                                            <li className="nav-main-item">
                                                <a className="nav-main-link" href="#">
                                                    <span className="nav-main-link-name">Link 2-1</span>
                                                </a>
                                            </li>
                                            <li className="nav-main-item">
                                                <a className="nav-main-link" href="#">
                                                    <span className="nav-main-link-name">Link 2-2</span>
                                                </a>
                                            </li>
                                            <li className="nav-main-item">
                                                <a
                                                    className="nav-main-link nav-main-link-submenu"
                                                    data-toggle="submenu"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                    href="#"
                                                >
                                                    <span className="nav-main-link-name">Sub Level 3</span>
                                                </a>
                                                <ul className="nav-main-submenu">
                                                    <li className="nav-main-item">
                                                        <a className="nav-main-link" href="#">
                                                            <span className="nav-main-link-name">Link 3-1</span>
                                                        </a>
                                                    </li>
                                                    <li className="nav-main-item">
                                                        <a className="nav-main-link" href="#">
                                                            <span className="nav-main-link-name">Link 3-2</span>
                                                        </a>
                                                    </li>
                                                    <li className="nav-main-item">
                                                        <a
                                                            className="nav-main-link nav-main-link-submenu"
                                                            data-toggle="submenu"
                                                            aria-haspopup="true"
                                                            aria-expanded="false"
                                                            href="#"
                                                        >
                                                            <span className="nav-main-link-name">
                                                                Sub Level 4
                                                            </span>
                                                        </a>
                                                        <ul className="nav-main-submenu">
                                                            <li className="nav-main-item">
                                                                <a className="nav-main-link" href="#">
                                                                    <span className="nav-main-link-name">
                                                                        Link 4-1
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li className="nav-main-item">
                                                                <a className="nav-main-link" href="#">
                                                                    <span className="nav-main-link-name">
                                                                        Link 4-2
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li className="nav-main-item">
                                                                <a
                                                                    className="nav-main-link nav-main-link-submenu"
                                                                    data-toggle="submenu"
                                                                    aria-haspopup="true"
                                                                    aria-expanded="false"
                                                                    href="#"
                                                                >
                                                                    <span className="nav-main-link-name">
                                                                        Sub Level 5
                                                                    </span>
                                                                </a>
                                                                <ul className="nav-main-submenu">
                                                                    <li className="nav-main-item">
                                                                        <a className="nav-main-link" href="#">
                                                                            <span className="nav-main-link-name">
                                                                                Link 5-1
                                                                            </span>
                                                                        </a>
                                                                    </li>
                                                                    <li className="nav-main-item">
                                                                        <a className="nav-main-link" href="#">
                                                                            <span className="nav-main-link-name">
                                                                                Link 5-2
                                                                            </span>
                                                                        </a>
                                                                    </li>
                                                                    <li className="nav-main-item">
                                                                        <a
                                                                            className="nav-main-link nav-main-link-submenu"
                                                                            data-toggle="submenu"
                                                                            aria-haspopup="true"
                                                                            aria-expanded="false"
                                                                            href="#"
                                                                        >
                                                                            <span className="nav-main-link-name">
                                                                                Sub Level 6
                                                                            </span>
                                                                        </a>
                                                                        <ul className="nav-main-submenu">
                                                                            <li className="nav-main-item">
                                                                                <a className="nav-main-link" href="#">
                                                                                    <span className="nav-main-link-name">
                                                                                        Link 6-1
                                                                                    </span>
                                                                                </a>
                                                                            </li>
                                                                            <li className="nav-main-item">
                                                                                <a className="nav-main-link" href="#">
                                                                                    <span className="nav-main-link-name">
                                                                                        Link 6-2
                                                                                    </span>
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-main-heading">Pages</li>
                            <li className="nav-main-item">
                                <a
                                    className="nav-main-link nav-main-link-submenu"
                                    data-toggle="submenu"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    href="#"
                                >
                                    <i className="nav-main-link-icon si si-layers" />
                                    <span className="nav-main-link-name">Generic</span>
                                </a>
                                <ul className="nav-main-submenu">
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_pages_generic_blank.html">
                                            <span className="nav-main-link-name">Blank</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a
                                            className="nav-main-link"
                                            href="be_pages_generic_blank_block.html"
                                        >
                                            <span className="nav-main-link-name">Blank (Block)</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a
                                            className="nav-main-link"
                                            href="be_pages_generic_search.html"
                                        >
                                            <span className="nav-main-link-name">Search</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a
                                            className="nav-main-link"
                                            href="be_pages_generic_profile.html"
                                        >
                                            <span className="nav-main-link-name">Profile</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_pages_generic_inbox.html">
                                            <span className="nav-main-link-name">Inbox</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a
                                            className="nav-main-link"
                                            href="be_pages_generic_invoice.html"
                                        >
                                            <span className="nav-main-link-name">Invoice</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_pages_generic_faq.html">
                                            <span className="nav-main-link-name">FAQ</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="op_coming_soon.html">
                                            <span className="nav-main-link-name">Coming Soon</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-main-item">
                                <a
                                    className="nav-main-link nav-main-link-submenu"
                                    data-toggle="submenu"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    href="#"
                                >
                                    <i className="nav-main-link-icon si si-lock" />
                                    <span className="nav-main-link-name">Authentication</span>
                                </a>
                                <ul className="nav-main-submenu">
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_pages_auth_all.html">
                                            <span className="nav-main-link-name">All</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="op_auth_signin.html">
                                            <span className="nav-main-link-name">Sign In</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="op_auth_signup.html">
                                            <span className="nav-main-link-name">Sign Up</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="op_auth_lock.html">
                                            <span className="nav-main-link-name">Lock Screen</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="op_auth_reminder.html">
                                            <span className="nav-main-link-name">Pass Reminder</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-main-item">
                                <a
                                    className="nav-main-link nav-main-link-submenu"
                                    data-toggle="submenu"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    href="#"
                                >
                                    <i className="nav-main-link-icon si si-fire" />
                                    <span className="nav-main-link-name">Error Pages</span>
                                </a>
                                <ul className="nav-main-submenu">
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="be_pages_error_all.html">
                                            <span className="nav-main-link-name">All</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="op_error_400.html">
                                            <span className="nav-main-link-name">400</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="op_error_401.html">
                                            <span className="nav-main-link-name">401</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="op_error_403.html">
                                            <span className="nav-main-link-name">403</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="op_error_404.html">
                                            <span className="nav-main-link-name">404</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="op_error_500.html">
                                            <span className="nav-main-link-name">500</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link" href="op_error_503.html">
                                            <span className="nav-main-link-name">503</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    {/* END Side Navigation */}
                </nav>
                {/* END Sidebar */}
                {/* Header */}
                <header id="page-header">
                    {/* Header Content */}
                    <div className="content-header">
                        {/* Left Section */}
                        <div className="d-flex align-items-center">
                            {/* Toggle Sidebar */}
                            {/* Layout API, functionality initialized in Template._uiApiLayout()*/}
                            <button
                                type="button"
                                className="btn btn-sm btn-dual mr-2 d-lg-none"
                                data-toggle="layout"
                                data-action="sidebar_toggle"
                            >
                                <i className="fa fa-fw fa-bars" />
                            </button>
                            {/* END Toggle Sidebar */}
                            {/* Toggle Mini Sidebar */}
                            {/* Layout API, functionality initialized in Template._uiApiLayout()*/}
                            <button
                                type="button"
                                className="btn btn-sm btn-dual mr-2 d-none d-lg-inline-block"
                                data-toggle="layout"
                                data-action="sidebar_mini_toggle"
                            >
                                <i className="fa fa-fw fa-ellipsis-v" />
                            </button>
                            {/* END Toggle Mini Sidebar */}
                            {/* Apps Modal */}
                            {/* Opens the Apps modal found at the bottom of the page, after footer’s markup */}
                            <button
                                type="button"
                                className="btn btn-sm btn-dual mr-2"
                                data-toggle="modal"
                                data-target="#one-modal-apps"
                            >
                                <i className="si si-grid" />
                            </button>
                            {/* END Apps Modal */}
                            {/* Open Search Section (visible on smaller screens) */}
                            {/* Layout API, functionality initialized in Template._uiApiLayout() */}
                            <button
                                type="button"
                                className="btn btn-sm btn-dual d-sm-none"
                                data-toggle="layout"
                                data-action="header_search_on"
                            >
                                <i className="si si-magnifier" />
                            </button>
                            {/* END Open Search Section */}
                            {/* Search Form (visible on larger screens) */}
                            <form
                                className="d-none d-sm-inline-block"
                                action="be_pages_generic_search.html"
                                method="POST"
                            >
                                <div className="input-group input-group-sm">
                                    <input
                                        type="text"
                                        className="form-control form-control-alt"
                                        placeholder="Search.."
                                        id="page-header-search-input2"
                                        name="page-header-search-input2"
                                    />
                                    <div className="input-group-append">
                                        <span className="input-group-text bg-body border-0">
                                            <i className="si si-magnifier" />
                                        </span>
                                    </div>
                                </div>
                            </form>
                            {/* END Search Form */}
                        </div>
                        {/* END Left Section */}
                        {/* Right Section */}
                        <div className="d-flex align-items-center">
                            {/* User Dropdown */}
                            <div className="dropdown d-inline-block ml-2">
                                <button
                                    type="button"
                                    className="btn btn-sm btn-dual"
                                    id="page-header-user-dropdown"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <img
                                        className="rounded"
                                        src="assets/media/avatars/avatar10.jpg"
                                        alt="Header Avatar"
                                        style={{ width: 18 }}
                                    />
                                    <span className="d-none d-sm-inline-block ml-1">Adam</span>
                                    <i className="fa fa-fw fa-angle-down d-none d-sm-inline-block" />
                                </button>
                                <div
                                    className="dropdown-menu dropdown-menu-right p-0 border-0 font-size-sm"
                                    aria-labelledby="page-header-user-dropdown"
                                >
                                    <div className="p-3 text-center bg-primary">
                                        <img
                                            className="img-avatar img-avatar48 img-avatar-thumb"
                                            src="assets/media/avatars/avatar10.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="p-2">
                                        <h5 className="dropdown-header text-uppercase">User Options</h5>
                                        <a
                                            className="dropdown-item d-flex align-items-center justify-content-between"
                                            href="be_pages_generic_inbox.html"
                                        >
                                            <span>Inbox</span>
                                            <span>
                                                <span className="badge badge-pill badge-primary">3</span>
                                                <i className="si si-envelope-open ml-1" />
                                            </span>
                                        </a>
                                        <a
                                            className="dropdown-item d-flex align-items-center justify-content-between"
                                            href="be_pages_generic_profile.html"
                                        >
                                            <span>Profile</span>
                                            <span>
                                                <span className="badge badge-pill badge-success">1</span>
                                                <i className="si si-user ml-1" />
                                            </span>
                                        </a>
                                        <a
                                            className="dropdown-item d-flex align-items-center justify-content-between"
                                            href="javascript:void(0)"
                                        >
                                            <span>Password Settings</span>
                                            <i className="si si-settings" />
                                        </a>
                                        <div role="separator" className="dropdown-divider" />
                                        <h5 className="dropdown-header text-uppercase">Actions</h5>
                                        
                                        <a
                                            onClick={logout}
                                            className="dropdown-item d-flex align-items-center justify-content-between"
                                        >
                                            <span>Log Out</span>
                                            <i className="si si-logout ml-1" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/* END User Dropdown */}
                            {/* Notifications Dropdown */}
                            <div className="dropdown d-inline-block ml-2">
                                <button
                                    type="button"
                                    className="btn btn-sm btn-dual"
                                    id="page-header-notifications-dropdown"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <i className="si si-bell" />
                                    <span className="badge badge-primary badge-pill">6</span>
                                </button>
                                <div
                                    className="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0 border-0 font-size-sm"
                                    aria-labelledby="page-header-notifications-dropdown"
                                >
                                    <div className="p-2 bg-primary text-center">
                                        <h5 className="dropdown-header text-uppercase text-white">
                                            Notifications
                                        </h5>
                                    </div>
                                    <ul className="nav-items mb-0">
                                        <li>
                                            <a className="text-dark media py-2" href="javascript:void(0)">
                                                <div className="mr-2 ml-3">
                                                    <i className="fa fa-fw fa-check-circle text-success" />
                                                </div>
                                                <div className="media-body pr-2">
                                                    <div className="font-w600">You have a new follower</div>
                                                    <small className="text-muted">15 min ago</small>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="text-dark media py-2" href="javascript:void(0)">
                                                <div className="mr-2 ml-3">
                                                    <i className="fa fa-fw fa-plus-circle text-info" />
                                                </div>
                                                <div className="media-body pr-2">
                                                    <div className="font-w600">1 new sale, keep it up</div>
                                                    <small className="text-muted">22 min ago</small>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="text-dark media py-2" href="javascript:void(0)">
                                                <div className="mr-2 ml-3">
                                                    <i className="fa fa-fw fa-times-circle text-danger" />
                                                </div>
                                                <div className="media-body pr-2">
                                                    <div className="font-w600">
                                                        Update failed, restart server
                                                    </div>
                                                    <small className="text-muted">26 min ago</small>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="text-dark media py-2" href="javascript:void(0)">
                                                <div className="mr-2 ml-3">
                                                    <i className="fa fa-fw fa-plus-circle text-info" />
                                                </div>
                                                <div className="media-body pr-2">
                                                    <div className="font-w600">2 new sales, keep it up</div>
                                                    <small className="text-muted">33 min ago</small>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="text-dark media py-2" href="javascript:void(0)">
                                                <div className="mr-2 ml-3">
                                                    <i className="fa fa-fw fa-user-plus text-success" />
                                                </div>
                                                <div className="media-body pr-2">
                                                    <div className="font-w600">You have a new subscriber</div>
                                                    <small className="text-muted">41 min ago</small>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="text-dark media py-2" href="javascript:void(0)">
                                                <div className="mr-2 ml-3">
                                                    <i className="fa fa-fw fa-check-circle text-success" />
                                                </div>
                                                <div className="media-body pr-2">
                                                    <div className="font-w600">You have a new follower</div>
                                                    <small className="text-muted">42 min ago</small>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="p-2 border-top">
                                        <a
                                            className="btn btn-sm btn-light btn-block text-center"
                                            href="javascript:void(0)"
                                        >
                                            <i className="fa fa-fw fa-arrow-down mr-1" /> Load More..
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/* END Notifications Dropdown */}
                            {/* Toggle Side Overlay */}
                            {/* Layout API, functionality initialized in Template._uiApiLayout() */}
                            <button
                                type="button"
                                className="btn btn-sm btn-dual ml-2"
                                data-toggle="layout"
                                data-action="side_overlay_toggle"
                            >
                                <i className="fa fa-fw fa-list-ul fa-flip-horizontal" />
                            </button>
                            {/* END Toggle Side Overlay */}
                        </div>
                        {/* END Right Section */}
                    </div>
                    {/* END Header Content */}
                    {/* Header Search */}
                    <div id="page-header-search" className="overlay-header bg-white">
                        <div className="content-header">
                            <form
                                className="w-100"
                                action="be_pages_generic_search.html"
                                method="POST"
                            >
                                <div className="input-group input-group-sm">
                                    <div className="input-group-prepend">
                                        {/* Layout API, functionality initialized in Template._uiApiLayout() */}
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            data-toggle="layout"
                                            data-action="header_search_off"
                                        >
                                            <i className="fa fa-fw fa-times-circle" />
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search or hit ESC.."
                                        id="page-header-search-input"
                                        name="page-header-search-input"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* END Header Search */}
                    {/* Header Loader */}
                    {/* Please check out the Loaders page under Components category to see examples of showing/hiding it */}
                    <div id="page-header-loader" className="overlay-header bg-white">
                        <div className="content-header">
                            <div className="w-100 text-center">
                                <i className="fa fa-fw fa-circle-notch fa-spin" />
                            </div>
                        </div>
                    </div>
                    {/* END Header Loader */}
                </header>
                {/* END Header */}
                {/* Main Container */}
                <main id="main-container">
                    {/* Page Content */}
                    <div className="content content-narrow">
                    <div>{props.children}</div>
                    </div>
                    {/* END Page Content */}
                </main>
                {/* END Main Container */}
                {/* Footer */}
                <footer id="page-footer" className="bg-body-light footerAlt">
                    <div className="content py-3">
                        <div className="row font-size-sm">
                            <div className="col-sm-6 order-sm-2 py-1 text-center text-sm-right">
                                Crafted with <i className="fa fa-heart text-danger" /> by{" "}
                                <a
                                    className="font-w600"
                                    href="https://1.envato.market/ydb"
                                    target="_blank"
                                >
                                    pixelcave
                                </a>
                            </div>
                            <div className="col-sm-6 order-sm-1 py-1 text-center text-sm-left">
                                <a
                                    className="font-w600"
                                    href="https://1.envato.market/xWy"
                                    target="_blank"
                                >
                                    OneUI 4.0
                                </a>{" "}
                                © <span data-toggle="year-copy">2018</span>
                            </div>
                        </div>
                    </div>
                </footer>
                {/* END Footer */}
                {/* Apps Modal */}
                {/* Opens from the modal toggle button in the header */}
                <div
                    className="modal fade"
                    id="one-modal-apps"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="one-modal-apps"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-top modal-sm" role="document">
                        <div className="modal-content">
                            <div className="block block-themed block-transparent mb-0">
                                <div className="block-header bg-primary-dark">
                                    <h3 className="block-title">Apps</h3>
                                    <div className="block-options">
                                        <button
                                            type="button"
                                            className="btn-block-option"
                                            data-dismiss="modal"
                                            aria-label="Close"
                                        >
                                            <i className="si si-close" />
                                        </button>
                                    </div>
                                </div>
                                <div className="block-content block-content-full">
                                    <div className="row gutters-tiny">
                                        <div className="col-6">
                                            {/* CRM */}
                                            <a
                                                className="block block-rounded block-themed bg-default"
                                                href="javascript:void(0)"
                                            >
                                                <div className="block-content text-center">
                                                    <i className="si si-speedometer fa-2x text-white-75" />
                                                    <p className="font-w600 font-size-sm text-white mt-2 mb-3">
                                                        CRM
                                                    </p>
                                                </div>
                                            </a>
                                            {/* END CRM */}
                                        </div>
                                        <div className="col-6">
                                            {/* Products */}
                                            <a
                                                className="block block-rounded block-themed bg-danger"
                                                href="javascript:void(0)"
                                            >
                                                <div className="block-content text-center">
                                                    <i className="si si-rocket fa-2x text-white-75" />
                                                    <p className="font-w600 font-size-sm text-white mt-2 mb-3">
                                                        Products
                                                    </p>
                                                </div>
                                            </a>
                                            {/* END Products */}
                                        </div>
                                        <div className="col-6">
                                            {/* Sales */}
                                            <a
                                                className="block block-rounded block-themed bg-success mb-0"
                                                href="javascript:void(0)"
                                            >
                                                <div className="block-content text-center">
                                                    <i className="si si-plane fa-2x text-white-75" />
                                                    <p className="font-w600 font-size-sm text-white mt-2 mb-3">
                                                        Sales
                                                    </p>
                                                </div>
                                            </a>
                                            {/* END Sales */}
                                        </div>
                                        <div className="col-6">
                                            {/* Payments */}
                                            <a
                                                className="block block-rounded block-themed bg-warning mb-0"
                                                href="javascript:void(0)"
                                            >
                                                <div className="block-content text-center">
                                                    <i className="si si-wallet fa-2x text-white-75" />
                                                    <p className="font-w600 font-size-sm text-white mt-2 mb-3">
                                                        Payments
                                                    </p>
                                                </div>
                                            </a>
                                            {/* END Payments */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* END Apps Modal */}
            </div>
            {/* END Page Container */}
            {/*
      OneUI JS Core

      Vital libraries and plugins used in all pages. You can choose to not include this file if you would like
      to handle those dependencies through webpack. Please check out assets/_es6/main/bootstrap.js for more info.

      If you like, you could also include them separately directly from the assets/js/core folder in the following
      order. That can come in handy if you would like to include a few of them (eg jQuery) from a CDN.

      assets/js/core/jquery.min.js
      assets/js/core/bootstrap.bundle.min.js
      assets/js/core/simplebar.min.js
      assets/js/core/jquery-scrollLock.min.js
      assets/js/core/jquery.appear.min.js
      assets/js/core/js.cookie.min.js
  */}
            {/*
      OneUI JS

      Custom functionality including Blocks/Layout API as well as other vital and optional helpers
      webpack is putting everything together at assets/_es6/main/app.js
  */}
            {/* Page JS Plugins */}
            {/* Page JS Code */}
        </>
    )
}
export default inject("AuthStore")(observer(Layout));