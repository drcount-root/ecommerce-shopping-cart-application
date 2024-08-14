"use client";

import { makeStore } from "@/lib/store/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";

const StoreProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={makeStore()}>{children}</Provider>;
};

export default StoreProvider;
