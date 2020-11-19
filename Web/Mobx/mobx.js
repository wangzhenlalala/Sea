console.log(mobx);
let {
    observable,
    autorun
} = mobx;


let message = observable({
    title: "Foo",
    author: {
        name: "Michel",
    },
    likes: [
        "John", 
        "Sara",
        {
            name: 33
        }
    ],
});

autorun(() => {
    message.likes.length;
    console.log('auto run array')
});

message.likes.push("Jennifer");
message.likes[2].name = "456";
message.likes[2] = "456"

