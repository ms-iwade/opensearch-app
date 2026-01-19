import { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Alert,
  Snackbar,
  Badge,
  Tooltip,
  // BottomNavigation,
  // BottomNavigationAction,
  // Paper,
  Collapse,
} from "@mui/material";
import BorderLeftIcon from "@mui/icons-material/BorderLeft";
import BorderRightIcon from "@mui/icons-material/BorderRight";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Link, useLocation, Outlet, useNavigate } from "react-router";
import { useAuth } from "@shared/auth";
import { usePageHeader, PageHeaderProvider } from "@shared/page-header";
import { APP_TITLE } from "@config/constants";
import {
  getSidebarNavigationItems,
  // getBottomNavigationItems,
  isNavigationItemActive,
  type NavigationItemType,
} from "@config/navigationConfig";

const DRAWER_WIDTH = 240;

const AppShellContent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(
    null
  );
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info" as "success" | "error" | "info",
  });
  // const [bottomNavValue, setBottomNavValue] = useState(0);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>(
    {}
  );
  const location = useLocation();
  const navigate = useNavigate();

  const { userInfo, logout, error: authError } = useAuth();
  const { pageHeader } = usePageHeader();

  // ボトムナビゲーション用のアイテムを取得
  // const bottomNavigationItems = getBottomNavigationItems();

  useEffect(() => {
    setDrawerOpen(!isMobile);
  }, [isMobile]);

  // 現在のパスに基づいてボトムナビゲーションの選択状態を更新
  // useEffect(() => {
  //   const currentIndex = bottomNavigationItems.findIndex((item) =>
  //     isNavigationItemActive(item, location.pathname)
  //   );
  //   if (currentIndex !== -1) {
  //     setBottomNavValue(currentIndex);
  //   }
  // }, [location.pathname, bottomNavigationItems]);

  // 現在のパスに基づいて親メニューを自動展開
  useEffect(() => {
    const sidebarItems = getSidebarNavigationItems();
    const newExpandedMenus: Record<string, boolean> = {};

    sidebarItems.forEach((item) => {
      if (item.children && item.children.length > 0) {
        const hasActiveChild = item.children.some((child) =>
          isNavigationItemActive(child, location.pathname)
        );
        if (hasActiveChild) {
          newExpandedMenus[item.id] = true;
        }
      }
    });

    setExpandedMenus((prev) => ({
      ...prev,
      ...newExpandedMenus,
    }));
  }, [location.pathname]);

  // 認証エラーがある場合はスナックバーで表示
  useEffect(() => {
    if (authError) {
      setSnackbar({ open: true, message: authError, severity: "error" });
    }
  }, [authError]);

  const handleToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleCloseDrawer = () => {
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setSnackbar({
        open: true,
        message: "ログアウトしました",
        severity: "success",
      });
      navigate("/");
    } catch (error) {
      setSnackbar({
        open: true,
        message: `ログアウトに失敗しました: ${error instanceof Error ? error.message : String(error)}`,
        severity: "error",
      });
    }
    handleUserMenuClose();
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // const handleBottomNavigationChange = (
  //   _: React.SyntheticEvent,
  //   newValue: number
  // ) => {
  //   setBottomNavValue(newValue);
  //   const selectedItem = bottomNavigationItems[newValue];
  //   if (selectedItem && !selectedItem.disabled) {
  //     navigate(selectedItem.path);
  //   }
  // };

  const handleToggleMenu = (itemId: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const renderNavigationItem = (
    item: NavigationItemType,
    hasChildren = false
  ) => {
    const IconComponent = item.icon;
    const isActive = hasChildren
      ? item.path === location.pathname
      : isNavigationItemActive(item, location.pathname);
    const isExpanded = expandedMenus[item.id];
    const hasActiveChild =
      hasChildren &&
      item.children?.some((child) =>
        isNavigationItemActive(child, location.pathname)
      );

    if (hasChildren) {
      return (
        <ListItem key={item.id} disablePadding>
          <ListItemButton
            onClick={() => handleToggleMenu(item.id)}
            selected={hasActiveChild && !isExpanded}
            disabled={item.disabled}
            aria-label={item.label}
            aria-expanded={isExpanded}
          >
            <ListItemIcon>
              {item.badge ? (
                <Badge
                  badgeContent={item.badge.count}
                  color={item.badge.color}
                  aria-label={`${item.label} - ${item.badge.count}件の通知`}
                >
                  <IconComponent />
                </Badge>
              ) : (
                <IconComponent />
              )}
            </ListItemIcon>
            <ListItemText primary={item.label} />
            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
        </ListItem>
      );
    }

    return (
      <ListItem key={item.id} disablePadding>
        <ListItemButton
          component={Link}
          to={item.path}
          onClick={handleCloseDrawer}
          selected={isActive}
          disabled={item.disabled}
          aria-current={isActive ? "page" : undefined}
          aria-label={item.label}
        >
          <ListItemIcon>
            {item.badge ? (
              <Badge
                badgeContent={item.badge.count}
                color={item.badge.color}
                aria-label={`${item.label} - ${item.badge.count}件の通知`}
              >
                <IconComponent />
              </Badge>
            ) : (
              <IconComponent />
            )}
          </ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>
      </ListItem>
    );
  };

  const renderNavigationItems = (items: NavigationItemType[]) => {
    return items.map((item) => {
      if (item.children && item.children.length > 0) {
        const isExpanded = expandedMenus[item.id];
        return (
          <Box key={item.id}>
            {renderNavigationItem(item, true)}
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <List sx={{ pl: 2 }}>{renderNavigationItems(item.children)}</List>
            </Collapse>
          </Box>
        );
      }
      return renderNavigationItem(item);
    });
  };

  const drawerContent = (
    <Box role="navigation" aria-label="メインナビゲーション">
      <Toolbar>
        <Tooltip
          title="サイドバーを閉じる"
          slotProps={{
            tooltip: {
              sx: {
                backgroundColor: "Black",
                color: "White",
              },
            },
          }}
        >
          <IconButton
            color="inherit"
            onClick={handleToggleDrawer}
            edge="start"
            sx={{ mr: 1 }}
            aria-label="メニューを閉じる"
          >
            <BorderLeftIcon />
          </IconButton>
        </Tooltip>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
          }}
          onClick={handleCloseDrawer}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "500",
              letterSpacing: "4px",
              fontSize: "18px",
            }}
          >
            {APP_TITLE}
          </Typography>
        </Link>
      </Toolbar>
      <List>{renderNavigationItems(getSidebarNavigationItems())}</List>
    </Box>
  );

  return (
    <Box display="flex">
      {/* アプリヘッダー */}
      <AppBar
        position="fixed"
        color="default"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer - 1,
          left: { md: drawerOpen ? DRAWER_WIDTH : 0 },
          width: { md: drawerOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : "100%" },
        }}
      >
        <Toolbar
          sx={{
            minHeight: "64px !important",
          }}
        >
          {!drawerOpen && (
            <Tooltip
              title="サイドバーを開く"
              slotProps={{
                tooltip: {
                  sx: {
                    backgroundColor: "Black",
                    color: "White",
                  },
                },
              }}
            >
              <IconButton
                color="inherit"
                onClick={handleToggleDrawer}
                edge="start"
                sx={{ mr: 2 }}
                aria-label="メニューを開く"
                aria-expanded={false}
                aria-controls="navigation-drawer"
              >
                <BorderRightIcon />
              </IconButton>
            </Tooltip>
          )}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "flex-end",
              gap: 2,
            }}
          >
            {pageHeader.title && (
              <>
                <Typography
                  variant="h6"
                  component="h1"
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    lineHeight: 1.2,
                  }}
                >
                  {pageHeader.title}
                </Typography>
                {pageHeader.description && (
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "14px",
                      display: { xs: "none", md: "block" },
                      opacity: 0.9,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      lineHeight: 1.2,
                      pb: 0.2,
                    }}
                  >
                    {pageHeader.description}
                  </Typography>
                )}
              </>
            )}
          </Box>
          {/* ユーザーメニュー */}
          {userInfo.isAuthenticated && (
            <Box>
              <Box
                onClick={handleUserMenuOpen}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                  px: 1,
                  py: 0.5,
                }}
              >
                <AccountCircleIcon />
                <Typography
                  variant="body2"
                  sx={{
                    display: { xs: "none", sm: "block" },
                    fontWeight: 500,
                  }}
                >
                  {userInfo.username}
                </Typography>
              </Box>
              <Menu
                anchorEl={userMenuAnchor}
                open={Boolean(userMenuAnchor)}
                onClose={handleUserMenuClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem disabled>
                  <ListItemIcon>
                    <AccountCircleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={userInfo.username} />
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" sx={{ color: "error.main" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography color="error.main">ログアウト</Typography>
                    }
                  />
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* ナビゲーションドロワー */}
      <Box
        component="nav"
        sx={{
          width: { md: !isMobile && drawerOpen ? DRAWER_WIDTH : 0 },
          flexShrink: { md: 0 },
        }}
      >
        {/* モバイル用ドロワー */}
        <Drawer
          variant="temporary"
          open={isMobile && drawerOpen}
          onClose={handleToggleDrawer}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
              zIndex: (theme) => theme.zIndex.appBar + 1,
            },
          }}
          slotProps={{
            paper: {
              id: "navigation-drawer",
            },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* デスクトップ用ドロワー */}
        <Drawer
          variant="persistent"
          open={!isMobile && drawerOpen}
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
              zIndex: (theme) => theme.zIndex.appBar + 1,
            },
          }}
          slotProps={{
            paper: {
              id: isMobile ? undefined : "navigation-drawer",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* メインコンテンツ */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            md:
              !isMobile && drawerOpen
                ? `calc(100% - ${DRAWER_WIDTH}px)`
                : "100%",
          },
          pb: 2,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>

      {/* ボトムナビゲーション */}
      {/* {bottomNavigationItems.length > 0 && (
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            display: { xs: "block", md: "none" },
            zIndex: (theme) => theme.zIndex.appBar,
          }}
          elevation={3}
        >
          <BottomNavigation
            value={bottomNavValue}
            onChange={handleBottomNavigationChange}
            showLabels
          >
            {bottomNavigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <BottomNavigationAction
                  key={item.id}
                  label={item.label}
                  disabled={item.disabled}
                  icon={
                    item.badge ? (
                      <Badge
                        badgeContent={item.badge.count}
                        color={item.badge.color}
                        aria-label={`${item.label} - ${item.badge.count}件の通知`}
                      >
                        <IconComponent />
                      </Badge>
                    ) : (
                      <IconComponent />
                    )
                  }
                />
              );
            })}
          </BottomNavigation>
        </Paper>
      )} */}

      {/* スナックバー（通知） */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export const AppShell = () => {
  return (
    <PageHeaderProvider>
      <AppShellContent />
    </PageHeaderProvider>
  );
};
