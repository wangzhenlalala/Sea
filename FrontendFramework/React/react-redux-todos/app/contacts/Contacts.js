import React from 'react';
import "./contacts.css";


class Contacts extends React.Component {
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
                _groups[groups.length-1].contacts.push({
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

    render() {
        let items = [];
        this.state.groups.forEach( item => {
            items.push(
                <div className="contact-group" id={item.id}>{item.name}</div>
            );
            items.contacts.forEach( contact => {
                items.push(
                <div className="contact-contact" id={`${contact.groupId}-${contact.jid}`}>{contact.name}</div>
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