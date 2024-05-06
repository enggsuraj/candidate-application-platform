import { TextField } from "@mui/material";

const Search = (props: any) => {
  const { query, handleInputChange } = props;
  return (
    <TextField
      id="search-input"
      label="Search Company Name"
      variant="outlined"
      value={query}
      onChange={handleInputChange}
      size="small"
    />
  );
};

export default Search;
