import React, { useEffect, useState } from "react";
import HeaderWrapper from "./header.style";
import { Modal, UncontrolledPopover, Popover, PopoverBody } from "reactstrap";

import { connect } from "react-redux";
import { compose } from "redux";
import AuthActions from "redux/auth/actions";
import { Link, withRouter } from "react-router-dom";
import ConformationModalUser from "components/common/ConformationModalUser";
import { Bell, Menu, MessageSquare, Search } from "react-feather";
import Logout from "assets/images/power.svg";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
  // InputGroupAddon,
  // InputGroup,
  // Input,
  // Button,
} from "reactstrap";
import moment from "moment";

const { logout } = AuthActions;
const Header = props => {
  const {
    drawerMiniMethod,
    mini,
    token,
    user,
    isSubscriptionSuccess,
    notifications,

    notificationData,
    getNotificationData
  } = props;

  const [isOpen, toggleOpen] = useState(false);
  const [openPopover, togglePopover] = useState(false);
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const userSignout = () => {
    toggleOpen(true);
  };

  const options = [
    {
      label: "Section One",
      value: "one",
      options: [
        { value: "one", label: "One" },
        { value: "two", label: "Two" }
      ]
    },
    {
      label: "Section Two",
      value: "two",
      options: [
        { value: "three", label: "Three" },
        { value: "four", label: "Four" }
      ]
    }
  ];

  let unreadCount = notificationData.unread_notifications;
  return (
    <HeaderWrapper {...props}>
      <div className="headerBack">
        <div className="flex-x align-center">
          <div className="drawer-handle-arrow">
            {mini ? (
              <button
                className="top-header-icon"
                onClick={() => drawerMiniMethod()}
              >
                <Menu />
              </button>
            ) : (
              <button
                className="top-header-icon"
                onClick={() => drawerMiniMethod()}
              >
                <Menu />
              </button>
            )}
          </div>
          <div
            className="mini-drawer-menu-icon"
            onClick={() => drawerMiniMethod()}
          >
            <Menu />
          </div>
          <div className="mx-sm-3 w-25 top-search-field mb-2 mb-sm-0"></div>
          <div className="pl-3 ml-auto"></div>

          <div className="pl-3">
            <div id="profile">
              <img
                className="top-header-profile-class"
                src={`${process.env.REACT_APP_BACKEND_URI_UPLOAD}/${user.logo}`}
                // src={user.full_url}
                alt="notify"
              />
            </div>
            <Popover
              className="roy-menu"
              innerClassName="roy-inner-content"
              placement="bottom-end"
              target="profile"
              trigger="legacy"
              isOpen={openPopover}
              toggle={() => togglePopover(!openPopover)}
            >
              <PopoverBody onClick={() => togglePopover(!openPopover)}>
                {/* <div
                  className="roy-menu-list"
                  onClick={() => props.history.push("/profile")}
                >
                  My Profile
                </div> */}

                <div
                  className="roy-menu-list"
                  onClick={() => props.history.push("/change-password")}
                >
                  Change Password
                </div>
                <div className="roy-menu-list" onClick={userSignout}>
                  Logout
                </div>
              </PopoverBody>
            </Popover>
          </div>
          {/* <div className="pl-10">
                        <button
                            onClick={layoutSettingDrawerToggle}
                            className="top-header-icon"
                        >
                            <i className="fas fa-th-large"></i>
                        </button>
                    </div> */}
        </div>
      </div>
      <Modal centered isOpen={isOpen} backdrop={true}>
        {isOpen && (
          <ConformationModalUser
            isOpen={isOpen}
            onClose={() => toggleOpen(false)}
            confirmText={"Logout"}
            message={"Are you sure you want to Logout"}
            handleConfirm={() => props.logout(token)}
            customIcon={Logout}
            titleTxt={"Are you sure you want to logout ?"}
          />
        )}
      </Modal>
    </HeaderWrapper>
  );
};
const mapStateToProps = state => {
  return {
    token: state.auth.accessToken,
    user: state.auth.user,
    isSubscriptionSuccess: state.navigation.isSubscriptionSuccess,
    notificationData: state.navigation.notificationData
  };
};
export default compose(
  withRouter,
  connect(mapStateToProps, { logout })
)(Header);
