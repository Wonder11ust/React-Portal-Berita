import React, { useEffect, useState } from "react";

// components

import CardStats from "components/Cards/CardStats.js";
import axios from "axios";
import Cookies from "js-cookie";

export default function HeaderStats() {

  const [article,setArticle] = useState()
  const [category,setCategory] = useState()
  const [writter,setWritter] = useState()
  const [user,setUser] = useState()
  const token = Cookies.get('token');

  useEffect(() => {
    axios.get('http://localhost:8000/api/dashboard/admin/total-articles', {
      headers: {
        'Authorization': `Bearer ${token} `,
      }}).then(res=>{
      setArticle(res.data.total)
    })
    axios.get('http://localhost:8000/api/dashboard/admin/total-categories', {
      headers: {
        'Authorization': `Bearer ${token} `,
      }}).then(res=>{
      setCategory(res.data.total)
    })
    axios.get('http://localhost:8000/api/dashboard/admin/total-writers', {
      headers: {
        'Authorization': `Bearer ${token} `,
      }}).then(res=>{
      setWritter(res.data.total)
    })
    axios.get('http://localhost:8000/api/dashboard/admin/total-users', {
      headers: {
        'Authorization': `Bearer ${token} `,
      }}).then(res=>{
      setUser(res.data.total)
    })


  }, [])
  
  console.log({article,category,writter,user});



  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Articles"
                  statTitle={article&&article}
                  statArrow=" "
                  statPercent=" "
                  statPercentColor="text-white"
                  statDescripiron=" "
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Categories"
                  statTitle={category&&category}
                  statArrow=""
                  statPercent=" "
                  statPercentColor="text-white"
                  statDescripiron=" "
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Writer"
                  statTitle={writter&writter}
                  statArrow=" "
                  statPercent=" "
                  statPercentColor="text-white"
                  statDescripiron=" "
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="User"
                  statTitle={user&&user}
                  statArrow=""
                  statPercent=""
                  statPercentColor="text-white"
                  statDescripiron=" "
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
