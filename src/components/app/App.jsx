import React, { Component } from "react";
import SearchPanel from "../searchPanel/SearchPanel";
import ApiServ from "../../services/ApiServ";
import './app.css'
export default class App extends React.Component{
    swapi = new ApiServ();


   render(){
    return(
        <>
        <SearchPanel />
        
        </>
    )
   
   }
}