import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from '@material-ui/core/styles';
import "./Sidebar.scss"


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const items_2 = [];
function SidebarItem({ depthStep = 10, depth = 0, expanded, item, index, selectedItem, ...rest }) {

    const [collapsed, setCollapsed] = React.useState(true);
    const { label, items, onClick: onClickProp } = item;

    function toggleCollapse() {
        setCollapsed(prevValue => !prevValue);
    }

    function onClick(e) {

        if (Array.isArray(items)) {
            toggleCollapse();
        }
        if (onClickProp) {
            onClickProp(e, item);

        }
    }

    let expandIcon;

    if (Array.isArray(items) && items.length) {
        expandIcon = !collapsed ? (
            <ExpandLessIcon
                className={
                    "sidebar-item-expand-arrow" + " sidebar-item-expand-arrow-expanded"
                }
            />
        ) : (
            <ExpandMoreIcon className="sidebar-item-expand-arrow" />
        );
    }

    console.log("selectedItem = ", selectedItem);
    return (
        <>
            <ListItem
                className="sidebar-item"
                onClick={onClick}
                button
                dense
                // selected={selectedIndex === index}
                {...rest}
            >
                <div style={{ paddingLeft: depth * depthStep}}
                     className="sidebar-item-content">
                    <div className="sidebar-item-text" >{label}</div>
                </div>
                {expandIcon}
            </ListItem>
            <Collapse in={!collapsed} timeout="auto" unmountOnExit>
                {Array.isArray(items) ? (
                    <List disablePadding dense>
                        {items.map((subItem, index) => (
                            <React.Fragment key={`${subItem.name}${index}`}>
                                {subItem === "divider" ? (
                                    <Divider style={{ margin: "6px 0" }} />
                                ) : (
                                    <SidebarItem
                                        depth={depth + 1}
                                        depthStep={depthStep}
                                        item={subItem}
                                        selected={ selectedItem === subItem.lessonId}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </List>
                ) : null}
            </Collapse>
        </>
    );
}

function Sidebar({ items, depthStep, depth, expanded, selectedItem }) {
    // console.log("selected", selected);
    const classes = useStyles();
    return (
        <div className={"sidebar"}>
    {/*<div className={classes.root}>*/}
            <List disablePadding dense>
                {items.map((sidebarItem, index) => (
                    <React.Fragment key={`${sidebarItem.name}${index}`}>
                        {sidebarItem === "divider" ? (
                            <Divider style={{ margin: "6px 0" }} />
                        ) : (
                            <SidebarItem
                                depthStep={depthStep}
                                depth={depth}
                                expanded={expanded}
                                item={sidebarItem}
                                selectedItem={selectedItem}
                            />
                        )}
                    </React.Fragment>
                ))}
            </List>
        </div>
    );
}

export default Sidebar;
