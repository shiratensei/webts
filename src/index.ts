// import { UserEdit } from './views/UserEdit';
// import { User } from './models/User';

// const user = User.buildUser({ name: 'A NAME', age: 20 });

// const rootElement = document.getElementById("root");

// if (rootElement) {
//     const userEdit = new UserEdit(rootElement, user);
//     userEdit.render();

//     console.log(userEdit);
// } else {
//     throw new Error('Root element not found');
// }

import { UserList } from './views/UserList';
import { Collection } from './models/Collection';
import { UserProps, User } from './models/User';

const usersCol = new Collection(
    'http://localhost:3000/users',
    (json: UserProps) => {
        return User.buildUser(json);
    }
);

usersCol.on('change', () => {
    const rootEl = document.getElementById('root');

    if (rootEl) {
        new UserList(rootEl, usersCol).render();
    }
});

usersCol.fetch();
