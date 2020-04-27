export default {
  getGistsByUsername(username) {
    return fetch(`https://api.github.com/users/${username}/gists`)
      .then(res => {
        if (res.status !== 200) throw new Error(['Server error.']);
        return res.json();
      })
      .catch(err => {
        throw new Error(['Server error.'])
      })
  },
  getGistDetail(id) {
    return fetch(`https://api.github.com/gists/${id}`)
      .then(res => {
        if (res.status !== 200) throw new Error(['Server error.']);
        return res.json();
      })
      .catch(err => {
        throw new Error(['Server error.'])
      })
  }
}
