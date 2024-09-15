import { combineReducers } from "@reduxjs/toolkit";
import dataReducer from "../slice/data-slice";

export const rootReducer = combineReducers({ data: dataReducer });
