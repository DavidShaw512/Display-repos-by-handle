// Functionality: allow users to search for GitHub handles,
// and display that user's repos below the form. There
// must be a link to the repo's URL in each result.
// `https://github.com/${repoURL}`

// Call to the GitHub API to get the relevant information
function getUserRepos() {
    const user = $("#user-search").val();
    fetch(`https://api.github.com/users/${user}/repos`)
        .then(responseToJson)
        .then(renderSearchResults)
        // .then(response => console.log(response))
        .catch(error => alert("I don\'t know about that, bud"));
}

const responseToJson = response => response.json();

// Format the search results into appendable HTML
function formatSearchResults(arrayOfRepos) {
    console.log(arrayOfRepos);
    return arrayOfRepos.map(repo => `
    <p>Repo name: ${repo.name}
    <br>
    Link: <a href="https://github.com/${repo.full_name}" target="_blank">https://github.com/${repo.full_name}</a></p>
    `).join('<hr>')
}

// Display formatted search results in the DOM below the search field
function renderSearchResults(repoArray) {
    const results = formatSearchResults(repoArray);
    $("#search-results").empty();
    $("#search-results").append(results);
    console.log(results);
}

// Listens for form submissions
function handleSubmit() {
    $('form').submit(event => {
        event.preventDefault();
        getUserRepos();
    })
}

// Loads the app
$(function() {
    console.log('All loaded up, waiting on you.');
    handleSubmit();
})