import React, { useContext } from "react";
import { SortByContext } from "../../Context";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  sortFormLabel: {
    fontSize: "1.2rem",
    color: theme.palette.secondary.main,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  sortForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      justifyContent: "center",
      flexDirection: "row"
    }
  }
}));

const options = ["Id", "Price", "Size", "None"];

const SortOption = () => {
  const classes = useStyles();
  const { sortBy, setSortBy } = useContext(SortByContext);

  const handleChange = event => {
    setSortBy(event.target.value);
  };
  return (
    <FormControl className={classes.sortForm} component="form">
      <FormLabel className={classes.sortFormLabel} component="div">
        <span>Sort By:</span>
      </FormLabel>
      <RadioGroup
        aria-label="position"
        name="sort"
        value={sortBy}
        onChange={handleChange}
        row
      >
        {options.map(option => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio color="secondary" />}
            label={option}
            labelPlacement="start"
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default SortOption;
