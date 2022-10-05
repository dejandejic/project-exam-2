import React, { useState, useRef, useMemo, useEffect, Fragment } from "react";
import Sidebar from "components/sidebar/Sidebar";
import dashboardRoutes from "routes/dashboardRoutes";
import Header from "components/header/Header";
import { drawerWidth, miniDrawerWidth } from "helper/constant";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { ProtectedRoute } from "./../routes/ProtectedRoute";
import GlobalWrapper from "./global.style";
import NavigationActions from "redux/navigation/actions";

const {
  toggleSubscribeModal,
  toggleOneTimeModal,
  getNotificationData
} = NavigationActions;

const DashboardLayout = props => {
  const { user, toggleOneTimeModal, oneTimeModal } = props;

  const location = useLocation();
  const history = useHistory();
  const [mini, setMini] = useState(false);
  // const [themeDrawer, setThemeDrawer] = useState(true);
  const [layoutSettingDrawer, setLayoutSettingDrawer] = useState(true);
  const [statedrawerWidth] = useState(drawerWidth);
  const [stateminiDrawerWidth, setStateminiDrawerWidth] = useState(
    miniDrawerWidth
  );
  const mainPanel = useRef(null);
  const scrollbars = useRef(null);
  const [notifications, setNotifications] = useState([]);

  let token = localStorage.getItem("accessToken");

  useMemo(() => {
    if (scrollbars && scrollbars.current) {
      scrollbars.current.scrollToTop(0);
    }
  }, []);

  let mainPanelWidth;

  const { layoutTheme } = props;

  mainPanelWidth = {
    width: mini
      ? `calc(100% - ${miniDrawerWidth})`
      : `calc(100% - ${drawerWidth})`,
    backgroundColor: layoutTheme.backgroundColor
  };

  const drawerMiniMethod = () => {
    if (mini) {
      setMini(false);
    } else {
      setMini(true);
    }
  };

  const toggleLayoutSettingDrawer = () => {
    setLayoutSettingDrawer(!layoutSettingDrawer);
  };

  const mouseEnter = () => {
    if (mini) {
      setStateminiDrawerWidth(drawerWidth);
    }
  };

  const mouseLeave = () => {
    if (mini) {
      setStateminiDrawerWidth(miniDrawerWidth);
    }
  };

  const closeDrawer = () => {
    setMini(true);
  };

  return (
    <Fragment>
      <GlobalWrapper {...props}>
        <Sidebar
          mini={mini}
          drawerWidth={statedrawerWidth}
          miniDrawerWidth={stateminiDrawerWidth}
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave}
          closeDrawer={() => closeDrawer}
          {...props}
        />

        <div
          id="main-panel"
          className="main-panel flex-y"
          ref={mainPanel}
          style={mainPanelWidth}
        >
          <div>
            <Header
              drawerMiniMethod={drawerMiniMethod}
              mini={mini}
              drawerWidth={statedrawerWidth}
              miniDrawerWidth={stateminiDrawerWidth}
              layoutSettingDrawerToggle={toggleLayoutSettingDrawer}
              notifications={notifications}
              {...props}
            />
          </div>

          <div className="route-height flex-1 overflow-auto">
            <div>
              <div>
                <Switch>
                  <ProtectedRoute {...props}>
                    {dashboardRoutes.map((prop, key) => {
                      return (
                        <Route
                          exact
                          path={prop.path}
                          component={prop.component}
                          key={key}
                        />
                      );
                    })}
                  </ProtectedRoute>
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </GlobalWrapper>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    ...state.themeChanger,
    authData: {
      token: state.auth.accessToken,
      isLogin: state.auth.isLogin
    },
    user: state.auth.user,
    subscription: state.navigation.subscription,
    oneTimeModal: state.navigation.oneTimeModal,
    isSubscriptionSuccess: state.navigation.isSubscriptionSuccess,
    themeSetting: {
      toolbarAlignValue: state.themeSetting.toolbarAlignValue,
      footerAlignValue: state.themeSetting.footerAlignValue,
      sidebarDisplayValue: state.themeSetting.sidebarDisplayValue,
      toolbarDisplayValue: state.themeSetting.toolbarDisplayValue,
      footerDisplayValue: state.themeSetting.footerDisplayValue,
      sidebarTransParentValue: state.themeSetting.sidebarTransParentValue,
      transparentImage: state.themeSetting.transparentImage,
      activeLinkStyle: state.themeSetting.activeLinkStyle,
      sidebarMiniValue: state.themeSetting.sidebarMiniValue,
      layout: state.themeSetting.layout,
      sidebarTransParentActiveBack:
        state.themeSetting.sidebarTransParentActiveBack,
      sidebarTransParentActiveColor:
        state.themeSetting.sidebarTransParentActiveColor
    }
  };
};

export default connect(mapStateToProps, {
  toggleSubscribeModal,
  toggleOneTimeModal,
  getNotificationData
})(DashboardLayout);
