// main variables 
const inputField = document.querySelector(".input-repo input");
const getButton = document.querySelector(".input-repo button");
const dataArea = document.querySelector(".show-data");

getButton.addEventListener("click", function () {
    getRepos();
});

function getRepos() {

    // if text field is empty 
    if (inputField.value == '') { dataArea.innerHTML = "<span> Please Enter GitHub Username</span>"; }


    else {
        dataArea.innerHTML = '';
        fetch(`https://api.github.com/users/${inputField.value}/repos`)

            .then(response => response.json(), () => dataArea.innerHTML = "<span>reposotries not found !!</span>")
            .then(reposotries => {
                if (reposotries.length === 0)
                    dataArea.innerHTML = "<span>reposotries not found !!</span>";
                else {
                    reposotries.forEach(repo => {
                        // crate main div 
                        let mainDiv = document.createElement("div");
                        mainDiv.classList.add("data");

                        // create div for name repo and logo 
                        let nameRepo = document.createElement("div");
                        nameRepo.innerHTML = `<i class="fa-brands fa-github"></i> ${repo.name}`;
                        mainDiv.append(nameRepo);

                        // create container for statictecs repo 
                        let statRepo = document.createElement("div");

                        // create count of star this repo and append in stat div 
                        let countStars = document.createElement("span");
                        countStars.innerHTML = `<i class="fa-solid fa-star"></i> ${repo.stargazers_count}`;
                        statRepo.append(countStars);

                        // create count of watches this repo and append in stat div 
                        let countWatches = document.createElement("span");
                        countWatches.innerHTML = `<i class="fa-solid fa-eye"></i>${repo.watchers_count}`;
                        statRepo.append(countWatches);

                        // create visit repo link and append in stat div
                        let visit = document.createElement("a");
                        visit.innerHTML = `<i class="fa-solid fa-door-open"></i> Visit`;
                        visit.setAttribute("target", "_blank");
                        visit.setAttribute("href", `https://github.com/${inputField.value}/${repo.name}`);
                        statRepo.append(visit);

                        mainDiv.append(statRepo);
                        dataArea.append(mainDiv);
                    });
                }
            })
            .catch(() => dataArea.innerHTML = "<span>reposotries not found !!</span>");

    }
}