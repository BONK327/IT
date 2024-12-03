import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigation } from "../components/navigation/Navigation";
import { IndividualsView } from "../views/individuals-view/IndividualsView";
import { OrganizationsView } from "../views/organizations-view/OrganizationsView";
import { MarksView } from "../views/marks-view/MarksView";
import { ClasView } from "../views/clas-view/ClasView";
import { ProductsView } from "../views/product-view/ProductsView";
import { ProxyListView } from "../views/proxy-view/proxy-list-view/ProxyListView";
import { ProxyView } from "../views/proxy-view/proxy-view/ProxyView";
import { ProxyCreateView } from "../views/proxy-view/proxy-view/ProxyCreateView";
import { DocListView } from "../views/doc-view/doc-list-view/DocListView";
import { DocView } from "../views/doc-view/doc-view/DocView";
import { DocCreateView } from "../views/doc-view/doc-view/DocCreateView";
import { ROUTE_PATHS } from "./paths";

export const RouterIndex = (props) => {
    return (
        <BrowserRouter>
            <Navigation>
                <Routes>
                    <Route
                        path={'/'}
                        element={<ProxyListView />}
                    />
                    <Route
                        path={ROUTE_PATHS.products}
                        element={<ProductsView />}
                    />
                    <Route
                        path={ROUTE_PATHS.individuals}
                        element={<IndividualsView />}
                    />
                    <Route
                        path={ROUTE_PATHS.organizations}
                        element={<OrganizationsView />}
                    />
                    <Route
                        path={ROUTE_PATHS.marks}
                        element={<MarksView />}
                    />
                    <Route
                        path={ROUTE_PATHS.clas}
                        element={<ClasView />}
                    />
                    <Route
                        path={ROUTE_PATHS.proxy.list}
                        element={<ProxyListView />}
                    />
                    <Route
                        path={ROUTE_PATHS.proxy.proxy}
                        element={<ProxyView />}
                    />
                    <Route
                        path={ROUTE_PATHS.doc.list}
                        element={<DocListView />}
                    />
                    <Route
                        path={ROUTE_PATHS.doc.doc}
                        element={<DocView />}
                    />
                    <Route 
                     path={ROUTE_PATHS.proxy.create} 
                       element={<ProxyCreateView />} 
                     />
                     <Route 
                     path={ROUTE_PATHS.doc.create} 
                       element={<DocCreateView />} 
                     /> 
                      <Route 
                     path={ROUTE_PATHS.create} 
                       element={<ProxyCreateView />} 
                     />
                     <Route 
                     path={ROUTE_PATHS.create} 
                       element={<DocCreateView />} 
                     />  
                </Routes>
            </Navigation>
        </BrowserRouter>
    )
}