import axios from "axios";
import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

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
            if (!res.data.isLoggedIn) {
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
                                
                                <a className="nav-main-link" href="/escapeRoom">
                                <i className="nav-main-link-icon si si-energy" />
                                    <span className="nav-main-link-name">Escape Room</span>
                                </a>
                    </li>
                            
                            {/* <li className="nav-main-item">
                                
                                        <a className="nav-main-link" href="be_pages_generic_blank.html">
                                        <i className="nav-main-link-icon si si-energy" />
                                            <span className="nav-main-link-name">Wallet</span>
                                        </a>
                            </li> */}
                            <li className="nav-main-item">
                                
                                        <a className="nav-main-link" href="/booking">
                                        <i className="nav-main-link-icon si si-energy" />
                                            <span className="nav-main-link-name">Bookings</span>
                                        </a>
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
                           
                            {/* END Apps Modal */}
                            {/* Open Search Section (visible on smaller screens) */}
                            {/* Layout API, functionality initialized in Template._uiApiLayout() */}
                        
                            {/* END Open Search Section */}
                            {/* Search Form (visible on larger screens) */}
                           
                              
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
                                    
                                    <span className="d-none d-sm-inline-block ml-1">{user['name']}</span>
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
                            {/* Toggle Side Overlay */}
                            {/* Layout API, functionality initialized in Template._uiApiLayout() */}
                           
                            {/* END Toggle Side Overlay */}
                        </div>
                        {/* END Right Section */}
                    </div>
                    {/* END Header Content */}
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