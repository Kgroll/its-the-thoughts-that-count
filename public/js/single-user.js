let userId;

function getUser() {
    const searchParams = new URLSearchParams(document.location.search.substring(1));
    const userId = searchParams.get('id');
// get userInfo
fetch(`/api/users/${userId}`)
.then(response => {
  console.log(response);
  if (!response.ok) {
    console.log('hi');
    throw new Error({ message: 'Something went wrong!' });
  }

  return response.json();
})
// .then(printuser)
// .catch(err => {
//   console.log(err);
//   alert('Cannot find a user with this id!');
//   window.history.back();
// });  
};
getUser();