import React from 'react';
import "./contacts.css";
// import 'react-virtualized/styles.css';
// import List from 'react-virtualized/dist/commonjs/List';
import {List} from 'react-virtualized';

export default class Contacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
        }
    }
    componentDidMount() {
        let _groups = [];
        for(let i = 0; i < 6; i++) {
            _groups.push({
                id: i,
                name: i,
                contacts: []
            })
            for(let j = 0; j < 10; j++) {
                _groups[_groups.length-1].contacts.push({
                    groupId: i,
                    jid: j,
                    name: `group: ${i} contact: ${j}`
                })
            }
        }
        this.setState({
            groups: _groups
        })
    }

    rowRender({key, index, style }) {
        let item = this.state.groups[]
    }
    render() {
        let items = [];
        this.state.groups.forEach( group => {
            items.push(
                <div className="contact-group" key={group.id}>{group.name}</div>
            );
            group.contacts.forEach( contact => {
                items.push(
                <div className="contact-contact" key={`${contact.groupId}-${contact.jid}`}>{contact.name}</div>
                )
            })
        });
        return (
            <div className="contacts-container">
                {items}
            </div>
        )
    }
}