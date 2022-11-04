import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Header } from "@/Components";

const Main = styled.main`
  overflow-x: hidden;
  overflow-y: auto;
  padding: 1rem 2rem;
`;

const MainLayout = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

export default MainLayout;
