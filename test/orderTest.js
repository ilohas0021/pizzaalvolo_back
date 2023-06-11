const post = {
    user_sn: 1,
    detail: [
        {menu_id: 1, count: 1},
        {menu_id: 2, count: 1}
    ]
};


fetch('http://202.31.202.34:443/order', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
})
    .then(res => res.json())
    .then(data => console.log(data));