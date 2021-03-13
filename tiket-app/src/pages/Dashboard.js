import React, {
  useState,
  useContext,
  useEffect
} from 'react';
import PageTitle from '../components/common/PageTitle';
import DashboardMetric from './../components/DashboardMetric';
import Card from '../components/common/Card';
import {
  faChartArea,
  faDollarSign,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import { FetchContext } from '../context/FetchContext';
import { formatCurrency } from '../util';
import DashboardChart from './../components/DashboardChart';
import axios from "axios";

const Dashboard = () => {
  const fetchContext = useContext(FetchContext);
  const [dashboardData, setDashboardData] = useState();
  
  const userToken = () => {
    console.log('userToken: abcdef')
  }
  
  userToken();

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const { data } = await fetchContext.authAxios.get(
          'dashboard-data'
        );
        setDashboardData(data);
      } catch (err) {
        console.log(err);
      }
    };

    getDashboardData();
  }, [fetchContext]);
  
  // const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDRiNjdkMmY1YjNiZjcxMDgwNDg1NmEiLCJlbWFpbCI6InhkaWdveGlueEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpc3MiOiJhcGkub3JiaXQiLCJhdWQiOiJhcGkub3JiaXQiLCJpYXQiOjE2MTU2NTExNDgsImV4cCI6MTYxNTY1NDc0OH0.YuZZO9q9ofOCg1ERv8EldrrCRUdvljtiFmK_XejGdBw'
  
  // axios.interceptors.request.use(
  //   config => {
  //     config.headers.Authorization = `Bearer ${accessToken}`;
  //     return config;
  //   },
  //   error => {
  //     return Promise.reject(error);
  //   }
  // );
  
  const getDashboardData2 = async () => {
    try {
      const { data } = await axios.get(
        'https://api.github.com/users'
      );
      
      console.log(data,'helo data')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <PageTitle title="Dashboard" />
      {/*<button onClick={getDashboardData2} style={{width: 100, height: 20}}>*/}
      {/*  helo world*/}
      {/*</button>*/}
      {dashboardData ? (
        <>
          <div className="mb-4 flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/3 sm:mr-2 mb-4 sm:mb-0">
              <DashboardMetric
                title="Sales Volume"
                value={formatCurrency(
                  dashboardData.salesVolume
                )}
                icon={faChartArea}
              />
            </div>
            <div className="w-full sm:w-1/3 sm:ml-2 sm:mr-2 mb-4 sm:mb-0">
              <DashboardMetric
                title="New Customers"
                value={dashboardData.newCustomers}
                icon={faUserPlus}
              />
            </div>
            <div className="w-full sm:w-1/3 sm:ml-2 mb-4 sm:mb-0">
              <DashboardMetric
                title="Refunds"
                value={formatCurrency(
                  dashboardData.refunds
                )}
                icon={faDollarSign}
              />
            </div>
          </div>
          <div className="w-full mt-4">
            <Card>
              {dashboardData && (
                <DashboardChart
                  salesData={dashboardData.graphData}
                />
              )}
            </Card>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Dashboard;
