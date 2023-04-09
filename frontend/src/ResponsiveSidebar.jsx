import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: 240,
            flexShrink: 0,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'inline-block',
            marginLeft: "20px",
        },
    },
    drawerPaper: {
        backgroundColor: "navy",
        width: 240,
        color: "white"
    },
}));

function ResponsiveSidebar() {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navigate = useNavigate();
    

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuItems = [
        { text: 'Income', link: '/income' },
        { text: 'Expenses', link: '/expenses' },
        { text: 'Budget', link: '/budget' },
        { text: 'Savings', link: '/savings' },
        { text: 'Investments', link: '/investments' },
        { text: 'Debt', link: '/debt' },
        { text: 'Net Worth', link: '/net-worth' },
        { text: 'Financial Goals', link: '/financial-goals' },
        { text: 'Reports', link: '/reports' },
        { text: 'Alerts', link: '/alerts' }
    ]
    const drawer = (
        <div>
            <List>
                <ListItem button onClick={handleDrawerToggle}>
                    <ListItemIcon style={{ color: 'white' }}>
                        <CloseIcon />
                    </ListItemIcon>
                    <ListItemText primary="Close" />
                </ListItem>
            </List>
            <Divider />
            <List>
                {menuItems.map((item, index) => (
                    <ListItem button key={item.text} onClick={() => navigate(item.link)}>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
            >
                <MenuIcon />
            </IconButton>
            <nav className={classes.drawer} aria-label="sidebar">
                <Drawer
                    variant="temporary"
                    anchor="left"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </div>
    );
}

export default ResponsiveSidebar;
