const BASE_URL = 'http://localhost:8000';

window.onload = async () => {
    await loadData();
};

const loadData = async () => {
    console.log('on load');
    try {
        
        const response = await axios.get(`${BASE_URL}/users`);
        console.log(response.data);

        const userDOM = document.getElementById('user');
        let htmlData = '<div>';
        
        for (let i = 0; i < response.data.length; i++) {
            let user = response.data[i];
            // Inside the loop iterating through users
            htmlData += `<div class="user-entry">
            <span>${user.id} ${user.firstname} ${user.lastname}</span>
                <div class="button-container">
                    <a href="index.html?id=${user.id}"><button>Edit</button></a>
                    <button class="delete" data-id="${user.id}">Delete</button>
                </div>
            </div>`;
        }

        htmlData += '</div>';
        userDOM.innerHTML = htmlData;

        const deleteDOMs = document.getElementsByClassName('delete');
        for (let i = 0; i < deleteDOMs.length; i++) {
            deleteDOMs[i].addEventListener('click', async (event) => {
                const id = event.target.dataset.id;
                try {
                    await axios.delete(`${BASE_URL}/users/${id}`);
                    loadData()
                } catch (error) {
                    console.error(error);
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
};