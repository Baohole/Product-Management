module.exports = (query) => {
    let filterStatus =[
        {
            name: "Tất cả",
            class: "",
            status: ""
        },
        {
            name: "Hoạt động",
            class: "",
            status: "active"
        },
        {
            name: "Dừng hoạt động",
            class: "",
            status: "inactive"
        }
    ]

    if(query.status){
        const indx = filterStatus.findIndex((item) => item.status == query.status);
        filterStatus[indx].class = "active";
    }
    else{
        const indx = filterStatus.findIndex((item) => item.status == "");
        filterStatus[indx].class = "active";
    }

    return filterStatus;
}