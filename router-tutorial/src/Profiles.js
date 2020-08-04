import React from "react";
import { NavLink, Route } from "react-router-dom";
import Profile from "./Profile";
import RouterHookSample from "./RouterHookSample";

function Profiles() {
  return (
    <div>
      <h3>유저 목록 : </h3>
      <ul>
        <li>
          <NavLink
            to="/profiles/donghan"
            activeStyle={{
              background: "black",
              color: "cyan",
            }}
          >
            donghan
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profiles/minju"
            activeStyle={{
              background: "black",
              color: "yellow",
            }}
          >
            minju
          </NavLink>
        </li>
      </ul>
      <Route
        path="/profiles"
        exact
        render={() => <div>유저를 선택해 주세요 </div>}
      />
      <Route path="/profiles/:nickname" component={Profile} />
      <RouterHookSample />
    </div>
  );
}

export default Profiles;
