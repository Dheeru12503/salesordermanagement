// src/pages/Dashboard.jsx
import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import ActiveSaleOrders from "./ActiveSaleOrders";
import CompletedSaleOrders from "./CompletedSaleOrders";
import DarkModeToggle from "../components/DarkModeToggle";

const Dashboard = () => {
  return (
    <div>
      <DarkModeToggle />
      <Tabs>
        <TabList>
          <Tab>Active Sale Orders</Tab>
          <Tab>Completed Sale Orders</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ActiveSaleOrders />
          </TabPanel>
          <TabPanel>
            <CompletedSaleOrders />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Dashboard;
