import Select from "react-select";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Search from "./Search";

import {
  rolesOptions,
  employeesOptions,
  experienceOptions,
  locationOptions,
  salaryOptions,
} from "@/data/data";
import { useEffect } from "react";

const index = (props: any) => {
  const {
    roles,
    setRoles,
    employee,
    setEmployee,
    experience,
    setExperience,
    location,
    setLocation,
    salary,
    setSalary,
    query,
    setQuery,
    handleInputChange,
  } = props;

  const selectOptions: any = [
    {
      options: rolesOptions,
      placeholder: "Roles",
      type: "roles",
      value: roles,
    },
    {
      options: employeesOptions,
      placeholder: "Number of Employees",
      type: "noOfEmployees",
      value: employee,
    },
    {
      options: experienceOptions,
      placeholder: "Experience",
      type: "experience",
      value: experience,
    },
    {
      options: locationOptions,
      placeholder: "Remote",
      type: "location",
      value: location,
    },
    {
      options: salaryOptions,
      placeholder: "Minimum Base Salary Pay",
      type: "salary",
      value: salary,
    },
  ];

  const handleChange = (selected: any, event: any, type: any) => {
    if (type === "roles") {
      setRoles(selected);
    } else if (type === "noOfEmployees") {
      setEmployee(selected);
    } else if (type === "experience") {
      setExperience(selected);
    } else if (type === "location") {
      setLocation(selected);
    } else if (type === "salary") {
      setSalary(selected);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Grid container spacing={2}>
        {selectOptions &&
          selectOptions?.length > 0 &&
          selectOptions.map((option: any, index: number) => (
            <Grid item key={index}>
              <Select
                isMulti
                name="colors"
                options={option.options}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder={option.placeholder}
                onChange={(selected, event) =>
                  handleChange(selected, event, option.type)
                }
                value={option.value}
              />
            </Grid>
          ))}
        <Grid item>
          <Search
            query={query}
            setQuery={setQuery}
            handleInputChange={handleInputChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default index;
