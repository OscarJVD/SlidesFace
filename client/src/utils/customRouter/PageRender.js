import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NotFound from "../../components/NotFound";

const generatePage = (pageName) => {

  console.log(pageName);
  const component = () => require(`../../pages/${pageName}`).default;

  try {
      return React.createElement(component());
  } catch (err) {
    console.log(err);
    if (!err.message.includes("Cannot find module"))
      return <NotFound />;
  }
};

const PageRender = () => {
  const { page, id, username } = useParams();
  const { auth } = useSelector((state) => state);
  let pageName = "";

  console.log(page, id, username);

  if (auth.token) {

    if (page === undefined && id === undefined && username) {
      pageName = `[username]`;
    } else {
      if (id) pageName = `${page}/[id]`;
      else {
        pageName = `${page}`;

      }
    }
  }

  return generatePage(pageName);
};

export default PageRender;

// function loadModule(url) {
//   return new Promise(resolve => {
//     switch (url) {
//       case 'username':
//         console.log('asjdsa');
//         require([`../../pages/[username]`], resolve);
//         break;
//     }
//   })
// };

// const generatePage = (pageName) => {

//   try {
//     pageName = pageName.toString();
//     console.log(pageName);
//     const component = () => require(`../../pages/${pageName}`).default;
//     // const component = () => import(`../../pages/${pageName}`);

//     // const component = () => require.ensure([], require => {
//     //   callback(null, require(`../../pages/${pageName}`).default);
//     // }, "[username]");

//     // const component = () => new Promise(resolve => {
//     //   require([`../../pages/${pageName}`], resolve);
//     // })

//     // const component = loadModule('username');
//     // const component = function (nextState, callback) {
//     //   require.ensure([], require => {
//     //     callback(null, require([`../../pages/${pageName}`]).default);
//     //   }, "[username]");
//     // }

//     // return React.createElement(loadModule('username'));
//     return React.createElement(component());
//     // return React.createElement(import(`../../pages/${pageName}`));
//     // return React.createElement(import(`../../pages/${pageName}`));
//   } catch (err) {
//     // console.log(err.message);
//     // console.log(err.data.message);
//     // console.log(pageName == '[username]');
//     // console.log(typeof pageName);
//     // if (pageName != `[username]`) return <NotFound />
//     if (!err.message.includes('Cannot find module'))
//       return <NotFound />
//   }
// };

// const PageRender = () => {
//   const { page, id, username } = useParams();
//   const { auth } = useSelector((state) => state);
//   let pageName = "";

//   // console.log(page, id);
//   // console.log(username)

//   if (auth.token) {

//     if (page === undefined && id === undefined && username) {
//       // console.log('YES');
//       pageName = `[username]`;
//     } else {
//       if (id) pageName = `${page}/[id]`;
//       else pageName = `${page}`;
//     }
//   }

//   return generatePage(pageName);
// };

// export default PageRender;

