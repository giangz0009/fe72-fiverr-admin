import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import "./globalStyles.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { authActionTypes } from "features/auth/action";
import { useNavigate } from "react-router-dom";

const HeaderComp = () => {
  const [isOpenConfirm, setIsOpenConfirm] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [settings, setSettings] = React.useState([
    { label: "Thông tin", onClick() {} },
    { label: "Đăng xuất", onClick() {} },
  ]);
  const [selectedPage, setSelectedPage] = React.useState(0);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const authProfile = useSelector((state) => state.authReducer.authProfile);

  const pages = [
    {
      label: "Quản lý người dùng",
      onClick() {
        navigate("/manage/user");
      },
    },
    {
      label: "Quản lý công việc",
      onClick() {
        navigate("/manage/jobs");
      },
    },
    {
      label: "Quản lý loại công việc",
      onClick() {
        navigate("/manage/jobTypes");
      },
    },
    {
      label: "Quản lý chi tiết loại công việc",
      onClick() {
        navigate("/manage/jobTypeDetails");
      },
    },
    {
      label: "Quản lý dịch vụ",
      onClick() {
        navigate("/manage/service");
      },
    },
  ];

  const handleOnChangePage = (index) => setSelectedPage(index);

  const handleClose = () => {
    setIsOpenConfirm(false);
  };

  const handleSureLogout = () => {
    localStorage.removeItem("authProfile");
    setIsOpenConfirm(false);
    dispatch(authActionTypes.setAuthProfile(null));
    navigate("/");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  React.useEffect(() => {
    if (!authProfile) return;
    setSettings([
      {
        label: authProfile.name,
        onClick() {
          navigate("/manage/profile");
        },
      },
      {
        label: "Đăng xuất",
        onClick() {
          setIsOpenConfirm(true);
        },
      },
    ]);
  }, [authProfile]);

  return (
    <AppBar position="fixed" className="headerComp">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              className="headerCompPageMenu"
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={index}
                  onClick={handleCloseNavMenu}
                  className={index === selectedPage ? "selected" : ""}
                >
                  <Typography
                    textAlign="center"
                    onClick={() => {
                      handleOnChangePage(index);
                      page.onClick();
                    }}
                  >
                    {page.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Dashboard
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={authProfile?.name || "Admin"}
                  src={authProfile?.avatar}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem key={index} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={setting.onClick}>
                    {setting.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <Dialog
        open={isOpenConfirm}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Thông báo
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc muốn đăng xuất không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Hủy
          </Button>
          <Button onClick={handleSureLogout}>Đồng ý</Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};
export default HeaderComp;
