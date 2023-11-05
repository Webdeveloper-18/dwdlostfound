import {
  AuthBindings,
  Authenticated,
  
  Refine,
} from "@refinedev/core";
import {  DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import axios, { AxiosRequestConfig } from "axios";
import { CredentialResponse } from "interfaces/google";
// import {
//   BlogPostCreate,
//   BlogPostEdit,
//   BlogPostList,
//   BlogPostShow,
// } from "pages/blog-posts";
import {
  CategoryCreate,
 
} from "pages/categories";

import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { parseJwt } from "utils/parse-jwt";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import {HomeOutlined,AccountCircleOutlined,PeopleAltOutlined,VillaOutlined,InfoOutlined,Article} from '@mui/icons-material'
import { Login ,Home,AllProperty,PropertyDetails,CreateProperties,EditProperty,Agents,AgentsProfile,Myprofile,AboutUs} from "pages";
const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const authProvider: AuthBindings = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;
      //passing the user info to the server
      if(profileObj){
          const response=await fetch('http://localhost:5000/api/v1/user',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              name:profileObj.name,
              email:profileObj.email,
              avatar:profileObj.picture
            })
          })

          const data= await response.json()
          if(response.status===200){
            localStorage.setItem(
              "user",
              JSON.stringify({
                ...profileObj,
                avatar: profileObj.picture,
                userid:data._id,
              })
            );
    
            localStorage.setItem("token", `${credential}`);
    
            return {
              success: true,
              redirectTo: "/",
            };
          }
        }
     

      return {
        success: false,
      };
    },
    logout: async () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return {};
        });
      }

      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: {
          message: "Check failed",
          name: "Token not found",
        },
        logout: true,
        redirectTo: "/login",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }

      return null;
    },
  };

  return (
    <BrowserRouter>
      
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider >
            <DevtoolsProvider> 
             
              <Refine
                dataProvider={dataProvider("http://localhost:5000/api/v1")}
                notificationProvider={notificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                
                resources={[
                  {
                    name: "Home",
                    options:{label:"Home"},
                    list:"/",icon:<HomeOutlined/>
                  },
                  {  //list gives the initial route then show is for show here we again mention our other route "show/:id" it should match with corresponding routes
                    name: "belonging",
                    options:{label:"LostNFound!"},
                    list:"/belonging",show:"/belonging/show/:id",create:"/belonging/create",edit:"/belonging/edit/:id",
                   
                    icon:<Article/>
                  },
                  {
                    name: "Users",
                    list:"/user", show:"/user/show/:id",
                    icon:<PeopleAltOutlined/>
                  },
                  
                  {
                    name: "My Profile",
                    options:{label:"My Profile"},
                    list:"/my profile",icon:<AccountCircleOutlined/>
                  },
                  {
                    name:"About Us",
                    options:{label:"About Us"},
                    list:"/creator",icon:<InfoOutlined/>
                  }
                ]}
                
                options={ {
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  projectId: "sFX66G-GCvzYk-LWzCCE",
                
                }}
                
              >
                <Routes>

                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      > 
                        <ThemedLayoutV2
                          Header={() => <Header isSticky={true} />}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<Home/>}
                    />  
                    {/* adding corresponding routes matching with corresponding resources */}
                     <Route path="/belonging">
                      <Route index element={<AllProperty />} />
                      <Route path="create" element={<CreateProperties/>} />
                      <Route path="edit/:id" element={<EditProperty />} />
                      <Route path="show/:id" element={< PropertyDetails/>} />
                    </Route>
                    <Route path="/user">
                      <Route index element={<Agents/>} />
                      <Route path="create" element={<CategoryCreate />} />
                      
                      <Route path="show/:id" element={<AgentsProfile/>} />
                    </Route>
                    <Route path="/my profile">
                      <Route index element={<Myprofile />} />
                      
                    </Route>
                    <Route path="/creator">
                      <Route index element={<AboutUs />} />
                      
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                   
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
             
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
