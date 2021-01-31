import React, {Component} from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

export default class TeacherSidebar extends Component {
    constructor(props) {
        super(props);
        this.props = {
            teacherCourses: [],
        };
    }

    render(){
        return (
            <List disablePadding dense>
                <ListItem button>
                    <ListItemText>Home</ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemText>Billing</ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemText>Settings</ListItemText>
                </ListItem>
            </List>
        )
    }

}


