"use client";

import React, { useState, useEffect } from "react";
import Card from "@/components/Card";
import Filter from "@/components/Filter";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { postAPI } from "@/services/postAPI";

export default function Home() {
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataInitial, setDataInitial] = useState<any>([]);
  const [firstCall, setFirstCall] = useState<boolean>(true);
  const [loadingMoreTemplate, setLoadingMoreTemplate] = useState(false);

  const [roles, setRoles] = useState<any>([]);
  const [employee, setEmployee] = useState<any>([]);
  const [experience, setExperience] = useState<any>([]);
  const [location, setLocation] = useState<any>([]);
  const [salary, setSalary] = useState<any>([]);

  const [query, setQuery] = useState("");

  const handleInputChange = (event: any) => {
    setQuery(event.target.value);
  };

  const getData = async (page: any) => {
    setLoading(true);
    setLoadingMoreTemplate(page > 1);
    try {
      const newData = await postAPI(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        { limit: "10", offset: page }
      );

      setData((prevData: any) => [...prevData, ...newData.jdList]);
      setDataInitial((prevData: any) => [...prevData, ...newData.jdList]);
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }
    setLoading(false);
    setLoadingMoreTemplate(false);
  };

  const handleScroll = (event: any) => {
    const node = event.target;
    const bottom =
      Math.floor(node.scrollHeight - node.scrollTop) <= node.clientHeight + 1;

    if (bottom) {
      setPage(page + 1);
      if (
        roles?.length === 0 &&
        experience?.length === 0 &&
        location?.length === 0
      ) {
        getData(page + 1);
      }
    }
  };

  const applyRoleFilter = (roles: any, type: any) => {
    if (roles?.length === 0 && !firstCall) {
      setData([]);
      getData(0);
    } else {
      const filterBy = roles.map((item: any) => item.value);
      const filteredData = dataInitial.filter((job: any) =>
        filterBy.includes(job[type])
      );
      setData(filteredData);
    }
  };

  useEffect(() => {
    applyRoleFilter(roles, "jobRole");
  }, [roles]);

  useEffect(() => {
    applyRoleFilter(experience, "minExp");
  }, [experience]);

  useEffect(() => {
    applyRoleFilter(location, "location");
  }, [location]);

  useEffect(() => {
    applyRoleFilter(salary, "salary");
  }, [salary]);

  useEffect(() => {
    if (query?.length === 0 && !firstCall) {
      setData([]);
      getData(0);
    } else {
      if (query?.length > 0) {
        const filteredData = dataInitial.filter((job: any) =>
          query.includes(job.companyName.toLowerCase())
        );
        setData(filteredData);
      }
    }
  }, [query]);

  useEffect(() => {
    getData(0);
    setFirstCall(false);
  }, []);

  return (
    <div onScroll={(e: any) => handleScroll(e)} className="scrollContainer">
      <Container>
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} mt={2}>
              <Filter
                roles={roles}
                setRoles={setRoles}
                employee={employee}
                setEmployee={setEmployee}
                experience={experience}
                setExperience={setExperience}
                location={location}
                setLocation={setLocation}
                salary={salary}
                setSalary={setSalary}
                query={query}
                setQuery={setQuery}
                handleInputChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={2}>
            {data.map((element: any, index: number) => (
              <Grid item sm={4} key={index}>
                <Card data={element} />
              </Grid>
            ))}
          </Grid>
        </Box>
        {loading ||
          (loadingMoreTemplate && (
            <Box style={{ textAlign: "center" }}>
              <CircularProgress />
            </Box>
          ))}
        {data?.length === 0 && (
          <Box>
            <Typography
              fontSize="14px"
              gutterBottom
              letterSpacing="1px"
              textAlign="center"
              display="flex"
              justifyContent="center"
            >
              No Records to display ...
            </Typography>
          </Box>
        )}
      </Container>
    </div>
  );
}
