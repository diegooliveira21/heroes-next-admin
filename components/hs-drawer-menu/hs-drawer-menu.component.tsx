import React, {
  ReactElement,
  useState,
} from 'react';
import clsx from 'clsx';
import {
  List,
  Drawer,
  AppBar,
  Toolbar,
  Divider,
  ListItem,
  useTheme,
  IconButton,
  Typography,
  CssBaseline,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useStyles } from './hs-drawer-menu.styles';
import { HSDrawerMenuProps } from './hs-drawer-menu.types';

function HSDrawerMenu({
  children,
}: HSDrawerMenuProps): ReactElement {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Heroes Association
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {
              theme.direction === 'ltr'
                ? <ChevronLeftIcon />
                : <ChevronRightIcon />
            }
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts']
            .map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {
                  index % 2 === 0
                    ? <InboxIcon />
                    : <MailIcon />
                }
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam']
            .map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {
                  index % 2 === 0
                    ? <InboxIcon />
                    : <MailIcon />
               }
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {children}
      </main>
    </div>
  );
}

export default HSDrawerMenu;
