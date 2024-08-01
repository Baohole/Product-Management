const tablePermission = document.querySelector('[table-permission]');
if(tablePermission){
    const btnSubmit = document.querySelector('[button-submit]');
    btnSubmit.addEventListener('click', () => {
        const roles = tablePermission.querySelectorAll('[data-name]');
        let permissions = [];
        roles.forEach(role => {
            const name = role.getAttribute('data-name');
            const input = role.querySelectorAll('input');
            input.forEach((data, index) => {
                if(name == 'id'){
                    permissions.push({
                        id: data.value,
                        permissions: []
                    })
                }
                else if(data.checked){
                    permissions[index].permissions.push(name);
                }
            });
           
            //console.log(permission);
        });
        
        if(permissions.length > 0){
            const roleForm = document.querySelector("#form-role-permissions");
            const inputPermissions = roleForm.querySelector('input[name=permissions]');
            //console.log(inputPermissions);
            inputPermissions.value = JSON.stringify(permissions);
            roleForm.submit();
        }
        //console.log(permissions);
    });

}

const permissionDefault = document.querySelector('[data-records]');
if(permissionDefault){
    const records = JSON.parse(permissionDefault.getAttribute('data-records'));
    records.forEach((item, index) => {
        const permissions = item.permissions;
        permissions.forEach(permission => {
            const role = tablePermission.querySelector(`[data-name="${permission}"]`);
            role.querySelectorAll('input')[index].checked = true;
        });
        
        //console.log(input);
    });
}
