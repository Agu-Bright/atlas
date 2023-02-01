import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Typography,
  Stack,
  ButtonGroup,
  IconButton,
  Grid,
  Button,
  Skeleton,
  List,
  ListItem,
  Paper,
} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Navbar from "../../components/navbar/Navbar";
import water from "../../images/water.jpg";
import pepsi from "../../images/pepsi.jpg";

import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AppsIcon from "@mui/icons-material/Apps";
import VerifiedIcon from "@mui/icons-material/Verified";
import ProductCard from "../../components/cardComponent/productCard";
import Footer from "../../components/footer/Footer";
import PrimarySearchAppBar from "../../components/search";

import { useParams } from "react-router-dom";
import { categories } from "../../utils/stateData";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors } from "../../redux/actions/brandAction";
import { getBrandDetail } from "../../redux/actions/brandAction";
import BrandProoducts from "./brandComponent/BrandProoducts";
import { useNavigate, useLocation } from "react-router-dom";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 150) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? (
          <Typography
            sx={{ cursor: "pointer", fontWeight: "600", color: "gray" }}
          >
            Read More
          </Typography>
        ) : (
          <Typography
            sx={{ cursor: "pointer", fontWeight: "600", color: "gray" }}
          >
            show less
          </Typography>
        )}
      </span>
    </p>
  );
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function BrandDetail() {
  const params = useParams();
  const query = useQuery();
  const searchQuery = query.get("search");
  const dispatch = useDispatch();
  const { id } = params;
  const [navbar, setNavbar] = useState(true);
  const [toggle, setToggle] = useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [page, setPage] = useState(1);

  const { brandDetail, loading, error } = useSelector(
    (state) => state.brandDetails
  );

  const toggelSideBar = () => {
    setToggle((prev) => !prev);
  };

  //category section

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    dispatch(getBrandDetail(id));
  }, [dispatch, id]);
  brandDetail ? console.log(brandDetail) : console.log("waiting");

  return (
    <>
      <Navbar navbar={navbar} setNavbar={setNavbar} active="active2" />
      <Box
        sx={{
          height: "auto",
          paddingTop: { md: "72px", xs: "50px" },
          backgroundColor: "white",
          paddingBottom: "20px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: { md: "50vh", xs: "30vh" },
            position: "relative",
          }}
        >
          {loading && (
            <Skeleton
              variant="rectanguler"
              sx={{ width: "100%", height: "inherit" }}
            />
          )}
          {brandDetail?.backgroundImage && !loading ? (
            <img
              style={{ width: "100%", height: "inherit" }}
              src={brandDetail?.backgroundImage.url}
              alt={brandDetail?.brandName}
            />
          ) : (
            <>
              {!loading && (
                <Avatar
                  sx={{ width: "100%", height: "inherit", borderRadius: "0px" }}
                >
                  {brandDetail?.brandName}
                </Avatar>
              )}
            </>
          )}

          <Box
            sx={{
              position: "absolute",
              top: { md: "25vh", xs: "18vh" },
              left: "20px",
            }}
          >
            {loading ? (
              <Skeleton
                variant="rectanguler"
                sx={{
                  border: "5px solid white",
                  borderRadius: "20px",
                  width: { md: "200px", xs: "100px" },
                  height: { md: "200px", xs: "100px" },
                }}
              />
            ) : (
              <Avatar
                src={brandDetail?.brandLogo.url}
                alt="image"
                sx={{
                  border: "5px solid white",
                  borderRadius: "20px",
                  width: { md: "200px", xs: "100px" },
                  height: { md: "200px", xs: "100px" },
                }}
              />
            )}
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            minHeight: "100vh",
            paddingTop: { md: "50px", sm: "30px", xs: "15px" },
          }}
        >
          <Stack
            direction={{ md: "row", xs: "column" }}
            justifyContent="space-between"
          >
            {loading ? (
              <Skeleton
                variant="rectanguler"
                sx={{
                  marginLeft: "25px",
                  width: "200px",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "10px",
                  height: "1.2em",
                }}
              />
            ) : (
              <Typography
                sx={{
                  marginTop: "25px",
                  paddingTop: { md: "auto", xs: "" },
                  paddingLeft: { md: "25px", xs: "10px" },
                  fontWeight: "900",
                  fontSize: { md: "25px", sm: "20px", xs: "18px" },
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {brandDetail?.brandName}
                {brandDetail?.verified && (
                  <span style={{ color: "blue" }}>
                    <IconButton sx={{ color: "blue" }}>
                      <VerifiedIcon sx={{ fontSize: "15px" }} />
                    </IconButton>
                  </span>
                )}
              </Typography>
            )}
            {loading ? (
              <Skeleton
                variant="rectanguler"
                sx={{
                  marginLeft: "25px",
                  width: "200px",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "10px",
                  height: "1.2em",
                }}
              />
            ) : (
              <ButtonGroup
                sx={{
                  paddingRight: "25px",
                  paddingLeft: { md: "25px", xs: "10px" },
                }}
              >
                <IconButton>
                  <TwitterIcon sx={{ color: "black" }} />
                </IconButton>

                <IconButton>
                  <InstagramIcon sx={{ color: "black" }} />
                </IconButton>

                <IconButton>
                  <FacebookIcon sx={{ color: "black" }} />
                </IconButton>
                <IconButton>
                  <MoreHorizIcon sx={{ color: "black" }} />
                </IconButton>
              </ButtonGroup>
            )}
          </Stack>
          <div style={{ width: "100%" }}>
            {loading ? (
              <Skeleton
                variant="rectanguler"
                sx={{
                  marginLeft: "25px",
                  width: "200px",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "10px",
                  height: "1.2em",
                  marginTop: "10px",
                }}
              />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  paddingLeft: { md: "25px", xs: "10px" },
                }}
              >
                <Typography sx={{ marginRight: "25px" }}>
                  Items <span style={{ fontWeight: "700" }}>9999</span>
                </Typography>
                <Typography>
                  Created <span style={{ fontWeight: "700" }}>jan 2022</span>
                </Typography>
              </Box>
            )}
            <Box
              sx={{
                paddingLeft: { md: "25px", xs: "10px" },
                paddingTop: "10px",
                height: "auto",
              }}
            >
              <Typography sx={{ fontWeight: "600" }} variant="h5">
                Description
              </Typography>

              <Typography
                sx={{
                  width: { md: "70%", xs: "100%" },
                }}
              >
                {/* {brandDetail?.brandDetail.split().length > 50 ? (
                  brandDetail?.brandDetail
                ) : (
                  <ReadMore>{brandDetail?.brandDetail}</ReadMore>
                )} */}
                {brandDetail?.brandDetail}
              </Typography>
            </Box>
          </div>

          <BrandProoducts
            toggle={toggle}
            toggelSideBar={toggelSideBar}
            selectedIndex={selectedIndex}
            handleListItemClick={handleListItemClick}
            id={id}
          />
        </Box>
      </Box>
      <div className="footer" style={{ oveflow: "hidden" }}>
        <Footer />
      </div>
    </>
  );
}

export default BrandDetail;
