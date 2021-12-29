import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NotFound from "../../components/NotFound";

const generatePage = (pageLocation) => {

  console.log(pageLocation);
  const component = () => require(`../../pages/${pageLocation}`).default;

  try {
    return React.createElement(component());
  } catch (err) {
    console.log(err);
    return <NotFound />;
  }
};

const PageRender = () => {
  const { id, username } = useParams();
  const { auth } = useSelector((state) => state);
  let pageName = "";

  if (auth.token) {

    const arrStaticRootComponents = [
      "home",
      "loginAndRegister",
      "message",
      "notify",
      "profile",
      "discover"
    ]

    if (arrStaticRootComponents.every(file => file !== username)) {
      pageName = `[username]`;
    } else {
      if (id) pageName = `${username}/[id]`;
      else pageName = `${username}`;
    }
  }

  return generatePage(pageName);
};

export default PageRender;