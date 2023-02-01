import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  Box,
  Typography,
  Stack,
  IconButton,
  Grid,
  List,
  Paper,
  ListItemButton,
  Pagination,
  ListItemText,
} from "@mui/material";
import { categories } from "../../../utils/stateData";
import AppsIcon from "@mui/icons-material/Apps";
import PrimarySearchAppBar from "../../../components/search";
import ProductCard from "../../../components/cardComponent/productCard";
import { getBrandProducts } from "../../../redux/actions/brandAction";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCardLoader from "../../../components/cardComponent/productCardSkeleton";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function BrandProoducts({
  toggle,
  toggelSideBar,
  selectedIndex,
  handleListItemClick,
  id,
}) {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const searchQuery = query.get("search");
  const {
    loading,
    brandProducts,
    productCount,
    filteredProductCount,
    numberOfPages,
    searchNumberOfPages,
    error,
  } = useSelector((state) => state.brandProductReducer);

  useEffect(() => {
    dispatch(getBrandProducts(id, searchQuery, page));
  }, [dispatch, id, searchQuery, page]);

  const handleChange = (e, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ marginTop: "20px" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          border: "1px solid black",
          marginBottom: "10px",
        }}
      >
        <IconButton
          onClick={toggelSideBar}
          sx={{
            width: "auto",
            height: "auto",
          }}
        >
          <AppsIcon sx={{ color: "black", width: "30px", height: "30px" }} />
        </IconButton>
        <Box sx={{ width: "75%", padding: "10px" }}>
          <PrimarySearchAppBar />
        </Box>
      </Box>

      <Stack
        direction="row"
        sx={{ width: "100%" }}
        justifyContent="space-evenly"
      >
        <Paper
          elevation={24}
          sx={{
            transition: "0.5s",
            width: `${toggle ? "23%" : "0%"}`,
            minHeight: "100vh",
            display: { md: "flex", sm: "flex", xs: "none" },
            justifyContent: "start",
          }}
        >
          {toggle && (
            <Box
              sx={{
                transition: "0.5s",
                overflow: "hidden",
                width: "100%",
                margin: "10px",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "700",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Filter By Category
              </Typography>
              <List component="nav" aria-label="secondary mailbox folder">
                {categories.map((category) => (
                  <ListItemButton
                    key={1}
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                  >
                    {" "}
                    <ListItemText
                      sx={{ fontWeight: "700" }}
                      primary={category}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Box>
          )}
        </Paper>
        <Paper
          elevation={24}
          sx={{
            margin: "0px !important",
            paddingBottom: "20px",
            width: {
              md: `${toggle ? "75%" : "100%"}`,
              xs: `${"100%"}`,
            },
          }}
        >
          <Grid
            container
            rowSpacing={2}
            columnSpacing={4}
            sx={{ padding: "15px" }}
          >
            {loading && <ProductCardLoader />}
            {brandProducts &&
              brandProducts.map((product) => (
                <ProductCard key={product._id} data={product} />
              ))}
          </Grid>
          <Stack
            spacing={2}
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Pagination
              count={searchQuery ? searchNumberOfPages : numberOfPages}
              page={Number(page)}
              onChange={handleChange}
              sx={{
                "&:focus": {
                  outline: "none",
                },
                color: "blue",
              }}
            />
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}

export default BrandProoducts;
