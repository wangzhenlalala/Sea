let SET_GROUPS = "SET_GROUPS";
let SET_CONTACTS = "SET_CONTACTS";

const setGroups = (gruops) => {
    return {
        type: SET_GROUPS,
        payload: groups
    }
}

const setContacts = (contacts) => {
    return {
        type: SET_CONTACTS,
        payload: contacts
    }
}