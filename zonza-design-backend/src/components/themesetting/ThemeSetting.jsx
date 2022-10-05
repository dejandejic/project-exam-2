import React from "react";
import ThemeSettingWrapper from "./themeSetting.style";
import Radium from "radium";
import { connect } from "react-redux";
import { compose } from "redux";
import actions from "redux/themeSettings/actions";
import { withRouter } from "react-router-dom";
const {
  toolbarAlignment,
  footerAlignment,
  toolbarDisplay,
  footerDisplay,
  sidebarTransParent,
  triggerTransparetImage,
  triggerActiveLinkStyle,
  sidebarMini,
  layoutStyle
} = actions;

const ThemeSetting = props => {
  const { mini, closeSettingDrawer, sidebarTheme } = props;

  return (
    <ThemeSettingWrapper sidebarTheme={sidebarTheme}>
      {!mini && (
        <div
          className="themesetting-overlay"
          onClick={closeSettingDrawer}
        ></div>
      )}
    </ThemeSettingWrapper>
  );
};

const mapStateToProps = state => {
  return {
    themeSetting: {
      toolbarAlignValue: state.themeSetting.toolbarAlignValue,
      footerAlignValue: state.themeSetting.footerAlignValue,
      toolbarDisplayValue: state.themeSetting.toolbarDisplayValue,
      footerDisplayValue: state.themeSetting.footerDisplayValue,
      sidebarTransParentValue: state.themeSetting.sidebarTransParentValue,
      transparentImage: state.themeSetting.transparentImage,
      activeLinkStyle: state.themeSetting.activeLinkStyle,
      sidebarMiniValue: state.themeSetting.sidebarMiniValue,
      layout: state.themeSetting.layout
    }
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, {
    toolbarAlignment,
    layoutStyle,
    footerAlignment,
    toolbarDisplay,
    footerDisplay,
    sidebarTransParent,
    triggerTransparetImage,
    triggerActiveLinkStyle,
    sidebarMini
  })
)(Radium(ThemeSetting));
