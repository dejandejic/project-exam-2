import React, { Fragment, useEffect, useState } from "react";
import SidebarWrapper from "./sidebar.style";
import Radium from "radium";
import NavList from "components/sidebar/NavList";
import {
  Home,
  Settings,
  Sliders,
  UserPlus,
  Users,
  // Calendar,
  Folder,
  X,
  Calendar,
  User,
  UserX,
  Feather
} from "react-feather";
// import sidebarData from "util/data/sidebar";
import { Scrollbars } from "react-custom-scrollbars";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import AuthActions from "redux/auth/actions";

const { setuser } = AuthActions;

const Sidebar = props => {
  let listNameStyle;
  let sidebar;
  let sideScrollStyle;

  const {
    mini,
    drawerWidth,
    miniDrawerWidth,
    onMouseEnter,
    onMouseLeave,
    sidebarTheme,
    layoutTheme,
    closeDrawer,
    user,
    token,
    workflowData
  } = props;

  const [sidebarArr, setSideBarArr] = useState([]);
  const sidebarData = [
    {
      name: "Home",
      routepath: "/Intro",
      icon: <Home />,
      module: "home"
    },
    {
      name: "Contact",
      routepath: "/contacts",
      icon: <UserX />,
      module: "home"
    },
    {
      name: "Feedbacks",
      routepath: "/feedbacks",
      icon: <Feather />,
      module: "home"
    }
  ];

  useEffect(() => {
    getWorkFlowData();
    // eslint-disable-next-line
  }, [workflowData]);

  const getWorkFlowData = () => {
    setSideBarArr(
      workflowData.map(x => ({
        listname: x.name,
        module: "group_" + x.id,
        icon: <Folder />,
        child: x.child.map(c => ({
          listname: c.name,
          routepath: `/customer-entries/${x.id}/${c.id}/list`,
          shortname: "ST",
          module: "group_" + x.id + "_status_" + c.id
        }))
      }))
    );
    // setGroupStatusHirachy(sideBarArr);
    // sideBarData = sideBarArr;
  };

  sideScrollStyle = {
    zIndex: 5,
    height: "calc(100vh - 130px)"
  };

  // if (
  //     themeSetting.toolbarAlignValue === "above" &&
  //     themeSetting.footerAlignValue === "above"
  // ) {
  //     sideScrollStyle = {
  //         zIndex: 5,
  //         height: "calc(100vh - 190px)",
  //     };
  // } else if (themeSetting.toolbarAlignValue === "above") {
  //     sideScrollStyle = {
  //         zIndex: 5,
  //         height: "calc(100vh - 145px)",
  //     };
  // } else if (themeSetting.footerAlignValue === "above") {
  //     sideScrollStyle = {
  //         zIndex: 5,
  //         height: "calc(100vh - 128px)",
  //     };
  // } else {
  //     sideScrollStyle = {
  //         zIndex: 5,
  //         height: "calc(100vh - 100px)",
  //     };
  // }

  sidebar = {
    width: mini ? miniDrawerWidth : drawerWidth,
    // background: sidebarTheme.backgroundColor,
    background: "#fff",
    "@media (max-width: 991.98px)": {
      width: mini ? 0 : drawerWidth
    }
  };

  // if (themeSetting.sidebarTransParentValue === "on") {
  //     sidebar = {
  //         backgroundImage: `linear-gradient(0deg,rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.9)),url(${themeSetting.transparentImage})`,
  //         backgroundRepeat: "no-repeat, repeat",
  //         backgroundPosition: "center",
  //         backgroundSize: "cover",
  //         width: mini ? miniDrawerWidth : drawerWidth,
  //         "@media (max-width: 991.98px)": {
  //             width: mini ? 0 : drawerWidth,
  //         },
  //     };
  // } else {

  // }

  const closeIcon = {
    "@media (max-width: 991.98px)": {
      display: "block"
    }
  };

  if (mini) {
    listNameStyle = {
      opacity: miniDrawerWidth === drawerWidth ? 1 : 0,
      transform:
        miniDrawerWidth === drawerWidth
          ? "translateZ(0)"
          : "translate3d(-25px,0,0)"
    };
  } else {
    listNameStyle = {
      opacity: !mini ? 1 : 0,
      transform: !mini ? "translateZ(0)" : "translate3d(-25px,0,0)"
    };
  }
  const trialNav = {
    whiteSpace: "pre-wrap"
  };

  return (
    <SidebarWrapper
      // themeSetting={themeSetting}
      sidebarTheme={sidebarTheme}
      layoutTheme={layoutTheme}
      mini={mini}
      miniDrawerWidth={miniDrawerWidth}
      drawerWidth={drawerWidth}
    >
      {!mini && <div className="sidebar-overlay" onClick={closeDrawer()}></div>}
      <div
        id="sidebar"
        className={`sidebar sideBack ${
          mini ? "sidebar-collapsed" : "sidebar-expand"
        }`}
        style={sidebar}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="sidebar-header">
          <NavLink to={"/"} className="simple-text">
            <div className="logo-img">
              {/* <img src={logoImage} alt="img-fluid react-logo" /> */}
              <h1 className="text-dark">Zonzo</h1>
            </div>
          </NavLink>
          {/* <div className="logo-text simple-text fs-20 bold-text">{AppName}</div> */}
        </div>
        <div
          className="close-drawer-icon"
          style={closeIcon}
          onClick={closeDrawer()}
        >
          {/* <i className="fas fa-times-circle" /> */}
          <X />
        </div>
        <Scrollbars
          autoHide
          style={sideScrollStyle}
          renderThumbVertical={({ style, ...props }) => (
            <div {...props} className="sidebar-scrollbar-style" />
          )}
          renderThumbHorizontal={({ style, ...props }) => <div {...props} />}
          renderTrackVertical={({ style, ...props }) => (
            <div
              {...props}
              style={{
                ...style,
                zIndex: 5,
                position: "absolute",
                width: "6px",
                right: "2px",
                bottom: "2px",
                top: "2px",
                borderRadius: "3px"
              }}
            />
          )}
        >
          <div className="sidebar-wrapper">
            <ul className="nav">
              {sidebarData.map((list, i) => {
                return (
                  <Fragment key={i}>
                    {list.type && list.type === "heading" ? (
                      (!mini || miniDrawerWidth === drawerWidth) && (
                        <div className="sidelist-header-name">
                          {
                            <Fragment>
                              {list.name} - 1
                              {list.hasOwnProperty("isNew") && list["isNew"] && (
                                <span
                                  style={{
                                    right: "23px"
                                  }}
                                  className="new-update-tag fs-13 bold-text"
                                >
                                  New
                                </span>
                              )}
                            </Fragment>
                          }
                        </div>
                      )
                    ) : (
                      <NavList
                        listNameStyle={listNameStyle}
                        list={list}
                        mini={mini}
                        miniDrawerWidth={miniDrawerWidth}
                        drawerWidth={drawerWidth}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        {...props}
                      />
                    )}
                  </Fragment>
                );
              })}
            </ul>
          </div>
        </Scrollbars>
      </div>
    </SidebarWrapper>
  );
};

const mapStatetoProps = state => {
  return {
    token: state.auth.accessToken,
    user: state.auth.user,
    workflowData: state.navigation.workflowData,
    isSubscriptionSuccess: state.navigation.isSubscriptionSuccess
  };
};
// export default Radium(Sidebar);
export default connect(mapStatetoProps, { setuser })(Radium(Sidebar));
